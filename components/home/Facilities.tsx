'use client';

import { useTranslations } from 'next-intl';
import { Wifi, Car, Wind, Utensils, Shirt, Users, PlaneTakeoff, Heart, Clock, ShieldCheck } from 'lucide-react';

export function Facilities() {
  const t = useTranslations('Facilities');
  
  const facilities = [
    { icon: <Wifi className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('wifi') },
    { icon: <Car className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('parking') },
    { icon: <Wind className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('ac') },
    { icon: <Utensils className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('restaurant') },
    { icon: <Shirt className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('laundry') },
    { icon: <Users className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('family') },
    { icon: <PlaneTakeoff className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('airport') },
    { icon: <Heart className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('prayer') },
    { icon: <Clock className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('reception') },
    { icon: <ShieldCheck className="w-8 h-8 mb-4 text-[#e82a5a]" />, label: t('security') },
  ];

  return (
    <section 
      className="py-24 relative bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/gallery_3.png")' }}
    >
      {/* Light overlay to ensure text remains readable but image is visible */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/80"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#0f2441] dark:text-white font-serif">{t('title')}</h2>
          <p className="text-lg text-gray-400 dark:text-gray-300">{t('subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {facilities.map((fac, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center justify-center p-6 bg-background rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              {fac.icon}
              <span className="font-medium text-center text-sm md:text-base text-gray-700 dark:text-gray-300 group-hover:text-[#e82a5a] dark:group-hover:text-[#e82a5a] transition-colors">{fac.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
