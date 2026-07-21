import { getRoomById } from '@/actions/rooms';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BookingForm } from '@/components/booking/BookingForm';

export default async function BookingCheckoutPage({ params }: { params: { roomId: string } }) {
  const t = await getTranslations('Booking');
  const res = await getRoomById(params.roomId);
  
  if (!res.success || !res.data) {
    notFound();
  }

  const room = res.data;
  const primaryImage = room.images.find(img => img.isPrimary) || room.images[0];

  return (
    <main className="flex min-h-screen flex-col py-16 px-4 w-full max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">{t('title') || 'Complete Your Reservation'}</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Room Summary */}
        <div className="w-full lg:w-1/2">
          <div className="bg-card border rounded-3xl p-6 shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Reservation Details</h2>
            
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={room.nameEn}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No Image Available</span>
                </div>
              )}
            </div>
            
            <h3 className="text-xl font-bold mb-2">{room.nameEn}</h3>
            <p className="text-muted-foreground mb-6 line-clamp-2">{room.descEn}</p>
            
            <div className="flex justify-between items-center py-4 border-t">
              <span className="text-muted-foreground">Max Capacity</span>
              <span className="font-medium">{room.capacity} Guests</span>
            </div>
            <div className="flex justify-between items-center py-4 border-t">
              <span className="text-muted-foreground">Room Type</span>
              <span className="font-medium">{room.type}</span>
            </div>
          </div>
        </div>
        
        {/* Right Side: Booking Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-card border rounded-3xl p-8 shadow-xl">
            <BookingForm room={room} />
          </div>
        </div>
      </div>
    </main>
  );
}
