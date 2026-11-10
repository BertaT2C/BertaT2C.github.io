import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { id: "resultados", label: "Resultados" },
  { id: "projetos", label: "Estudos de caso" },
  { id: "como-atuo", label: "Como atuo" },
  { id: "gmo", label: "Acompanhe as mudanças", href: "/gestao-de-mudancas.html" },
  { id: "contato", label: "Contato" },
];

export function Header() {
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ids = ["inicio", ...links.map((l) => l.id)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-deep-line bg-deep/95 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-10 2xl:px-12">
        <a href="#inicio" className="flex items-center gap-3 text-deep-foreground">
          <span className="flex size-9 items-center justify-center rounded-md bg-accent font-display text-sm lg:text-base font-bold text-accent-foreground">
            BB
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[0.95rem] font-semibold">Berta Batista</span>
            <span className="block text-xs lg:text-sm text-deep-muted">Análise de Negócios · Produto</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={"href" in l ? l.href : `#${l.id}`}
              className={cn(
                "relative py-2 text-sm lg:text-base font-medium transition-colors",
                active === l.id ? "text-deep-foreground" : "text-deep-muted hover:text-deep-foreground",
              )}
            >
              {l.label}
              {l.id === "gmo" && (
                <span className="ml-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-extrabold text-accent-foreground">Novo</span>
              )}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-300",
                  active === l.id ? "scale-x-100" : "scale-x-0",
                )}
              />
            </a>
          ))}
        </nav>

        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-deep-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="card-in mx-4 mb-3 flex flex-col rounded-lg border bg-card p-2 shadow-lift md:hidden">
          {links.map((l) => (
            <a
              key={l.id}
              href={"href" in l ? l.href : `#${l.id}`}
              onClick={() => setOpen(false)}
              className="rounded-md px-4 py-3 font-medium text-foreground hover:bg-muted"
            >
              {l.label}
              {l.id === "gmo" && (
                <span className="ml-1.5 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-extrabold text-accent-foreground">Novo</span>
              )}
            </a>
          ))}
        </nav>
      )}

      <div
        className="absolute bottom-0 left-0 h-0.5 bg-accent transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </header>
  );
}