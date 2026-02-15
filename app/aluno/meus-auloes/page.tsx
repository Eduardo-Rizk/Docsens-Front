import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import {
  getInstitutionById,
  getStudentAgenda,
  getStudentAccessState,
  getTeacherById,
  viewer,
} from "@/lib/domain";
import { formatLongDate, formatTime, isToday } from "@/lib/format";

export default function StudentAgendaPage() {
  const agenda = getStudentAgenda(viewer.studentProfileId);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-blue)]">
          Area do Aluno
        </p>
        <h1 className="font-display text-4xl leading-tight text-[var(--text-strong)] sm:text-5xl">
          Minha agenda de auloes
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed">
          Sequencia cronologica dos encontros comprados, com destaque automatico
          para o que acontece hoje.
        </p>
      </header>

      <section className="space-y-3">
        {agenda.map(({ enrollment, classEvent }) => {
          const institution = getInstitutionById(classEvent.institutionId);
          const teacher = getTeacherById(classEvent.teacherProfileId);
          const access = getStudentAccessState({ classEvent, enrollment });
          const today = isToday(classEvent.startsAt);

          return (
            <Link
              key={enrollment.id}
              href={`/auloes/${classEvent.id}`}
              className={`event-link ${
                today
                  ? "border-[var(--brand-accent)] bg-[var(--brand-accent-soft)]"
                  : ""
              }`}
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6f7882]">
                  {today ? "Hoje" : formatLongDate(classEvent.startsAt)}
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
                  {institution?.shortName} • {teacher?.headline}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                {today && <StatusPill tone="warn">Destaque de hoje</StatusPill>}
                {access === "CAN_ENTER" ? (
                  <StatusPill tone="success">Entrar na aula</StatusPill>
                ) : access === "WAITING_RELEASE" ? (
                  <StatusPill tone="muted">Aguardando abertura</StatusPill>
                ) : access === "PENDING_PAYMENT" ? (
                  <StatusPill tone="warn">Pagamento pendente</StatusPill>
                ) : (
                  <StatusPill tone="default">Acesso por confirmar</StatusPill>
                )}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
