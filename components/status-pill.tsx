type Tone = "default" | "success" | "warn" | "muted";

const toneClasses: Record<Tone, string> = {
  default: "bg-[color:var(--brand-blue-soft)] text-[var(--brand-blue)]",
  success: "bg-[#e7f6ec] text-[#1e6f35]",
  warn: "bg-[color:var(--brand-accent-soft)] text-[#9a6a00]",
  muted: "bg-[#f3f4f6] text-[#6b7280]",
};

export function StatusPill({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
