import type { ReactNode } from "react";

type ZzolSectionProps = {
  title: string;
  children: ReactNode;
};

export function ZzolSection({ title, children }: ZzolSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h2 className="text-sm font-semibold tracking-tight text-muted">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}


