import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ['error'] })

async function main() {
  console.log('Seeding database...')

  // Create some sample rooms
  const standard = await prisma.room.create({
    data: {
      nameAr: 'غرفة قياسية',
      nameEn: 'Standard Room',
      descAr: 'غرفة قياسية مريحة مع جميع وسائل الراحة الأساسية.',
      descEn: 'A comfortable standard room with all basic amenities.',
      type: 'STANDARD',
      capacity: 2,
      floorNumber: 1,
      priceNightly: 100,
      priceWeekly: 650,
      priceMonthly: 2500,
      slug: 'standard-room',
    }
  })

  const deluxe = await prisma.room.create({
    data: {
      nameAr: 'غرفة ديلوكس',
      nameEn: 'Deluxe Room',
      descAr: 'غرفة ديلوكس واسعة تتميز بإطلالة جميلة ومساحة إضافية.',
      descEn: 'A spacious deluxe room featuring a beautiful view and extra space.',
      type: 'DELUXE',
      capacity: 3,
      floorNumber: 2,
      priceNightly: 150,
      priceWeekly: 950,
      priceMonthly: 3500,
      slug: 'deluxe-room',
    }
  })

  const suite = await prisma.room.create({
    data: {
      nameAr: 'جناح تنفيذي',
      nameEn: 'Executive Suite',
      descAr: 'جناح فاخر مع منطقة جلوس منفصلة وخدمات مميزة.',
      descEn: 'A luxurious suite with a separate seating area and premium services.',
      type: 'SUITE',
      capacity: 4,
      floorNumber: 3,
      priceNightly: 250,
      priceWeekly: 1600,
      priceMonthly: 6000,
      slug: 'executive-suite',
    }
  })

  console.log('Rooms created:', standard.nameEn, deluxe.nameEn, suite.nameEn)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
