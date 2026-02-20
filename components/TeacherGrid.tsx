"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, Calendar, Clock, ArrowUpRight, Users } from "lucide-react";
import { formatLongDate, formatPrice, formatTime } from "@/lib/format";
import type { ClassEvent } from "@/lib/domain";

export type TeacherCardData = {
  id: string;
  photo: string;
  headline: string;
  bio: string;
  isVerified: boolean;
  userName: string;
  avatarColor: string;
  avatarTextColor: string;
  accentHex: string;
  nextEvent: ClassEvent | undefined;
  events: ClassEvent[];
  openCount: number;
};

function isSoldOut(event: ClassEvent) {
  return event.soldSeats >= event.capacity;
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({
  teachers,
  selected,
  onSelect,
}: {
  teachers: TeacherCardData[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  if (teachers.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60 mr-1">
        Filtrar por
      </span>

      <button
        onClick={() => onSelect(null)}
        className={`relative rounded-sm border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-150 ${
          selected === null
            ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
            : "border-border text-muted-foreground hover:border-zinc-600 hover:text-foreground"
        }`}
      >
        Todos
      </button>

      {teachers.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(selected === t.id ? null : t.id)}
          className={`relative rounded-sm border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-150 ${
            selected === t.id
              ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
              : "border-border text-muted-foreground hover:border-zinc-600 hover:text-foreground"
          }`}
        >
          {t.userName}
        </button>
      ))}
    </div>
  );
}

// ─── Teacher Card ─────────────────────────────────────────────────────────────

function TeacherCard({ teacher }: { teacher: TeacherCardData }) {
  const next = teacher.nextEvent;

  return (
    <article className="group relative flex flex-col rounded-sm border border-border bg-surface transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/60 overflow-hidden">
      {/* Accent top bar */}
      <div
        className="h-[2px] w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${teacher.accentHex}80, transparent)` }}
      />

      <div className="flex flex-col gap-5 p-6 flex-1">
        {/* ── Teacher identity ────────────────────── */}
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border text-sm font-bold ${teacher.avatarColor}`}
          >
            {teacher.photo}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            {/* NAME — hero element */}
            <div className="flex items-center gap-1.5">
              <h3 className="font-display text-xl leading-tight text-foreground truncate">
                {teacher.userName}
              </h3>
              {teacher.isVerified && (
                <BadgeCheck size={16} className="shrink-0 text-brand-accent" />
              )}
            </div>

            {/* Headline — specialization in accent */}
            <p
              className="mt-0.5 text-xs font-medium leading-snug"
              style={{ color: teacher.accentHex }}
            >
              {teacher.headline}
            </p>

            {/* Stats */}
            <p className="mt-1.5 text-[11px] text-muted-foreground">
              {teacher.events.length} aula{teacher.events.length !== 1 ? "s" : ""} publicada
              {teacher.events.length !== 1 ? "s" : ""}
              {teacher.openCount > 0 && (
                <span className="ml-1.5 text-emerald-400">
                  · {teacher.openCount} com vaga
                </span>
              )}
            </p>
          </div>
        </div>

        {/* ── Bio ─────────────────────────────────── */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {teacher.bio}
        </p>

        {/* ── Next class ──────────────────────────── */}
        {next ? (
          <div className="rounded-sm border border-border/60 bg-background/50 p-4 space-y-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              Próxima aula
            </p>

            {/* Class title + description */}
            <div className="space-y-1">
              <p className="text-sm font-semibold leading-snug text-foreground line-clamp-1">
                {next.title}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                {next.description}
              </p>
            </div>

            {/* Date + time */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {formatLongDate(next.startsAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {formatTime(next.startsAt)}
              </span>
            </div>

            {/* Price + availability */}
            <div className="flex items-center justify-between pt-0.5">
              <span className="font-display text-lg text-foreground">
                {formatPrice(next.priceCents)}
              </span>
              {isSoldOut(next) ? (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Esgotado
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400">
                  <Users size={10} />
                  {next.capacity - next.soldSeats} vaga{next.capacity - next.soldSeats !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-sm border border-border/30 bg-background/20 p-3">
            <p className="text-xs text-muted-foreground/50">Sem próximas aulas agendadas</p>
          </div>
        )}

        {/* ── CTAs ────────────────────────────────── */}
        <div className="mt-auto flex flex-col gap-2">
          {teacher.events.map((event) => {
            const sold = isSoldOut(event);
            return (
              <Link
                key={event.id}
                href={`/auloes/${event.id}`}
                className={`flex items-center justify-between rounded-sm border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 ${
                  sold
                    ? "pointer-events-none cursor-not-allowed border-border bg-transparent text-muted-foreground/40"
                    : "border-brand-accent/30 bg-brand-accent/5 text-brand-accent hover:bg-brand-accent/15"
                }`}
              >
                <span className="truncate">
                  {event.title.length > 42 ? event.title.slice(0, 42) + "…" : event.title}
                </span>
                <ArrowUpRight size={12} className="ml-2 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </article>
  );
}

// ─── Root Export ─────────────────────────────────────────────────────────────

export function TeacherGrid({
  teachers,
}: {
  teachers: TeacherCardData[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const visible = selected ? teachers.filter((t) => t.id === selected) : teachers;

  return (
    <div className="space-y-6">
      <FilterBar teachers={teachers} selected={selected} onSelect={setSelected} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
          <TeacherCard key={t.id} teacher={t} />
        ))}
      </div>
    </div>
  );
}
