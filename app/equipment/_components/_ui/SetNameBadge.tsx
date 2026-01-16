"use client";

import type { EquipmentItem } from "../../_lib/types";
import { cx } from "./cx";

export function SetNameBadge({ setName }: { setName: EquipmentItem["setName"] }) {
  const cls = (() => {
    // SlotBadge와 동일한 2계열로 매핑
    // - 무기 색: 선봉장/암살자/추적자/복수자
    // - 방어구 색: 수문장/성기사/수호자/주술사/조율자
    switch (setName) {
      case "선봉장":
      case "암살자":
      case "추적자":
      case "복수자":
        return "border-accent/50 text-accent";
      case "수문장":
      case "성기사":
      case "수호자":
      case "주술사":
      case "조율자":
        return "border-accent-2/40 text-accent-2";
      default:
        return "border-border text-foreground";
    }
  })();

  return (
    <span
      className={cx(
        "rounded-full border bg-background/20 px-2 py-0.5 text-xs font-semibold",
        cls,
      )}
    >
      {setName}
    </span>
  );
}


