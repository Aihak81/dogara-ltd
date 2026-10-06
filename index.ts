import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();
const app = express();
const prod = process.env.NODE_ENV === 'production';
const SESSION_MS = 1000 * 60 * 60 * 12;
app.set('trust proxy', 1);
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

type AuthReq = Request & { user?: { id: string; username: string; role: string; passwordChanged: boolean } };
const fail = (res: Response, status: number, code: string, message: string) =>
  res.status(status).json({ success: false, error: { code, message } });
const ok = (res: Response, data: unknown, status = 200) => res.status(status).json({ success: true, data });
const wrap = (fn: (req: AuthReq, res: Response) => Promise<unknown>) =>
  (req: Request, res: Response, next: NextFunction) => fn(req as AuthReq, res).catch(next);
const sha = (s: string) => crypto.createHash('sha256').update(s).digest('hex');
const audit = (req: Request, userId: string | undefined, action: string, entity?: string, entityId?: string, description?: string) =>
  db.auditLog.create({ data: { userId, action, entity, entityId, description, ip: req.ip } });

// CSRF: cookie is SameSite=Strict; mutating calls must also carry a custom header
app.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  if (req.get('X-Requested-With') !== 'farm-erp') return fail(res, 403, 'CSRF', 'Missing request header');
  next();
});

const requireAuth = wrap(async (req, res) => {
  const token = req.cookies?.sid;
  const s = token && await db.session.findUnique({ where: { id: sha(token) }, include: { user: true } });
  if (!s || s.expiresAt < new Date() || !s.user.active) return fail(res, 401, 'UNAUTHENTICATED', 'Your session has expired.');
  req.user = { id: s.user.id, username: s.user.username, role: s.user.role, passwordChanged: s.user.passwordChanged };
  (res.locals as any).ok = true;
});
// Express-style adapters so middleware can short-circuit
const auth = (req: Request, res: Response, next: NextFunction) =>
  requireAuth(req, res, () => {}).then(() => {
    if (res.headersSent) return;
    const u = (req as AuthReq).user!;
    if (!u.passwordChanged && !req.path.startsWith('/api/auth')) return fail(res, 403, 'PASSWORD_CHANGE_REQUIRED', 'Please change your initial password.');
    next();
  }, next);
const requireRole = (...roles: string[]) => (req: Request, res: Response, next: NextFunction) =>
  roles.includes((req as AuthReq).user!.role) ? next() : fail(res, 403, 'FORBIDDEN', 'You do not have permission to perform this action.');

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true });

app.post('/api/auth/login', loginLimiter, wrap(async (req, res) => {
  const { username, password } = z.object({ username: z.string().min(1), password: z.string().min(1) }).parse(req.body);
  const u = await db.user.findUnique({ where: { username } });
  const bad = () => fail(res, 401, 'INVALID_CREDENTIALS', 'Invalid username or password.');
  if (!u) { await bcrypt.compare(password, '$2a$12$invalidinvalidinvalidinvalidinvalidinvalidinvalidinvali'); return bad(); }
  if (u.lockedUntil && u.lockedUntil > new Date()) return fail(res, 429, 'LOCKED', 'Too many attempts. Try again later.');
  if (!(await bcrypt.compare(password, u.passwordHash))) {
    const n = u.failedLogins + 1;
    await db.user.update({ where: { id: u.id }, data: { failedLogins: n, lockedUntil: n >= 5 ? new Date(Date.now() + 15 * 60000) : null } });
    await audit(req, u.id, 'LOGIN_FAILED', 'User', u.id);
    return bad();
  }
  if (!u.active) return fail(res, 403, 'ACCOUNT_DISABLED', 'This account is disabled.');
  const token = crypto.randomBytes(32).toString('hex');
  await db.session.create({ data: { id: sha(token), userId: u.id, expiresAt: new Date(Date.now() + SESSION_MS) } });
  await db.user.update({ where: { id: u.id }, data: { failedLogins: 0, lockedUntil: null, lastLoginAt: new Date() } });
  res.cookie('sid', token, { httpOnly: true, secure: prod, sameSite: 'strict', maxAge: SESSION_MS });
  await audit(req, u.id, 'LOGIN', 'User', u.id);
  ok(res, { username: u.username, role: u.role, mustChangePassword: !u.passwordChanged });
}));

app.post('/api/auth/logout', auth, wrap(async (req, res) => {
  await db.session.deleteMany({ where: { id: sha(req.cookies.sid) } });
  res.clearCookie('sid');
  await audit(req, req.user!.id, 'LOGOUT');
  ok(res, null);
}));
app.get('/api/auth/me', auth, wrap(async (req, res) => ok(res, req.user)));

const pwSchema = z.string().min(8).regex(/[a-z]/).regex(/[A-Z]/).regex(/\d/);
app.post('/api/auth/change-password', auth, wrap(async (req, res) => {
  const { currentPassword, newPassword } = z.object({ currentPassword: z.string(), newPassword: pwSchema }).parse(req.body);
  const u = await db.user.findUniqueOrThrow({ where: { id: req.user!.id } });
  if (!(await bcrypt.compare(currentPassword, u.passwordHash))) return fail(res, 400, 'INVALID_CREDENTIALS', 'Current password is incorrect.');
  await db.user.update({ where: { id: u.id }, data: { passwordHash: await bcrypt.hash(newPassword, 12), passwordChanged: true } });
  await db.session.deleteMany({ where: { userId: u.id, NOT: { id: sha(req.cookies.sid) } } });
  await audit(req, u.id, 'PASSWORD_CHANGED', 'User', u.id);
  ok(res, null);
}));

// Founder-authorised reset: requires a logged-in FOUNDER plus the server-side secret
app.post('/api/users/:id/reset-password', auth, requireRole('FOUNDER'), wrap(async (req, res) => {
  const { secret, newPassword } = z.object({ secret: z.string(), newPassword: pwSchema }).parse(req.body);
  const expected = process.env.FARM_PASSWORD_RESET_SECRET || '';
  const a = Buffer.from(sha(secret)), b = Buffer.from(sha(expected));
  if (!expected || !crypto.timingSafeEqual(a, b)) { await audit(req, req.user!.id, 'RESET_DENIED', 'User', req.params.id); return fail(res, 403, 'FORBIDDEN', 'Reset not authorised.'); }
  await db.user.update({ where: { id: req.params.id }, data: { passwordHash: await bcrypt.hash(newPassword, 12), passwordChanged: false } });
  await db.session.deleteMany({ where: { userId: req.params.id } });
  await audit(req, req.user!.id, 'PASSWORD_RESET', 'User', req.params.id);
  ok(res, null);
}));

app.get('/api/users', auth, requireRole('FOUNDER'), wrap(async (_req, res) =>
  ok(res, await db.user.findMany({ select: { id: true, username: true, role: true, active: true, lastLoginAt: true, createdAt: true } }))));
app.get('/api/audit', auth, requireRole('FOUNDER'), wrap(async (_req, res) =>
  ok(res, await db.auditLog.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }))));

const farmId = async () => (await db.farm.findFirstOrThrow()).id;
const day = 86400000;

// Flock metrics are always derived from records, never stored
async function flockStats(f: any) {
  const [recs, exp, inc] = await Promise.all([
    db.flockDailyRecord.findMany({ where: { flockId: f.id } }),
    db.expense.aggregate({ where: { flockId: f.id, deletedAt: null }, _sum: { amount: true } }),
    db.income.findMany({ where: { flockId: f.id, deletedAt: null } }),
  ]);
  const sum = (k: 'deaths' | 'culled' | 'sold' | 'feedKg') => recs.reduce((a, r) => a + r[k], 0);
  const deaths = sum('deaths'), culled = sum('culled'), sold = sum('sold');
  const cost = f.startCost + (exp._sum.amount ?? 0);
  const revenue = inc.reduce((a, i) => a + i.quantity * i.unitPrice, 0);
  const current = f.startQty - deaths - culled - sold;
  const ageDays = Math.floor((Date.now() - new Date(f.hatchDate ?? f.arrivalDate).getTime()) / day);
  return { ...f, deaths, culled, sold, current, feedKg: sum('feedKg'),
    mortalityPct: +(deaths / f.startQty * 100).toFixed(2), survivalPct: +(100 - deaths / f.startQty * 100).toFixed(2),
    age: `${Math.floor(ageDays / 7)} Weeks, ${ageDays % 7} Days`, ageDays,
    cost, revenue, profit: revenue - cost, roiPct: cost ? +((revenue - cost) / cost * 100).toFixed(2) : 0,
    costPerBird: +(cost / f.startQty).toFixed(2) };
}

const flockSchema = z.object({
  code: z.string().min(1), batchName: z.string().min(1),
  birdType: z.enum(['PULLET', 'LAYER', 'BROILER', 'NOILER', 'LOCAL', 'OTHER']),
  breed: z.string().optional(), supplier: z.string().optional(),
  startQty: z.number().int().positive(), startCost: z.number().min(0).default(0),
  hatchDate: z.coerce.date().optional(), arrivalDate: z.coerce.date(), notes: z.string().optional(),
});
app.get('/api/flocks', auth, wrap(async (_req, res) => {
  const flocks = await db.flock.findMany({ where: { deletedAt: null }, orderBy: { arrivalDate: 'desc' } });
  ok(res, await Promise.all(flocks.map(flockStats)));
}));
app.post('/api/flocks', auth, wrap(async (req, res) => {
  const d = flockSchema.parse(req.body);
  if (await db.flock.findUnique({ where: { code: d.code } })) return fail(res, 409, 'DUPLICATE', 'Flock ID already exists.');
  const f = await db.flock.create({ data: { ...d, farmId: await farmId() } });
  await audit(req, req.user!.id, 'FLOCK_CREATED', 'Flock', f.id, f.code);
  ok(res, f, 201);
}));
app.get('/api/flocks/:id', auth, wrap(async (req, res) => {
  const f = await db.flock.findFirst({ where: { id: req.params.id, deletedAt: null } });
  f ? ok(res, await flockStats(f)) : fail(res, 404, 'NOT_FOUND', 'Flock not found.');
}));
app.put('/api/flocks/:id', auth, wrap(async (req, res) => {
  const f = await db.flock.update({ where: { id: req.params.id }, data: flockSchema.partial().parse(req.body) });
  await audit(req, req.user!.id, 'FLOCK_EDITED', 'Flock', f.id, f.code);
  ok(res, f);
}));
app.delete('/api/flocks/:id', auth, wrap(async (req, res) => {
  await db.flock.update({ where: { id: req.params.id }, data: { deletedAt: new Date() } });
  await audit(req, req.user!.id, 'FLOCK_DELETED', 'Flock', req.params.id);
  ok(res, null);
}));
app.post('/api/flocks/:id/updates', auth, wrap(async (req, res) => {
  const d = z.object({ date: z.coerce.date(), deaths: z.number().int().min(0).default(0), culled: z.number().int().min(0).default(0),
    sold: z.number().int().min(0).default(0), feedKg: z.number().min(0).default(0), avgWeightKg: z.number().min(0).optional(),
    eggsCollected: z.number().int().min(0).default(0), notes: z.string().optional() }).parse(req.body);
  const f = await db.flock.findFirst({ where: { id: req.params.id, deletedAt: null } });
  if (!f) return fail(res, 404, 'NOT_FOUND', 'Flock not found.');
  const { current } = await flockStats(f);
  if (d.deaths + d.culled + d.sold > current) return fail(res, 400, 'VALIDATION_ERROR', `Only ${current} birds available.`);
  const r = await db.flockDailyRecord.create({ data: { ...d, flockId: f.id } });
  await audit(req, req.user!.id, 'DAILY_UPDATE_CREATED', 'FlockDailyRecord', r.id, f.code);
  ok(res, r, 201);
}));

const expenseSchema = z.object({ date: z.coerce.date(), category: z.string().min(1), description: z.string().min(1),
  amount: z.number().positive('Expense amount must be greater than zero'), paymentMethod: z.string().optional(), flockId: z.string().optional() });
app.get('/api/expenses', auth, wrap(async (_req, res) =>
  ok(res, await db.expense.findMany({ where: { deletedAt: null }, orderBy: { date: 'desc' }, take: 500 }))));
app.post('/api/expenses', auth, wrap(async (req, res) => {
  const e = await db.expense.create({ data: { ...expenseSchema.parse(req.body), farmId: await farmId() } });
  await audit(req, req.user!.id, 'EXPENSE_CREATED', 'Expense', e.id, `${e.category} ${e.amount}`);
  ok(res, e, 201);
}));
app.put('/api/expenses/:id', auth, wrap(async (req, res) => {
  const e = await db.expense.update({ where: { id: req.params.id }, data: expenseSchema.partial().parse(req.body) });
  await audit(req, req.user!.id, 'EXPENSE_EDITED', 'Expense', e.id);
  ok(res, e);
}));
app.delete('/api/expenses/:id', auth, wrap(async (req, res) => {
  await db.expense.update({ where: { id: req.params.id }, data: { deletedAt: new Date() } });
  await audit(req, req.user!.id, 'EXPENSE_DELETED', 'Expense', req.params.id);
  ok(res, null);
}));

app.get('/api/dashboard', auth, wrap(async (_req, res) => {
  const flocks = await Promise.all((await db.flock.findMany({ where: { deletedAt: null } })).map(flockStats));
  const active = flocks.filter(f => f.status === 'ACTIVE');
  const start = new Date(); start.setHours(0, 0, 0, 0);
  const monthStart = new Date(start.getFullYear(), start.getMonth(), 1);
  const [today, month, eggs] = await Promise.all([
    db.expense.aggregate({ where: { deletedAt: null, date: { gte: start } }, _sum: { amount: true } }),
    db.expense.aggregate({ where: { deletedAt: null, date: { gte: monthStart } }, _sum: { amount: true } }),
    db.flockDailyRecord.aggregate({ where: { date: { gte: start } }, _sum: { eggsCollected: true } }),
  ]);
  const revenue = flocks.reduce((a, f) => a + f.revenue, 0), cost = flocks.reduce((a, f) => a + f.cost, 0);
  const deaths = flocks.reduce((a, f) => a + f.deaths, 0), started = flocks.reduce((a, f) => a + f.startQty, 0);
  ok(res, { totalBirds: active.reduce((a, f) => a + f.current, 0), activeFlocks: active.length,
    expensesToday: today._sum.amount ?? 0, expensesMonth: month._sum.amount ?? 0, revenue, profit: revenue - cost,
    mortalityPct: started ? +(deaths / started * 100).toFixed(2) : 0, eggsToday: eggs._sum.eggsCollected ?? 0 });
}));

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err?.name === 'ZodError') return fail(res, 400, 'VALIDATION_ERROR', err.issues[0]?.message ?? 'Invalid input');
  console.error(err);
  fail(res, 500, 'SERVER_ERROR', 'Something went wrong.');
});
app.listen(process.env.PORT || 4000, () => console.log("Hamza's Organic Farm API running"));
