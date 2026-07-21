'use client';

import { Link, usePathname } from '@/i18n/routing';
import { CalendarCheck, User, Shield, LogOut, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const t = useTranslations('Dashboard');
  const pathname = usePathname();
  
  const navItems = [
    { name: t('myBookings') || 'My Bookings', href: '/dashboard/bookings', icon: CalendarCheck },
    { name: t('favorites') || 'Favorites', href: '/dashboard/favorites', icon: Heart },
    { name: t('profile') || 'Profile Settings', href: '/dashboard/profile', icon: User },
    { name: t('security') || 'Security', href: '/dashboard/security', icon: Shield },
  ];

  return (
    <aside className="w-full md:w-64 bg-card border-r md:min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="p-6 hidden md:block">
        <h2 className="text-xl font-bold">{t('title') || 'User Dashboard'}</h2>
      </div>
      <nav className="flex-1 px-4 space-y-1 py-4 md:py-0 flex flex-row md:flex-col overflow-x-auto gap-2 md:gap-0">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium text-sm whitespace-nowrap",
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
      <div className="p-4 border-t hidden md:block">
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
