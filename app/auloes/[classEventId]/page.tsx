import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/status-pill";
import {
  getClassEventById,
  getEnrollmentForStudent,
  getInstitutionById,
  getStudentAccessState,
  getSubjectById,
  getTeacherById,
  isClassSoldOut,
  viewer,
} from "@/lib/domain";
import { formatLongDate, formatPrice, formatTime } from "@/lib/format";

type PageProps = {
  params: Promise<{ classEventId: string }>;
};

const accessCopy = {
  NEEDS_PURCHASE: {
    title: "Reserva aberta",
    description:
      "Garanta acesso ao encontro. Depois da confirmacao, voce entra na agenda pessoal.",
    action: "Reservar vaga",
    tone: "default" as const,
  },
  PENDING_PAYMENT: {
    title: "Pagamento em analise",
    description:
      "Seu pedido existe, mas o acesso sera confirmado assim que o pagamento for compensado.",
    action: "Finalizar pagamento",
    tone: "warn" as const,
  },
  WAITING_RELEASE: {
    title: "Encontro confirmado",
    description:
      "Sua vaga esta garantida. O botao de entrada libera no horario da aula e com link publicado.",
    action: "Aguardando abertura",
    tone: "muted" as const,
  },
  CAN_ENTER: {
    title: "Aula liberada",
    description:
      "Requisitos de acesso atendidos. Entre na sala ao vivo para iniciar o encontro.",
    action: "Entrar na aula",
    tone: "success" as const,
  },
};

export default async function ClassEventPage({ params }: PageProps) {
  const { classEventId } = await params;
  const classEvent = getClassEventById(classEventId);

  if (!classEvent || classEvent.publicationStatus !== "PUBLISHED") {
    notFound();
  }

  const institution = getInstitutionById(classEvent.institutionId);
  const subject = getSubjectById(classEvent.subjectId);
  const teacher = getTeacherById(classEvent.teacherProfileId);
  const enrollment = getEnrollmentForStudent(classEvent.id, viewer.studentProfileId);
  const accessState = getStudentAccessState({ classEvent, enrollment });
  const soldOut = isClassSoldOut(classEvent);

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Link
          href={`/instituicoes/${classEvent.institutionId}`}
          className="inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-blue)] transition-transform duration-200 hover:translate-x-1"
        >
          Voltar para {institution?.name}
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill tone="default">{institution?.shortName}</StatusPill>
          <StatusPill tone="muted">{subject?.name}</StatusPill>
          <StatusPill tone={soldOut ? "warn" : "success"}>
            {soldOut ? "Esgotado" : "Vagas ativas"}
          </StatusPill>
        </div>
      </div>

      <section className="panel grid gap-8 p-6 sm:grid-cols-[1.2fr,0.8fr] sm:p-10">
        <div className="space-y-5">
          <h1 className="font-display text-4xl leading-tight text-[var(--text-strong)] sm:text-5xl">
            {classEvent.title}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed">{classEvent.description}</p>
          <div className="flex items-start gap-4 rounded-2xl border border-[var(--line-muted)] bg-white/80 p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--brand-blue-soft)] font-semibold text-[var(--brand-blue)]">
              {teacher?.photo}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7d8690]">
                Professor convidado
              </p>
              <p className="font-semibold text-[var(--text-strong)]">
                {teacher?.headline}
              </p>
              <p className="mt-1 text-sm text-[#65717d]">{teacher?.bio}</p>
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-[var(--line-muted)] bg-white p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7d8690]">
            Horario do encontro
          </p>
          <p className="font-display text-3xl leading-none text-[var(--text-strong)]">
            {formatTime(classEvent.startsAt)}
          </p>
          <p className="text-sm text-[#66717c]">{formatLongDate(classEvent.startsAt)}</p>
          <div className="h-px bg-[var(--line-muted)]" />
          <div className="flex items-baseline justify-between">
            <p className="text-sm text-[#77818c]">Investimento</p>
            <p className="font-display text-3xl text-[var(--text-strong)]">
              {formatPrice(classEvent.priceCents)}
            </p>
          </div>
          <p className="text-sm text-[#66717c]">
            Duracao prevista de {classEvent.durationMin} minutos.
          </p>
        </aside>
      </section>

      <section className="panel p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <StatusPill tone={accessCopy[accessState].tone}>
              {accessCopy[accessState].title}
            </StatusPill>
            <p className="max-w-2xl text-sm leading-relaxed text-[#5f6874]">
              {accessCopy[accessState].description}
            </p>
          </div>

          {accessState === "CAN_ENTER" && classEvent.meetingUrl ? (
            <a
              href={classEvent.meetingUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-[var(--brand-accent)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#5b4300] transition-transform duration-200 hover:-translate-y-0.5"
            >
              {accessCopy[accessState].action}
            </a>
          ) : (
            <button
              className={`rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] ${
                accessState === "NEEDS_PURCHASE" || accessState === "PENDING_PAYMENT"
                  ? "bg-[var(--brand-accent)] text-[#5b4300] transition-transform duration-200 hover:-translate-y-0.5"
                  : "bg-[#f1f3f6] text-[#7b8490]"
              }`}
              type="button"
            >
              {accessCopy[accessState].action}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
