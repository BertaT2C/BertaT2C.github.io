import { useState } from "react";
import { ArrowUpRight, Eye } from "lucide-react";
import { filterProjects, groups, projects, type Project, type ProjectGroup } from "@/data/projects";
import { Reveal } from "./Reveal";
import { ProjectDialog } from "./ProjectDialog";
import { cn } from "@/lib/utils";

export function Projects() {
  const [group, setGroup] = useState<"todos" | ProjectGroup>("todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const list = filterProjects(projects, group);

  return (
    <section id="projetos" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Estudos de caso</p>
          <h2 className="mt-4 text-4xl font-medium md:text-5xl">
            Projetos com <span className="marker italic">raciocínio</span> visível.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Análise de negócios, jornadas digitais, automação, especificação funcional e
            acompanhamento de resultados. Clique num projeto para uma pré-visualização.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100} className="mt-10 flex flex-wrap gap-2" as="div">
        {groups.map((g) => {
          const count = filterProjects(projects, g.id).length;
          const isActive = group === g.id;
          return (
            <button
              key={g.id}
              onClick={() => setGroup(g.id)}
              aria-pressed={isActive}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground hover:border-primary hover:text-foreground",
              )}
            >
              {g.label}
              <span
                className={cn(
                  "rounded-full px-2 text-xs",
                  isActive ? "bg-accent text-accent-foreground" : "bg-muted",
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </Reveal>

      <div key={group} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, idx) => (
          <article
            key={p.slug}
            className="card-in group relative flex flex-col rounded-3xl border bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift"
            style={{ animationDelay: `${idx * 70}ms` }}
          >
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                {p.tag}
              </span>
              <span className="font-display text-3xl italic text-border transition-colors duration-500 group-hover:text-primary">
                {p.number}
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-medium">{p.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{p.summary}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {p.skills.slice(0, 3).map((s) => (
                <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4 border-t pt-5">
              <button
                onClick={() => setSelected(p)}
                className="flex items-center gap-2 text-sm font-bold text-primary after:absolute after:inset-0 after:rounded-3xl after:content-['']"
              >
                <Eye className="size-4" /> Pré-visualizar
              </button>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 ml-auto flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                Estudo completo
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <Reveal className="mt-12 rounded-2xl border border-dashed bg-muted/60 p-6 text-sm leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Nota de confidencialidade.</strong> Por questões de NDA,
        alguns projetos foram anonimizados ou recriados com cenários e indicadores ilustrativos. O
        objetivo é demonstrar raciocínio estratégico, metodologia e capacidade de execução; métricas
        de impacto real podem ser detalhadas numa conversa direta.
      </Reveal>

      <ProjectDialog project={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </section>
  );
}
