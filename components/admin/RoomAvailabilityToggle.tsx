'use client'

import { useState } from 'react'
import { updateRoomAvailability } from '@/actions/admin'

interface RoomAvailabilityToggleProps {
  roomId: string
  isAvailable: boolean
}

export function RoomAvailabilityToggle({ roomId, isAvailable }: RoomAvailabilityToggleProps) {
  const [isPending, setIsPending] = useState(false)
  const [available, setAvailable] = useState(isAvailable)

  async function handleToggle() {
    setIsPending(true)
    const newStatus = !available
    setAvailable(newStatus) // optimistic update
    
    const res = await updateRoomAvailability(roomId, newStatus)
    
    if (!res.success) {
      setAvailable(!newStatus) // revert on failure
      alert('Failed to update room availability')
    }
    
    setIsPending(false)
  }

  return (
    <button
      disabled={isPending}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${available ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${available ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
}
