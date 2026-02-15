import { TopNav } from "@/components/top-nav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--surface)] text-[var(--text-body)]">
      <TopNav />
      <main className="page-reveal mx-auto w-full max-w-[1100px] px-6 py-10 sm:px-8 sm:py-14">
        {children}
      </main>
    </div>
  );
}
