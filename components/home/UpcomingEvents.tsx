'use client';

import Image from 'next/image';

const events = [
  {
    day: '25',
    month: 'APRIL',
    image: '/images/gallery_2.png',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    day: '22',
    month: 'JUNE',
    image: '/images/gallery_3.png',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    day: '15',
    month: 'MAY',
    image: '/images/hero-bg-5.png',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  }
];

export function UpcomingEvents() {
  return (
    <section className="bg-white dark:bg-background py-24 px-4 flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mb-1 uppercase tracking-wide">Upcoming</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#0f2441] dark:text-white font-bold">
            Events
          </h2>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center mb-12">
          <svg className="h-6 w-48 text-gray-700 dark:text-gray-400 fill-current opacity-70" viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 24c-2-3-6-5-10-6-15-2-30-2-45-1C30 18 15 20 0 24c15-8 30-14 45-14 15 0 30 5 45 7 4 1 7 3 10 7zm0 0c2-3 6-5 10-6 15-2 30-2 45-1 15 1 30 3 45 7-15-8-30-14-45-14-15 0-30 5-45 7-4 1-7 3-10 7zM100 24l-3-6 3-6 3 6-3 6zM100 12l-2-4 2-4 2 4-2 4z" />
            <path d="M100 18c-3-2-8-3-15-4-15-1-30-2-45 0-10 1-20 3-30 5 15-6 30-9 45-8 15 0 30 4 45 7zm0 0c3-2 8-3 15-4 15-1 30-2 45 0 10 1 20 3 30 5-15-6-30-9-45-8-15 0-30 4-45 7z" />
          </svg>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div key={index} className="bg-white dark:bg-card border border-gray-100 dark:border-border shadow-sm hover:shadow-md transition-shadow flex flex-col group overflow-hidden">
              {/* Top Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={event.image}
                  alt={`Event ${event.month}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Bottom Content */}
              <div className="flex h-28">
                {/* Red Date Box */}
                <div className="w-24 bg-[#e82a5a] text-white flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-3xl font-bold leading-none mb-1">{event.day}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold">{event.month}</span>
                </div>
                {/* Description Box */}
                <div className="p-4 flex items-center bg-white dark:bg-card">
                  <p className="text-sm text-gray-500 dark:text-gray-300 leading-relaxed">
                    {event.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
