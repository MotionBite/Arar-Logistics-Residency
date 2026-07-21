'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const t = useTranslations('Chatbot');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: 'Thank you for reaching out! Our agents will respond to your query shortly. For immediate assistance, please use the WhatsApp button.', 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:right-24 z-40 bg-[#e82a5a] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center"
        aria-label="Open chat support"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 md:right-24 z-50 w-80 sm:w-96 bg-card border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] max-h-[70vh]">
          <div className="bg-[#e82a5a] text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">Arar Residency Support</h3>
              <p className="text-xs opacity-80">Online - Replies instantly</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-muted/30 flex flex-col gap-3">
            <div className="bg-card text-card-foreground border p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%] text-sm shadow-sm">
              Hello! How can we assist you with your booking today?
            </div>
            
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`p-3 rounded-2xl text-sm shadow-sm max-w-[85%] ${
                  msg.isUser 
                    ? 'bg-[#e82a5a] text-white rounded-tr-sm self-end' 
                    : 'bg-card text-card-foreground border rounded-tl-sm self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t bg-card flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..." 
              className="flex-1 px-4 py-2 rounded-xl border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-[#e82a5a]/50 text-sm"
            />
            <button 
              onClick={handleSend}
              className="bg-[#e82a5a] text-white p-2 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
