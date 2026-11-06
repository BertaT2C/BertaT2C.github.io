import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Hero, AVATAR_URL } from "@/components/portfolio/Hero";
import { Results } from "@/components/portfolio/Results";
import { Projects } from "@/components/portfolio/Projects";
import { Steps } from "@/components/portfolio/Steps";
import { Contact, WhatsAppFab } from "@/components/portfolio/Contact";

const title = "Berta Batista — Analista de Negócios em TI e Product Owner";
const description =
  "Portfólio de Berta Batista: estudos de caso com análise de processos, requisitos, backlog, automação e indicadores de resultado.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: AVATAR_URL },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:image", content: AVATAR_URL },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Header />
      <Hero />
      <Results />
      <Projects />
      <Steps />
      <Contact />
      <WhatsAppFab />
    </main>
  );
}