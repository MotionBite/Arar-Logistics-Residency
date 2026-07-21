"use client";

import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className={cn("flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium transition-colors", className)}
    >
      {locale === 'ar' ? '🇺🇸 English' : '🇸🇦 العربية'}
    </button>
  );
}
