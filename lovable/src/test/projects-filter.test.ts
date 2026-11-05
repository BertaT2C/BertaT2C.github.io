import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "@/data/projects";

describe("Filtro de projetos", () => {
  it("'Todos' mostra os 6 estudos de caso", () => {
    expect(filterProjects(projects, "todos")).toHaveLength(6);
  });

  it("'Processos & Automação' mostra CT-e/MDF-e e Oracle R12", () => {
    expect(filterProjects(projects, "processos").map((p) => p.slug)).toEqual([
      "processos-rpa",
      "oracle-r12",
    ]);
  });
});

import { casesForArea, competencyAreas } from "@/data/projects";

describe("Competências por área", () => {
  it("'Processos' é aplicada nos casos de refinamento, WhatsApp, CT-e e Oracle R12", () => {
    const area = competencyAreas.find((a) => a.title === "Processos")!;
    expect(casesForArea(area).map((p) => p.slug)).toEqual([
      "refinamento",
      "whatsapp",
      "processos-rpa",
      "oracle-r12",
    ]);
  });
});