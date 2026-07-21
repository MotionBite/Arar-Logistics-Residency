import { Resend } from 'resend'
import { BookingConfirmationEmail } from '@/emails/BookingConfirmation'
import { BookingCancellationEmail } from '@/emails/BookingCancellation'
import { WelcomeEmail } from '@/emails/Welcome'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = 'Arar Residency <noreply@ararresidency.com>'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface BookingEmailData {
  bookingId: string
  guestName: string
  guestEmail: string
  roomNameEn: string
  roomNameAr: string
  checkIn: Date
  checkOut: Date
  guests: number
  bookingType: string
  totalPrice: number
  locale?: string
}

export interface WelcomeEmailData {
  name: string
  email: string
}

// ─────────────────────────────────────────────
// Send booking confirmation
// ─────────────────────────────────────────────

export async function sendBookingConfirmation(data: BookingEmailData) {
  try {
    const subject =
      data.locale === 'ar'
        ? `تأكيد الحجز #${data.bookingId.slice(-6).toUpperCase()} — مساكن عرعر`
        : `Booking Confirmed #${data.bookingId.slice(-6).toUpperCase()} — Arar Residency`

    const { error } = await resend.emails.send({
      from: FROM,
      to: data.guestEmail,
      subject,
      react: BookingConfirmationEmail(data),
    })

    if (error) {
      console.error('[Email] Booking confirmation failed:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (err) {
    console.error('[Email] Booking confirmation exception:', err)
    return { success: false, error: err }
  }
}

// ─────────────────────────────────────────────
// Send booking cancellation
// ─────────────────────────────────────────────

export async function sendBookingCancellation(data: BookingEmailData) {
  try {
    const subject =
      data.locale === 'ar'
        ? `تم إلغاء حجزك #${data.bookingId.slice(-6).toUpperCase()} — مساكن عرعر`
        : `Booking Cancelled #${data.bookingId.slice(-6).toUpperCase()} — Arar Residency`

    const { error } = await resend.emails.send({
      from: FROM,
      to: data.guestEmail,
      subject,
      react: BookingCancellationEmail(data),
    })

    if (error) {
      console.error('[Email] Cancellation email failed:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (err) {
    console.error('[Email] Cancellation email exception:', err)
    return { success: false, error: err }
  }
}

// ─────────────────────────────────────────────
// Send welcome email on registration
// ─────────────────────────────────────────────

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: data.email,
      subject: `Welcome to Arar Residency — مرحباً بك في مساكن عرعر`,
      react: WelcomeEmail(data),
    })

    if (error) {
      console.error('[Email] Welcome email failed:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (err) {
    console.error('[Email] Welcome email exception:', err)
    return { success: false, error: err }
  }
}
