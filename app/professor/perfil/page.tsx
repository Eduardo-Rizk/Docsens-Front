"use client";

import { useState } from "react";
import { BadgeCheck, CheckCircle } from "lucide-react";
import { getTeacherById, getUserById, viewer } from "@/lib/domain";

const teacher = getTeacherById(viewer.teacherProfileId)!;
const user = getUserById(teacher.userId)!;

export default function TeacherPerfilPage() {
  const [photo, setPhoto] = useState(teacher.photo);
  const [headline, setHeadline] = useState(teacher.headline);
  const [bio, setBio] = useState(teacher.bio);
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-10">
      <header className="space-y-1">
        <h1 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
          Perfil
        </h1>
        <p className="text-base text-muted-foreground">
          Informações exibidas para alunos nas páginas de aula
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr,340px] lg:items-start">

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome (read-only) */}
          <div className="space-y-2">
            <label className="block text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
              Nome de exibição
            </label>
            <div className="flex items-center gap-3 rounded-sm border border-border/50 bg-surface/40 px-4 py-3">
              <p className="text-sm text-foreground">{user.name}</p>
              <span className="ml-auto text-[10px] text-muted-foreground/50">
                não editável
              </span>
            </div>
          </div>

          {/* Foto / Iniciais */}
          <div className="space-y-2">
            <label
              htmlFor="photo"
              className="block text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60"
            >
              Iniciais (avatar)
            </label>
            <input
              id="photo"
              type="text"
              maxLength={2}
              value={photo}
              onChange={(e) => setPhoto(e.target.value.toUpperCase())}
              className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm font-bold uppercase tracking-widest text-foreground placeholder:text-muted-foreground/50 focus:border-brand-accent/40 focus:outline-none focus:ring-1 focus:ring-brand-accent/20"
              placeholder="Ex: LC"
            />
            <p className="text-[10px] text-muted-foreground/50">
              Máximo 2 caracteres — aparece no avatar do card de professor
            </p>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <label
              htmlFor="headline"
              className="block text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60"
            >
              Especialidade
            </label>
            <input
              id="headline"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full rounded-sm border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand-accent/40 focus:outline-none focus:ring-1 focus:ring-brand-accent/20"
              placeholder="Ex: Direito e redação argumentativa"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label
              htmlFor="bio"
              className="block text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full resize-none rounded-sm border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:border-brand-accent/40 focus:outline-none focus:ring-1 focus:ring-brand-accent/20"
              placeholder="Descreva sua formação e experiência..."
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 rounded-sm bg-brand-accent px-6 py-3 text-sm font-bold uppercase tracking-wider text-black transition-all hover:brightness-110"
          >
            {saved ? (
              <>
                <CheckCircle size={14} />
                Salvo
              </>
            ) : (
              "Salvar alterações"
            )}
          </button>
        </form>

        {/* Live preview */}
        <div className="space-y-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
            Pré-visualização
          </p>
          <div className="flex items-start gap-5 rounded-sm border border-border bg-surface p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-cyan-500/30 bg-cyan-500/20 text-sm font-bold text-cyan-300">
              {photo || "??"}
            </div>
            <div className="min-w-0">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60">
                Professor
              </p>
              <div className="flex items-center gap-1.5">
                <p className="font-display text-xl text-foreground">{user.name}</p>
                {teacher.isVerified && (
                  <BadgeCheck size={16} className="shrink-0 text-brand-accent" />
                )}
              </div>
              <p className="mt-0.5 text-xs font-medium text-brand-accent/80">
                {headline || "Especialidade"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {bio || "Sua bio aparecerá aqui."}
              </p>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground/40">
            Assim os alunos veem seu card nas páginas de aulão
          </p>
        </div>
      </div>
    </div>
  );
}
