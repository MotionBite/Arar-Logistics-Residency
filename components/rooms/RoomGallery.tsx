'use client';

import { RoomImage } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export function RoomGallery({ images }: { images: RoomImage[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[50vh] min-h-[400px] bg-muted flex items-center justify-center rounded-3xl">
        <span className="text-muted-foreground">No Images Available</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full h-[50vh] min-h-[400px] rounded-3xl"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={img.id}>
            <Image src={img.url} alt="Room" fill priority={idx === 0} sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full h-24 rounded-xl cursor-pointer"
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="relative w-full h-full opacity-60 hover:opacity-100 transition-opacity [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:ring-2 [&.swiper-slide-thumb-active]:ring-primary rounded-xl overflow-hidden">
                <Image src={img.url} alt="Room thumbnail" fill sizes="25vw" className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
