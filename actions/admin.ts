'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { BookingStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  try {
    const session = await auth()
    
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    })

    revalidatePath('/admin/bookings')
    revalidatePath('/dashboard/bookings')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update booking status:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function updateRoomAvailability(roomId: string, isAvailable: boolean) {
  try {
    const session = await auth()
    
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.room.update({
      where: { id: roomId },
      data: { isAvailable }
    })

    revalidatePath('/admin/rooms')
    revalidatePath('/rooms')
    revalidatePath('/')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update room availability:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function createRoom(data: any) {
  try {
    const session = await auth()
    
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    const {
      nameEn, nameAr, descEn, descAr, type,
      capacity, floorNumber, priceNightly, priceWeekly, priceMonthly, imageUrl
    } = data

    const slug = nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);
    
    const room = await prisma.room.create({
      data: {
        slug,
        nameEn,
        nameAr,
        descEn,
        descAr,
        type,
        capacity: parseInt(capacity),
        floorNumber: parseInt(floorNumber),
        priceNightly: parseFloat(priceNightly),
        priceWeekly: parseFloat(priceWeekly),
        priceMonthly: parseFloat(priceMonthly),
        images: {
          create: {
            url: imageUrl,
            publicId: 'default-placeholder', // Mock since no CDN used
            isPrimary: true,
          }
        }
      }
    })

    revalidatePath('/admin/rooms')
    revalidatePath('/rooms')
    
    return { success: true, roomId: room.id }
  } catch (error) {
    console.error('Failed to create room:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function updateReviewStatus(reviewId: string, isApproved: boolean) {
  try {
    const session = await auth()
    
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.review.update({
      where: { id: reviewId },
      data: { isApproved }
    })

    revalidatePath('/admin/reviews')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update review status:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}
