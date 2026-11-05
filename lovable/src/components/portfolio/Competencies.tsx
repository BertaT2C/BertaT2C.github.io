import { useState } from "react";
import { casesForArea, competencyAreas, projects } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function Competencies() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="competencias" className="relative border-b">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-28">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Competências por área"
            title={
              <>
                Um repertório organizado <span className="marker">por área de análise</span>.
              </>
            }
          >
            Cada área mostra em quantos estudos de caso as competências foram aplicadas na prática.
          </SectionHeading>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {competencyAreas.map((area, idx) => {
            const cases = casesForArea(area);
            const ratio = cases.length / projects.length;
            const dim = hovered !== null && hovered !== area.code;
            return (
              <Reveal
                key={area.code}
                delay={idx * 90}
                className={cn(
                  "flex flex-col bg-card p-6 transition-opacity duration-300 md:p-7",
                  dim && "opacity-55",
                )}
              >
                <div
                  className="flex h-full flex-col"
                  onMouseEnter={() => setHovered(area.code)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <p className="tabular text-xs font-semibold text-muted-foreground">{area.code}</p>
                  <h3 className="mt-3 text-xl font-semibold">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {area.description}
                  </p>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-medium text-muted-foreground">Aplicada em</span>
                      <span className="tabular font-display text-sm font-semibold">
                        {cases.length} de {projects.length} casos
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="meter-grow h-full rounded-full bg-accent"
                        style={
                          {
                            width: `${ratio * 100}%`,
                            "--bar-delay": `${200 + idx * 120}ms`,
                          } as React.CSSProperties
                        }
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {projects.map((p) => {
                        const on = cases.includes(p);
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
                    </div>
                  </div>

                  <ul className="mt-6 flex flex-wrap gap-1.5 border-t pt-5">
                    {area.items.map((item) => (
                      <li
                        key={item}
                        className="rounded border bg-background px-2 py-1 text-xs font-medium text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}