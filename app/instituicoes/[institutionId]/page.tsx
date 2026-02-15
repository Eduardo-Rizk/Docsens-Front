import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/status-pill";
import {
  getInstitutionById,
  getPublishedClassEventsByInstitution,
  getSubjectById,
  getTeacherById,
  isClassSoldOut,
} from "@/lib/domain";
import { formatLongDate, formatShortDate, formatTime, isToday } from "@/lib/format";

type PageProps = {
  params: Promise<{ institutionId: string }>;
  searchParams: Promise<{ subject?: string; availability?: string }>;
};

export default async function InstitutionPage({
  params,
  searchParams,
}: PageProps) {
  const { institutionId } = await params;
  const filters = await searchParams;
  const institution = getInstitutionById(institutionId);

  if (!institution) {
    notFound();
  }

  const allEvents = getPublishedClassEventsByInstitution(institutionId);
  const availableSubjects = Array.from(
    new Set(allEvents.map((event) => event.subjectId)),
  )
    .map((subjectId) => getSubjectById(subjectId))
    .filter((subject): subject is NonNullable<typeof subject> => Boolean(subject));

  const filteredEvents = allEvents.filter((event) => {
    const subjectMatch = filters.subject
      ? event.subjectId === filters.subject
      : true;

    const availabilityMatch =
      filters.availability === "open"
        ? !isClassSoldOut(event)
        : filters.availability === "soldout"
          ? isClassSoldOut(event)
          : true;

    return subjectMatch && availabilityMatch;
  });

  const makeFilterHref = (next: { subject?: string; availability?: string }) => {
    const query = new URLSearchParams();
    if (next.subject) {
      query.set("subject", next.subject);
    }
    if (next.availability) {
      query.set("availability", next.availability);
    }

    const suffix = query.size ? `?${query.toString()}` : "";
    return `/instituicoes/${institutionId}${suffix}`;
  };

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <Link
          href="/"
          className="inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-blue)] transition-transform duration-200 hover:translate-x-1"
        >
          Voltar para instituicoes
        </Link>
        <h1 className="font-display text-4xl leading-tight text-[var(--text-strong)] sm:text-5xl">
          {institution.name}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Auloes publicados para esta instituicao. Cada item funciona como
          convite para um encontro academico ao vivo.
        </p>
      </header>

      <details className="panel group p-5 sm:p-6" open>
        <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
          Refinar selecao
        </summary>
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Link
              href={makeFilterHref({ availability: filters.availability })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-transform duration-200 hover:-translate-y-0.5 ${
                !filters.subject
                  ? "bg-[var(--brand-blue)] text-white"
                  : "bg-[#eef3fa] text-[#5f6c7b]"
              }`}
            >
              Todos os temas
            </Link>
            {availableSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={makeFilterHref({
                  subject: subject.id,
                  availability: filters.availability,
                })}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-transform duration-200 hover:-translate-y-0.5 ${
                  filters.subject === subject.id
                    ? "bg-[var(--brand-blue)] text-white"
                    : "bg-[#eef3fa] text-[#5f6c7b]"
                }`}
              >
                {subject.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href={makeFilterHref({ subject: filters.subject })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-transform duration-200 hover:-translate-y-0.5 ${
                !filters.availability
                  ? "bg-[var(--brand-accent)] text-[#5d4300]"
                  : "bg-[#fff7e0] text-[#8f6b08]"
              }`}
            >
              Todos os estados
            </Link>
            <Link
              href={makeFilterHref({
                subject: filters.subject,
                availability: "open",
              })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-transform duration-200 hover:-translate-y-0.5 ${
                filters.availability === "open"
                  ? "bg-[var(--brand-accent)] text-[#5d4300]"
                  : "bg-[#fff7e0] text-[#8f6b08]"
              }`}
            >
              Com vagas
            </Link>
            <Link
              href={makeFilterHref({
                subject: filters.subject,
                availability: "soldout",
              })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition-transform duration-200 hover:-translate-y-0.5 ${
                filters.availability === "soldout"
                  ? "bg-[var(--brand-accent)] text-[#5d4300]"
                  : "bg-[#fff7e0] text-[#8f6b08]"
              }`}
            >
              Esgotados
            </Link>
          </div>
        </div>
      </details>

      <section className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="panel p-8 text-center">
            <p className="font-display text-3xl text-[var(--text-strong)]">
              Nenhum encontro encontrado
            </p>
            <p className="mt-2 text-sm text-[#6b7280]">
              Ajuste os filtros para revelar novas combinacoes de tema e
              disponibilidade.
            </p>
          </div>
        ) : (
          filteredEvents.map((event) => {
            const teacher = getTeacherById(event.teacherProfileId);
            const subject = getSubjectById(event.subjectId);
            const soldOut = isClassSoldOut(event);

            return (
              <Link
                key={event.id}
                href={`/auloes/${event.id}`}
                className="event-link group"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7f8994]">
                    {isToday(event.startsAt) ? "Hoje" : formatShortDate(event.startsAt)}
                  </p>
                  <p className="font-display text-3xl leading-tight text-[var(--text-strong)]">
                    {formatTime(event.startsAt)}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-display text-2xl leading-tight text-[var(--text-strong)] transition-transform duration-200 group-hover:translate-x-1">
                    {event.title}
                  </p>
                  <p className="text-sm text-[#64707c]">
                    {teacher?.headline} • {subject?.name}
                  </p>
                  <p className="text-sm text-[#6f7984]">
                    {formatLongDate(event.startsAt)}
                  </p>
                </div>

                <div className="justify-self-end">
                  {soldOut ? (
                    <StatusPill tone="warn">Esgotado</StatusPill>
                  ) : (
                    <StatusPill tone="default">Aberto</StatusPill>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </section>
    </div>
  );
}
