'use server'

import { prisma } from '@/lib/prisma'
import { BookingStatus, BookingType } from '@prisma/client'

import { auth } from '@/lib/auth'

export async function checkAvailability(roomId: string, checkIn: Date, checkOut: Date) {
  try {
    const conflictingBookings = await prisma.booking.findMany({
      where: {
        roomId,
        status: {
          notIn: [BookingStatus.CANCELLED],
        },
        OR: [
          {
            checkIn: { lte: checkOut },
            checkOut: { gte: checkIn },
          },
        ],
      },
    });

    return { success: true, isAvailable: conflictingBookings.length === 0 };
  } catch (error) {
    console.error('Failed to check availability', error);
    return { success: false, error: 'Failed to check availability' };
  }
}

export async function verifyCoupon(code: string) {
  try {
    const coupon = await prisma.coupon.findUnique({
      where: { code }
    })
    
    if (!coupon) {
      return { success: false, error: 'Invalid promo code' }
    }
    if (!coupon.isActive) {
      return { success: false, error: 'Promo code is disabled' }
    }
    if (new Date(coupon.expiresAt) < new Date()) {
      return { success: false, error: 'Promo code has expired' }
    }
    if (coupon.usedCount >= coupon.maxUses) {
      return { success: false, error: 'Promo code has reached its maximum uses' }
    }

    return { success: true, data: { discountPct: coupon.discountPct } }
  } catch (error) {
    console.error('Failed to verify coupon', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function createBooking(data: {
  roomId: string;
  checkIn: string;
  checkOut: string;
  bookingType: BookingType;
  guests: number;
  totalPrice: number;
  couponCode?: string;
}) {
  try {
    const session = await auth()
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' }
    }

    let finalPrice = data.totalPrice;

    if (data.couponCode) {
      const couponCheck = await verifyCoupon(data.couponCode);
      if (couponCheck.success && couponCheck.data) {
        finalPrice = finalPrice * (1 - couponCheck.data.discountPct / 100);
        
        await prisma.coupon.update({
          where: { code: data.couponCode },
          data: { usedCount: { increment: 1 } }
        });
      }
    }

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        roomId: data.roomId,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        bookingType: data.bookingType,
        guests: data.guests,
        totalPrice: finalPrice,
        status: BookingStatus.PENDING,
      }
    })
    return { success: true, data: booking }
  } catch (error) {
    console.error('Failed to create booking', error)
    return { success: false, error: 'Failed to create booking' }
  }
}
