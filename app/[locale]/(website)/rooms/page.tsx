import { getRooms } from '@/actions/rooms';
import { RoomCard } from '@/components/rooms/RoomCard';
import { RoomFilters } from '@/components/rooms/RoomFilters';
import { getTranslations } from 'next-intl/server';

export default async function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations('Rooms');
  const sp = await searchParams;
  
  const type = typeof sp.type === 'string' ? sp.type : undefined;
  const guests = typeof sp.guests === 'string' ? parseInt(sp.guests) : undefined;
  
  const res = await getRooms({ type, guests });
  const rooms = res.success && res.data ? res.data : [];

  return (
    <main className="flex min-h-screen flex-col pt-40 pb-24 px-4 w-full max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-serif">{t('title') || 'Our Rooms'}</h1>
        <p className="text-xl text-muted-foreground">{t('subtitle') || 'Discover the perfect space for your stay.'}</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <RoomFilters />
        </aside>
        
        <section className="w-full lg:w-3/4">
          {rooms.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-2xl border border-border">
              {t('noRooms') || 'No rooms found matching your criteria.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
