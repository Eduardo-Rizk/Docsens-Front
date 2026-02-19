import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, Calendar, Clock, ArrowUpRight } from "lucide-react";
import {
  getInstitutionById,
  getSubjectById,
  getTeachersBySubjectAndInstitution,
  getNextClassEventForTeacher,
  getClassEventsBySubjectAndInstitution,
  isClassSoldOut,
} from "@/lib/domain";
import { formatLongDate, formatPrice, formatTime } from "@/lib/format";

type PageProps = {
  params: Promise<{ institutionId: string; subjectId: string }>;
};

const AVATAR_COLORS = [
  "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "bg-rose-500/20 text-rose-300 border-rose-500/30",
];

export default async function SubjectPage({ params }: PageProps) {
  const { institutionId, subjectId } = await params;

  const institution = getInstitutionById(institutionId);
  const subject = getSubjectById(subjectId);

  if (!institution || !subject) {
    notFound();
  }

  const teachers = getTeachersBySubjectAndInstitution(institutionId, subjectId);
  const allEvents = getClassEventsBySubjectAndInstitution(institutionId, subjectId);

  return (
    <div className="space-y-12">
      {/* Breadcrumb + Header */}
      <header className="space-y-5">
        <Link
          href={`/instituicoes/${institutionId}`}
          className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent transition-opacity duration-200 hover:opacity-70"
        >
          ← {institution.shortName}
        </Link>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-block rounded-sm border border-border bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {institution.type === "SCHOOL" ? "Ensino Médio" : "Graduação"}
            </span>
            <span className="text-xs text-muted-foreground">{institution.name}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl" aria-hidden>{subject.icon ?? "◆"}</span>
            <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
              {subject.name}
            </h1>
          </div>

          <p className="text-base text-muted-foreground">
            {teachers.length > 0
              ? `${teachers.length} professor${teachers.length !== 1 ? "es" : ""} disponíve${teachers.length !== 1 ? "is" : "l"} · ${allEvents.length} aula${allEvents.length !== 1 ? "s" : ""} publicada${allEvents.length !== 1 ? "s" : ""}`
              : "Nenhum professor disponível no momento."}
          </p>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-brand-accent/40 via-brand-accent/10 to-transparent" />
      </header>

      {/* Teacher cards */}
      {teachers.length === 0 ? (
        <div className="rounded-sm border border-border bg-surface p-12 text-center">
          <p className="font-display text-2xl text-foreground">Nenhum professor cadastrado</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Ainda não há professores com aulas publicadas para esta matéria.
          </p>
          <Link
            href={`/instituicoes/${institutionId}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:opacity-70"
          >
            Ver outras matérias
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => {
            const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
            const nextEvent = getNextClassEventForTeacher(institutionId, subjectId, teacher.id);
            const teacherEvents = allEvents.filter((e) => e.teacherProfileId === teacher.id);
            const openCount = teacherEvents.filter((e) => !isClassSoldOut(e)).length;

            return (
              <div
                key={teacher.id}
                className="group flex flex-col gap-5 rounded-sm border border-border bg-surface p-6 transition-all duration-200 hover:border-border/80 hover:bg-zinc-900/60"
              >
                {/* Avatar + name */}
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border text-sm font-bold ${avatarColor}`}
                  >
                    {teacher.photo}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate font-semibold text-foreground">
                        {teacher.headline}
                      </p>
                      {teacher.isVerified && (
                        <BadgeCheck size={14} className="shrink-0 text-brand-accent" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {teacherEvents.length} aula{teacherEvents.length !== 1 ? "s" : ""} publicada{teacherEvents.length !== 1 ? "s" : ""}
                      {openCount > 0 && (
                        <span className="ml-1.5 text-emerald-400">· {openCount} com vaga</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {teacher.bio}
                </p>

                {/* Next class preview */}
                {nextEvent ? (
                  <div className="rounded-sm border border-border/60 bg-background/40 p-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/70">
                      Próxima aula
                    </p>
                    <p className="line-clamp-1 text-sm font-medium text-foreground">
                      {nextEvent.title}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {formatLongDate(nextEvent.startsAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {formatTime(nextEvent.startsAt)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-display text-base text-foreground">
                        {formatPrice(nextEvent.priceCents)}
                      </span>
                      {isClassSoldOut(nextEvent) && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                          Esgotado
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-sm border border-border/40 bg-background/20 p-3">
                    <p className="text-xs text-muted-foreground/60">Sem próximas aulas agendadas</p>
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto flex flex-col gap-2">
                  {teacherEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/auloes/${event.id}`}
                      className={`flex items-center justify-between rounded-sm border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                        isClassSoldOut(event)
                          ? "border-border bg-transparent text-muted-foreground/50 cursor-not-allowed pointer-events-none"
                          : "border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/20"
                      }`}
                    >
                      <span className="truncate">{event.title.length > 40 ? event.title.slice(0, 40) + "…" : event.title}</span>
                      <ArrowUpRight size={12} className="shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
