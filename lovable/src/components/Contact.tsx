import { Copy, Linkedin, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const EMAIL = "bertareg@hotmail.com";
export const WHATSAPP_URL = "https://wa.me/5515991814440";

export function Contact() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("E-mail copiado!", { description: EMAIL });
    } catch {
      toast.error("Não foi possível copiar. Use: " + EMAIL);
    }
  };

  return (
    <section id="contato" className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal className="rounded-[2.5rem] border bg-card p-8 shadow-soft md:p-16">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contato</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-medium md:text-6xl">
          Vamos conversar sobre <span className="marker italic">produtos</span> e tecnologia?
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Tenho interesse em oportunidades de Product Owner, Análise de Negócios, Análise de Produtos
          e projetos de transformação digital.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a
            href="https://www.linkedin.com/in/bertabatista/"
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
          >
            <Linkedin className="size-6 text-primary" />
            <p className="mt-4 font-display text-xl">LinkedIn</p>
            <p className="text-sm text-muted-foreground">/in/bertabatista</p>
          </a>
          <div className="rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift">
            <Mail className="size-6 text-primary" />
            <p className="mt-4 font-display text-xl">E-mail</p>
            <p className="text-sm text-muted-foreground">{EMAIL}</p>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="pill" size="sm">
                <a href={`mailto:${EMAIL}`}>Escrever</a>
              </Button>
              <Button variant="pillOutline" size="sm" onClick={copyEmail}>
                <Copy /> Copiar
              </Button>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
          >
            <MessageCircle className="size-6 text-primary" />
            <p className="mt-4 font-display text-xl">WhatsApp</p>
            <p className="text-sm text-muted-foreground">(15) 99181-4440</p>
          </a>
        </div>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Berta Batista</p>
        <a href="#inicio" className="font-semibold hover:text-foreground">
          Voltar ao topo ↑
        </a>
      </footer>
    </section>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Conversar pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-4 text-whatsapp-foreground shadow-lift transition-all duration-300 hover:pr-6"
    >
      <MessageCircle className="size-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 group-hover:max-w-40">
        Vamos conversar?
      </span>
    </a>
  );
}
