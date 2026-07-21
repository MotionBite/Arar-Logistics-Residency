'use client';

import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

export function ReviewsCarousel() {
  const t = useTranslations('Reviews');
  
  const reviews = [
    {
      name: "Ahmed Al-Saud",
      rating: 5,
      comment: "Exceptional stay. The rooms are incredibly spacious and the staff goes above and beyond. Will definitely return.",
      date: "October 2023"
    },
    {
      name: "Sarah Jenkins",
      rating: 5,
      comment: "The perfect balance of luxury and comfort. The monthly package made my business trip so much more manageable.",
      date: "November 2023"
    },
    {
      name: "Omar Tariq",
      rating: 4,
      comment: "Great location and excellent facilities. The wifi is blazing fast which is exactly what I needed for remote work.",
      date: "December 2023"
    },
    {
      name: "Fatima Noor",
      rating: 5,
      comment: "We booked the family suite and it exceeded all expectations. Beautiful design and spotlessly clean.",
      date: "January 2024"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#e82a5a]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0f2441] dark:text-white font-serif">{t('title')}</h2>
          <p className="text-lg text-gray-400 dark:text-gray-300">{t('subtitle')}</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            pagination={{ clickable: true, dynamicBullets: true }}
            className="pb-16"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx} className="!h-auto flex">
                <div className="bg-white dark:bg-card w-full rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-border flex flex-col relative group hover:shadow-md transition-shadow">
                  <Quote className="absolute top-6 right-6 w-12 h-12 text-[#e82a5a]/10 group-hover:text-[#e82a5a]/20 transition-colors" />
                  
                  <div className="flex gap-1 mb-6 text-[#e82a5a]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-200 font-serif text-lg flex-grow mb-8 relative z-10 italic">
                    "{review.comment}"
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 dark:border-border">
                    <p className="font-bold text-[#0f2441] dark:text-white">{review.name}</p>
                    <p className="text-sm text-gray-400 dark:text-gray-300">{review.date}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
