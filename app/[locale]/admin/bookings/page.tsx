import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'

import { BookingStatusSelect } from '@/components/admin/BookingStatusSelect'

export default async function AdminBookingsPage() {
  const t = await getTranslations('Admin')
  
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      room: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('bookings') || 'Bookings Management'}</h1>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b text-sm">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Room</th>
                <th className="p-4 font-medium">Dates</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <p className="font-semibold">{booking.user.name}</p>
                    <p className="text-xs text-muted-foreground">{booking.user.email}</p>
                  </td>
                  <td className="p-4 text-sm">{booking.room.nameEn}</td>
                  <td className="p-4 text-sm">
                    {booking.checkIn.toLocaleDateString()} - {booking.checkOut.toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <BookingStatusSelect bookingId={booking.id} currentStatus={booking.status} />
                  </td>
                  <td className="p-4 font-medium">{booking.totalPrice} SAR</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
