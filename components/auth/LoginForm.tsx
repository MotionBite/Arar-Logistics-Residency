'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/actions/auth'
import { Link } from '@/i18n/routing'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    
    const res = await loginAction(formData)
    if (!res.success) {
      setError(res.error || 'Failed to login')
      setIsPending(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card border rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
      {error && <div className="p-3 mb-4 text-sm text-destructive bg-destructive/10 rounded-lg">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input name="email" type="email" required className="w-full p-3 rounded-xl border bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input name="password" type="password" required className="w-full p-3 rounded-xl border bg-background" />
        </div>
        <button disabled={isPending} type="submit" className={cn(buttonVariants({ size: 'lg' }), "w-full rounded-xl py-6")}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account? <Link href="/register" className="text-primary hover:underline">Sign up</Link>
      </div>
    </div>
  )
}
