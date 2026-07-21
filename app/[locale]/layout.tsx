import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Cairo, Inter } from 'next/font/google';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { ChatbotWidget } from '@/components/common/ChatbotWidget';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import '@/app/globals.css';

const cairo = Cairo({ subsets: ['arabic'], variable: '--font-cairo' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return {
    title: {
      template: '%s | Arar Residency',
      default: locale === 'ar' ? 'عرعر للإقامات - فندق فخم' : 'Arar Residency - Luxury Hotel',
    },
    description: locale === 'ar' 
      ? 'فندق فخم حديث في عرعر، المملكة العربية السعودية يوفر إقامات يومية وأسبوعية وشهرية مريحة.'
      : 'A modern luxury hotel in Arar, Saudi Arabia offering comfortable nightly, weekly, and monthly stays.',
    keywords: ['Arar', 'Hotel', 'Residency', 'Saudi Arabia', 'Accommodation', 'Booking', 'عرعر', 'فندق', 'إقامة'],
    openGraph: {
      title: locale === 'ar' ? 'عرعر للإقامات - فندق فخم' : 'Arar Residency - Luxury Hotel',
      description: locale === 'ar' 
        ? 'فندق فخم حديث في عرعر، المملكة العربية السعودية يوفر إقامات يومية وأسبوعية وشهرية مريحة.'
        : 'A modern luxury hotel in Arar, Saudi Arabia offering comfortable nightly, weekly, and monthly stays.',
      url: 'https://arar-residency.com',
      siteName: 'Arar Residency',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'ar' ? 'عرعر للإقامات' : 'Arar Residency',
      description: locale === 'ar' ? 'فندق فخم حديث في عرعر' : 'A modern luxury hotel in Arar',
    }
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const fontClass = locale === 'ar' ? cairo.variable : inter.variable;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${fontClass} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ChatbotWidget />
            <WhatsAppButton />
          </AuthProvider>
        </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
