"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/professor/auloes", label: "Meus Aulões" },
  { href: "/professor/dashboard", label: "Dashboard" },
  { href: "/professor/perfil", label: "Perfil" },
];

function isActive(pathname: string, href: string) {
  return pathname.startsWith(href);
}

export function ProfessorNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between gap-4 border-b border-border pb-0">
      <nav className="flex items-center gap-0">
        {tabs.map((tab) => {
          const active = isActive(pathname, tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "relative px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {active && (
                <motion.div
                  layoutId="prof-nav-indicator"
                  className="absolute bottom-0 left-2 right-2 h-px bg-brand-accent"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/professor/novo-aulao"
        className={cn(
          "mb-2 flex items-center gap-1.5 rounded-sm bg-brand-accent px-3 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:brightness-110",
          isActive(pathname, "/professor/novo-aulao") && "brightness-110"
        )}
      >
        <Plus size={13} />
        Novo Aulão
      </Link>
    </div>
  );
}
