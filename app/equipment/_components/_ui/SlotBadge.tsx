"use client";

import type { EquipmentItem } from "../../_lib/types";
import { cx } from "./cx";

export function SlotBadge({ slot }: { slot: EquipmentItem["slot"] }) {
  const cls =
    slot === "무기"
      ? "border-accent/50 text-accent"
      : "border-accent-2/40 text-accent-2";

  return (
    <span className={cx("rounded-full border px-2 py-0.5 text-xs font-semibold", cls)}>
      {slot}
    </span>
  );
}


