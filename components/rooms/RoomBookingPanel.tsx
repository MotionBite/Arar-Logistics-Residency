'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Room } from '@prisma/client';

export function RoomBookingPanel({ room }: { room: Room }) {
  const t = useTranslations('RoomDetail');
  const router = useRouter();

  const handleBook = () => {
    router.push(`/booking?roomId=${room.id}`);
  };

  return (
    <div className="bg-card border-2 border-primary/20 rounded-3xl p-8 shadow-xl sticky top-24">
      <h3 className="text-2xl font-bold mb-6">{t('pricingTitle') || 'Reservation'}</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
          <span className="font-semibold">{t('nightly') || 'Nightly'}</span>
          <span className="text-xl font-bold text-primary">{room.priceNightly} SAR</span>
        </div>
        
        {room.priceWeekly && room.priceWeekly > 0 && (
          <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
            <span className="font-semibold">{t('weekly') || 'Weekly'}</span>
            <span className="text-xl font-bold text-primary">{room.priceWeekly} SAR</span>
          </div>
        )}
        
        {room.priceMonthly && room.priceMonthly > 0 && (
          <div className="flex justify-between items-center p-4 bg-background rounded-xl border border-border">
            <span className="font-semibold">{t('monthly') || 'Monthly'}</span>
            <span className="text-xl font-bold text-primary">{room.priceMonthly} SAR</span>
          </div>
        )}
      </div>
      
      <Button 
        onClick={handleBook}
        disabled={!room.isAvailable}
        className="w-full h-14 text-lg rounded-xl shadow-lg hover:scale-105 transition-transform font-bold"
      >
        {room.isAvailable ? (t('bookNow') || 'Book This Room') : 'Currently Unavailable'}
      </Button>

      <div className="mt-6 text-sm text-muted-foreground text-center space-y-2">
        <p>{t('cancellation') || 'Free cancellation up to 24 hours before check-in.'}</p>
      </div>
    </div>
  );
}
