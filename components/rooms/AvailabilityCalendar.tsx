'use client';

import { useTranslations } from 'next-intl';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

export function AvailabilityCalendar({ roomId }: { roomId: string }) {
  const t = useTranslations('RoomDetail');
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // In a real app, this would fetch from /api/rooms/[roomId]/availability
  useEffect(() => {
    // Mocking some booked dates for demo purposes
    const mockDates = [
      new Date(new Date().setDate(new Date().getDate() + 3)),
      new Date(new Date().setDate(new Date().getDate() + 4)),
      new Date(new Date().setDate(new Date().getDate() + 5)),
      new Date(new Date().setDate(new Date().getDate() + 10)),
    ];
    setBookedDates(mockDates);
    setIsLoading(false);
  }, [roomId]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm w-full">
      <h3 className="text-2xl font-bold mb-6">{t('availability') || 'Availability Calendar'}</h3>
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="bg-background rounded-xl p-2 inline-block">
          <Calendar
            mode="multiple"
            selected={bookedDates}
            disabled={[{ before: new Date() }, ...bookedDates]}
            className="pointer-events-none"
            modifiers={{
              booked: bookedDates,
            }}
            modifiersStyles={{
              booked: {
                textDecoration: 'line-through',
                color: 'var(--destructive)',
                backgroundColor: 'var(--destructive-foreground)',
              }
            }}
          />
        </div>
        <div className="flex flex-col gap-4 text-sm mt-4 md:mt-0">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-background border"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-destructive/10 text-destructive line-through flex items-center justify-center border-destructive border">
               
            </div>
            <span>Booked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
