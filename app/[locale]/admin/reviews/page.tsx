import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import { ReviewApprovalToggle } from '@/components/admin/ReviewApprovalToggle'

export default async function AdminReviewsPage() {
  const t = await getTranslations('Admin')
  
  const reviews = await prisma.review.findMany({
    include: {
      user: true,
      room: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t('reviews') || 'Reviews Moderation'}</h1>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b text-sm">
                <th className="p-4 font-medium">Guest</th>
                <th className="p-4 font-medium">Room</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium max-w-md">Comment</th>
                <th className="p-4 font-medium">Approved</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-semibold">{review.user.name || 'Anonymous'}</td>
                  <td className="p-4 text-sm">{review.room.nameEn}</td>
                  <td className="p-4 text-sm font-bold text-yellow-500">{review.rating} / 5</td>
                  <td className="p-4 text-sm text-muted-foreground max-w-md truncate">{review.commentEn}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <ReviewApprovalToggle reviewId={review.id} isApproved={review.isApproved} />
                      <span className={`text-xs font-semibold ${review.isApproved ? 'text-green-600' : 'text-orange-500'}`}>
                        {review.isApproved ? 'Live' : 'Pending'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
