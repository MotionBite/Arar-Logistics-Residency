'use client'

import { useState } from 'react'
import { BookingStatus } from '@prisma/client'
import { updateBookingStatus } from '@/actions/admin'

interface BookingStatusSelectProps {
  bookingId: string
  currentStatus: BookingStatus
}

export function BookingStatusSelect({ bookingId, currentStatus }: BookingStatusSelectProps) {
  const [isPending, setIsPending] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as BookingStatus
    setIsPending(true)
    await updateBookingStatus(bookingId, newStatus)
    setIsPending(false)
  }

  const statusColors: Record<BookingStatus, string> = {
    PENDING: 'text-yellow-600 bg-yellow-500/10',
    CONFIRMED: 'text-blue-600 bg-blue-500/10',
    CHECKEDIN: 'text-green-600 bg-green-500/10',
    CHECKEDOUT: 'text-gray-600 bg-gray-500/10',
    CANCELLED: 'text-red-600 bg-red-500/10',
  }

  return (
    <select
      disabled={isPending}
      value={currentStatus}
      onChange={handleChange}
      className={`px-3 py-1.5 text-xs font-semibold rounded-full appearance-none border-none outline-none cursor-pointer focus:ring-2 focus:ring-primary/50 transition-opacity ${statusColors[currentStatus]} ${isPending ? 'opacity-50' : ''}`}
    >
      <option value="PENDING">Pending</option>
      <option value="CONFIRMED">Confirmed</option>
      <option value="CHECKEDIN">Checked In</option>
      <option value="CHECKEDOUT">Checked Out</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
  )
}
