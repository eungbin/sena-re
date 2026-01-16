"use client";

import type { EquipmentItem } from "../../_lib/types";
import { EmptyState } from "../_ui/EmptyState";
import { Button } from "../_ui/Button";
import { Panel } from "../_ui/Panel";
import { SetNameBadge } from "../_ui/SetNameBadge";
import { SlotBadge } from "../_ui/SlotBadge";
import { SubOptionRow } from "../_ui/SubOptionRow";

export function SelectedEquipmentPanel({
  selected,
  totalPlus,
  lockedSubOptionId,
  canLock,
  onToggleLock,
  onResetSelection,
  onClearLock,
  onExecuteRedistribute,
}: {
  selected: EquipmentItem | null;
  totalPlus: number;
  lockedSubOptionId: string | null;
  canLock: boolean;
  onToggleLock: (subOptionId: string) => void;
  onResetSelection: () => void;
  onClearLock: () => void;
  onExecuteRedistribute: () => void;
}) {
  return (
    <Panel
      title="선택한 장비"
      description={selected ? "서브옵션을 잠그고 재분배를 실행하세요." : "선택한 장비의 정보를 보여줍니다."}
      right={
        <Button variant="pill" size="xs" onClick={onResetSelection}>
          초기화
        </Button>
      }
    >
      {selected ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
              <SlotBadge slot={selected.slot} />
              <SetNameBadge setName={selected.setName} />
              <div className="min-w-0 text-lg font-semibold tracking-tight text-foreground">
                {selected.name}
              </div>
            </div>
          <div className="rounded-xl border border-border bg-background/10 px-3 py-2">
            <div className="text-xs font-semibold text-muted">메인 옵션</div>
            <div className="mt-1 text-sm text-foreground">{selected.mainOptionLabel}</div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold text-foreground">서브 옵션</div>
            <div className="text-xs text-muted">
              총 강화량: <span className="font-semibold text-foreground">+{totalPlus}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {selected.subOptions.map((opt) => (
              <SubOptionRow
                key={opt.id}
                option={opt}
                locked={lockedSubOptionId === opt.id}
                lockDisabled={!canLock || (!!lockedSubOptionId && lockedSubOptionId !== opt.id)}
                onToggleLock={() => onToggleLock(opt.id)}
              />
            ))}
          </div>

          <div className="rounded-xl border border-border bg-background/10 px-3 py-2 text-sm text-muted">
            - 잠금은 <span className="font-semibold text-foreground">최대 1개</span>까지 가능해요. 현재 잠금:{" "}
            <span className="font-semibold text-foreground">{lockedSubOptionId ? "1개" : "0개"}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              disabled={!selected}
              onClick={onExecuteRedistribute}
            >
              재분배 실행
            </Button>
            <Button variant="secondary" onClick={onClearLock} disabled={!lockedSubOptionId}>
              잠금 해제
            </Button>
          </div>
        </div>
      ) : (
        <EmptyState
          title="장비가 선택되지 않았어요."
          description="인벤토리에서 장비를 선택해 주세요."
        />
      )}
    </Panel>
  );
}


