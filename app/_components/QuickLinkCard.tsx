import Link from "next/link";

type QuickLinkCardProps = {
  title: string;
  description: string;
  href: string;
};

export function QuickLinkCard({ title, description, href }: QuickLinkCardProps) {
  return (
    <Link
      href={href}
      className="group relative rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl transition-opacity group-hover:opacity-100">
        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-accent/25 via-accent-2/10 to-transparent" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-foreground">
            {title}
          </h2>
          <p className="mt-1 line-clamp-2 text-sm text-muted">{description}</p>
        </div>
        <span className="shrink-0 text-muted transition-colors group-hover:text-accent-2">
          →
        </span>
      </div>
    </Link>
  );
}


