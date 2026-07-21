'use server'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitReview(roomId: string, data: { rating: number, commentEn: string }) {
  try {
    const session = await auth()
    
    if (!session || !session.user) {
      return { success: false, error: 'You must be logged in to leave a review.' }
    }

    await prisma.review.create({
      data: {
        userId: session.user.id,
        roomId: roomId,
        rating: data.rating,
        commentEn: data.commentEn,
        commentAr: data.commentEn, // Mirroring for simplicity if they didn't provide Arabic
        isApproved: false // Requires admin approval
      }
    })

    revalidatePath(`/rooms/${roomId}`)
    
    return { success: true }
  } catch (error) {
    console.error('Failed to submit review:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}

export async function getRoomReviews(roomId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: { 
        roomId,
        isApproved: true
      },
      include: {
        user: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, data: reviews }
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return { success: false, error: 'Internal Server Error' }
  }
}
