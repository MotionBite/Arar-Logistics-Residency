"use client";

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { useSession, signOut } from 'next-auth/react';
import { LogOut, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/rooms', label: t('rooms') },
    { href: '/gallery', label: t('gallery') },
    { href: '/offers', label: t('offers') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <header className="fixed top-0 z-50 w-full font-sans transition-all duration-300">
      {/* Top Bar - Dark overlay */}
      <div className={cn(
        "w-full transition-all duration-300 relative z-20 border-b border-white/10",
        isScrolled ? "bg-black/90 py-1" : "bg-black/60 py-2"
      )}>
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#e82a5a] font-bold text-2xl">
              H
            </div>
            <span className="text-xl md:text-2xl font-semibold text-white tracking-wide">
              otel Booking
            </span>
          </Link>

          {/* Top Right: Social + Auth */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 text-white/80">
              <a href="#" className="hover:text-white transition-colors" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" title="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" title="Pinterest">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" title="Google+">
                <span className="font-bold text-sm">g+</span>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle className="text-white hover:bg-white/10" />
              <LanguageSwitcher className="text-white border-white/20 hover:bg-white/10 hover:text-white" />

              {status === 'loading' ? (
                <div className="w-24 h-8 bg-white/20 animate-pulse rounded"></div>
              ) : session ? (
                <div className="flex items-center gap-2">
                  <Link 
                    href={session.user?.role === 'ADMIN' ? '/admin' : '/dashboard/bookings'}
                    className="flex items-center gap-2 bg-white text-gray-800 px-4 py-1.5 rounded-sm text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    <User size={14} />
                    {t('dashboard')}
                  </Link>
                  <button 
                    onClick={() => signOut()}
                    className="flex items-center justify-center h-8 w-8 bg-white/10 text-white rounded-sm hover:bg-red-500/80 transition-colors"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-white text-gray-800 px-4 py-1.5 rounded-sm text-sm font-medium hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <User size={14} />
                  Login / Sign up
                </Link>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Main Nav Bar (Desktop Only) */}
      <div className="hidden md:flex w-full justify-center relative z-10 mt-2">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="flex drop-shadow-lg w-full">
            {/* White Nav Container */}
            <div 
              className="flex-1 bg-white/95 backdrop-blur" 
              style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 30px) 100%, 0 100%)' }}
            >
              <nav className="flex h-12 lg:h-14 items-center justify-center lg:justify-start lg:pl-8 pr-12">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                      "text-xs lg:text-sm font-bold uppercase tracking-wider transition-colors px-3 lg:px-5 py-2",
                      pathname === link.href 
                        ? "text-[#e82a5a]" 
                        : "text-gray-600 hover:text-[#e82a5a]"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Red Book Now Button Container */}
            <div 
              className="w-[180px] lg:w-[220px] bg-[#e82a5a] hover:bg-[#d6204c] ml-[-20px] transition-colors cursor-pointer group" 
              style={{ clipPath: 'polygon(30px 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <Link href="/booking" className="flex h-12 lg:h-14 items-center justify-center pl-8 text-white font-bold tracking-wider group-hover:scale-105 transition-transform">
                BOOK NOW
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg flex flex-col py-4 px-4 gap-2">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "px-4 py-3 rounded-md text-base font-medium",
                pathname === link.href ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex gap-2 items-center px-4 py-2">
            <ThemeToggle className="text-gray-700 hover:bg-gray-100 hover:text-gray-900" />
            <LanguageSwitcher className="text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900" />
          </div>

          <div className="h-px bg-gray-200 my-2" />
          
          {session ? (
            <>
              <Link 
                href={session.user?.role === 'ADMIN' ? '/admin' : '/dashboard/bookings'}
                className="flex items-center gap-2 px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={18} />
                {t('dashboard')}
              </Link>
              <button 
                onClick={() => { signOut(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50 text-left"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center justify-center h-12 rounded-md border border-gray-300 text-gray-700 font-medium mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login / Sign up
            </Link>
          )}

          <Link
            href="/booking"
            className="flex items-center justify-center h-12 rounded-md bg-[#e82a5a] text-white font-bold mt-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            BOOK NOW
          </Link>
        </div>
      )}
    </header>
  );
}

