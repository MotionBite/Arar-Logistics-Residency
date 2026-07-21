import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'
import { Tag } from 'lucide-react'

export default async function OffersPage() {
  const t = await getTranslations('Navbar')
  
  const coupons = await prisma.coupon.findMany({
    where: {
      isActive: true,
      expiresAt: { gt: new Date() }
    },
    orderBy: { discountPct: 'desc' }
  })

  // Filter out fully used coupons
  const activeCoupons = coupons.filter(c => c.usedCount < c.maxUses)

  return (
    <main className="flex min-h-screen flex-col pt-40 pb-24 px-4 w-full max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary font-serif">Special Offers & Promotions</h1>
        <p className="text-xl text-muted-foreground">Make your stay even more affordable with our exclusive promo codes.</p>
      </div>

      {activeCoupons.length === 0 ? (
        <div className="text-center p-12 bg-muted/50 rounded-3xl border border-dashed">
          <p className="text-xl text-muted-foreground">There are no active promotions at this time. Check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeCoupons.map((coupon) => (
            <div key={coupon.id} className="relative bg-card border rounded-3xl p-8 shadow-sm overflow-hidden group hover:shadow-lg transition-all">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Tag size={24} />
                    <span className="font-bold tracking-widest uppercase">Promo Code</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-2">{coupon.discountPct}% OFF</h2>
                  <p className="text-muted-foreground mb-8">
                    Use this code at checkout to receive a {coupon.discountPct}% discount on your entire booking.
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="inline-block bg-primary text-primary-foreground font-mono text-2xl font-bold px-6 py-3 rounded-xl tracking-wider shadow-inner">
                    {coupon.code}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Valid until {coupon.expiresAt.toLocaleDateString()}. Limited uses available!
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
