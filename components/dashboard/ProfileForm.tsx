'use client'

import { useState } from 'react'
import { updateUserProfile } from '@/actions/user'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProfileFormProps {
  user: {
    name: string | null
    phone: string | null
    nationality: string | null
  }
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const nationality = formData.get('nationality') as string
    
    const res = await updateUserProfile({ name, phone, nationality })
    
    if (res.success) {
      setMessage('Profile updated successfully!')
    } else {
      setError(res.error || 'Failed to update profile')
    }
    
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg bg-card p-6 border rounded-3xl shadow-sm">
      {message && <div className="p-3 text-sm text-green-700 bg-green-500/10 rounded-lg">{message}</div>}
      {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input name="name" type="text" defaultValue={user.name || ''} className="w-full p-3 rounded-xl border bg-background" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input name="phone" type="tel" defaultValue={user.phone || ''} className="w-full p-3 rounded-xl border bg-background" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nationality</label>
        <input name="nationality" type="text" defaultValue={user.nationality || ''} className="w-full p-3 rounded-xl border bg-background" />
      </div>
      
      <button disabled={isPending} type="submit" className={cn(buttonVariants({ size: 'lg' }), "w-full rounded-xl py-6")}>
        {isPending ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  )
}
