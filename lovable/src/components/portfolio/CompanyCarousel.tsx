import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { careerCompanies } from "@/data/companies";

export function CompanyCarousel() {
  const [position, setPosition] = useState(0);
  const count = careerCompanies.length;
  const active = ((position % count) + count) % count;
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || interacting || reducedMotion) return;
    const timer = window.setInterval(() => {
      setPosition((index) => index + 1);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, interacting, reducedMotion]);

  const move = (direction: number) => {
    setPosition((index) => index + direction);
  };

  return (
    <section
      aria-label="Empresas e projetos da minha trajetória"
      aria-roledescription="carrossel"
      className="company-carousel w-full max-w-[320px]"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div className="company-orbit-stage" aria-live={paused || reducedMotion ? "polite" : "off"}>
        <div className="company-orbit-ring" style={{ transform: `translateZ(-300px) rotateY(${-position * 360 / count}deg)` }}>
          {careerCompanies.map((company, index) => {
            const distance = Math.min((index - active + count) % count, (active - index + count) % count);
            const enlarged = ["Toyota Boshoku", "Automec", "T2C Group", "Bradesco Seguros"].includes(company.name);
            return (
              <div key={company.name} className={`company-orbit-card ${company.dark ? "company-logo-card-dark" : ""}`}
                style={{ transform: `rotateY(${index * 360 / count}deg) translateZ(300px)`, opacity: distance === 0 ? 1 : distance === 1 ? 0.55 : 0, visibility: distance <= 1 ? "visible" : "hidden" }}
                role="group" aria-roledescription="slide" aria-hidden={index !== active}
                aria-label={`${index + 1} de ${count}: ${company.name}`}>
                <img src={company.logo} alt={company.name} className={enlarged ? "h-[52px] w-[136px] object-contain" : "h-7 w-[110px] object-contain"} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center gap-8">
        <button type="button" aria-label="Empresa anterior" onClick={() => move(-1)}
          className="flex size-9 items-center justify-center rounded-full text-deep-muted hover:bg-white/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <button type="button" aria-label="Próxima empresa" onClick={() => move(1)}
          className="flex size-9 items-center justify-center rounded-full text-deep-muted hover:bg-white/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1">
        {careerCompanies.map((item, index) => (
          <button key={item.name} type="button" onClick={() => { const delta = ((index - active + count + count / 2) % count) - count / 2; move(delta); }} aria-label={`Mostrar ${item.name}`} aria-current={index === active ? "true" : undefined}
            className="flex h-6 w-4 items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-accent">
            <span className={`h-1 rounded-full transition-all ${index === active ? "w-3 bg-accent" : "w-1 bg-deep-muted/40"}`} />
          </button>
        ))}
        {!reducedMotion && <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Reproduzir carrossel" : "Pausar carrossel"}
          className="ml-1 flex size-7 items-center justify-center rounded-full text-deep-muted hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
          {paused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}
        </button>}
      </div>
    </section>
  );
}
