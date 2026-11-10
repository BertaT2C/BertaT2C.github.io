import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  tone?: "light" | "deep";
}

export function SectionHeading({ index, eyebrow, title, children, tone = "light" }: Props) {
  const deep = tone === "deep";
  return (
    <div className="max-w-2xl">
      <p
        className={cn(
          "flex items-center gap-3 text-xs md:text-sm lg:text-base font-semibold uppercase tracking-[0.2em]",
          deep ? "text-accent" : "text-primary",
        )}
      >
        <span className="tabular">{index}</span>
        <span className={cn("h-px w-8", deep ? "bg-accent" : "bg-primary")} />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-[2.75rem]">{title}</h2>
      {children && (
        <p className={cn("mt-4 text-lg leading-relaxed lg:text-xl", deep ? "text-deep-muted" : "text-muted-foreground")}>
          {children}
        </p>
      )}
    </div>
  );
}