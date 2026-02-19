"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout";

const input =
  "w-full bg-surface border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-3 text-sm font-medium focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/20 transition-all duration-200";

const label =
  "block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60 mb-2";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Junte-se à comunidade de aprendizado de elite."
    >
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        {/* Nome */}
        <div>
          <label htmlFor="name" className={label}>
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            className={input}
            autoComplete="name"
          />
        </div>

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

        {/* Celular + Objetivo */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="phone" className={label}>
              Celular
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              className={input}
              autoComplete="tel"
            />
          </div>
          <div>
            <label htmlFor="goal" className={label}>
              Objetivo
            </label>
            <select
              id="goal"
              defaultValue=""
              className={`${input} appearance-none cursor-pointer`}
              style={{ color: "inherit" }}
            >
              <option value="" disabled style={{ background: "#0f0f12", color: "#71717a" }}>
                Selecione
              </option>
              <option value="vestibular" style={{ background: "#0f0f12", color: "#fafafa" }}>
                Vestibular
              </option>
              <option value="graduacao" style={{ background: "#0f0f12", color: "#fafafa" }}>
                Graduação
              </option>
              <option value="carreira" style={{ background: "#0f0f12", color: "#fafafa" }}>
                Carreira
              </option>
            </select>
          </div>
        </div>

        {/* Senha */}
        <div>
          <label htmlFor="password" className={label}>
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            className={input}
            autoComplete="new-password"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-brand-accent text-background font-bold text-xs uppercase tracking-[0.14em] py-3.5 hover:opacity-90 active:scale-[0.99] transition-all duration-150"
        >
          Criar conta
        </button>
      </form>

      <p className="text-center text-[11px] text-muted-foreground/50 tracking-wide">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-brand-accent font-semibold hover:opacity-70 transition-opacity duration-200"
        >
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
