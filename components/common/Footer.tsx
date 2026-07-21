"use client";

import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer 
      className="relative bg-cover bg-center text-gray-400 py-16 text-sm font-sans"
      style={{ backgroundImage: 'url("/images/hero-bg-4.png")' }}
    >
      {/* Heavy dark overlay so the background image is very faint, matching the design */}
      <div className="absolute inset-0 bg-black/90"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* ADDRESS */}
          <div>
            <h4 className="text-white font-semibold text-base mb-6 tracking-wide">ADDRESS</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-gray-300" />
                <span>Hotel in Arar</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-gray-300" />
                <span>50123456789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-gray-300" />
                <span>hotel@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h4 className="text-white font-semibold text-base mb-6 tracking-wide">INFORMATION</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Delivery Information</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Site Map</Link></li>
            </ul>
          </div>

          {/* MY ACCOUNT */}
          <div>
            <h4 className="text-white font-semibold text-base mb-6 tracking-wide">MY ACCOUNT</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Wish List</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Newsletter</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* NEWS LETTER */}
          <div>
            <h4 className="text-white font-semibold text-base mb-6 tracking-wide">NEWS LETTER</h4>
            <p className="mb-4 leading-relaxed">
              Subscribe to our newsletter to latest news, tips, and advice.
            </p>
            <div className="flex mb-6 h-9">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-3 text-gray-900 focus:outline-none rounded-none"
              />
              <button className="bg-[#ff4a5a] hover:bg-[#e63c4c] text-white px-4 font-semibold tracking-wider transition-colors">
                SEND
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#00aced] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#dd4b39] flex items-center justify-center text-white hover:opacity-90 transition-opacity font-bold font-serif text-sm">
                g+
              </a>
            </div>
          </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-6 border-t border-[#333333] text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} . Hotel . All rights .</p>
        </div>
      </div>
    </footer>
  );
}
