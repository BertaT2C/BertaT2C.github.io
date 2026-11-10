import { useState } from "react";
import { ArrowUpRight, Eye, MousePointerClick } from "lucide-react";
import { casesForArea, competencyAreas, projects, type Project } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectDialog } from "./ProjectDialog";
import { cn } from "@/lib/utils";

export function Competencies() {
  const [selectedAreaCode, setSelectedAreaCode] = useState<string | null>("A.01");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const selectedArea = competencyAreas.find((area) => area.code === selectedAreaCode);
  const selectedCases = selectedArea ? casesForArea(selectedArea) : [];

  return (
    <section id="competencias" className="relative border-b">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 2xl:px-12 md:py-28">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Competências por área"
            title={
              <>
                Um repertório organizado <span className="marker">por área de análise</span>.
              </>
            }
          >
            Selecione uma área para visualizar os estudos de caso em que essas competências
            foram aplicadas. Você também pode pré-visualizar cada projeto.
          </SectionHeading>
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {competencyAreas.map((area, idx) => {
            const cases = casesForArea(area);
            const ratio = cases.length / projects.length;
            const isSelected = selectedAreaCode === area.code;

            return (
              <Reveal key={area.code} delay={idx * 90} className="h-full">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-controls="competency-related-cases"
                  onClick={() => setSelectedAreaCode(isSelected ? null : area.code)}
                  className={cn(
                    "group flex h-full w-full min-w-0 flex-col rounded-xl border bg-card p-6 text-left shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-lift focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:p-7",
                    isSelected && "border-primary ring-2 ring-primary/20 shadow-lift",
                  )}
                >
                  <span className="flex w-full items-center justify-between gap-2">
                    <span className="tabular text-xs font-semibold text-muted-foreground">{area.code}</span>
                    <span
                      className={cn(
                        "flex items-center gap-1 text-xs font-semibold",
                        isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                      )}
                    >
                      <MousePointerClick className="size-4" aria-hidden="true" />
                      {isSelected ? "Selecionada" : "Explorar"}
                    </span>
                  </span>

                  <span className="mt-3 font-display text-xl font-semibold leading-tight">{area.title}</span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.description}</span>

                  <span className="mt-6 block w-full">
                    <span className="flex items-baseline justify-between gap-2 text-xs">
                      <span className="font-medium text-muted-foreground">Aplicada em</span>
                      <span className="tabular font-display text-sm font-semibold">
                        {cases.length} de {projects.length} casos
                      </span>
                    </span>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-muted">
                      <span
                        className="meter-grow block h-full rounded-full bg-accent"
                        style={{
                          width: `${ratio * 100}%`,
                          "--bar-delay": `${200 + idx * 120}ms`,
                        } as React.CSSProperties}
                      />
                    </span>
                    <span className="mt-3 flex flex-wrap gap-1" aria-label="Números dos casos vinculados à área">
                      {projects.map((p) => {
                        const on = cases.some((related) => related.slug === p.slug);
                        return (
                          <span
                            key={p.slug}
                            title={p.title}
                            className={cn(
                              "tabular rounded px-1.5 py-0.5 text-[0.65rem] font-semibold",
                              on ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground/60",
                            )}
                          >
                            {p.number}
                          </span>
                        );
                      })}
                    </span>
                  </span>

                  <span className="mt-6 flex flex-wrap gap-1.5 border-t pt-5">
                    {area.items.map((item) => (
                      <span key={item} className="rounded border bg-background px-2 py-1 text-xs font-medium text-foreground">
                        {item}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto pt-5 text-sm font-semibold text-primary">
                    {isSelected ? "Ocultar estudos ↑" : "Ver estudos relacionados ↓"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div id="competency-related-cases" className="mt-6 scroll-mt-24" aria-live="polite">
          {selectedArea ? (
            <div className="rounded-xl border border-primary/20 bg-card p-5 shadow-soft sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Estudos vinculados à competência
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{selectedArea.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {selectedCases.length} {selectedCases.length === 1 ? "estudo relacionado" : "estudos relacionados"}.
                    Clique em pré-visualizar para ver o desafio, a abordagem e os indicadores.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAreaCode(null)}
                  className="rounded-md border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted"
                >
                  Fechar seleção
                </button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {selectedCases.map((project) => (
                  <article key={project.slug} className="flex min-w-0 flex-col rounded-lg border bg-background p-4">
                    <span className="tabular text-xs font-semibold text-primary">Caso {project.number}</span>
                    <h4 className="mt-2 font-display text-base font-semibold">{project.title}</h4>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 border-t pt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      >
                        <Eye className="size-4" aria-hidden="true" /> Pré-visualizar
                      </button>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                      >
                        Estudo completo <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <p className="rounded-lg border border-dashed bg-card p-5 text-center text-sm text-muted-foreground">
              Selecione uma das áreas acima para explorar os projetos correspondentes.
            </p>
          )}
        </div>
      </div>
      <ProjectDialog project={selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)} />
    </section>
  );
}
