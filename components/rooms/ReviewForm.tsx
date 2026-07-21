'use client'

import { useState } from 'react'
import { submitReview } from '@/actions/reviews'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'

export function ReviewForm({ roomId }: { roomId: string }) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const commentEn = formData.get('comment') as string
    
    if (commentEn.length < 10) {
      setError('Please provide a slightly longer review (at least 10 characters).')
      setIsPending(false)
      return
    }

    const res = await submitReview(roomId, { rating, commentEn })
    
    if (res.success) {
      setMessage('Thank you! Your review has been submitted and is pending approval.')
      ;(e.target as HTMLFormElement).reset()
    } else {
      setError(res.error || 'Failed to submit review')
    }
    
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 border rounded-3xl shadow-sm mt-12">
      <h3 className="text-2xl font-bold">Leave a Review</h3>
      
      {message && <div className="p-4 text-sm text-green-700 bg-green-500/10 rounded-xl">{message}</div>}
      {error && <div className="p-4 text-sm text-destructive bg-destructive/10 rounded-xl">{error}</div>}
      
      <div className="space-y-2">
        <label className="block text-sm font-medium">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <Star 
                size={32} 
                className={cn("transition-colors", (hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-muted")}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Your Experience</label>
        <textarea 
          name="comment" 
          required 
          rows={4} 
          className="w-full p-4 rounded-xl border bg-background resize-none focus:ring-2 focus:ring-primary/50" 
          placeholder="Tell us about your stay..." 
        />
      </div>
      
      <button disabled={isPending} type="submit" className={cn(buttonVariants({ size: 'lg' }), "px-8 py-6 rounded-xl")}>
        {isPending ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
