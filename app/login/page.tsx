"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout";

const input =
  "w-full bg-surface border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-3 text-sm font-medium focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/20 transition-all duration-200";

const label =
  "block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60 mb-2";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Entre na sua conta para acessar seus aulões e mentorias."
    >
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Email */}
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            className={input}
            autoComplete="email"
          />
        </div>

        {/* Senha */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className={label} style={{ marginBottom: 0 }}>
              Senha
            </label>
            <Link
              href="#"
              className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-accent hover:opacity-70 transition-opacity duration-200"
            >
              Esqueceu?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className={input}
            autoComplete="current-password"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-brand-accent text-background font-bold text-xs uppercase tracking-[0.14em] py-3.5 hover:opacity-90 active:scale-[0.99] transition-all duration-150"
        >
          Entrar
        </button>
      </form>

      <p className="text-center text-[11px] text-muted-foreground/50 tracking-wide">
        Não tem uma conta?{" "}
        <Link
          href="/cadastro"
          className="text-brand-accent font-semibold hover:opacity-70 transition-opacity duration-200"
        >
          Criar conta
        </Link>
      </p>
    </AuthLayout>
  );
}
