import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Form */}
      <div className="flex flex-col justify-center px-4 sm:px-12 lg:px-20 py-12 relative z-10 bg-background">
        <div className="w-full max-w-md mx-auto space-y-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Voltar para home
          </Link>

          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold">{title}</h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Right Panel - Artistic Background */}
      <div className="hidden lg:flex relative overflow-hidden bg-surface items-center justify-center p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-background to-background" />
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03]" />
        
        <div className="relative z-10 max-w-lg text-center space-y-6">
           {/* Abstract Visual */}
           <div className="relative w-64 h-64 mx-auto mb-12">
             <div className="absolute inset-0 bg-brand-primary/30 rounded-full blur-[60px] animate-pulse" />
             <div className="relative glass w-full h-full rounded-3xl border-white/10 flex items-center justify-center rotate-6">
               <span className="text-6xl">🎓</span>
             </div>
             <div className="absolute -bottom-6 -right-6 glass w-32 h-32 rounded-2xl border-white/10 flex items-center justify-center -rotate-12 animate-float">
               <span className="text-4xl">🚀</span>
             </div>
           </div>

           <blockquote className="text-2xl font-display font-medium leading-relaxed">
             "O aprendizado não é um evento, é uma jornada. Comece a sua com quem já chegou lá."
           </blockquote>
        </div>
      </div>
    </div>
  );
}
