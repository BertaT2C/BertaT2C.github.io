import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroChart, whatsappSuccess } from "@/data/projects";
import { Reveal } from "./Reveal";

export const AVATAR_URL = "https://avatars.githubusercontent.com/u/99225701?v=4";

export function Hero() {
  return (
    <section id="inicio" className="bg-deep-gradient relative overflow-hidden text-deep-foreground">
      <div aria-hidden className="bg-grid-deep fade-mask absolute inset-0" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-20 pt-28 sm:px-8 lg:px-10 lg:pt-36 2xl:px-12">
        <div className="mx-auto grid max-w-[1360px] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-14">
          <div className="min-w-0 text-center">
            <p className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-[0.09em] text-accent lg:text-base">
              <span className="hidden h-px w-7 shrink-0 bg-accent sm:block" aria-hidden />
              Analista de Negócios Sênior · Product Owner · Analista de Produtos
              <span className="hidden h-px w-7 shrink-0 bg-accent sm:block" aria-hidden />
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.55rem]">
              Da necessidade de negócio à{" "}
              <span className="text-accent">solução em tecnologia</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-deep-foreground sm:text-xl lg:text-[1.375rem]">
              Transformo necessidades de negócio em <strong className="font-semibold text-accent">processos claros,
              requisitos bem definidos</strong> e soluções digitais orientadas a valor.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-deep-muted sm:text-lg lg:text-xl">
              Conecto pessoas, operações e tecnologia em projetos de <strong className="font-semibold text-deep-foreground">energia,
              seguros, consultoria e indústria</strong>, do Discovery à validação das entregas,
              com foco em produtos digitais, automação e melhoria contínua.
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

        <ul className="mx-auto mt-12 grid w-full max-w-[1360px] grid-cols-2 gap-x-6 gap-y-4 border-t border-deep-line pt-6 text-center text-sm md:text-base lg:text-lg text-deep-muted md:grid-cols-4">
          {["Discovery e produtos digitais", "Requisitos e backlog", "Processos e automação", "Validação orientada a valor"].map((item) => (
            <li key={item} className="flex items-center justify-center gap-2">
              <span className="size-1.5 shrink-0 rounded-full bg-accent" /> {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 grid w-full items-stretch gap-6 lg:grid-cols-2 xl:gap-8">
          <OracleResultsPanel />
          <WhatsAppResultsPanel />
          <ChannelDiscoveryPanel />
          <PdvQualityPanel />
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
      <h3 className="min-h-10 text-center text-sm md:text-base lg:text-lg font-semibold leading-snug">{metric.label}</h3>
      <p className="mt-1 flex items-center justify-center gap-1 text-xs md:text-sm lg:text-base font-bold text-accent">
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
            <span aria-hidden className="tabular mb-2 text-center text-xs md:text-sm lg:text-base font-bold">{bar.value}%</span>
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
      <div className="mt-2 flex items-center justify-center gap-8 text-xs md:text-sm lg:text-base text-deep-muted">
        <span>{beforeLabel}</span><span>{afterLabel}</span>
      </div>
    </div>
  );
}

function OracleResultsPanel() {
  return (
    <Reveal delay={150} className="flex h-full min-w-0 flex-col rounded-xl border border-deep-line bg-deep-raised/80 p-5 shadow-lift backdrop-blur-sm sm:p-7">
      <div className="border-b border-deep-line pb-5">
        <p className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.16em] text-accent">Automação no ERP</p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:text-2xl">RPA na emissão de faturas no Oracle R12</h2>
        <p className="mt-2 text-sm md:text-base lg:text-lg text-deep-muted">Automação de tarefas manuais no ERP, com indicadores comparados entre janeiro e junho.</p>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {heroChart.series.map((metric, index) => (
          <ColumnComparison key={metric.label} metric={metric} index={index} beforeLabel={heroChart.before} afterLabel={heroChart.after} />
        ))}
      </div>
      <p className="mt-3 text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">
        Leitura: mais entregas no prazo e menos erros na comparação.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-deep/60 px-4 py-4">
        <span className="max-w-xs text-sm md:text-base lg:text-lg text-deep-muted">{heroChart.highlight.label}</span>
        <span className="tabular font-display text-2xl font-semibold text-accent">{heroChart.highlight.value}</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {heroChart.additional.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-deep-line/80 px-3 py-3">
            <span className="block text-xs md:text-sm lg:text-base leading-snug text-deep-muted">{metric.label}</span>
            <span className="tabular mt-1 block text-sm md:text-base lg:text-lg font-semibold text-accent">
              {metric.before}% → {metric.after}%
            </span>
          </div>
        ))}
      </div>
      <p className="mt-auto pt-5 text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">Fonte: {heroChart.source}</p>
      <a href="https://bertat2c.github.io/oracle-r12.html" target="_blank" rel="noreferrer" className="mt-3 inline-flex w-fit items-center gap-2 text-sm md:text-base lg:text-lg font-semibold text-accent underline-offset-4 hover:underline">
        Ver estudo de caso <ArrowUpRight className="size-4" />
      </a>
    </Reveal>
  );
}

function WhatsAppResultsPanel() {
  return (
    <Reveal delay={240} className="flex h-full min-w-0 flex-col rounded-xl border border-deep-line bg-deep-raised/80 p-5 shadow-lift backdrop-blur-sm sm:p-7">
      <div className="border-b border-deep-line pb-5">
        <p className="flex items-center gap-2 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.16em] text-accent">
          <MessageCircle aria-hidden className="size-4" /> Canais digitais
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:text-2xl">Autosserviço pelo WhatsApp</h2>
        <p className="mt-2 text-sm md:text-base lg:text-lg text-deep-muted">Atendimento direto pelo WhatsApp, com cenário inicial simulado e metas propostas para o MVP.</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {whatsappSuccess.series.map((metric, index) => (
          <ColumnComparison key={metric.label} metric={metric} index={index} beforeLabel="Inicial" afterLabel="Meta" />
        ))}
      </div>
      <p className="mt-3 text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">
        Leitura: metas simuladas de mais autosserviço e menos abandono.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-deep/60 px-4 py-4">
        <span className="text-sm md:text-base lg:text-lg text-deep-muted">{whatsappSuccess.additional.label}</span>
        <span className="tabular text-lg font-semibold text-accent">
          {whatsappSuccess.additional.before}% → {whatsappSuccess.additional.after}%
        </span>
      </div>
      <p className="mt-auto pt-5 text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">{whatsappSuccess.source}</p>
      <a href="https://bertat2c.github.io/whatsapp.html" target="_blank" rel="noreferrer" className="mt-3 inline-flex w-fit items-center gap-2 text-sm md:text-base lg:text-lg font-semibold text-accent underline-offset-4 hover:underline">
        Ver estudo de caso <ArrowUpRight className="size-4" />
      </a>
    </Reveal>
  );
}


const channelPreferences = [
  { label: "WhatsApp", value: 30 },
  { label: "Telefone", value: 30 },
  { label: "Chat no site", value: 20 },
  { label: "Aplicativo da empresa", value: 12 },
] as const;

const pdvValidationScope = [
  { label: "Cenários BDD", value: 12 },
  { label: "Verificações funcionais", value: 15 },
  { label: "Combinações ponta a ponta", value: 4 },
] as const;

function ChannelDiscoveryPanel() {
  return (
    <Reveal
      delay={300}
      className="flex h-full min-w-0 flex-col rounded-xl border border-deep-line bg-deep-raised/80 p-5 shadow-lift backdrop-blur-sm sm:p-7"
    >
      <div className="border-b border-deep-line pb-5">
        <p className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.16em] text-accent">
          Produto &amp; Discovery
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:text-2xl">
          Assistência automotiva · preferência por canais
        </h2>
        <p className="mt-2 text-sm md:text-base lg:text-lg text-deep-muted">
          Pesquisa externa sobre o canal preferido para iniciar um atendimento.
        </p>
      </div>

      <div
        className="mt-6 space-y-5"
        role="group"
        aria-label="Pesquisa de preferência de canais: WhatsApp 30%, telefone 30%, chat no site 20%, aplicativo da empresa 12%"
      >
        {channelPreferences.map((channel, index) => (
          <div key={channel.label}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-sm md:text-base lg:text-lg font-medium">{channel.label}</span>
              <strong className="tabular font-display text-lg font-semibold text-accent">
                {channel.value}%
              </strong>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full bg-deep/80"
              role="meter"
              aria-label={channel.label}
              aria-valuenow={channel.value}
              aria-valuemin={0}
              aria-valuemax={30}
              aria-valuetext={channel.value + "% dos entrevistados"}
            >
              <div
                className={"h-full rounded-full " + (index === 0 ? "bg-accent" : "bg-deep-muted/70")}
                style={{ width: (channel.value / 30) * 100 + "%" }}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between text-xs lg:text-sm tabular text-deep-muted" aria-hidden>
          <span>0%</span><span>10%</span><span>20%</span><span>30%</span>
        </div>
        <p className="text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">
          Leitura: WhatsApp e telefone lideram a preferência na pesquisa.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-deep/60 px-4 py-4">
        <span className="text-sm md:text-base lg:text-lg text-deep-muted">Canais líderes na pesquisa</span>
        <span className="tabular font-display text-lg font-semibold text-accent">
          WhatsApp e telefone · 30% cada
        </span>
      </div>
      <p className="mt-auto pt-5 text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">
        Fonte: Mobile Time / Opinion Box, 2024, 1.176 respondentes. Pesquisa externa sobre atendimento em geral; não é resultado do projeto.
      </p>
      <a
        href="https://bertat2c.github.io/canais-digitais.html"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex w-fit items-center gap-2 text-sm md:text-base lg:text-lg font-semibold text-accent underline-offset-4 hover:underline"
      >
        Ver estudo de caso <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </Reveal>
  );
}

function PdvQualityPanel() {
  return (
    <Reveal
      delay={360}
      className="flex h-full min-w-0 flex-col rounded-xl border border-deep-line bg-deep-raised/80 p-5 shadow-lift backdrop-blur-sm sm:p-7"
    >
      <div className="border-b border-deep-line pb-5">
        <p className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.16em] text-accent">
          Regras de negócio &amp; BDD
        </p>
        <h2 className="mt-2 font-display text-xl font-semibold leading-tight sm:text-2xl">
          Integração PDV–ABS · especificação e testes
        </h2>
        <p className="mt-2 text-sm md:text-base lg:text-lg text-deep-muted">
          Regras de integração PDV–ABS e testes planejados, ainda não executados.
        </p>
      </div>

      <div
        className="mt-6 space-y-5"
        role="group"
        aria-label="Escopo proposto: 12 cenários BDD, 15 verificações funcionais e 4 combinações ponta a ponta"
      >
        {pdvValidationScope.map((item, index) => (
          <div key={item.label}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-sm md:text-base lg:text-lg font-medium">{item.label}</span>
              <strong className="tabular font-display text-lg font-semibold text-accent">
                {item.value}
              </strong>
            </div>
            <div
              className="h-3 overflow-hidden rounded-full bg-deep/80"
              role="meter"
              aria-label={item.label}
              aria-valuenow={item.value}
              aria-valuemin={0}
              aria-valuemax={15}
              aria-valuetext={String(item.value) + " itens planejados"}
            >
              <div
                className={"h-full rounded-full " + (index === 1 ? "bg-accent" : "bg-deep-muted/70")}
                style={{ width: (item.value / 15) * 100 + "%" }}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between text-xs lg:text-sm tabular text-deep-muted" aria-hidden>
          <span>0</span><span>5</span><span>10</span><span>15 itens</span>
        </div>
        <p className="text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">
          Leitura: escopo de testes planejado, ainda sem execução.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-deep/60 px-4 py-4">
        <span className="text-sm md:text-base lg:text-lg text-deep-muted">Dimensões das regras</span>
        <strong className="tabular font-display text-2xl font-semibold text-accent">06</strong>
      </div>
      <p className="mt-auto pt-5 text-xs md:text-sm lg:text-base leading-relaxed text-deep-muted">
        Categoria, sabor, copo, gelo, tamanho e modalidade. Contagens do estudo: cenários e verificações propostos, sem taxa de sucesso aferida.
      </p>
      <a
        href="https://bertat2c.github.io/pdv.html"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex w-fit items-center gap-2 text-sm md:text-base lg:text-lg font-semibold text-accent underline-offset-4 hover:underline"
      >
        Ver estudo de caso <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </Reveal>
  );
}
