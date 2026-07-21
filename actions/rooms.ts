'use server'

import { prisma } from '@/lib/prisma'
import { Room } from '@prisma/client'

export async function getRooms(filters?: { 
  type?: string; 
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
}) {
  try {
    const where: any = { isAvailable: true };
    
    if (filters?.type && filters.type !== 'all') {
      where.type = filters.type.toUpperCase();
    }
    
    if (filters?.guests) {
      where.capacity = { gte: filters.guests };
    }
    
    if (filters?.minPrice || filters?.maxPrice) {
      where.priceNightly = {};
      if (filters.minPrice) where.priceNightly.gte = filters.minPrice;
      if (filters.maxPrice) where.priceNightly.lte = filters.maxPrice;
    }

    const rooms = await prisma.room.findMany({
      where,
      include: {
        images: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return { success: true, data: rooms };
  } catch (error) {
    console.error('Failed to fetch rooms', error);
    return { success: false, error: 'Failed to fetch rooms' };
  }
}

export async function getRoomById(id: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        images: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    return { success: true, data: room }
  } catch (error) {
    console.error('Failed to fetch room details', error)
    return { success: false, error: 'Failed to fetch room details' }
  }
}

export async function getRoomBySlug(slug: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { slug },
      include: {
        images: true,
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
    return { success: true, data: room }
  } catch (error) {
    console.error('Failed to fetch room details by slug', error)
    return { success: false, error: 'Failed to fetch room details by slug' }
  }
}
