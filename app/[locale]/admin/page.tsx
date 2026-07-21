import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { prisma } from '@/lib/prisma';
import { Users, CalendarCheck, TrendingUp, BedDouble } from 'lucide-react';
import { format } from 'date-fns';

export default async function AdminDashboardPage() {
  const t = await getTranslations('Admin');

  // Fetch KPI data
  const totalBookings = await prisma.booking.count();
  const totalCustomers = await prisma.user.count({ where: { role: 'USER' } });
  const totalRooms = await prisma.room.count();
  
  // Calculate total revenue from confirmed/completed bookings
  const bookings = await prisma.booking.findMany({
    where: { status: { in: ['CONFIRMED', 'CHECKEDIN', 'CHECKEDOUT'] } },
    select: { totalPrice: true }
  });
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  // Recent 5 bookings
  const recentBookings = await prisma.booking.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { room: true, user: true }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('dashboardOverview') || 'Dashboard Overview'}</h1>
        <p className="text-muted-foreground">{t('dashboardDesc') || 'Welcome back. Here is what is happening today.'}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('totalRevenue') || 'Total Revenue'}</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue} SAR</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('totalBookings') || 'Total Bookings'}</CardTitle>
            <CalendarCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('totalCustomers') || 'Total Customers'}</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{t('totalRooms') || 'Total Rooms'}</CardTitle>
            <BedDouble className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRooms}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* We will pass data to AnalyticsDashboard if needed, or it can fetch itself. We'll pass empty for now. */}
          <AnalyticsDashboard />
        </div>
        
        {/* Recent Bookings List */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>{t('recentBookings') || 'Recent Bookings'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map(b => (
              <div key={b.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                <div>
                  <p className="font-semibold">{b.user.name}</p>
                  <p className="text-xs text-muted-foreground">{b.room.nameEn} • {format(b.createdAt, 'MMM dd, yyyy')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{b.totalPrice} SAR</p>
                  <p className="text-xs font-semibold px-2 py-1 bg-secondary rounded-full inline-block mt-1">{b.status}</p>
                </div>
              </div>
            ))}
            {recentBookings.length === 0 && (
              <p className="text-muted-foreground text-sm text-center py-4">No recent bookings</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
