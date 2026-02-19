type Tone = "default" | "success" | "warn" | "muted";

const toneClasses: Record<Tone, string> = {
  default: "bg-brand-accent/10 text-brand-accent border-brand-accent/20",
  success: "bg-success/10 text-success border-success/20",
  warn: "bg-warning/10 text-warning border-warning/20",
  muted: "bg-surface text-muted-foreground border-border",
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
      className={`inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] border ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
