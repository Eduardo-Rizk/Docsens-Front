import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle, Calendar, Clock, ArrowRight, CalendarDays } from "lucide-react";
import {
  getClassEventById,
  getInstitutionById,
  getSubjectById,
  getTeacherById,
  getUserById,
} from "@/lib/domain";
import { formatLongDate, formatPrice, formatTime } from "@/lib/format";

type PageProps = {
  params: Promise<{ classEventId: string }>;
};

export default async function CheckoutSuccessPage({ params }: PageProps) {
  const { classEventId } = await params;
  const classEvent = getClassEventById(classEventId);

  if (!classEvent) notFound();

  const institution = getInstitutionById(classEvent.institutionId);
  const subject = getSubjectById(classEvent.subjectId);
  const teacher = getTeacherById(classEvent.teacherProfileId);
  const teacherUser = teacher ? getUserById(teacher.userId) : undefined;
  const teacherName = teacherUser?.name ?? teacher?.headline ?? "";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center py-16">
      <div className="w-full max-w-lg space-y-8">

        {/* ── Success indicator ─────────────────────── */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Icon with glow */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-3xl text-foreground sm:text-4xl">
              Pagamento confirmado!
            </h1>
            <p className="text-base text-muted-foreground">
              Sua vaga está garantida. Até lá!
            </p>
          </div>
        </div>

        {/* ── Class summary card ────────────────────── */}
        <div className="rounded-sm border border-emerald-500/20 bg-emerald-500/[0.04] p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400/70">
              {institution?.shortName} · {subject?.name}
            </p>
            <p className="font-display text-xl leading-snug text-foreground">
              {classEvent.title}
            </p>
            {teacherName && (
              <p className="text-sm text-muted-foreground">{teacherName}</p>
            )}
          </div>

          <div className="h-px bg-emerald-500/10" />

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="flex items-center gap-2 text-foreground">
              <Calendar size={13} className="text-emerald-400" />
              {formatLongDate(classEvent.startsAt)}
            </span>
            <span className="flex items-center gap-2 text-foreground">
              <Clock size={13} className="text-emerald-400" />
              {formatTime(classEvent.startsAt)}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">Valor pago</span>
            <span className="font-display text-lg text-foreground">
              {formatPrice(classEvent.priceCents)}
            </span>
          </div>
        </div>

        {/* ── Info ─────────────────────────────────── */}
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          O link de acesso à aula será liberado pelo professor no horário do encontro.
          Você encontra tudo em <span className="text-foreground font-medium">Minha Agenda</span>.
        </p>

        {/* ── CTAs ─────────────────────────────────── */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/aluno/meus-auloes"
            className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-brand-accent px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-opacity hover:opacity-90"
          >
            <CalendarDays size={14} />
            Ver minha agenda
          </Link>
          <Link
            href={`/auloes/${classEventId}?from=agenda`}
            className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:border-zinc-600 hover:text-foreground"
          >
            Detalhes da aula
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}
