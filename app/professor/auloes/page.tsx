import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import {
  getInstitutionById,
  getSubjectById,
  getTeacherById,
  getTeacherClasses,
  viewer,
} from "@/lib/domain";
import { formatLongDate, formatTime } from "@/lib/format";

const publicationLabels = {
  DRAFT: { label: "Rascunho", tone: "muted" as const },
  PUBLISHED: { label: "Publicado", tone: "default" as const },
  FINISHED: { label: "Finalizado", tone: "success" as const },
};

export default function TeacherPage() {
  const teacher = getTeacherById(viewer.teacherProfileId);
  const classes = getTeacherClasses(viewer.teacherProfileId);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-blue)]">
          Area do Professor
        </p>
        <h1 className="font-display text-4xl leading-tight text-[var(--text-strong)] sm:text-5xl">
          Publicacao de auloes
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Fluxo editorial para preparar encontros, definir horario e acompanhar
          o estado de publicacao.
        </p>
      </header>

      <section className="panel p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              Novo encontro
            </p>
            <h2 className="font-display text-3xl text-[var(--text-strong)]">
              Estruturar aulao antes de publicar
            </h2>
            <p className="text-sm leading-relaxed text-[#5f6975]">
              Prof. {teacher?.headline}. O bloco abaixo serve como composicao de
              pauta, com foco em clareza academica e tempo de encontro.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-[var(--line-muted)] bg-white p-4">
            <div className="rounded-xl border border-[var(--line-muted)] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#74808c]">
                Titulo do aulao
              </p>
              <p className="mt-1 font-medium text-[var(--text-strong)]">
                Laboratorio de Casos Publicos
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--line-muted)] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#74808c]">
                  Instituicao
                </p>
                <p className="mt-1 font-medium text-[var(--text-strong)]">FGV</p>
              </div>
              <div className="rounded-xl border border-[var(--line-muted)] p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#74808c]">
                  Tema
                </p>
                <p className="mt-1 font-medium text-[var(--text-strong)]">
                  Direito Constitucional
                </p>
              </div>
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#5b4300] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Publicar agenda
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        {classes.map((classEvent) => {
          const subject = getSubjectById(classEvent.subjectId);
          const institution = getInstitutionById(classEvent.institutionId);
          const publication = publicationLabels[classEvent.publicationStatus];

          return (
            <article key={classEvent.id} className="event-link !grid-cols-[90px,1fr,auto]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7a8490]">
                  {formatLongDate(classEvent.startsAt)}
                </p>
                <p className="font-display text-3xl leading-none text-[var(--text-strong)]">
                  {formatTime(classEvent.startsAt)}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-display text-2xl leading-tight text-[var(--text-strong)]">
                  {classEvent.title}
                </p>
                <p className="text-sm text-[#65717d]">
                  {institution?.shortName} • {subject?.name}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <StatusPill tone={publication.tone}>{publication.label}</StatusPill>
                <Link
                  href={`/auloes/${classEvent.id}`}
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-blue)] transition-transform duration-200 hover:translate-x-1"
                >
                  Ver pagina
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
