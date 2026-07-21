import { Link } from '@/i18n/routing';

export default function BlogPage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center py-16 px-4 w-full max-w-7xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Our Blog</h1>
        <p className="text-xl text-muted-foreground">
          Coming Soon. Stay tuned for stories, tips, and news from Arar Residency.
        </p>
      </div>
      <Link href="/" className="text-primary hover:underline">
        Return Home
      </Link>
    </main>
  );
}
