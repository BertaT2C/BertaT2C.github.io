import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ProjectDialog } from "./ProjectDialog";
import { cn } from "@/lib/utils";

export function Results() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [preview, setPreview] = useState<Project | null>(null);
  const touchX = useRef<number | null>(null);
  const current = projects[activeIndex];
  const total = projects.length;

  const change = (step: number) => {
    setActiveIndex((index) => (index + step + total) % total);
  };

  return (
    <section id="resultados" className="border-t border-border bg-background py-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 2xl:px-12">
        <div style={{ paddingBottom: "clamp(48px, 6vw, 80px)" }}>
          <Reveal>
            <a
            href="/gestao-de-mudancas.html"
            className="group flex flex-col gap-5 rounded-2xl border border-deep-line bg-deep-gradient p-6 text-deep-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:shadow-lift sm:p-9 md:flex-row md:items-center md:justify-between"
            aria-label="Acompanhe as mudanças deste portfólio"
          >
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-extrabold uppercase tracking-[0.15em] text-accent">
                  Portfólio em evolução
                </span>
                <span className="rounded-full border border-accent/50 px-3 py-1 text-xs text-accent">
                  Em breve: vídeos das evoluções
                </span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-accent sm:text-3xl">
                Veja o que mudou.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-deep-muted">
                Conheça as mudanças implementadas, as próximas melhorias e novos insights, os vídeos em preparação e o processo de gestão de mudanças.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition-colors group-hover:bg-accent/90">
              Acompanhe as mudanças <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </a>
          </Reveal>
        </div>

        <SectionHeading index="01" eyebrow="Indicadores de negócio" title="Eficiência, produtividade e automação.">
          Explore os seis estudos de caso em um carrossel. Cada projeto apresenta seus próprios
          indicadores, contexto e entregáveis.
        </SectionHeading>

        <Reveal className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground" aria-live="polite">
              <span className="tabular font-display font-bold text-primary">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              {" "}de{" "}
              <span className="tabular">{String(total).padStart(2, "0")}</span>
              {" "}· Selecione um estudo para explorar
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => change(-1)}
                aria-label="Ver estudo anterior"
                className="grid size-11 place-items-center rounded-full border bg-card text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => change(1)}
                aria-label="Ver próximo estudo"
                className="grid size-11 place-items-center rounded-full border bg-card text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <ArrowRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>

          <div
            className="rounded-2xl border bg-card shadow-soft focus-visible:outline-2 focus-visible:outline-primary"
            role="region"
            aria-label="Carrossel dos seis estudos de caso"
            aria-roledescription="carrossel"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                change(1);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                change(-1);
              }
            }}
            onTouchStart={(event) => { touchX.current = event.touches[0]?.clientX ?? null; }}
            onTouchEnd={(event) => {
              if (touchX.current === null) return;
              const endX = event.changedTouches[0]?.clientX ?? touchX.current;
              const distance = touchX.current - endX;
              if (Math.abs(distance) > 60) change(distance > 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <article key={current.slug} className="card-in overflow-hidden rounded-2xl">
              <div className="border-b bg-secondary/40 px-5 py-6 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="tabular text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Caso {current.number} · {current.tag}
                  </span>
                  <span className="rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-semibold text-primary">
                    {activeIndex + 1} / {total}
                  </span>
                </div>
                <h3 className="mt-3 max-w-3xl font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {current.summary}
                </p>
              </div>

              <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                <div className="flex flex-col">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">Desafio de negócio</p>
                  <p className="mt-3 font-display text-lg font-semibold leading-relaxed text-foreground">{current.question}</p>
                  <p className="mt-7 text-xs font-bold uppercase tracking-wider text-primary">Etapas e entregáveis</p>
                  <ol className="mt-3 flex flex-wrap gap-2">
                    {current.flow.map((step, index) => (
                      <li key={index} className="rounded-md border bg-muted/60 px-3 py-2 text-xs font-medium">
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-7 text-xs font-bold uppercase tracking-wider text-primary">Valor para a operação</p>
                  <ul className="mt-3 space-y-3">
                    {current.highlights.slice(0, 2).map((line, index) => (
                      <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex min-w-0 flex-col">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    {current.slug === "pdv" ? "Escopo de validação" : current.slug === "processos-rpa" ? "Solução implementada" : "Indicadores do estudo"}
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {current.metrics?.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex min-h-24 flex-col justify-between rounded-xl border border-border bg-muted/45 p-4"
                      >
                        <span className="text-sm leading-snug text-muted-foreground">{metric.label}</span>
                        <strong className="tabular mt-2 font-display text-xl font-semibold text-primary sm:text-2xl">
                          {metric.value}
                        </strong>
                      </div>
                    ))}
                  </div>
                  {current.metricsNote && (
                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{current.metricsNote}</p>
                  )}
                  <div className="mt-auto flex flex-wrap gap-4 pt-8">
                    <button
                      type="button"
                      onClick={() => setPreview(current)}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                    >
                      <Eye className="size-4" aria-hidden /> Pré-visualizar
                    </button>
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold text-primary hover:bg-secondary"
                    >
                      Estudo completo <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Selecionar estudo de caso">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                aria-label={"Ir para caso " + project.number + ": " + project.title}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "tabular grid size-10 place-items-center rounded-full border text-xs font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  activeIndex === index
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {project.number}
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Use as setas, os números dos casos ou deslize no celular para navegar.
          </p>
        </Reveal>


      </div>
      <ProjectDialog project={preview} onOpenChange={(open) => !open && setPreview(null)} />
    </section>
  );
}
