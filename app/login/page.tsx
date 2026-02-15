"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Bem-vindo de volta" 
      subtitle="Entre na sua conta para acessar seus aulões e mentorias."
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input 
            id="email"
            type="email" 
            placeholder="seu@email.com"
            className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium">Senha</label>
            <Link href="#" className="text-xs text-brand-primary hover:underline">Esqueceu a senha?</Link>
          </div>
          <input 
            id="password"
            type="password" 
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
          />
        </div>

        <button className="w-full py-4 bg-brand-primary text-white rounded-xl font-semibold hover:shadow-[0_0_20px_-5px_rgba(var(--brand-primary),0.5)] transition-all active:scale-[0.98]">
          Entrar
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <Link href="/cadastro" className="text-brand-primary hover:underline font-medium">
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  );
}
