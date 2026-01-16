"use client";

import type { SubOption } from "../../_lib/types";
import { cx } from "./cx";

export function SubOptionRow({
  option,
  locked,
  lockDisabled,
  onToggleLock,
}: {
  option: SubOption;
  locked?: boolean;
  lockDisabled?: boolean;
  onToggleLock?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/10 px-3 py-2">
      <div className="min-w-0">
        <div className="truncate text-sm text-foreground">{option.label}</div>
        <div className="mt-0.5 text-xs text-muted">
          강화:{" "}
          <span className={option.plus > 0 ? "font-semibold text-foreground" : ""}>
            +{option.plus}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleLock}
        disabled={lockDisabled && !locked}
        className={cx(
          "shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors",
          locked
            ? "border-accent/60 bg-accent/15 text-foreground"
            : "border-border bg-background/20 text-muted hover:border-accent/40 hover:text-foreground",
          lockDisabled && !locked && "cursor-not-allowed opacity-50",
        )}
        aria-pressed={locked ? "true" : "false"}
      >
        {locked ? "잠금됨" : "잠금"}
      </button>
    </div>
  );
}


