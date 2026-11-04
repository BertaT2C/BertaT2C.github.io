import { useEffect, useRef, useState } from "react";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AVATAR_URL = "https://avatars.githubusercontent.com/u/99225701?v=4";

const words = ["produtos digitais", "processos", "automação", "dados"];
const chips = [
  { label: "Discovery", pos: "left-[-8%] top-[12%]", depth: 18 },
  { label: "BPMN", pos: "right-[-6%] top-[6%]", depth: -14 },
  { label: "Backlog", pos: "right-[-10%] bottom-[22%]", depth: 22 },
  { label: "BDD", pos: "left-[-4%] bottom-[8%]", depth: -20 },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = areaRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  return (
    <section
      id="inicio"
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="bg-deep-gradient relative overflow-hidden text-deep-foreground"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-32 md:grid-cols-[1.35fr_1fr] md:px-8 md:pb-32 md:pt-40">
        <div>
          <p className="reveal is-visible text-xs font-bold uppercase tracking-[0.25em] text-accent">
            Portfólio profissional · Product Owner & Análise de Negócios
          </p>
          <h1 className="mt-6 text-[2.6rem] font-medium leading-[1.05] sm:text-5xl md:text-7xl">
            Negócios,
            <span className="block whitespace-nowrap italic text-accent" aria-live="polite">
              <span key={words[i]} className="word-in inline-block">
                {words[i]}
              </span>
            </span>
            e tecnologia.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-deep-muted">
            Sou Berta Batista. Conecto necessidades de negócio e equipes de tecnologia por meio de
            Discovery, requisitos, gestão de backlog, modelagem de processos e melhoria contínua.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <a href="#projetos">
                Explorar estudos de caso <ArrowDown />
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
        </div>

        <div ref={areaRef} className="relative mx-auto w-64 md:w-80">
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(900px) rotateY(${tilt.x * 10}deg) rotateX(${-tilt.y * 10}deg)`,
            }}
          >
            <div className="absolute -inset-4 rounded-full border border-dashed border-deep-line" />
            <img
              src={AVATAR_URL}
              alt="Foto de Berta Batista"
              width={350}
              height={350}
              className="relative aspect-square w-full rounded-full object-cover shadow-lift ring-4 ring-deep-line"
            />
          </div>
          {chips.map((c, idx) => (
            <span
              key={c.label}
              className={`absolute ${c.pos} transition-transform duration-500 ease-out`}
              style={{ transform: `translate(${tilt.x * c.depth}px, ${tilt.y * c.depth}px)` }}
            >
              <span
                className="float-y block rounded-full bg-card px-4 py-2 text-sm font-bold text-foreground shadow-lift"
                style={{ animationDelay: `${idx * 0.8}s` }}
              >
                {c.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
