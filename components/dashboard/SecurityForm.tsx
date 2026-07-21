'use client'

import { useState } from 'react'
import { updatePassword } from '@/actions/user'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SecurityForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.')
      setIsPending(false)
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.')
      setIsPending(false)
      return
    }

    const res = await updatePassword({ currentPassword, newPassword })
    
    if (res.success) {
      setMessage('Password updated successfully!')
      // reset form
      ;(e.target as HTMLFormElement).reset()
    } else {
      setError(res.error || 'Failed to update password')
    }
    
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg bg-card p-6 border rounded-3xl shadow-sm">
      {message && <div className="p-3 text-sm text-green-700 bg-green-500/10 rounded-lg">{message}</div>}
      {error && <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium mb-1">Current Password</label>
        <input name="currentPassword" type="password" required className="w-full p-3 rounded-xl border bg-background" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input name="newPassword" type="password" required minLength={6} className="w-full p-3 rounded-xl border bg-background" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
        <input name="confirmPassword" type="password" required minLength={6} className="w-full p-3 rounded-xl border bg-background" />
      </div>
      
      <button disabled={isPending} type="submit" className={cn(buttonVariants({ size: 'lg' }), "w-full rounded-xl py-6")}>
        {isPending ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  )
}
