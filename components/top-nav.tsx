"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/explorar", label: "Explorar" },
  { href: "/aluno/meus-auloes", label: "Meus Aulões" },
  { href: "/professor/auloes", label: "Professor" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line-muted)] bg-[color:var(--surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none tracking-tight text-[var(--text-strong)] group-hover:text-brand-primary transition-colors">
            Docsens
          </span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-blue)]">
            live classes
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${active ? "nav-link-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <Link 
            href="/login" 
            className="px-5 py-2 rounded-full border border-white/10 glass hover:bg-white/10 text-sm font-semibold transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
