import { getTranslations } from 'next-intl/server';
import { Building, Users, Star, Award } from 'lucide-react';
import Image from 'next/image';

export default async function AboutPage() {
  const t = await getTranslations('Navbar');

  const stats = [
    { icon: Building, value: '150+', label: 'Luxury Rooms' },
    { icon: Users, value: '50k+', label: 'Happy Guests' },
    { icon: Star, value: '4.9', label: 'Average Rating' },
    { icon: Award, value: '15', label: 'Years of Excellence' },
  ];

  return (
    <main className="flex min-h-screen flex-col pt-40 pb-24 px-4 w-full max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-primary font-serif">About Arar Residency</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Experience unparalleled luxury and authentic Saudi hospitality in the heart of Arar. 
          We have been redefining elegance and comfort for over a decade.
        </p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card border rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <stat.icon size={32} className="text-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Story Section */}
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded with a vision to provide a sanctuary for travelers and business professionals, 
            Arar Logistics Residency has grown to become the premier destination in the Northern Borders region. 
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our commitment is simple: to make every guest feel at home while experiencing the highest 
            standards of luxury, privacy, and personalized service. Whether you are here for a brief 
            business trip or an extended stay, our dedicated team is here to ensure your absolute comfort.
          </p>
        </div>
        <div className="relative rounded-3xl h-[400px] w-full overflow-hidden shadow-lg">
          <Image 
            src="/images/gallery_3.png" 
            alt="Hotel Exterior" 
            fill 
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
