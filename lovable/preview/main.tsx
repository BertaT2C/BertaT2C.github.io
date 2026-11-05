import React from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "../src/components/ui/sonner";
import { Header } from "../src/components/portfolio/Header";
import { Hero } from "../src/components/portfolio/Hero";
import { Results } from "../src/components/portfolio/Results";
import { Competencies } from "../src/components/portfolio/Competencies";
import { Projects } from "../src/components/portfolio/Projects";
import { Steps } from "../src/components/portfolio/Steps";
import { Contact, WhatsAppFab } from "../src/components/portfolio/Contact";
import "../src/styles.css";

function PreviewApp() {
  return (
    <main>
      <Header />
      <Hero />
      <Results />
      <Competencies />
      <Projects />
      <Steps />
      <Contact />
      <WhatsAppFab />
      <Toaster position="bottom-center" />
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><PreviewApp /></React.StrictMode>
);
