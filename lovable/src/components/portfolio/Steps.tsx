import { Fragment, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight } from "lucide-react";
import { projects, steps } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function Steps() {
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0];
  const example = projects.find((p) => p.slug === step.example);

  return (
    <section id="como-atuo" className="bg-deep-gradient relative overflow-hidden text-deep-foreground">
      <div aria-hidden className="bg-grid-deep absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 2xl:px-12 md:py-28">
        <Reveal>
          <SectionHeading
            index="03"
            tone="deep"
            eyebrow="Como atuo"
            title={
              <>
                Um fluxo de trabalho <span className="text-accent">do problema à solução validada</span>.
              </>
            }
          >
            Clique numa etapa do fluxo para ver as atividades e um exemplo aplicado.
          </SectionHeading>
        </Reveal>

        {/* Diagrama de processo */}
        <Reveal delay={100} className="mt-14">
          <ol className="flex flex-col items-stretch md:flex-row md:items-center">
            <li className="flex items-center gap-3 md:flex-col md:gap-2" aria-hidden>
              <span className="size-9 rounded-full border-2 border-deep-muted" />
              <span className="text-xs lg:text-sm text-deep-muted">Demanda</span>
            </li>

            {steps.map((s, i) => (
              <Fragment key={s.n}>
                <Connector done={i <= active} />
                <li className="md:flex-1">
                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={cn(
                      "w-full rounded-lg border p-4 text-left transition-all duration-300",
                      active === i
                        ? "border-accent bg-accent/10 shadow-lift"
                        : i < active
                          ? "border-deep-muted/40 bg-deep-raised/60 hover:border-deep-muted"
                          : "border-deep-line bg-deep-raised/40 hover:border-deep-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "tabular text-xs lg:text-sm font-semibold",
                        active === i ? "text-accent" : "text-deep-muted",
                      )}
                    >
                      Etapa {s.n.padStart(2, "0")}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold">{s.title}</span>
                  </button>
                </li>
              </Fragment>
            ))}

            <Connector done={active === steps.length - 1} />
            <li className="flex items-center gap-3 md:flex-col md:gap-2" aria-hidden>
              <span
                className={cn(
                  "size-9 rounded-full border-4 transition-colors duration-300",
                  active === steps.length - 1 ? "border-accent" : "border-deep-muted",
                )}
              />
              <span className="text-xs lg:text-sm text-deep-muted">Resultado</span>
            </li>
          </ol>
        </Reveal>

        {/* Detalhe da etapa */}
        <Reveal delay={180} className="mt-10">
          <div
            key={active}
            className="card-in grid gap-8 rounded-xl bg-card p-7 text-card-foreground shadow-lift md:grid-cols-[1fr_1.3fr] md:p-10"
          >
            <div className="flex flex-col">
              <p className="tabular text-xs lg:text-sm font-semibold uppercase tracking-wider text-primary">
                Etapa {step.n} de {steps.length}
              </p>
              <h3 className="mt-3 text-3xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{step.short}</p>
              <div className="mt-auto flex gap-2 pt-8">
                <button
                  onClick={() => setActive((v) => Math.max(0, v - 1))}
                  disabled={active === 0}
                  aria-label="Etapa anterior"
                  className="flex size-10 items-center justify-center rounded-md border transition-colors hover:border-primary disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  onClick={() => setActive((v) => Math.min(steps.length - 1, v + 1))}
                  disabled={active === steps.length - 1}
                  aria-label="Próxima etapa"
                  className="flex size-10 items-center justify-center rounded-md border transition-colors hover:border-primary disabled:opacity-40"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs lg:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Atividades
              </p>
              <ul className="mt-4 divide-y border-y">
                {step.details.map((d) => (
                  <li key={d} className="flex items-start gap-3 py-3.5">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded bg-accent text-accent-foreground">
                      <Check className="size-3" />
                    </span>
                    <span className="font-medium">{d}</span>
                  </li>
                ))}
              </ul>

              {example && (
                <a
                  href={example.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-6 flex items-center justify-between gap-4 rounded-lg border bg-muted/60 p-4 transition-colors hover:border-primary"
                >
                  <span>
                    <span className="block text-xs lg:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Exemplo aplicado · Caso {example.number}
                    </span>
                    <span className="mt-1 block font-display text-lg font-semibold">{example.title}</span>
                  </span>
                  <ArrowUpRight className="size-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Connector({ done }: { done: boolean }) {
  return (
    <li aria-hidden className="flex items-center justify-center py-1 md:flex-[0_0_2.5rem] md:py-0">
      <span
        className={cn(
          "hidden h-px flex-1 transition-colors duration-500 md:block",
          done ? "bg-accent" : "bg-deep-line",
        )}
      />
      <ChevronRight
        className={cn("hidden size-4 -ml-1.5 md:block", done ? "text-accent" : "text-deep-muted")}
      />
      <ChevronDown className={cn("size-4 md:hidden", done ? "text-accent" : "text-deep-muted")} />
    </li>
  );
}