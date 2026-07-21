'use client';

import { Link, usePathname } from '@/i18n/routing';
import { 
  LayoutDashboard, 
  BedDouble, 
  CalendarCheck, 
  Users, 
  Settings, 
  LogOut,
  Image as ImageIcon,
  Tag,
  Star
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const t = useTranslations('Admin');
  const pathname = usePathname();
  
  const navItems = [
    { name: t('dashboard') || 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
    { name: t('bookings') || 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { name: t('rooms') || 'Rooms', href: '/admin/rooms', icon: BedDouble },
    { name: t('customers') || 'Customers', href: '/admin/customers', icon: Users },
    { name: t('reviews') || 'Reviews', href: '/admin/reviews', icon: Star },
    { name: t('gallery') || 'Gallery', href: '/admin/gallery', icon: ImageIcon },
    { name: t('offers') || 'Offers', href: '/admin/offers', icon: Tag },
    { name: t('settings') || 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="p-6">
        <h2 className="text-xl font-bold">{t('adminPanel') || 'Admin Panel'}</h2>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? pathname === item.href 
            : pathname.startsWith(item.href);
            
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          <span>{t('exitToSite') || 'Exit to Site'}</span>
        </Link>
      </div>
    </aside>
  );
}
