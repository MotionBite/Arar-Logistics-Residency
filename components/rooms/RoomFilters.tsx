'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Users, FilterX } from 'lucide-react';

export function RoomFilters() {
  const t = useTranslations('Rooms');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [type, setType] = useState(searchParams.get('type') || 'all');
  const [guests, setGuests] = useState(searchParams.get('guests') || '');

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== 'all') {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleTypeChange = (value: string) => {
    setType(value);
    router.push(`${pathname}?${createQueryString('type', value)}`, { scroll: false });
  };

  const handleGuestsChange = (value: string) => {
    setGuests(value);
    router.push(`${pathname}?${createQueryString('guests', value)}`, { scroll: false });
  };

  const clearFilters = () => {
    setType('all');
    setGuests('');
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border sticky top-24 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">{t('filters') || 'Filters'}</h3>
        {(type !== 'all' || guests !== '') && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground h-8 px-2 text-xs">
            <FilterX className="w-3 h-3 mr-1" />
            {t('clearFilters') || 'Clear'}
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold">{t('roomType') || 'Room Type'}</label>
          <Select value={type} onValueChange={(val) => handleTypeChange(val || '')}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Type</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="deluxe">Deluxe</SelectItem>
              <SelectItem value="suite">Suite</SelectItem>
              <SelectItem value="family">Family</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold">{t('guests') || 'Guests'}</label>
          <Select value={guests} onValueChange={(val) => handleGuestsChange(val || '')}>
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Any capacity" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any capacity</SelectItem>
              <SelectItem value="1">1 Person</SelectItem>
              <SelectItem value="2">2 People</SelectItem>
              <SelectItem value="3">3 People</SelectItem>
              <SelectItem value="4">4 People</SelectItem>
              <SelectItem value="5">5+ People</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Placeholder for price range slider (can be added later) */}
      </div>
    </div>
  );
}
