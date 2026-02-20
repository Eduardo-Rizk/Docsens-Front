"use client";

import { useTransition } from "react";
import { Lock } from "lucide-react";
import { confirmPayment } from "./actions";

export function PayButton({ classEventId }: { classEventId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => confirmPayment(classEventId))}
      className="flex w-full items-center justify-center gap-2.5 rounded-sm bg-brand-accent px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      <Lock size={14} />
      {isPending ? "Processando…" : "Confirmar pagamento"}
    </button>
  );
}
