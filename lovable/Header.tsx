import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { id: "projetos", label: "Projetos" },
  { id: "como-atuo", label: "Como atuo" },
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

  const onDeep = !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-background/85 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#inicio"
          className={cn(
            "font-display text-xl font-semibold transition-colors",
            onDeep ? "text-deep-foreground" : "text-foreground",
          )}
        >
          Berta Batista<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                onDeep
                  ? "text-deep-muted hover:text-deep-foreground"
                  : "text-muted-foreground hover:text-foreground",
                active === l.id && "bg-secondary text-secondary-foreground hover:text-secondary-foreground",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "rounded-full p-2 md:hidden",
            onDeep && !open ? "text-deep-foreground" : "text-foreground",
          )}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="card-in mx-4 mb-3 flex flex-col rounded-2xl border bg-card p-2 shadow-lift md:hidden">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 font-semibold text-foreground hover:bg-muted"
            >
              {l.label}
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
