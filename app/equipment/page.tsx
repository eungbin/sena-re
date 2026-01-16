import { PageContainer } from "../_components/PageContainer";
import { EquipmentReforgeShell } from "./_components/EquipmentReforgeShell";

export default function EquipmentPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">장비 재구성</h1>
      </div>
      <EquipmentReforgeShell />
    </PageContainer>
  );
}


