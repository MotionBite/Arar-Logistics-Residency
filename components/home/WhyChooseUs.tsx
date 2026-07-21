'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';

const galleryImages = [
  '/images/gallery_1.png',
  '/images/gallery_2.png',
  '/images/gallery_3.png',
  '/images/gallery_4.png',
  '/images/gallery_5.png',
  '/images/hero-bg-4.png',
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#2a2a2a] py-20 px-4 flex flex-col items-center">
      <div className="max-w-6xl mx-auto text-center w-full">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white uppercase tracking-widest mb-4">
          Why To Choose Us?
        </h2>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-6">
          <svg className="h-6 w-48 text-gray-300 fill-current opacity-80" viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 24c-2-3-6-5-10-6-15-2-30-2-45-1C30 18 15 20 0 24c15-8 30-14 45-14 15 0 30 5 45 7 4 1 7 3 10 7zm0 0c2-3 6-5 10-6 15-2 30-2 45-1 15 1 30 3 45 7-15-8-30-14-45-14-15 0-30 5-45 7-4 1-7 3-10 7zM100 24l-3-6 3-6 3 6-3 6zM100 12l-2-4 2-4 2 4-2 4z" />
            <path d="M100 18c-3-2-8-3-15-4-15-1-30-2-45 0-10 1-20 3-30 5 15-6 30-9 45-8 15 0 30 4 45 7zm0 0c3-2 8-3 15-4 15-1 30-2 45 0 10 1 20 3 30 5-15-6-30-9-45-8-15 0-30 4-45 7z" />
          </svg>
        </div>

        {/* Categories Menu */}
        <div className="flex items-center justify-center gap-4 md:gap-8 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-10">
          <span className="text-white cursor-pointer">All</span>
          <span className="hover:text-white cursor-pointer transition-colors">Desert</span>
          <span className="hover:text-white cursor-pointer transition-colors">Coffee</span>
          <span className="hover:text-white cursor-pointer transition-colors">Catering</span>
          <span className="hover:text-white cursor-pointer transition-colors">Services</span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-12">
          {galleryImages.map((src, index) => (
            <div key={index} className="relative aspect-[4/3] w-full overflow-hidden group">
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Link 
          href="/gallery"
          className="inline-block bg-[#ff4a5a] hover:bg-[#e63c4c] text-white px-10 py-3 rounded text-sm font-medium transition-colors shadow-md"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
