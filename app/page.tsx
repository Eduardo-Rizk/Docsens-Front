import { Hero } from "@/components/Hero";
import { ExploreFeed } from "@/components/ExploreFeed";

export default function HomePage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      <Hero />
      <ExploreFeed />
    </main>
  );
}
