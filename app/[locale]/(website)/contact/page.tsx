import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function ContactPage() {
  const t = await getTranslations('Navbar');

  const contactInfo = [
    { icon: MapPin, title: 'Address', detail: '123 Residency St, Arar, Saudi Arabia' },
    { icon: Phone, title: 'Phone', detail: '+966 50 123 4567' },
    { icon: Mail, title: 'Email', detail: 'info@arar-residency.com' },
    { icon: Clock, title: 'Reception', detail: '24/7 Available' },
  ];

  return (
    <main className="flex min-h-screen flex-col pt-40 pb-24 px-4 w-full max-w-7xl mx-auto space-y-16">
      <section className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary font-serif">Get in Touch</h1>
        <p className="text-xl text-muted-foreground">
          We are here to help. Reach out to us for reservations, special requests, or any inquiries.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1 space-y-8">
          {contactInfo.map((info, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                <info.icon size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{info.title}</h3>
                <p className="text-muted-foreground">{info.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 bg-card border rounded-3xl p-8 shadow-sm">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold">First Name</label>
                <input type="text" className="w-full p-4 rounded-xl border bg-background" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">Last Name</label>
                <input type="text" className="w-full p-4 rounded-xl border bg-background" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Email</label>
              <input type="email" className="w-full p-4 rounded-xl border bg-background" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Message</label>
              <textarea rows={6} className="w-full p-4 rounded-xl border bg-background resize-none" placeholder="How can we help you?" />
            </div>
            <button type="button" className={cn(buttonVariants({ size: 'lg' }), "w-full py-6 rounded-xl text-lg")}>
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
