'use client'

import { useState } from 'react'
import { useRouter } from '@/i18n/routing'
import { createRoom } from '@/actions/admin'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function RoomForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    const res = await createRoom(data)
    
    if (res.success) {
      router.push('/admin/rooms')
    } else {
      setError(res.error || 'Failed to create room')
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl bg-card p-8 border rounded-3xl shadow-sm">
      {error && <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-xl">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-semibold">Room Name (English)</label>
          <input name="nameEn" required className="w-full p-3 rounded-xl border bg-background" placeholder="Deluxe Suite" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Room Name (Arabic)</label>
          <input name="nameAr" required className="w-full p-3 rounded-xl border bg-background text-right" placeholder="جناح ديلوكس" dir="rtl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-semibold">Description (English)</label>
          <textarea name="descEn" required rows={4} className="w-full p-3 rounded-xl border bg-background resize-none" placeholder="A beautiful suite..." />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Description (Arabic)</label>
          <textarea name="descAr" required rows={4} className="w-full p-3 rounded-xl border bg-background resize-none text-right" placeholder="جناح جميل..." dir="rtl" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-semibold">Type</label>
          <select name="type" className="w-full p-3 rounded-xl border bg-background">
            <option value="STANDARD">Standard</option>
            <option value="DELUXE">Deluxe</option>
            <option value="SUITE">Suite</option>
            <option value="FAMILY">Family</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Capacity</label>
          <input name="capacity" type="number" required min={1} className="w-full p-3 rounded-xl border bg-background" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Floor</label>
          <input name="floorNumber" type="number" required min={1} className="w-full p-3 rounded-xl border bg-background" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Nightly Price ($)</label>
          <input name="priceNightly" type="number" required min={0} step="0.01" className="w-full p-3 rounded-xl border bg-background" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <label className="text-sm font-semibold">Weekly Price (SAR)</label>
          <input name="priceWeekly" type="number" required min={0} step="0.01" className="w-full p-3 rounded-xl border bg-background" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Monthly Price (SAR)</label>
          <input name="priceMonthly" type="number" required min={0} step="0.01" className="w-full p-3 rounded-xl border bg-background" />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-semibold">Primary Image URL</label>
          <input name="imageUrl" type="url" required className="w-full p-3 rounded-xl border bg-background" placeholder="https://example.com/image.jpg" />
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button disabled={isPending} type="submit" className={cn(buttonVariants({ size: 'lg' }), "px-12 py-6 rounded-xl")}>
          {isPending ? 'Creating Room...' : 'Create Room'}
        </button>
      </div>
    </form>
  )
}
