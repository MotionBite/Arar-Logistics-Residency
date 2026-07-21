'use client';

import Image from 'next/image';
import { Room, RoomImage } from '@prisma/client';
import { Link } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { Users, BedDouble, Bath, Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type RoomWithImages = Room & { images: RoomImage[] };

export function RoomCard({ room }: { room: RoomWithImages }) {
  const t = useTranslations('Rooms');
  const locale = useLocale();
  const isAr = locale === 'ar';
  
  const name = isAr ? room.nameAr : room.nameEn;
  const desc = isAr ? room.descAr : room.descEn;

  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 relative h-full">
      
      {/* Favorite Button */}
      <button className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80 transition-colors">
        <Heart className="w-4 h-4 text-foreground" />
      </button>

      {room.isFeatured && (
        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full uppercase tracking-wide shadow-md">
          {t('featured') || 'Featured'}
        </div>
      )}

      {/* Image Gallery */}
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        {room.images.length > 0 ? (
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            className="w-full h-full [&_.swiper-pagination-bullet-active]:bg-primary"
          >
            {room.images.map((img) => (
              <SwiperSlide key={img.id}>
                <Image
                  src={img.url}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Image
            src={`/images/room_${(room.id.charCodeAt(room.id.length - 1) % 3) + 1 || 1}.png`}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        {/* Availability Badge */}
        {!room.isAvailable && (
          <div className="absolute inset-0 bg-background/60 z-10 flex items-center justify-center">
            <span className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-bold shadow-lg">
              {t('unavailable') || 'Booked'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-bold line-clamp-1">{name}</h3>
          <div className="text-right whitespace-nowrap">
            <span className="text-xl font-bold text-primary">{room.priceNightly} SAR</span>
            <span className="text-xs text-muted-foreground block">{t('perNight') || '/ night'}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {desc}
        </p>
        
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-6 bg-muted/30 p-3 rounded-lg">
          <span className="flex items-center gap-1.5" title={t('guests') || 'Guests'}>
            <Users className="w-4 h-4 text-primary" /> {room.capacity}
          </span>
          <span className="w-px h-4 bg-border"></span>
          <span className="flex items-center gap-1.5" title="Beds">
            <BedDouble className="w-4 h-4 text-primary" /> {room.bedCount}
          </span>
          <span className="w-px h-4 bg-border"></span>
          <span className="flex items-center gap-1.5" title="Baths">
            <Bath className="w-4 h-4 text-primary" /> {room.bathroomCount}
          </span>
        </div>
        
        <Link 
          href={`/rooms/${room.slug}`}
          className={cn(buttonVariants({ variant: room.isAvailable ? 'default' : 'secondary', size: 'lg' }), "w-full rounded-xl")}
        >
          {t('viewDetails') || 'View Details'}
        </Link>
      </div>
    </div>
  );
}
