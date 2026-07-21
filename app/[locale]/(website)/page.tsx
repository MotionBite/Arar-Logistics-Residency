import { Hero } from '@/components/home/Hero';
import { WelcomeSection } from '@/components/home/WelcomeSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { UpcomingEvents } from '@/components/home/UpcomingEvents';
import { FeaturedRooms } from '@/components/home/FeaturedRooms';
import { Facilities } from '@/components/home/Facilities';
import { ReviewsCarousel } from '@/components/home/ReviewsCarousel';
import { GoogleMap } from '@/components/home/GoogleMap';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Hero />
      <WelcomeSection />
      <WhyChooseUs />
      <UpcomingEvents />
      <FeaturedRooms />
      <Facilities />
      <ReviewsCarousel />
      <GoogleMap />
    </main>
  );
}
