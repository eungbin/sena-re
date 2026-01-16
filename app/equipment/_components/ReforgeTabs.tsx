"use client";

import { Button } from "./_ui/Button";
import { TabButton } from "./_ui/TabButton";

export function ReforgeTabs({
  activeTab,
  onClickProbabilityInfo,
}: {
  activeTab: "redistribute";
  onClickProbabilityInfo?: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TabButton active={activeTab === "redistribute"} onClick={() => {}}>
        재분배
      </TabButton>
      <TabButton disabled>강화 (준비 중)</TabButton>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="pill" size="xs" onClick={onClickProbabilityInfo}>
          확률 정보
        </Button>
      </div>
    </div>
  );
}


