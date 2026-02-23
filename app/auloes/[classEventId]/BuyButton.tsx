import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BuyButton({
  classEventId,
  price,
}: {
  classEventId: string;
  price: string;
}) {
  return (
    <Link
      href={`/checkout/${classEventId}`}
      className="flex w-full items-center justify-center gap-2 rounded-sm bg-brand-accent px-4 py-4 text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
    >
      Garanta sua vaga · {price}
      <ArrowUpRight size={14} />
    </Link>
  );
}
