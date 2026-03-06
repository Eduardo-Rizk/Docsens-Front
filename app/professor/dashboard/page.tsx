"use client";

import Link from "next/link";
import { TrendingUp, Users, BookOpen, Radio } from "lucide-react";
import { StatusPill } from "@/components/status-pill";
import { useTeacherDashboard } from "@/lib/queries/teacher";
import { formatLongDate, formatPrice, formatTime } from "@/lib/format";

const publicationConfig: Record<string, { label: string; tone: "muted" | "default" | "success" }> = {
  DRAFT: { label: "Rascunho", tone: "muted" },
  PUBLISHED: { label: "Publicado", tone: "default" },
  FINISHED: { label: "Finalizado", tone: "success" },
};

export default function TeacherDashboardPage() {
  const { data: dashboard, isLoading } = useTeacherDashboard();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-8 p-4">
        <div className="space-y-3">
          <div className="h-10 w-48 bg-[#d1d5db] rounded" />
          <div className="h-4 w-64 bg-[#d1d5db] rounded" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-[#d1d5db] rounded-sm" />
          ))}
        </div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-[#d1d5db] rounded-sm" />
        ))}
      </div>
    );
  }

  if (!dashboard) {
    return <div className="p-8 text-muted-foreground">Dashboard não disponível.</div>;
  }

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
        <div className="rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50 to-emerald-100/40 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
              <TrendingUp size={16} className="text-emerald-600" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700/70">
              Receita total
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {formatPrice(dashboard.totalRevenueSucceededCents)}
          </p>
          <p className="mt-1 text-xs text-emerald-700/50">
            pagamentos confirmados
          </p>
        </div>

        <div className="rounded-xl border border-sky-200/60 bg-gradient-to-br from-sky-50 to-sky-100/40 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500/15">
              <Users size={16} className="text-sky-600" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-700/70">
              Alunos pagantes
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {dashboard.totalPaidStudents}
          </p>
          <p className="mt-1 text-xs text-sky-700/50">
            matrículas pagas no total
          </p>
        </div>

        <div className="rounded-xl border border-violet-200/60 bg-gradient-to-br from-violet-50 to-violet-100/40 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/15">
              <BookOpen size={16} className="text-violet-600" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-700/70">
              Aulões criados
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {dashboard.totalClasses}
          </p>
          <p className="mt-1 text-xs text-violet-700/50">
            ao longo do tempo
          </p>
        </div>

        <div className="rounded-xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-amber-100/40 p-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15">
              <Radio size={16} className="text-amber-600" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700/70">
              Publicados
            </p>
          </div>
          <p className="mt-3 font-display text-4xl text-foreground">
            {dashboard.publishedClasses}
          </p>
          <p className="mt-1 text-xs text-amber-700/50">
            ativos agora
          </p>
        </div>
      </div>

      {/* Per-class breakdown */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
            Aulões . Desempenho
          </p>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <div className="flex flex-col gap-2">
          {dashboard.rows.map(({ classEvent, institution, subject, paidEnrollments, revenueSucceededCents }) => {
            const pub = publicationConfig[classEvent.publicationStatus] ?? publicationConfig.DRAFT;

            return (
              <div
                key={classEvent.id}
                className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-surface/80 sm:flex-row sm:items-center sm:gap-6"
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
                    {institution?.shortName} . {subject?.name}
                  </p>
                </div>

                {/* Metrics */}
                <div className="flex shrink-0 flex-wrap items-center gap-4">
                  <div className="text-right">
                    <p className="font-display text-xl text-emerald-600">
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
