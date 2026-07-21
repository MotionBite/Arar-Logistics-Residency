import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://arar-residency.com';

  const rooms = await prisma.room.findMany({
    where: { isAvailable: true },
    select: { slug: true, updatedAt: true },
  });

  const roomUrls = rooms.map((room) => ({
    url: `${baseUrl}/en/rooms/${room.slug}`,
    lastModified: room.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const arRoomUrls = rooms.map((room) => ({
    url: `${baseUrl}/ar/rooms/${room.slug}`,
    lastModified: room.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/rooms',
    '/about',
    '/contact',
    '/gallery',
    '/offers',
    '/faq',
  ];

  const staticUrls = staticPages.flatMap((page) => [
    {
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.7,
    },
    {
      url: `${baseUrl}/ar${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1.0 : 0.7,
    }
  ]);

  return [...staticUrls, ...roomUrls, ...arRoomUrls];
}
