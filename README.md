# Hamza's Organic Farm ERP — server foundation

Express + TypeScript + Prisma (SQLite, PostgreSQL-ready: change `provider` and `DATABASE_URL`).

## Run locally
1. `cp .env.example .env`, then set `SESSION_SECRET`, `FARM_PASSWORD_RESET_SECRET` (use a NEW secret, not one shared in chat) and the three `SEED_*_PASSWORD` values.
2. `npm install && npm run db:push && npm run db:seed`
3. `npm run dev` (API on :4000). Remove the `SEED_*` lines from `.env` afterwards.

All users are seeded with `passwordChanged=false`; the API blocks everything except `/api/auth/*` until they change it.

## Security
bcrypt (cost 12), hashed server-side session tokens in HTTP-only SameSite=Strict cookies, login rate limit + 5-attempt lockout, role checks in middleware, Zod validation, Helmet, audit log, soft deletes, reset secret only in server env.

## Backup (SQLite)
Copy the `.db` file while the app is idle (`cp server/prisma/dev.db backups/farm-$(date +%F).db`); restore by copying it back. Schedule with cron on a VPS; on Render/Railway use a persistent disk.
