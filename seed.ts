import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const db = new PrismaClient();
async function main() {
  if (!(await db.farm.count())) await db.farm.create({ data: {} });
  const users = [
    ['Hamza', 'FOUNDER', process.env.SEED_FOUNDER_PASSWORD],
    ['Adam', 'ADMIN', process.env.SEED_ADAM_PASSWORD],
    ['Muhammadmaje', 'ADMIN', process.env.SEED_MAJE_PASSWORD],
  ] as const;
  for (const [username, role, pw] of users) {
    if (!pw) throw new Error(`Missing seed password for ${username}`);
    await db.user.upsert({ where: { username }, update: {}, create: { username, role, passwordHash: await bcrypt.hash(pw, 12) } });
  }
  console.log('Seeded farm and users (passwordChanged=false: forced change on first login).');
}
main().finally(() => db.$disconnect());
