import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroChart, whatsappSuccess } from "@/data/projects";
import { Reveal } from "./Reveal";

export const AVATAR_URL = "https://avatars.githubusercontent.com/u/99225701?v=4";

export function Hero() {
  return (
    <section id="inicio" className="bg-deep-gradient relative overflow-hidden text-deep-foreground">
      <div aria-hidden className="bg-grid-deep fade-mask absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 lg:px-10 lg:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div className="min-w-0 text-center">
            <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="h-px w-8 bg-accent" />
              Product Owner · Analista de Negócios em TI
              <span className="h-px w-8 bg-accent" />
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.55rem]">
              Da necessidade de negócio à{" "}
              <span className="text-accent">solução em tecnologia</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-deep-muted sm:text-lg">
              Sou Berta Batista. Analiso processos, dados e jornadas para definir requisitos claros,
              priorizar o backlog e acompanhar resultados com indicadores.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <a href="#projetos">Ver estudos de caso <ArrowDown /></a>
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
          </div>
          <Reveal delay={80} className="mx-auto flex justify-center">
            <img
              src={AVATAR_URL}
              alt="Foto de Berta Batista"
              className="size-56 rounded-full border border-deep-line object-cover shadow-lift ring-2 ring-accent ring-offset-4 ring-offset-deep sm:size-64 lg:size-72 xl:size-80"
            />
          </Reveal>
        </div>

        <ul className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-4 border-t border-deep-line pt-6 text-center text-sm text-deep-muted md:grid-cols-4">
          {["Eficiência operacional", "Produtividade da equipe", "Automação de processos", "Ganhos mensuráveis"].map((item) => (
            <li key={item} className="flex items-center justify-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" /> {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid w-full items-stretch gap-6 lg:grid-cols-2 xl:gap-8">
          <OracleResultsPanel />
          <WhatsAppResultsPanel />
        </div>
      </div>
    </section>
  );
}


type ColumnMetric = {
  label: string;
  before: number;
  after: number;
  better: "up" | "down";
};

function ColumnComparison({
  metric,
  beforeLabel,
  afterLabel,
  index,
}: {
  metric: ColumnMetric;
  beforeLabel: string;
  afterLabel: string;
  index: number;
}) {
  const change = metric.after - metric.before;
  const scale = Math.min(100, Math.ceil((Math.max(metric.before, metric.after) * 1.2) / 10) * 10);
  const bars = [
    { label: beforeLabel, value: metric.before, fill: "bg-deep-muted/50" },
    { label: afterLabel, value: metric.after, fill: "bg-accent" },
  ];
  return (
    <div className="min-w-0 rounded-lg border border-deep-line bg-deep/30 p-4">
      <h3 className="min-h-10 text-center text-sm font-semibold leading-snug">{metric.label}</h3>
      <p className="mt-1 flex items-center justify-center gap-1 text-xs font-bold text-accent">
        {change >= 0 ? <ArrowUpRight aria-hidden className="size-3.5" /> : <ArrowDownRight aria-hidden className="size-3.5" />}
        {change > 0 ? "+" : change < 0 ? "−" : ""}
        {Math.abs(change)} p.p.
      </p>
      <div
        className="relative mt-5 flex h-40 items-end justify-center gap-5 border-b border-deep-line px-2 sm:gap-7"
        role="img"
        aria-label={metric.label + ": " + beforeLabel + " " + metric.before + "%; " + afterLabel + " " + metric.after + "%."}
      >
        {[25, 50, 75].map((level) => (
          <span
            aria-hidden
            key={level}
            className="pointer-events-none absolute inset-x-0 border-t border-dashed border-deep-line/60"
            style={{ bottom: level + "%" }}
          />
        ))}
        {bars.map((bar, i) => (
          <div key={bar.label} className="relative z-10 flex h-full w-12 flex-col justify-end sm:w-14">
            <span aria-hidden className="tabular mb-2 text-center text-xs font-bold">{bar.value}%</span>
            <div
              aria-hidden
              className={"bar-grow w-full rounded-t-md " + bar.fill}
              style={{
                height: (bar.value / Math.max(scale, 1)) * 100 + "%",
                "--bar-delay": 250 + index * 120 + i * 140 + "ms",
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-center gap-8 text-xs text-deep-muted">
        <span>{beforeLabel}</span><span>{afterLabel}</span>
      </div>
    </div>
  );
}

function OracleResultsPanel() {
  return (
    <Reveal delay={150} className="flex h-full min-w-0 flex-col rounded-xl border border-deep-line bg-deep-raised/80 p-5 shadow-lift backdrop-blur-sm sm:p-7">
      <div className="border-b border-deep-line pb-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Caso 05 · Automação no ERP</p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:text-2xl">{heroChart.caseLabel}</h2>
        <p className="mt-2 text-sm text-deep-muted">Indicadores de janeiro e junho · gráficos comparativos</p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {heroChart.series.map((metric, index) => (
          <ColumnComparison key={metric.label} metric={metric} index={index} beforeLabel={heroChart.before} afterLabel={heroChart.after} />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-deep/60 px-4 py-4">
        <span className="max-w-xs text-sm text-deep-muted">{heroChart.highlight.label}</span>
        <span className="tabular font-display text-2xl font-semibold text-accent">{heroChart.highlight.value}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {heroChart.additional.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-deep-line/80 px-3 py-3">
            <span className="block text-xs leading-snug text-deep-muted">{metric.label}</span>
            <span className="tabular mt-1 block text-sm font-semibold text-accent">
              {metric.before}% → {metric.after}%
            </span>
          </div>
        ))}
      </div>
      <p className="mt-auto pt-5 text-xs leading-relaxed text-deep-muted">Fonte: {heroChart.source}</p>
      <a href="https://bertat2c.github.io/oracle-r12.html" target="_blank" rel="noreferrer" className="mt-3 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline">
        Ver estudo de caso <ArrowUpRight className="size-4" />
      </a>
    </Reveal>
  );
}

function WhatsAppResultsPanel() {
  return (
    <Reveal delay={240} className="flex h-full min-w-0 flex-col rounded-xl border border-deep-line bg-deep-raised/80 p-5 shadow-lift backdrop-blur-sm sm:p-7">
      <div className="border-b border-deep-line pb-5">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
          <MessageCircle aria-hidden className="size-4" /> Caso 03 · Canais digitais
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:text-2xl">{whatsappSuccess.caseLabel}</h2>
        <p className="mt-2 text-sm text-deep-muted">MVP ilustrativo · cenário inicial × metas propostas</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {whatsappSuccess.series.map((metric, index) => (
          <ColumnComparison key={metric.label} metric={metric} index={index} beforeLabel="Inicial" afterLabel="Meta" />
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-deep/60 px-4 py-4">
        <span className="text-sm text-deep-muted">{whatsappSuccess.additional.label}</span>
        <span className="tabular text-lg font-semibold text-accent">
          {whatsappSuccess.additional.before}% → {whatsappSuccess.additional.after}%
        </span>
      </div>
      <p className="mt-auto pt-5 text-xs leading-relaxed text-deep-muted">{whatsappSuccess.source}</p>
      <a href="https://bertat2c.github.io/whatsapp.html" target="_blank" rel="noreferrer" className="mt-3 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline">
        Ver estudo de caso <ArrowUpRight className="size-4" />
      </a>
    </Reveal>
  );
}
