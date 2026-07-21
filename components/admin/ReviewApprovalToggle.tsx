'use client'

import { useState } from 'react'
import { updateReviewStatus } from '@/actions/admin'

interface ReviewApprovalToggleProps {
  reviewId: string
  isApproved: boolean
}

export function ReviewApprovalToggle({ reviewId, isApproved }: ReviewApprovalToggleProps) {
  const [isPending, setIsPending] = useState(false)
  const [approved, setApproved] = useState(isApproved)

  async function handleToggle() {
    setIsPending(true)
    const newStatus = !approved
    setApproved(newStatus)
    
    const res = await updateReviewStatus(reviewId, newStatus)
    
    if (!res.success) {
      setApproved(!newStatus)
      alert('Failed to update review status')
    }
    
    setIsPending(false)
  }

  return (
    <button
      disabled={isPending}
      onClick={handleToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${approved ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${approved ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  )
}
