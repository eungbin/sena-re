"use client";

import { Panel } from "../_ui/Panel";

export function RulesPanel() {
  return (
    <Panel
      title="규칙"
      description="재분배는 서브옵션의 옵션 종류와 강화(+n) 분배가 함께 재설정됩니다."
    >
      <ul className="grid gap-2 text-sm text-muted">
        <li>- 서브옵션 수는 고정(현재 2~4줄 그대로 유지)</li>
        <li>- 동일한 옵션 종류는 동시에 2개 이상 존재할 수 없음(중복 불가)</li>
        <li>- 서브옵션은 최대 1개까지 잠금 가능</li>
        <li>- 총 강화량(서브옵션 +의 합)은 보존됨</li>
      </ul>
    </Panel>
  );
}


