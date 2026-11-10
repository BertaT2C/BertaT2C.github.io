import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { careerCompanies } from "@/data/companies";

export function CompanyCarousel() {
  const [active, setActive] = useState(0);
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
      setActive((index) => (index + 1) % careerCompanies.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, interacting, reducedMotion]);

  const company = careerCompanies[active];
  const move = (direction: number) => {
    setActive((index) => (index + direction + careerCompanies.length) % careerCompanies.length);
  };

  return (
    <section
      aria-label="Empresas e projetos da minha trajetória"
      aria-roledescription="carrossel"
      className="company-carousel w-full max-w-[280px]"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <button type="button" aria-label="Empresa anterior" onClick={() => move(-1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-deep-muted transition-colors hover:bg-white/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <div className="company-stage" aria-live={paused || reducedMotion ? "polite" : "off"}>
          <div aria-hidden className="company-card-back" />
          <div key={company.name} className={`company-logo-card ${company.dark ? "company-logo-card-dark" : ""}`}
            role="group" aria-roledescription="slide" aria-label={`${active + 1} de ${careerCompanies.length}: ${company.name}`}>
            <img src={company.logo} alt={company.name} className="h-7 w-[116px] object-contain" />
          </div>
        </div>
        <button type="button" aria-label="Próxima empresa" onClick={() => move(1)}
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-deep-muted transition-colors hover:bg-white/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-accent">
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
      <div className="mt-2 flex items-center justify-center gap-1">
        {careerCompanies.map((item, index) => (
          <button key={item.name} type="button" onClick={() => setActive(index)} aria-label={`Mostrar ${item.name}`} aria-current={index === active ? "true" : undefined}
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
