import { ArrowUpRight, Copy, Linkedin, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

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

  const rowCls =
    "group flex items-center gap-4 border-b px-1 py-5 transition-colors last:border-b-0 hover:bg-muted/50";

  return (
    <section id="contato" className="mx-auto w-full max-w-[1440px] px-5 py-24 sm:px-8 lg:px-10 2xl:px-12 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Contato"
            title={
              <>
                Vamos conversar sobre <span className="marker">produto e tecnologia</span>?
              </>
            }
          >
            Tenho interesse em oportunidades de Product Owner, Análise de Negócios, Análise de
            Produtos e projetos de transformação digital.
          </SectionHeading>
        </Reveal>

        <Reveal delay={120} className="rounded-xl border bg-card px-5 shadow-soft md:px-7">
          <a
            href="https://www.linkedin.com/in/bertabatista/"
            target="_blank"
            rel="noreferrer"
            className={rowCls}
          >
            <span className="flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
              <Linkedin className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                LinkedIn
              </span>
              <span className="block font-medium">/in/bertabatista</span>
            </span>
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </a>

          <div className={rowCls}>
            <span className="flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
              <Mail className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                E-mail
              </span>
              <span className="block truncate font-medium">{EMAIL}</span>
            </span>
            <div className="flex gap-2">
              <Button asChild variant="pill" size="sm">
                <a href={`mailto:${EMAIL}`}>Escrever</a>
              </Button>
              <Button variant="pillOutline" size="sm" onClick={copyEmail} aria-label="Copiar e-mail">
                <Copy />
              </Button>
            </div>
          </div>

          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={rowCls}>
            <span className="flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
              <MessageCircle className="size-5" />
            </span>
            <span className="flex-1">
              <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                WhatsApp
              </span>
              <span className="tabular block font-medium">(15) 99181-4440</span>
            </span>
            <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </a>
        </Reveal>
      </div>

      <footer className="mt-20 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Berta Batista · Product Owner & Análise de Negócios</p>
        <a href="#inicio" className="font-medium hover:text-foreground">
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
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-whatsapp-foreground shadow-lift transition-all duration-300 hover:pr-5"
    >
      <MessageCircle className="size-5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40">
        Vamos conversar?
      </span>
    </a>
  );
}