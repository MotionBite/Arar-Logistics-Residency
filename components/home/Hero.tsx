'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchWidget } from './SearchWidget';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const heroImages = [
  '/images/hero-bg.png',
  '/images/hero-bg-2.png',
  '/images/hero-bg-3.png',
  '/images/hero-bg-4.png',
  '/images/hero-bg-5.png'
];

export function Hero() {
  const t = useTranslations('HomePage');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-visible pb-32 md:pb-0 pt-20">
      {/* Background Image Carousel with Crossfade */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence>
          <motion.div 
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${heroImages[currentImageIndex]}')` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 text-center px-4 md:px-6 w-full max-w-5xl mx-auto flex flex-col items-center pt-24 md:pt-0 pointer-events-none">
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-white tracking-wide drop-shadow-md pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Welcome to Hotely
        </motion.h1>
        
        <motion.div 
          className="mt-6 flex items-center gap-4 text-white drop-shadow-md pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="hidden md:block h-[1px] w-12 bg-white/80"></div>
          <p className="text-sm md:text-lg font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase">
            THE PLACE WHERE YOU LOOKING TO
          </p>
          <div className="hidden md:block h-[1px] w-12 bg-white/80"></div>
        </motion.div>
        
        <motion.div
          className="mt-10 mb-24 md:mb-32 pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link 
            href="/rooms" 
            className="group flex items-center gap-3 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-sm text-sm font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            EXPLORE NOW
            <ArrowRight size={16} className="transition-transform text-[#e82a5a] group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute top-[40%] md:top-1/2 left-4 md:left-12 transform -translate-y-1/2 z-20 hidden sm:block">
        <button 
          onClick={prevImage}
          className="w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        >
          <ChevronLeft size={24} className="text-gray-800" />
        </button>
      </div>
      <div className="absolute top-[40%] md:top-1/2 right-4 md:right-12 transform -translate-y-1/2 z-20 hidden sm:block">
        <button 
          onClick={nextImage}
          className="w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
        >
          <ChevronRight size={24} className="text-gray-800" />
        </button>
      </div>

      {/* Floating Search Widget */}
      <div className="absolute bottom-0 left-0 w-full z-20 px-4 md:px-6 flex justify-center">
        <motion.div
          className="w-full max-w-6xl drop-shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <SearchWidget />
        </motion.div>
      </div>
    </section>
  );
}
