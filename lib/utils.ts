import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { BookingType } from "@prisma/client"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ─────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────

/** Number of full nights between two dates */
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24
  return Math.max(1, Math.round((checkOut.getTime() - checkIn.getTime()) / msPerDay))
}

/** Number of full weeks between two dates */
export function calculateWeeks(checkIn: Date, checkOut: Date): number {
  return Math.max(1, Math.round(calculateNights(checkIn, checkOut) / 7))
}

/** Number of full months between two dates */
export function calculateMonths(checkIn: Date, checkOut: Date): number {
  const months =
    (checkOut.getFullYear() - checkIn.getFullYear()) * 12 +
    (checkOut.getMonth() - checkIn.getMonth())
  return Math.max(1, months)
}

/**
 * Calculates the total booking price based on type.
 * Returns the price before any coupon discounts.
 */
export function calculateTotalPrice(
  checkIn: Date,
  checkOut: Date,
  bookingType: BookingType,
  priceNightly: number,
  priceWeekly: number,
  priceMonthly: number
): number {
  switch (bookingType) {
    case "NIGHTLY":
      return calculateNights(checkIn, checkOut) * priceNightly
    case "WEEKLY":
      return calculateWeeks(checkIn, checkOut) * priceWeekly
    case "MONTHLY":
      return calculateMonths(checkIn, checkOut) * priceMonthly
    default:
      return 0
  }
}

/** Apply a percentage discount and return the discounted price */
export function applyDiscount(price: number, discountPct: number): number {
  if (discountPct <= 0) return price
  return price - (price * discountPct) / 100
}

// ─────────────────────────────────────────────
// Currency formatter (Saudi Riyal)
// ─────────────────────────────────────────────

export function formatSAR(amount: number, locale: string = "en"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
    style: "currency",
    currency: "SAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// ─────────────────────────────────────────────
// Date formatting
// ─────────────────────────────────────────────

export function formatDate(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatDateShort(date: Date, locale: string = "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

// ─────────────────────────────────────────────
// Slug generator
// ─────────────────────────────────────────────

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/--+/g, "-")
}

// ─────────────────────────────────────────────
// Booking type label
// ─────────────────────────────────────────────

export function getBookingTypeLabel(type: BookingType, locale: string = "en"): string {
  const labels: Record<BookingType, { en: string; ar: string }> = {
    NIGHTLY: { en: "Nightly", ar: "يومي" },
    WEEKLY: { en: "Weekly", ar: "أسبوعي" },
    MONTHLY: { en: "Monthly", ar: "شهري" },
  }
  return labels[type]?.[locale as "en" | "ar"] ?? type
}

// ─────────────────────────────────────────────
// Misc
// ─────────────────────────────────────────────

/** Truncate a string to maxLength with ellipsis */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trimEnd() + "…"
}

/** Returns a range array [start, ..., end] */
export function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}
