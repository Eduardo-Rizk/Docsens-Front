"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, KeyRound, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { toast } from "sonner";

const input =
  "w-full bg-surface border border-border text-foreground placeholder:text-muted-foreground/40 px-4 py-3 text-sm font-medium focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/20 transition-all duration-200";

const label =
  "block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60 mb-2";

export default function ResetPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Request reset code
  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    setError("");
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("code");
      toast.success("Código enviado! Verifique seu email.");
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Erro ao enviar código.");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: Submit code + new password
  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }
    if (password.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      if (result.status === "complete") {
        await setActive!({ session: result.createdSessionId });
        toast.success("Senha redefinida com sucesso!");
        router.push("/");
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Código inválido ou expirado.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "code") {
    return (
      <AuthLayout
        title="Redefinir senha"
        subtitle="Digite o código enviado para seu email e escolha uma nova senha."
      >
        <form className="space-y-5" onSubmit={handleReset}>
          <div>
            <label htmlFor="code" className={label}>
              Código de verificação
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/40">
                <KeyRound size={16} />
              </div>
              <input
                id="code"
                type="text"
                placeholder="123456"
                className={`${input} pl-10`}
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className={label}>
              Nova senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/40">
                <Lock size={16} />
              </div>
              <input
                id="password"
                type="password"
                placeholder="Mínimo 8 caracteres"
                className={`${input} pl-10`}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className={label}>
              Confirmar nova senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/40">
                <Lock size={16} />
              </div>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Digite a senha novamente"
                className={`${input} pl-10`}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p className="mt-1.5 text-[11px] text-red-400">
                As senhas não coincidem
              </p>
            )}
          </div>

          {error && (
            <p className="text-[11px] text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ea580c] text-white font-bold text-xs uppercase tracking-[0.14em] py-3.5 rounded-md hover:bg-[#c2410c] active:scale-[0.99] transition-all duration-150 disabled:opacity-50"
          >
            {loading ? "Redefinindo..." : "Redefinir senha"}
          </button>
        </form>

        <p className="text-center text-[11px] text-muted-foreground/50 tracking-wide">
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setError("");
            }}
            className="inline-flex items-center gap-1 text-brand-accent font-semibold hover:opacity-70 transition-opacity duration-200"
          >
            <ArrowLeft size={10} />
            Voltar
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Redefinir senha"
      subtitle="Informe seu email e enviaremos um código para redefinir sua senha."
    >
      <form className="space-y-5" onSubmit={handleRequestCode}>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground/40">
              <Mail size={16} />
            </div>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={`${input} pl-10`}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-[11px] text-red-400 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#ea580c] text-white font-bold text-xs uppercase tracking-[0.14em] py-3.5 rounded-md hover:bg-[#c2410c] active:scale-[0.99] transition-all duration-150 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar código de redefinição"}
        </button>
      </form>

      <p className="text-center text-[11px] text-muted-foreground/50 tracking-wide">
        Lembrou a senha?{" "}
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
