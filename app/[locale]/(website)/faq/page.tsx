import { getTranslations } from 'next-intl/server';
import { HelpCircle } from 'lucide-react';

export default async function FAQPage() {
  const t = await getTranslations('Navbar');

  const faqs = [
    {
      q: 'What are the check-in and check-out times?',
      a: 'Check-in is from 2:00 PM, and check-out is until 12:00 PM. Early check-in and late check-out are subject to availability and may incur additional charges.'
    },
    {
      q: 'Do you offer airport transportation?',
      a: 'Yes, we provide airport transfers. Please contact our reception at least 24 hours in advance to arrange your pickup or drop-off.'
    },
    {
      q: 'Is breakfast included in the room rate?',
      a: 'Breakfast inclusion depends on the room rate you select during booking. We offer both room-only and bed-and-breakfast options.'
    },
    {
      q: 'Do you have parking facilities?',
      a: 'Yes, we offer complimentary secure parking for all our guests.'
    },
    {
      q: 'What is your cancellation policy?',
      a: 'Standard bookings can be cancelled free of charge up to 24 hours before check-in. Non-refundable bookings cannot be cancelled or modified.'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col py-16 px-4 w-full max-w-4xl mx-auto space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">Find answers to common questions about our services and policies.</p>
      </section>

      <section className="space-y-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold mb-3 flex items-start gap-3">
              <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
              {faq.q}
            </h3>
            <p className="text-muted-foreground pl-9">{faq.a}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
