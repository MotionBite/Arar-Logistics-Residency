'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Room } from '@prisma/client';
import { createBooking } from '@/actions/booking';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { useSession } from 'next-auth/react';

const schema = z.object({
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1).max(10),
});

type FormData = z.infer<typeof schema>;

export function BookingForm({ room }: { room: Room }) {
  const { data: session, status } = useSession();
  const t = useTranslations('Booking');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [promoCode, setPromoCode] = useState('');
  const [discountPct, setDiscountPct] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      guests: 1,
    }
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');
  
  // Basic calculation (assuming 1 night minimum for simplicity if dates are selected)
  let nights = 0;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  const basePrice = nights > 0 ? nights * room.priceNightly : room.priceNightly;
  const totalPrice = discountPct > 0 ? basePrice * (1 - discountPct / 100) : basePrice;

  const handleVerifyCoupon = async () => {
    if (!promoCode) return;
    setIsVerifying(true);
    setPromoError('');
    
    // Import dynamically to avoid top-level import conflict if needed, or just import at top.
    const { verifyCoupon } = await import('@/actions/booking');
    const res = await verifyCoupon(promoCode);
    
    if (res.success && res.data) {
      setDiscountPct(res.data.discountPct);
    } else {
      setDiscountPct(0);
      setPromoError(res.error || 'Invalid code');
    }
    setIsVerifying(false);
  };

  const onSubmit = async (data: FormData) => {
    if (status !== 'authenticated') {
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    setError('');

    const res = await createBooking({
      roomId: room.id,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      bookingType: 'NIGHTLY',
      guests: data.guests,
      totalPrice: basePrice, // Pass basePrice, backend recalculates based on coupon
      couponCode: discountPct > 0 ? promoCode : undefined,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } else {
      setError(res.error || 'Failed to create booking');
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500 text-green-700 p-8 rounded-2xl text-center">
        <h3 className="text-2xl font-bold mb-2">{t('success') || 'Booking created successfully!'}</h3>
        <p>You will be redirected to the home page shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="text-destructive bg-destructive/10 p-4 rounded-lg">{error}</div>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('checkIn') || 'Check In'}</label>
          <input 
            type="date" 
            {...register('checkIn')} 
            className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          {errors.checkIn && <span className="text-xs text-destructive">{errors.checkIn.message}</span>}
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">{t('checkOut') || 'Check Out'}</label>
          <input 
            type="date" 
            {...register('checkOut')} 
            className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          {errors.checkOut && <span className="text-xs text-destructive">{errors.checkOut.message}</span>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t('guests') || 'Guests'}</label>
        <input 
          type="number" 
          min="1"
          max={room.capacity}
          {...register('guests', { valueAsNumber: true })} 
          className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        {errors.guests && <span className="text-xs text-destructive">{errors.guests.message}</span>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Promo Code (Optional)</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={discountPct > 0}
            placeholder="SUMMER2026"
            className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
          />
          {discountPct === 0 ? (
            <button 
              type="button"
              onClick={handleVerifyCoupon}
              disabled={isVerifying || !promoCode}
              className="px-4 h-12 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              Apply
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => { setDiscountPct(0); setPromoCode(''); }}
              className="px-4 h-12 bg-destructive/10 text-destructive rounded-md text-sm font-medium hover:bg-destructive/20 transition-colors"
            >
              Remove
            </button>
          )}
        </div>
        {promoError && <span className="text-xs text-destructive">{promoError}</span>}
        {discountPct > 0 && <span className="text-xs text-green-600">Promo applied: {discountPct}% off!</span>}
      </div>

      <div className="bg-muted p-6 rounded-xl space-y-2 my-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Rate</span>
          <span className="font-medium">${room.priceNightly} / night</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Nights</span>
          <span className="font-medium">{nights > 0 ? nights : 1}</span>
        </div>
        {discountPct > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountPct}%)</span>
            <span>-${(basePrice * (discountPct / 100)).toFixed(2)}</span>
          </div>
        )}
        <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={cn(buttonVariants({ size: 'lg' }), "w-full text-lg py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform disabled:opacity-50")}
      >
        {isSubmitting ? 'Processing...' : (t('confirm') || 'Confirm Booking')}
      </button>
    </form>
  );
}
