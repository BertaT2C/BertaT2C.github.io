import { useState } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
import { filterProjects, groups, projects, type Project, type ProjectGroup } from "@/data/projects";
import { Reveal } from "./Reveal";
import { ProjectDialog } from "./ProjectDialog";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function Projects() {
  const [group, setGroup] = useState<"todos" | ProjectGroup>("todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const list = filterProjects(projects, group);

  return (
    <section id="projetos" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
      <Reveal className="flex flex-col gap-8">
        <SectionHeading
          index="02"
          eyebrow="Estudos de caso"
          title={
            <>
              Problema, análise e <span className="marker">resultado</span>.
            </>
          }
        >
          Cada caso parte de uma pergunta de negócio e mostra o raciocínio, os artefatos e os
          indicadores usados para avaliar a solução.
        </SectionHeading>

        <div
          role="tablist"
          aria-label="Filtrar estudos de caso"
          className="flex w-fit max-w-full flex-wrap gap-1 rounded-lg border bg-card p-1"
        >
          {groups.map((g) => {
            const count = filterProjects(projects, g.id).length;
            const isActive = group === g.id;
            return (
              <button
                key={g.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setGroup(g.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {g.label}
                <span
                  className={cn(
                    "tabular text-xs",
                    isActive ? "text-accent" : "text-muted-foreground/70",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div key={group} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, idx) => {
          const kpi = p.metrics?.[0];
          return (
            <article
              key={p.slug}
              className="card-in group relative flex flex-col rounded-xl border bg-card p-6 shadow-soft transition-all duration-300 hover:border-primary/50 hover:shadow-lift"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="flex items-center justify-between gap-3 text-xs">
                <span className="tabular font-semibold uppercase tracking-wider text-muted-foreground">
                  Caso {p.number}
                </span>
                <span className="rounded bg-secondary px-2 py-1 font-semibold text-secondary-foreground">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-muted-foreground">
                {p.summary}
              </p>

              {kpi && (
                <div className="mt-5 flex items-center gap-4 rounded-lg border-l-2 border-accent bg-muted/70 px-4 py-3">
                  <span className="tabular shrink-0 whitespace-nowrap font-display text-lg font-semibold text-primary">
                    {kpi.value}
                  </span>
                  <span className="text-xs leading-snug text-muted-foreground">{kpi.label}</span>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.skills.slice(0, 3).map((s) => (
                  <span key={s} className="rounded border px-2 py-0.5 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-4 border-t pt-4">
                <button
                  onClick={() => setSelected(p)}
                  className="flex items-center gap-2 text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-xl after:content-['']"
                >
                  <Eye className="size-4" /> Pré-visualizar
                </button>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 ml-auto flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Estudo completo
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <Reveal className="mt-10 rounded-lg border border-dashed bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Nota de confidencialidade.</strong> Por questões de NDA,
        alguns projetos foram anonimizados ou recriados com cenários e indicadores ilustrativos. O
        objetivo é demonstrar raciocínio estratégico, metodologia e capacidade de execução; métricas
        de impacto real podem ser detalhadas numa conversa direta.
      </Reveal>

      <ProjectDialog project={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </section>
  );
}