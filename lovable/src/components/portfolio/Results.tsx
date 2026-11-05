import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const story = [
  { k: "Problema", t: "Emissão manual e repetitiva de notas no Oracle R12, em operação just-in-time." },
  { k: "Solução", t: "Automação no-code com templates DataLoad, contingência e máquinas dedicadas." },
  { k: "Resultado", t: "Redução estimada de 60% no tempo: de 25 para 10 minutos por lote de 10 notas." },
  { k: "Benefício", t: "Menos esforço manual, menos erros e mais prazos cumpridos na operação." },
];

function Bars({ items, unit }: { items: { label: string; v: number; hi?: boolean }[]; unit: string }) {
  const max = Math.max(...items.map((i) => i.v));
  return (
    <div className="space-y-3">
      {items.map((i, idx) => (
        <div key={i.label}>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{i.label}</span>
            <span className="tabular font-semibold">{i.v} {unit}</span>
          </div>
          <div className="mt-1 h-3 rounded-sm bg-muted">
            <div
              className={`bar-grow h-full rounded-sm ${i.hi ? "bg-accent" : "bg-primary/40"}`}
              style={{ width: `${(i.v / max) * 100}%`, "--bar-delay": `${200 + idx * 150}ms` } as React.CSSProperties}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function Results() {
  return (
    <section id="resultados" className="border-t border-border bg-background py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading index="02" eyebrow="Indicadores de negócio" title="Eficiência, produtividade e automação.">
          Indicadores documentados em cada estudo, apresentados por caso, sem misturar projetos. Estimativas são
          sinalizadas como tal.
        </SectionHeading>

        <Reveal className="mt-12 rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Caso 05 · Notas fiscais no Oracle R12</p>
          <ol className="mt-5 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {story.map((s, i) => (
              <li key={s.k} className="bg-card p-4">
                <p className="tabular text-xs font-semibold text-accent">0{i + 1} · {s.k}</p>
                <p className="mt-2 text-sm leading-snug">{s.t}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <div>
              <p className="font-display font-semibold">Tempo por lote de 10 notas</p>
              <p className="mb-4 text-xs text-muted-foreground">Redução estimada de 60%</p>
              <Bars unit="min" items={[{ label: "Manual", v: 25 }, { label: "Automatizado (estimado)", v: 10, hi: true }]} />
            </div>
            <div>
              <p className="font-display font-semibold">Cumprimento de prazos</p>
              <p className="mb-4 text-xs text-muted-foreground">Janeiro × junho (material original)</p>
              <Bars unit="%" items={[{ label: "Jan", v: 35 }, { label: "Jun", v: 72, hi: true }]} />
            </div>
            <div>
              <p className="font-display font-semibold">Taxa de erros</p>
              <p className="mb-4 text-xs text-muted-foreground">Janeiro × junho (material original)</p>
              <Bars unit="%" items={[{ label: "Jan", v: 11 }, { label: "Jun", v: 6, hi: true }]} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Tempo por lote</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Mede quanto tempo um lote de 10 notas leva para ser emitido em uma máquina.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Capacidade operacional</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Cresce com o processamento simultâneo em máquinas dedicadas — é um ganho distinto da redução por lote.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Contexto operacional</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Mais de 100 notas emitidas por dia em dois turnos — volume da operação, não atribuído apenas à automação.
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs italic text-muted-foreground">
            Estimativa: o resultado pode variar conforme a complexidade das notas, o volume processado e a quantidade
            de máquinas dedicadas à automação.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-8 grid gap-6 rounded-xl border border-border bg-card p-6 shadow-sm md:grid-cols-[1fr_1.2fr] md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">Caso 04 · Automação de documentos de transporte (CT-e e MDF-e)</p>
            <p className="mt-3 font-display text-xl font-semibold">Automação de documentos de transporte (CT-e e MDF-e)</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Processo mapeado em BPMN, integrando Protheus, Chronus e SEFAZ para reduzir etapas repetitivas.
            </p>
          </div>
          <div>
            <p className="font-display font-semibold">Tempo de emissão manual</p>
            <p className="mb-4 text-xs text-muted-foreground">Redução de 60% (indicador informado)</p>
            <Bars unit="%" items={[{ label: "Antes (base)", v: 100 }, { label: "Após automação (informado)", v: 40, hi: true }]} />
            <p className="mt-3 text-xs italic text-muted-foreground">Indicador informado, sujeito à validação documental.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}