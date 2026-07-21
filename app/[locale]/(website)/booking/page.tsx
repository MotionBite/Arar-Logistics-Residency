import { Link } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function BookingPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-8 text-center bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Book Your Stay</h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-light leading-relaxed">
        Our online booking system is currently being upgraded to provide you with a more seamless experience. Please check back soon or contact our front desk for immediate reservations.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "text-lg px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:bg-muted")}>
        Return Home
      </Link>
    </div>
  );
}
