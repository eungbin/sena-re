"use client";

import type { EquipmentItem } from "../../_lib/types";
import { EquipmentTile } from "../_ui/EquipmentTile";
import { Button } from "../_ui/Button";
import { EmptyState } from "../_ui/EmptyState";
import { Panel } from "../_ui/Panel";

export function InventoryPanel({
  equipmentList,
  selectedId,
  onSelectEquipment,
  onOpenRegister,
  onDeleteEquipment,
}: {
  equipmentList: EquipmentItem[];
  selectedId: string | null;
  onSelectEquipment: (id: string) => void;
  onOpenRegister: () => void;
  onDeleteEquipment: (id: string) => void;
}) {
  return (
    <Panel title="장비 선택" description="등록하신 장비를 선택해 주세요.">
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center gap-2">
          <input
            className="w-full rounded-xl border border-border bg-background/10 px-3 py-2 text-sm text-foreground placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="장비 검색(더미)"
          />
          <Button size="md" className="shrink-0 px-3" variant="primary" onClick={onOpenRegister}>
            장비 등록
          </Button>
        </div>

        {equipmentList.length === 0 ? (
          <EmptyState
            title="등록된 장비가 없어요."
            description="오른쪽 상단의 '장비 등록' 버튼으로 장비를 먼저 등록해 주세요."
          />
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {equipmentList.map((item) => (
              <EquipmentTile
                key={item.id}
                item={item}
                selected={item.id === selectedId}
                onClick={() => onSelectEquipment(item.id)}
                onDelete={onDeleteEquipment}
              />
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}


