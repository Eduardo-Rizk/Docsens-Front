import Link from "next/link";
import { TrendingUp, Users, BookOpen, Radio } from "lucide-react";
import { StatusPill } from "@/components/status-pill";
import {
  getInstitutionById,
  getSubjectById,
  getTeacherDashboard,
  viewer,
} from "@/lib/domain";
import { formatLongDate, formatPrice, formatTime } from "@/lib/format";

const publicationConfig = {
  DRAFT: { label: "Rascunho", tone: "muted" as const },
  PUBLISHED: { label: "Publicado", tone: "default" as const },
  FINISHED: { label: "Finalizado", tone: "success" as const },
};

export default function TeacherDashboardPage() {
  const dashboard = getTeacherDashboard(viewer.teacherProfileId);

  return (
    <div className="space-y-10">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
          Dashboard
        </h1>
        <p className="text-base text-muted-foreground">
          Visão geral da sua atividade como professor
        </p>
      </header>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-sm border border-border bg-surface p-5">
          <div className="flex items-center gap-2 text-brand-accent">
            <TrendingUp size={14} />
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              Receita total
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {formatPrice(dashboard.totalRevenueSucceededCents)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            pagamentos confirmados
          </p>
        </div>

        <div className="rounded-sm border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-brand-accent" />
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              Alunos pagantes
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {dashboard.totalPaidStudents}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            matrículas pagas no total
          </p>
        </div>

        <div className="rounded-sm border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-brand-accent" />
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              Aulões criados
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {dashboard.totalClasses}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ao longo do tempo
          </p>
        </div>

        <div className="rounded-sm border border-border bg-surface p-5">
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-brand-accent" />
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              Publicados
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {dashboard.publishedClasses}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            ativos agora
          </p>
        </div>
      </div>

      {/* Per-class breakdown */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
            Aulões · Desempenho
          </p>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <div className="flex flex-col gap-2">
          {dashboard.rows.map(({ classEvent, paidEnrollments, revenueSucceededCents }) => {
            const institution = getInstitutionById(classEvent.institutionId);
            const subject = getSubjectById(classEvent.subjectId);
            const pub = publicationConfig[classEvent.publicationStatus];

            return (
              <div
                key={classEvent.id}
                className="flex flex-col gap-4 rounded-sm border border-border bg-surface p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                {/* Date/time */}
                <div className="w-28 shrink-0 space-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/60">
                    {formatLongDate(classEvent.startsAt).split(",")[0]}
                  </p>
                  <p className="font-display text-xl leading-none text-foreground">
                    {formatTime(classEvent.startsAt)}
                  </p>
                </div>

                <div className="hidden h-12 w-px bg-border sm:block" />

                {/* Info */}
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="font-display text-base leading-snug text-foreground">
                    {classEvent.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {institution?.shortName} · {subject?.name}
                  </p>
                </div>

                {/* Metrics */}
                <div className="flex shrink-0 flex-wrap items-center gap-4">
                  <div className="text-right">
                    <p className="font-display text-xl text-brand-accent">
                      {formatPrice(revenueSucceededCents)}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60">receita</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl text-foreground">
                      {paidEnrollments}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60">alunos</p>
                  </div>
                  <StatusPill tone={pub.tone}>{pub.label}</StatusPill>
                  <Link
                    href={`/professor/auloes/${classEvent.id}/compradores`}
                    className="text-[10px] font-bold uppercase tracking-wider text-brand-accent hover:opacity-70 transition-opacity"
                  >
                    Compradores →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
