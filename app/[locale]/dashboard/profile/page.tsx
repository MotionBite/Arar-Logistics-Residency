import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { ProfileForm } from '@/components/dashboard/ProfileForm'

export default async function ProfilePage() {
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
      <h1 className="text-3xl font-bold mb-8">{t('profile') || 'Profile Settings'}</h1>
      <ProfileForm user={user} />
    </div>
  )
}
