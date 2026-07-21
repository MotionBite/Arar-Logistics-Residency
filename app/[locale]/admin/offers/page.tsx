import { prisma } from '@/lib/prisma';
import { Tag } from 'lucide-react';

export default async function AdminOffersPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: { expiresAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Offers & Promotions</h1>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
          Create Offer (Coming Soon)
        </button>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 border-b text-sm">
                <th className="p-4 font-medium">Promo Code</th>
                <th className="p-4 font-medium">Discount</th>
                <th className="p-4 font-medium">Usage</th>
                <th className="p-4 font-medium">Expires</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => {
                const isExpired = new Date(coupon.expiresAt) < new Date();
                const isExhausted = coupon.usedCount >= coupon.maxUses;
                const statusColor = (coupon.isActive && !isExpired && !isExhausted) 
                  ? 'text-green-600 bg-green-500/10' 
                  : 'text-destructive bg-destructive/10';
                  
                return (
                  <tr key={coupon.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold font-mono flex items-center gap-2">
                      <Tag size={16} className="text-primary" />
                      {coupon.code}
                    </td>
                    <td className="p-4 font-bold text-lg">{coupon.discountPct}%</td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {coupon.usedCount} / {coupon.maxUses}
                    </td>
                    <td className="p-4 text-sm">{coupon.expiresAt.toLocaleDateString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${statusColor}`}>
                        {!coupon.isActive ? 'Disabled' : isExpired ? 'Expired' : isExhausted ? 'Exhausted' : 'Active'}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No promo codes have been created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
