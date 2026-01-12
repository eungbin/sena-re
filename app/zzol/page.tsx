import { PageContainer } from "../_components/PageContainer";
import { ZzolCalculatorShell } from "./_components/ZzolCalculatorShell";

export default function ZzolPage() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">쫄작 계산기</h1>
      </div>
      <ZzolCalculatorShell />
    </PageContainer>
  );
}


