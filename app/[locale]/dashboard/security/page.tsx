import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { SecurityForm } from '@/components/dashboard/SecurityForm'

export default async function SecurityPage() {
  const session = await auth()
  
  if (!session || !session.user) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  if (!user) {
    redirect('/login')
  }

  const t = await getTranslations('Dashboard')

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t('security') || 'Security & Password'}</h1>
      
      {!user.passwordHash ? (
        <div className="bg-blue-500/10 text-blue-700 p-6 rounded-3xl border border-blue-500/20 max-w-lg">
          <p>Your account is linked via Google. You do not have a local password to change.</p>
        </div>
      ) : (
        <SecurityForm />
      )}
    </div>
  )
}
