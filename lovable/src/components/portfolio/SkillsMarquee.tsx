const skills = [
  "Discovery",
  "Requisitos",
  "Product Backlog",
  "BPMN",
  "Histórias de usuário",
  "BDD",
  "OKR",
  "MVP",
  "RPA",
  "Jornada do usuário",
  "KPIs",
  "Melhoria contínua",
];

export function SkillsMarquee() {
  const row = [...skills, ...skills];
  return (
    <div className="marquee overflow-hidden border-y bg-accent py-4 text-accent-foreground">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-xl italic">
            {s}
            <span aria-hidden className="text-sm not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
