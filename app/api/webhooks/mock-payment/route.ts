import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { BookingStatus, PaymentStatus } from '@prisma/client';
import { sendBookingConfirmation } from '@/services/email';

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    // Update booking status to CONFIRMED and payment to PAID
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.PAID,
      },
      include: {
        user: true,
        room: true,
      },
    });

    if (booking.user.email) {
      // Send confirmation email
      await sendBookingConfirmation({
        bookingId: booking.id,
        guestName: booking.user.name || 'Guest',
        guestEmail: booking.user.email,
        roomNameEn: booking.room.nameEn,
        roomNameAr: booking.room.nameAr,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        bookingType: booking.bookingType,
        totalPrice: booking.totalPrice,
        locale: 'en',
      });
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error('Payment mock error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
