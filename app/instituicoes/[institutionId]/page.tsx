import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Users } from "lucide-react";
import {
  getInstitutionById,
  getYearLevels,
  getTeachersBySubjectAndInstitution,
} from "@/lib/domain";
import { SubjectIcon } from "@/components/SubjectIcon";

type PageProps = {
  params: Promise<{ institutionId: string }>;
};

const SUBJECT_COLORS: Record<string, string> = {
  "sub-matematica": "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/60",
  "sub-calculo":    "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/60",
  "sub-fisica":     "from-blue-500/20 to-blue-500/5 border-blue-500/30 hover:border-blue-400/60",
  "sub-quimica":    "from-purple-500/20 to-purple-500/5 border-purple-500/30 hover:border-purple-400/60",
  "sub-biologia":   "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-400/60",
  "sub-historia":   "from-amber-500/20 to-amber-500/5 border-amber-500/30 hover:border-amber-400/60",
  "sub-geografia":  "from-orange-500/20 to-orange-500/5 border-orange-500/30 hover:border-orange-400/60",
  "sub-portugues":  "from-rose-500/20 to-rose-500/5 border-rose-500/30 hover:border-rose-400/60",
  "sub-literatura": "from-pink-500/20 to-pink-500/5 border-pink-500/30 hover:border-pink-400/60",
  "sub-redacao":    "from-rose-500/20 to-rose-500/5 border-rose-500/30 hover:border-rose-400/60",
  "sub-direito":    "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 hover:border-indigo-400/60",
  "sub-estatistica":"from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/60",
  "sub-ingles":     "from-sky-500/20 to-sky-500/5 border-sky-500/30 hover:border-sky-400/60",
};

const SUBJECT_ICON_COLORS: Record<string, string> = {
  "sub-matematica": "text-cyan-400",
  "sub-calculo":    "text-cyan-400",
  "sub-fisica":     "text-blue-400",
  "sub-quimica":    "text-purple-400",
  "sub-biologia":   "text-emerald-400",
  "sub-historia":   "text-amber-400",
  "sub-geografia":  "text-orange-400",
  "sub-portugues":  "text-rose-400",
  "sub-literatura": "text-pink-400",
  "sub-redacao":    "text-rose-400",
  "sub-direito":    "text-indigo-400",
  "sub-estatistica":"text-cyan-400",
  "sub-ingles":     "text-sky-400",
};

export default async function InstitutionPage({ params }: PageProps) {
  const { institutionId } = await params;
  const institution = getInstitutionById(institutionId);

  if (!institution) {
    notFound();
  }

  const yearLevels = getYearLevels(institutionId);

  return (
    <div className="space-y-14">
      {/* Header */}
      <header className="space-y-6">
        <Link
          href="/explorar"
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent transition-opacity duration-200 hover:opacity-70"
        >
          ← Voltar para instituições
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-block rounded-sm border border-border bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                {institution.type === "SCHOOL" ? "Ensino Médio" : "Graduação"}
              </span>
              <span className="text-xs text-muted-foreground">{institution.city}</span>
            </div>
            <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              {institution.name}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              Escolha a matéria para ver os professores disponíveis e agendar sua próxima aula.
            </p>
          </div>
        </div>

        {/* Accent divider */}
        <div className="h-px w-full bg-gradient-to-r from-brand-accent/40 via-brand-accent/10 to-transparent" />
      </header>

      {/* Year sections */}
      {yearLevels.length === 0 ? (
        <div className="rounded-sm border border-border bg-surface p-12 text-center">
          <p className="font-display text-2xl text-foreground">Nenhuma matéria cadastrada</p>
          <p className="mt-2 text-sm text-muted-foreground">Esta instituição ainda não possui matérias disponíveis.</p>
        </div>
      ) : (
        yearLevels.map((yearLevel) => (
          <section key={yearLevel.yearLabel} className="space-y-6">
            {/* Year label */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-1 bg-brand-accent" />
                <h2 className="font-display text-2xl text-foreground">
                  {yearLevel.yearLabel}
                </h2>
              </div>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-medium text-muted-foreground tabular-nums">
                {yearLevel.subjects.length} matérias
              </span>
            </div>

            {/* Subject grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {yearLevel.subjects.map((subject) => {
                const teachers = getTeachersBySubjectAndInstitution(institutionId, subject.id);
                const colorClass = SUBJECT_COLORS[subject.id] ?? "from-zinc-800/60 to-zinc-800/20 border-zinc-700/40 hover:border-zinc-500/60";
                const iconColorClass = SUBJECT_ICON_COLORS[subject.id] ?? "text-zinc-400";
                const hasTeachers = teachers.length > 0;

                return (
                  <Link
                    key={subject.id}
                    href={`/instituicoes/${institutionId}/materias/${subject.id}`}
                    className={`group relative flex flex-col gap-3 rounded-sm border bg-gradient-to-b p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/40 ${colorClass}`}
                  >
                    {/* Icon */}
                    <SubjectIcon name={subject.icon} size={22} className={iconColorClass} />

                    {/* Name */}
                    <div className="flex-1">
                      <p className="font-display text-base font-semibold leading-tight text-foreground">
                        {subject.name}
                      </p>
                    </div>

                    {/* Teachers count + arrow */}
                    <div className="flex items-center justify-between">
                      {hasTeachers ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                          <Users size={11} />
                          {teachers.length} professor{teachers.length !== 1 ? "es" : ""}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground/60">Em breve</span>
                      )}
                      <ChevronRight
                        size={14}
                        className="text-muted-foreground/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-muted-foreground"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
