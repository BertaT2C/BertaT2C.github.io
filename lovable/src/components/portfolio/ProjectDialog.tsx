import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ project, onOpenChange }: Props) {
  return (
    <Dialog open={!!project} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl border-0 p-0">
        {project && (
          <>
            <div className="bg-deep-gradient rounded-t-xl p-8 text-deep-foreground">
              <div className="flex items-center gap-3 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.2em] text-accent">
                <span>Caso {project.number}</span>
                <span className="h-px w-8 bg-accent" />
                <span>{project.tag}</span>
              </div>
              <DialogHeader className="mt-4 text-left">
                <DialogTitle className="font-display text-2xl font-semibold md:text-3xl">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="pt-2 text-base md:text-lg lg:text-xl leading-relaxed text-deep-muted">
                  {project.question}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="space-y-8 p-8">
              <div className="grid gap-3 sm:grid-cols-3">
                {project.context.map((c) => (
                  <div key={c.label} className="rounded-lg border-l-2 border-accent bg-muted p-4">
                    <p className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-wider text-primary">{c.label}</p>
                    <p className="mt-1 text-sm md:text-base lg:text-lg font-semibold">{c.text}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs md:text-sm lg:text-base font-bold uppercase tracking-wider text-muted-foreground">
                  Fluxo
                </p>
                <ol className="mt-3 flex flex-wrap items-center gap-2">
                  {project.flow.map((f, i) => (
                    <li key={f} className="flex items-center gap-2">
                      <span
                        className="card-in rounded-md border bg-card px-3 py-1.5 text-sm md:text-base lg:text-lg font-medium"
                        style={{ animationDelay: `${i * 90}ms` }}
                      >
                        {f}
                      </span>
                      {i < project.flow.length - 1 && (
                        <ArrowRight className="size-4 text-muted-foreground" />
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="space-y-3">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 size-2 shrink-0 rounded-sm bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              {project.metrics && (
                <div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="rounded-lg border p-4">
                        <p className="tabular font-display text-2xl font-semibold text-primary">{m.value}</p>
                        <p className="mt-1 text-sm md:text-base lg:text-lg text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  {project.metricsNote && (
                    <p className="mt-3 text-xs md:text-sm lg:text-base italic text-muted-foreground">{project.metricsNote}</p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-1.5">
                {project.skills.map((s) => (
                  <span key={s} className="rounded border px-2.5 py-1 text-xs md:text-sm lg:text-base font-medium text-secondary-foreground">
                    {s}
                  </span>
                ))}
              </div>

              <Button asChild variant="pill" size="xl" className="w-full">
                <a href={project.url} target="_blank" rel="noreferrer">
                  Abrir estudo de caso completo <ArrowUpRight />
                </a>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}