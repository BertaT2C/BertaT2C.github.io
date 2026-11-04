import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { projects, steps } from "@/data/projects";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Steps() {
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0];
  const example = projects.find((p) => p.slug === step.example);

  return (
    <section id="como-atuo" className="bg-deep-gradient text-deep-foreground">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Como atuo</p>
          <h2 className="mt-4 text-4xl font-medium md:text-5xl">
            Do problema à <span className="italic text-accent">solução validada</span>.
          </h2>
          <p className="mt-4 text-lg text-deep-muted">
            Visão de negócio, clareza funcional e colaboração com tecnologia. Escolha uma etapa para
            ver o que faço em cada momento.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex flex-col gap-3" delay={80}>
            {steps.map((s, i) => (
              <button
                key={s.n}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={active === i}
                className={cn(
                  "group flex items-center gap-5 rounded-2xl border p-5 text-left transition-all duration-300",
                  active === i
                    ? "border-accent bg-deep-foreground/10"
                    : "border-deep-line hover:bg-deep-foreground/5",
                )}
              >
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-full font-display text-xl transition-all duration-300",
                    active === i ? "bg-accent text-accent-foreground" : "border border-deep-line",
                  )}
                >
                  {s.n}
                </span>
                <span className="flex-1">
                  <span className="block font-display text-2xl">{s.title}</span>
                  <span className="block text-sm text-deep-muted">{s.short}</span>
                </span>
                <ArrowRight
                  className={cn(
                    "size-5 transition-all duration-300",
                    active === i ? "translate-x-0 text-accent opacity-100" : "-translate-x-2 opacity-0",
                  )}
                />
              </button>
            ))}
          </Reveal>

          <Reveal delay={160}>
            <div key={active} className="card-in h-full rounded-3xl bg-card p-8 text-card-foreground shadow-lift md:p-10">
              <div className="flex items-baseline justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Etapa {step.n} de {steps.length}
                </p>
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i <= active ? "w-6 bg-primary" : "w-3 bg-border",
                      )}
                    />
                  ))}
                </div>
              </div>
              <h3 className="mt-4 text-4xl font-medium">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.short}</p>

              <ul className="mt-8 space-y-4">
                {step.details.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="size-3.5" />
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
                  className="group mt-10 flex items-center justify-between gap-4 rounded-2xl bg-muted p-5 transition-colors hover:bg-secondary"
                >
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Exemplo na prática
                    </span>
                    <span className="mt-1 block font-display text-xl">{example.title}</span>
                  </span>
                  <ArrowRight className="size-5 text-primary transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
