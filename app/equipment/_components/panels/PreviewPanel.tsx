"use client";

import { EmptyState } from "../_ui/EmptyState";
import { Panel } from "../_ui/Panel";

export function PreviewPanel() {
  return (
    <Panel
      title="결과"
      description="재분배 결과를 확인해 주세요."
    >
      <EmptyState
        title="프리뷰 준비 중"
        description="선택된 장비/잠금 정보 기반으로 재분배 결과를 그려주면 됩니다."
      />
    </Panel>
  );
}


