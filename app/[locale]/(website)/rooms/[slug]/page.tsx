import { getRoomBySlug } from '@/actions/rooms';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { ReviewForm } from '@/components/rooms/ReviewForm';
import { RoomGallery } from '@/components/rooms/RoomGallery';
import { AvailabilityCalendar } from '@/components/rooms/AvailabilityCalendar';
import { RoomBookingPanel } from '@/components/rooms/RoomBookingPanel';
import { Users, BedDouble, Bath, Square, Star } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getRoomBySlug(slug);
  
  if (!res.success || !res.data) {
    return { title: 'Room Not Found' };
  }

  const room = res.data;
  return {
    title: room.nameEn,
    description: room.descEn,
    openGraph: {
      title: `${room.nameEn} | Arar Residency`,
      description: room.descEn,
      images: room.images.length > 0 ? [{ url: room.images[0].url }] : [],
    },
  };
}

export default async function RoomDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTranslations('Rooms');
  const { slug } = await params;
  const res = await getRoomBySlug(slug);
  
  if (!res.success || !res.data) {
    notFound();
  }

  const room = res.data;

  return (
    <main className="flex min-h-screen flex-col py-16 px-4 w-full max-w-7xl mx-auto">
      <Link href="/rooms" className="text-primary hover:underline mb-8 inline-flex items-center gap-2 font-medium">
        &larr; Back to Rooms
      </Link>
      
      <RoomGallery images={room.images} />

      <div className="flex flex-col lg:flex-row gap-12 mt-12">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">{room.nameEn}</h1>
            {room.isFeatured && (
              <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{room.descEn}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <div className="bg-background border p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
              <Users className="text-primary w-6 h-6" />
              <div className="font-bold">{room.capacity}</div>
              <div className="text-xs text-muted-foreground">Guests</div>
            </div>
            <div className="bg-background border p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
              <BedDouble className="text-primary w-6 h-6" />
              <div className="font-bold">{room.bedCount}</div>
              <div className="text-xs text-muted-foreground">Beds</div>
            </div>
            <div className="bg-background border p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
              <Bath className="text-primary w-6 h-6" />
              <div className="font-bold">{room.bathroomCount}</div>
              <div className="text-xs text-muted-foreground">Baths</div>
            </div>
            <div className="bg-background border p-4 rounded-2xl flex flex-col items-center justify-center gap-2">
              <Square className="text-primary w-6 h-6" />
              <div className="font-bold">Floor {room.floorNumber}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {room.amenities && room.amenities.length > 0 ? (
                room.amenities.map((amenity, idx) => (
                  <span key={idx} className="bg-primary/5 text-foreground border border-primary/20 px-4 py-2 rounded-xl text-sm font-medium">
                    {amenity}
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground">No specific amenities listed.</span>
              )}
            </div>
          </div>

          <div className="mb-12">
            <AvailabilityCalendar roomId={room.id} />
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Guest Reviews</h2>
            <div className="space-y-4 mb-8">
              {room.reviews && room.reviews.length > 0 ? (
                room.reviews.map((review) => (
                  <div key={review.id} className="bg-card border rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="font-bold">{review.user.name || 'Anonymous'}</div>
                      <div className="flex gap-1 text-primary">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-current" : "text-muted-foreground opacity-30"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{review.commentEn}"</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No reviews yet for this room.</p>
              )}
            </div>
            
            <div className="bg-card border rounded-2xl p-6">
              <ReviewForm roomId={room.id} />
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-[400px] shrink-0">
          <RoomBookingPanel room={room} />
        </div>
      </div>
    </main>
  );
}
