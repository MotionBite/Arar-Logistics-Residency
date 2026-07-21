'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { getRooms } from '@/actions/rooms';
import { Link } from '@/i18n/routing';
import { Room } from '@prisma/client';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function FeaturedRooms() {
  const t = useTranslations('FeaturedRooms');
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    async function loadRooms() {
      const res = await getRooms();
      if (res.success && res.data) {
        setRooms(res.data.slice(0, 3)); // Only show top 3
      }
    }
    loadRooms();
  }, []);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#0f2441] dark:text-white mb-4 font-serif"
            >
              {t('title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-400 dark:text-gray-300 max-w-xl"
            >
              {t('subtitle')}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-6 md:mt-0"
          >
            <Link href="/rooms" className="text-[#e82a5a] font-medium hover:underline flex items-center gap-2">
              {t('viewAll')} &rarr;
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="rounded-2xl overflow-hidden bg-card border shadow-sm group flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                {room.images && room.images.length > 0 ? (
                  <Image 
                    src={room.images[0].url} 
                    alt={room.nameEn} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 z-10"
                  />
                ) : (
                  <Image 
                    src={`/images/room_${(idx % 3) + 1}.png`} 
                    alt={room.nameEn} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 z-10"
                  />
                )}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-[#e82a5a] z-20">
                  {room.priceNightly} SAR <span className="text-xs font-normal text-muted">/ {t('night')}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#0f2441] dark:text-white font-serif">{room.nameEn}</h3>
                </div>
                <p className="text-gray-400 dark:text-gray-300 line-clamp-2 mb-6 flex-1">{room.descEn}</p>
                <Link href={`/rooms/${room.slug}`} className={cn(buttonVariants({ variant: "outline", className: "w-full border-[#e82a5a] text-[#e82a5a] hover:bg-[#e82a5a] hover:text-white" }))}>
                  {t('bookNow')}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
