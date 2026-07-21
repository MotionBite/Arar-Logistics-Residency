import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.room.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.favoriteRoom.deleteMany({});
  console.log('Database cleared.');
}

main().finally(() => prisma.$disconnect());
