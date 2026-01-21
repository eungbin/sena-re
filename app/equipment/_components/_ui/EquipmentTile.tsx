"use client";

import type { EquipmentItem } from "../../_lib/types";
import { SetNameBadge } from "./SetNameBadge";
import { SlotBadge } from "./SlotBadge";
import { cx } from "./cx";

export function EquipmentTile({
  item,
  selected,
  onClick,
  onDelete,
}: {
  item: EquipmentItem;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cx(
        "group flex w-full flex-col items-start gap-1 rounded-xl border p-3 text-left transition-colors cursor-pointer",
        selected
          ? "border-accent/60 bg-gradient-to-br from-accent/20 via-accent-2/5 to-transparent"
          : "border-border bg-background/10 hover:border-accent/40",
      )}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <SlotBadge slot={item.slot} />
            <SetNameBadge setName={item.setName} />
            <div className="truncate text-sm font-semibold text-foreground">{item.name}</div>
          </div>
        </div>
        {onDelete ? (
          <button
            type="button"
            aria-label="장비 삭제"
            title="삭제"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="cursor-pointer shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/20 text-base leading-none text-muted transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-foreground"
          >
            ×
          </button>
        ) : null}
      </div>
      <div className="mt-1 line-clamp-2 text-xs text-muted">{item.mainOptionLabel}</div>
    </div>
  );
}


