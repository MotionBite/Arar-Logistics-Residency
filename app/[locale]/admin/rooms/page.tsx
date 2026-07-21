import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { RoomAvailabilityToggle } from '@/components/admin/RoomAvailabilityToggle';

export default async function AdminRoomsPage() {
  const t = await getTranslations('Admin');
  const rooms = await prisma.room.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('rooms') || 'Rooms Management'}</h1>
          <p className="text-muted-foreground">Manage all rooms and their availability.</p>
        </div>
        <Link 
          href="/admin/rooms/new" 
          className={cn(buttonVariants(), "gap-2")}
        >
          <Plus size={18} />
          {t('addRoom') || 'Add Room'}
        </Link>
      </div>

      <div className="bg-card rounded-2xl border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4">Room Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Capacity</th>
                <th className="px-6 py-4">Nightly Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-semibold">{room.nameEn}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-secondary rounded-md text-xs font-semibold">{room.type}</span>
                  </td>
                  <td className="px-6 py-4">{room.capacity} Guests</td>
                  <td className="px-6 py-4">{room.priceNightly} SAR</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <RoomAvailabilityToggle roomId={room.id} isAvailable={room.isAvailable} />
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-bold",
                        room.isAvailable ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-destructive/10 text-destructive"
                      )}>
                        {room.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/rooms/${room.id}/edit`} className="inline-flex items-center justify-center p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors">
                      <Edit size={16} />
                    </Link>
                    <button className="inline-flex items-center justify-center p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No rooms found. Click "Add Room" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
