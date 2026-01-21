"use client";

import { useState } from "react";
import { ReforgeTabs } from "./ReforgeTabs";
import { InventoryPanel } from "./panels/InventoryPanel";
import { EquipmentRegisterDialog } from "./panels/EquipmentRegisterDialog";
import { PreviewPanel } from "./panels/PreviewPanel";
import { RulesPanel } from "./panels/RulesPanel";
import { SelectedEquipmentPanel } from "./panels/SelectedEquipmentPanel";
import { useEquipmentReforge } from "../_lib/useEquipmentReforge";

export function EquipmentReforgeShell() {
  const [activeTab] = useState<"redistribute">("redistribute");
  const {
    equipmentList,
    selectedId,
    selected,
    lockedSubOptionId,
    totalPlus,
    canLock,
    isRegisterOpen,
    selectEquipment,
    toggleLock,
    clearLock,
    resetSelection,
    openRegister,
    closeRegister,
    createEquipment,
    deleteEquipment,
  } = useEquipmentReforge();

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
            onToggleLock={toggleLock}
            onResetSelection={resetSelection}
            onClearLock={clearLock}
            onExecuteRedistribute={() => {
              // UI only: 로직 연결 전
            }}
          />
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start lg:h-fit">
          <InventoryPanel
            equipmentList={equipmentList}
            selectedId={selectedId}
            onSelectEquipment={selectEquipment}
            onOpenRegister={openRegister}
            onDeleteEquipment={deleteEquipment}
          />
          <PreviewPanel />
        </div>
      </div>

      <EquipmentRegisterDialog
        open={isRegisterOpen}
        onClose={closeRegister}
        onCreate={createEquipment}
      />
    </div>
  );
}


