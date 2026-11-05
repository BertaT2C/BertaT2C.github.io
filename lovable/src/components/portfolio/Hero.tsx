import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroChart } from "@/data/projects";
import { Reveal } from "./Reveal";

export const AVATAR_URL = "https://avatars.githubusercontent.com/u/99225701?v=4";


export function Hero() {
  return (
    <section id="inicio" className="bg-deep-gradient relative overflow-hidden text-deep-foreground">
      <div aria-hidden className="bg-grid-deep fade-mask absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-32 md:grid-cols-[1.1fr_1fr] md:px-8 md:pb-28 md:pt-40">
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Product Owner · Analista de Negócios em TI
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl md:text-[3.6rem]">
            Da necessidade de negócio à{" "}
            <span className="text-accent">solução em tecnologia</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-deep-muted">
            Sou Berta Batista. Analiso processos, dados e jornadas para definir requisitos claros,
            priorizar o backlog e acompanhar resultados com indicadores.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#projetos">
                Ver estudos de caso <ArrowDown />
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="https://www.linkedin.com/in/bertabatista/" target="_blank" rel="noreferrer">
                <Linkedin /> LinkedIn
              </a>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <a href="https://github.com/BertaT2C" target="_blank" rel="noreferrer">
                <Github /> GitHub
              </a>
            </Button>
          </div>

          <ul className="mt-12 grid max-w-lg gap-3 border-t border-deep-line pt-5 text-sm text-deep-muted sm:grid-cols-2">
            {["Eficiência operacional", "Produtividade da equipe", "Automação de processos", "Ganhos mensuráveis"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" /> {t}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <AnalysisPanel />
          </div>
        </div>

        <Reveal delay={80} className="flex justify-center self-start md:justify-start">
          <img
            src={AVATAR_URL}
            alt="Foto de Berta Batista"
            className="size-44 rounded-full border border-deep-line object-cover shadow-lift ring-2 ring-accent ring-offset-4 ring-offset-deep sm:size-52 md:size-56 lg:size-64"
          />
        </Reveal>
      </div>
    </section>
  );
}

function AnalysisPanel() {
  return (
    <Reveal delay={150} className="rounded-xl border border-deep-line bg-deep-raised/80 p-6 shadow-lift backdrop-blur-sm md:p-7">
      <div className="flex items-center gap-4 border-b border-deep-line pb-5">
        <div className="flex-1">
          <h2 className="font-display text-lg font-semibold leading-snug text-deep-foreground">{heroChart.caseLabel}</h2>
          <p className="text-xs text-deep-muted">Discovery · Requisitos · Processos · Automação</p>
        </div>
        <span className="hidden rounded border border-deep-line px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-deep-muted sm:inline">
          Painel de resultados
        </span>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Indicadores de desempenho
        </p>
        <div className="flex shrink-0 items-center gap-3 text-[0.7rem] text-deep-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-deep-muted/40" /> {heroChart.before}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-accent" /> {heroChart.after}
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5">
        {heroChart.series.map((s, si) => {
          const max = Math.max(s.before, s.after) * 1.2;
          const delta = s.after - s.before;
          return (
            <div key={s.label} className="rounded-lg border border-deep-line p-4">
              <p className="text-sm font-medium">{s.label}</p>
              <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-accent">
                {s.better === "up" ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                {delta > 0 ? "+" : "−"}
                {Math.abs(delta)} p.p.
              </p>
              <div className="relative mt-4 flex h-32 items-end gap-3 border-b border-deep-line">
                {[25, 50, 75].map((g) => (
                  <span
                    key={g}
                    aria-hidden
                    className="absolute inset-x-0 border-t border-dashed border-deep-line"
                    style={{ bottom: `${g}%` }}
                  />
                ))}
                {[
                  { v: s.before, cls: "bg-deep-muted/40", label: heroChart.before },
                  { v: s.after, cls: "bg-accent", label: heroChart.after },
                ].map((b, bi) => (
                  <div key={b.label} className="relative flex h-full flex-1 flex-col justify-end">
                    <span className="tabular mb-1 text-center text-xs font-semibold">{b.v}%</span>
                    <span
                      className={`bar-grow block rounded-t-sm ${b.cls}`}
                      style={
                        {
                          height: `${(b.v / max) * 100}%`,
                          "--bar-delay": `${300 + si * 200 + bi * 150}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 rounded-lg bg-deep/60 px-4 py-3">
        <span className="text-sm text-deep-muted">{heroChart.highlight.label}</span>
        <span className="tabular font-display text-2xl font-semibold text-accent">
          {heroChart.highlight.value}
        </span>
      </div>
      <p className="mt-3 text-[0.7rem] text-deep-muted">Fonte: {heroChart.source}</p>
    </Reveal>
  );
}