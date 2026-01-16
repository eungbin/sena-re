"use client";

import { useMemo, useState } from "react";
import type { EquipmentItem } from "../_lib/types";
import { ReforgeTabs } from "./ReforgeTabs";
import { InventoryPanel } from "./panels/InventoryPanel";
import { EquipmentRegisterDialog } from "./panels/EquipmentRegisterDialog";
import { PreviewPanel } from "./panels/PreviewPanel";
import { RulesPanel } from "./panels/RulesPanel";
import { SelectedEquipmentPanel } from "./panels/SelectedEquipmentPanel";

export function EquipmentReforgeShell() {
  const [activeTab] = useState<"redistribute">("redistribute");
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [lockedSubOptionId, setLockedSubOptionId] = useState<string | null>(null); // 최대 1개 잠금
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const selected = useMemo(
    () => equipmentList.find((x) => x.id === selectedId) ?? null,
    [equipmentList, selectedId],
  );

  const totalPlus = useMemo(() => {
    if (!selected) return 0;
    return selected.subOptions.reduce((acc, cur) => acc + cur.plus, 0);
  }, [selected]);

  const canLock = useMemo(() => {
    if (!selected) return false;
    return selected.subOptions.length > 0;
  }, [selected]);

  const onSelectEquipment = (id: string) => {
    setSelectedId(id);
    setLockedSubOptionId(null);
  };

  const onToggleLock = (subOptionId: string) => {
    setLockedSubOptionId((prev) => (prev === subOptionId ? null : subOptionId));
  };

  const onResetSelection = () => {
    setLockedSubOptionId(null);
    setSelectedId(null);
  };

  return (
    <div className="mt-4">
      <ReforgeTabs
        activeTab={activeTab}
        onClickProbabilityInfo={() => {
          // UI only
        }}
      />

      <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-4">
          <RulesPanel />
          <SelectedEquipmentPanel
            selected={selected}
            totalPlus={totalPlus}
            lockedSubOptionId={lockedSubOptionId}
            canLock={canLock}
            onToggleLock={onToggleLock}
            onResetSelection={onResetSelection}
            onClearLock={() => setLockedSubOptionId(null)}
            onExecuteRedistribute={() => {
              // UI only: 로직 연결 전
            }}
          />
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start lg:h-fit">
          <InventoryPanel
            equipmentList={equipmentList}
            selectedId={selectedId}
            onSelectEquipment={onSelectEquipment}
            onOpenRegister={() => setIsRegisterOpen(true)}
          />
          <PreviewPanel />
        </div>
      </div>

      <EquipmentRegisterDialog
        open={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onCreate={(item) => {
          // UI only: 로직 연결 전. 등록 데이터를 저장/검증하는 로직은 여기서 대체하면 됩니다.
          setEquipmentList((prev) => [item, ...prev]);
          setSelectedId(item.id);
          setLockedSubOptionId(null);
        }}
      />
    </div>
  );
}


