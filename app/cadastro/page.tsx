"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/AuthLayout";

export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Crie sua conta" 
      subtitle="Junte-se a comunidade de aprendizado de elite."
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
          <input 
            id="name"
            type="text" 
            placeholder="Seu nome"
            className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input 
            id="email"
            type="email" 
            placeholder="seu@email.com"
            className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">Celular</label>
            <input 
              id="phone"
              type="tel" 
              placeholder="(11) 99999-9999"
              className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
            />
          </div>
          
          <div className="space-y-2">
             <label htmlFor="goal" className="text-sm font-medium">Objetivo</label>
             <select 
               id="goal"
               className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all appearance-none text-muted-foreground"
             >
               <option value="" disabled selected>Selecione</option>
               <option value="vestibular">Passar no Vestibular</option>
               <option value="graduacao">Reforço na Graduação</option>
               <option value="carreira">Carreira / Mercado</option>
             </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Senha</label>
          <input 
            id="password"
            type="password" 
            placeholder="No mínimo 8 caracteres"
            className="w-full px-4 py-3 rounded-xl glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
          />
        </div>

        <button className="w-full py-4 bg-brand-primary text-white rounded-xl font-semibold hover:shadow-[0_0_20px_-5px_rgba(var(--brand-primary),0.5)] transition-all active:scale-[0.98]">
          Criar conta
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-brand-primary hover:underline font-medium">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
