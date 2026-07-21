import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function GalleryPage() {
  // We'll fetch all room images as our gallery for now.
  const rooms = await prisma.room.findMany({
    include: { images: true }
  });

  const images = rooms.flatMap(room => room.images.map(img => ({
    url: img.url,
    alt: room.nameEn,
    id: img.id
  })));

  return (
    <main className="flex min-h-screen flex-col pt-40 pb-24 px-4 w-full max-w-7xl mx-auto space-y-16">
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif">Our Gallery</h1>
        <p className="text-xl text-muted-foreground">
          Take a visual journey through our luxurious spaces and world-class amenities.
        </p>
      </section>

      {images.length === 0 ? (
        <div className="text-center p-12 bg-muted/50 rounded-3xl border border-dashed">
          <p className="text-xl text-muted-foreground">Gallery is currently empty. Check back soon!</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((image) => (
            <div key={image.id} className="relative rounded-3xl overflow-hidden shadow-sm group break-inside-avoid">
              <div className="aspect-[4/3] w-full relative">
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-medium text-lg drop-shadow-md">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
