"use client";

import { useTransition } from "react";
import { enrollInClass } from "./actions";

export function BuyButton({
  classEventId,
  price,
}: {
  classEventId: string;
  price: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => enrollInClass(classEventId))}
      className="flex w-full items-center justify-center rounded-sm bg-brand-accent px-4 py-4 text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {isPending ? "Processando…" : `Garanta sua vaga · ${price}`}
    </button>
  );
}
