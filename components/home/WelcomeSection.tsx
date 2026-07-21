import Image from 'next/image';
import { Link } from '@/i18n/routing';

export function WelcomeSection() {
  return (
    <section className="bg-white dark:bg-background pt-40 pb-20 px-4 md:px-8 flex flex-col items-center relative z-0">
      <div className="max-w-5xl mx-auto text-center w-full">
        {/* Title */}
        <h2 className="text-3xl font-serif font-bold text-[#2a2a2a] dark:text-gray-100 uppercase tracking-[0.2em] mb-4">
          Welcome to Hotel
        </h2>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-6">
          <svg className="h-6 w-48 text-gray-700 dark:text-gray-400 fill-current opacity-80" viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 24c-2-3-6-5-10-6-15-2-30-2-45-1C30 18 15 20 0 24c15-8 30-14 45-14 15 0 30 5 45 7 4 1 7 3 10 7zm0 0c2-3 6-5 10-6 15-2 30-2 45-1 15 1 30 3 45 7-15-8-30-14-45-14-15 0-30 5-45 7-4 1-7 3-10 7zM100 24l-3-6 3-6 3 6-3 6zM100 12l-2-4 2-4 2 4-2 4z" />
            <path d="M100 18c-3-2-8-3-15-4-15-1-30-2-45 0-10 1-20 3-30 5 15-6 30-9 45-8 15 0 30 4 45 7zm0 0c3-2 8-3 15-4 15-1 30-2 45 0 10 1 20 3 30 5-15-6-30-9-45-8-15 0-30 4-45 7z" />
          </svg>
        </div>

        {/* Subtitle / Paragraph */}
        <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12">
          Experience the epitome of luxury and comfort at our exquisite hotel. Nestled in a breathtaking location, we offer world-class amenities, unparalleled service, and beautifully appointed rooms designed to make your stay truly unforgettable. Whether you are seeking a romantic getaway or a relaxing family vacation, our resort provides the perfect home away from home.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-12">
          <div className="relative aspect-square overflow-hidden group">
            <Image 
              src="/images/room_1.png" 
              alt="Hotel Room 1" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative aspect-square overflow-hidden group">
            <Image 
              src="/images/room_2.png" 
              alt="Hotel Room 2" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative aspect-square overflow-hidden group">
            <Image 
              src="/images/room_3.png" 
              alt="Hotel Room 3" 
              fill 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* View All Button */}
        <Link 
          href="/rooms"
          className="inline-block bg-[#ff4a5a] hover:bg-[#e63c4c] text-white px-10 py-3 rounded text-sm font-medium transition-colors shadow-md"
        >
          View All
        </Link>
      </div>
    </section>
  );
}
