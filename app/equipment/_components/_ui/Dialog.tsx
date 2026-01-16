"use client";

import { Button } from "./Button";
import { cx } from "./cx";

export function Dialog({
  open,
  title,
  description,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/60"
        onClick={onClose}
        aria-label="닫기"
      />

      <div
        className={cx(
          "relative w-full max-w-lg rounded-2xl border border-border bg-surface p-4 shadow-2xl",
          "ring-1 ring-white/5",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-base font-semibold tracking-tight text-foreground">{title}</div>
            {description ? <div className="mt-1 text-sm text-muted">{description}</div> : null}
          </div>
          <Button variant="pill" size="xs" onClick={onClose} aria-label="닫기">
            X
          </Button>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}


