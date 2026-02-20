import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 rounded-sm border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-all duration-150 hover:border-brand-accent/40 hover:bg-brand-accent/5 hover:text-brand-accent"
    >
      <ChevronLeft
        size={13}
        className="transition-transform duration-150 group-hover:-translate-x-0.5"
      />
      {label}
    </Link>
  );
}
