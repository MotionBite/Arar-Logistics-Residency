'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'

export async function updateUserProfile(data: { name: string, phone: string, nationality: string }) {
  try {
    const session = await auth()
    
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' }
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        phone: data.phone,
        nationality: data.nationality,
      }
    })

    revalidatePath('/dashboard/profile')
    
    return { success: true }
  } catch (error) {
    console.error('Failed to update profile:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function updatePassword(data: { currentPassword: string, newPassword: string }) {
  try {
    const session = await auth()
    
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || !user.passwordHash) {
      return { success: false, error: 'Cannot update password for this account. You may have logged in with Google.' }
    }

    const isValid = await bcrypt.compare(data.currentPassword, user.passwordHash)
    
    if (!isValid) {
      return { success: false, error: 'Incorrect current password' }
    }

    const newPasswordHash = await bcrypt.hash(data.newPassword, 10)

    await prisma.user.update({
      where: { id: session.user.id },
      data: { passwordHash: newPasswordHash }
    })

    return { success: true }
  } catch (error) {
    console.error('Failed to update password:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}
