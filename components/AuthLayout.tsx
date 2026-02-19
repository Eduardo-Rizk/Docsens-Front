import Link from "next/link";
import { AuthDecor3D } from "@/components/AuthDecor3D";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}


export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* ── LEFT: Form Panel ── */}
      <div className="relative flex flex-col min-h-screen bg-background">
        {/* Left edge accent */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-accent/30 to-transparent" />

        {/* TOP — Logo */}
        <div className="flex items-center justify-between px-10 pt-10 pb-0">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center bg-foreground shrink-0">
              <span className="font-sans text-xs font-black text-background tracking-tighter">DS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-sm font-bold tracking-tight text-foreground leading-none">DOCSENS</span>
              <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-brand-accent leading-none mt-0.5">live classes</span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/40 hover:text-muted-foreground transition-colors duration-200"
          >
            ← Home
          </Link>
        </div>

        {/* MIDDLE — Form (flex-1 to fill space) */}
        <div className="flex-1 flex flex-col justify-center px-10 sm:px-16 lg:px-20 py-12">
          <div className="w-full max-w-[440px]">
            {/* Heading */}
            <div className="mb-10 space-y-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-brand-accent block">
                // DOCSENS AUTH
              </span>
              <h1 className="font-display text-4xl font-black text-foreground leading-tight">{title}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">{subtitle}</p>
              {/* Accent underline */}
              <div className="h-px w-12 bg-brand-accent mt-4" />
            </div>

            {children}
          </div>
        </div>

        {/* BOTTOM — Legal note */}
        <div className="px-10 pb-8 pt-0">
          <p className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.16em]">
            © 2024 Docsens · Todos os direitos reservados
          </p>
        </div>
      </div>

      {/* ── RIGHT: Decorative Panel ── */}
      <div
        className="hidden lg:flex flex-col justify-between min-h-screen border-l border-border relative overflow-hidden"
        style={{ background: "#08080b" }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34,211,238,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34,211,238,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
          }}
        />

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.2), transparent)",
            animation: "scan-line 5s linear infinite",
          }}
        />

        {/* Corner marks */}
        <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-brand-accent/30" />
        <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-brand-accent/30" />
        <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-brand-accent/20" />
        <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-brand-accent/20" />

        {/* ─ MIDDLE: 3D animation ─ */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-12 py-6">
          <AuthDecor3D />

          <div className="mt-8 text-center space-y-2">
            <p className="font-display text-xl font-bold text-foreground/70 leading-snug">
              "Aprenda com quem já chegou<br />onde você quer chegar."
            </p>
          </div>
        </div>

        {/* ─ BOTTOM: copyright ─ */}
        <div className="relative z-10 px-12 pb-10">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/25">
            © 2024 Docsens
          </p>
        </div>
      </div>
    </div>
  );
}
