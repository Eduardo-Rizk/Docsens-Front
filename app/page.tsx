import { Hero } from "@/components/Hero";
import { ExploreFeed } from "@/components/ExploreFeed";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      <Hero />
      <ExploreFeed />
      
      {/* Decorative background elements for the whole page */}
      <div className="fixed inset-0 -z-50 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>
    </main>
  );
}
