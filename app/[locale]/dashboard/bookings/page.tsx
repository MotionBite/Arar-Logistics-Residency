import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

export default async function DashboardBookingsPage() {
  const session = await auth()
  if (!session || !session.user) {
    redirect('/login')
  }

  const t = await getTranslations('Dashboard')

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      room: {
        include: {
          images: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-8">{t('myBookings') || 'My Bookings'}</h1>
      
      {bookings.length === 0 ? (
        <div className="bg-card p-12 text-center rounded-3xl border">
          <p className="text-muted-foreground text-lg">{t('noBookings') || 'You have no bookings yet.'}</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const primaryImage = booking.room.images.find((img) => img.isPrimary) || booking.room.images[0]
            
            return (
              <div key={booking.id} className="bg-card border rounded-3xl p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-full md:w-64 h-48 md:h-full min-h-[160px] rounded-2xl overflow-hidden shrink-0">
                  {primaryImage ? (
                    <Image
                      src={primaryImage.url}
                      alt={booking.room.nameEn}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-sm text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold">{booking.room.nameEn}</h3>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full capitalize">
                        {booking.status.toLowerCase()}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {booking.checkIn.toLocaleDateString()} - {booking.checkOut.toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm text-muted-foreground">Guests</p>
                      <p className="font-medium">{booking.guests}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Price</p>
                      <p className="text-2xl font-bold">{booking.totalPrice} SAR</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
