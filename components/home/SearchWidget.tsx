'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useState } from 'react';
import { Calendar as CalendarIcon, Users, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function SearchWidget() {
  const t = useTranslations('SearchWidget');
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("1");
  const [roomType, setRoomType] = useState("all");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', format(checkIn, 'yyyy-MM-dd'));
    if (checkOut) params.set('checkOut', format(checkOut, 'yyyy-MM-dd'));
    if (guests && guests !== "1") params.set('guests', guests);
    if (roomType && roomType !== "all") params.set('type', roomType);
    if (email) params.set('email', email);
    
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-sm p-4 md:p-6 shadow-xl w-full max-w-[1100px] mx-auto transform translate-y-1/2 flex flex-col md:flex-row items-end gap-4 md:gap-6 border border-gray-100 font-sans">
      
      {/* E-mail */}
      <div className="flex-1 w-full">
        <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
          E-mail <Info size={12} className="text-gray-400" />
        </label>
        <input
          type="email"
          placeholder="Please enter your E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e82a5a]"
        />
      </div>

      {/* Room Type */}
      <div className="flex-1 w-full">
        <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
          Room Type <Info size={12} className="text-gray-400" />
        </label>
        <Select value={roomType} onValueChange={setRoomType}>
          <SelectTrigger className="w-full h-10 border-gray-200 text-sm focus:ring-[#e82a5a]">
            <SelectValue placeholder="Select a room" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rooms</SelectItem>
            <SelectItem value="single">Single Room</SelectItem>
            <SelectItem value="double">Double Room</SelectItem>
            <SelectItem value="suite">Suite</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Check-in */}
      <div className="flex-1 w-full">
        <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
          Check-in <Info size={12} className="text-gray-400" />
        </label>
        <Popover>
          <PopoverTrigger render={
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal h-10 border-gray-200 text-sm hover:bg-transparent",
                !checkIn && "text-muted-foreground"
              )}
            >
              {checkIn ? format(checkIn, "LLL dd, y") : <span>Check in</span>}
              <CalendarIcon className="h-4 w-4 text-[#e82a5a]" />
            </Button>
          } />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkIn}
              onSelect={setCheckIn}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Check-out */}
      <div className="flex-1 w-full">
        <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
          Check-out <Info size={12} className="text-gray-400" />
        </label>
        <Popover>
          <PopoverTrigger render={
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal h-10 border-gray-200 text-sm hover:bg-transparent",
                !checkOut && "text-muted-foreground"
              )}
            >
              {checkOut ? format(checkOut, "LLL dd, y") : <span>Check out</span>}
              <CalendarIcon className="h-4 w-4 text-[#e82a5a]" />
            </Button>
          } />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={checkOut}
              onSelect={setCheckOut}
              disabled={(date) => checkIn ? date <= checkIn : date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guests */}
      <div className="w-full md:w-28 flex flex-col justify-end h-full">
        <label className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
          Guests
        </label>
        <Select value={guests} onValueChange={(val) => setGuests(val || "1")}>
          <SelectTrigger className="w-full h-10 border-gray-200 text-sm focus:ring-[#e82a5a] justify-between px-3">
            <SelectValue placeholder="1" />
            <Users className="h-4 w-4 text-[#e82a5a]" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Button */}
      <div className="w-full md:w-auto h-10 flex items-center">
        <Button 
          onClick={handleSearch} 
          className="w-full md:w-32 h-10 bg-[#e82a5a] hover:bg-[#d6204c] text-white rounded-sm text-sm font-bold uppercase tracking-wider shadow-none"
        >
          BOOK NOW
        </Button>
      </div>

    </div>
  );
}
