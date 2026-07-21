'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+966500000000';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hello, I am interested in booking a room at Arar Residency.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366] opacity-75"></div>
      <MessageCircle size={28} className="relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-16 px-3 py-1 bg-dark text-white text-sm rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Need help? Chat with us
      </span>
    </a>
  );
}
