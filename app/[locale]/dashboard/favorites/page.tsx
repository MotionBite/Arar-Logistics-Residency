import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { RoomCard } from '@/components/rooms/RoomCard';

export default async function DashboardFavoritesPage() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect('/login');
  }

  const t = await getTranslations('Dashboard');

  const favorites = await prisma.favoriteRoom.findMany({
    where: { userId: session.user.id },
    include: {
      room: {
        include: { images: true }
      }
    },
    orderBy: { id: 'desc' }
  });

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t('favorites') || 'Favorite Rooms'}</h1>
      
      {favorites.length === 0 ? (
        <div className="bg-card p-12 text-center rounded-3xl border">
          <p className="text-muted-foreground text-lg">You have not saved any rooms to your favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {favorites.map((fav) => (
            <RoomCard key={fav.roomId} room={fav.room} />
          ))}
        </div>
      )}
    </div>
  );
}
