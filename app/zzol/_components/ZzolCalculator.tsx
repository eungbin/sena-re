"use client";

import type {
  ZzolFormState,
  ZzolKeyBox,
  ZzolTotalWarTier,
  ZzolTowerMedal,
} from "../_lib/types";
import { ZzolButtonRadioGroup } from "./ZzolButtonRadioGroup";
import { ZzolCheckbox } from "./ZzolCheckbox";
import { ZzolNumberInput } from "./ZzolNumberInput";
import { ZzolSection } from "./ZzolSection";
import { ZzolSelect } from "./ZzolSelect";

type ZzolCalculatorProps = {
  value: ZzolFormState;
  onChange: <K extends keyof ZzolFormState>(key: K, next: ZzolFormState[K]) => void;
};

export function ZzolCalculator({ value, onChange }: ZzolCalculatorProps) {
  const keyBoxOptions: { value: ZzolKeyBox; label: string }[] = [
    { value: "none", label: "구매안함" },
    { value: "50", label: "50루비" },
    { value: "80", label: "80루비" },
    { value: "100", label: "100루비" },
    { value: "120", label: "120루비" },
  ];

  const totalWarTierOptions: { value: ZzolTotalWarTier; label: string }[] = [
    { value: "normal", label: "일반" },
    { value: "advanced", label: "고급" },
    { value: "rare", label: "희귀" },
    { value: "legend", label: "전설" },
  ];

  const towerMedalOptions: { value: ZzolTowerMedal; label: string }[] = [
    { value: "90", label: "90개" },
    { value: "120", label: "120개" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ZzolSection title="월정액 여부">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ZzolCheckbox
            name="isRubyMonthly"
            label="루비 월정액"
            checked={value.isRubyMonthly}
            onCheckedChange={(checked) => onChange("isRubyMonthly", checked)}
          />
          <ZzolCheckbox
            name="isKeyMonthly"
            label="열쇠 월정액"
            checked={value.isKeyMonthly}
            onCheckedChange={(checked) => onChange("isKeyMonthly", checked)}
          />
        </div>
      </ZzolSection>

      <ZzolSection title="열쇠상자">
        <div className="max-w-sm">
          <ZzolSelect
            name="keyBox"
            label="구매 옵션"
            value={value.keyBox}
            onValueChange={(v) => onChange("keyBox", v as ZzolKeyBox)}
            options={keyBoxOptions}
            helperText='기본값은 "구매안함"입니다.'
          />
        </div>
      </ZzolSection>

      <ZzolSection title="7일 단위 상점에서 구매할 열쇠 개수">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ZzolNumberInput
            name="weeklyHonorShopCount"
            label="명예 상점 구매 횟수"
            value={value.weeklyHonorShopCount}
            onValueChange={(v) => onChange("weeklyHonorShopCount", v)}
          />
          <ZzolNumberInput
            name="weeklyGuildShopCount"
            label="길드 상점 구매 횟수"
            value={value.weeklyGuildShopCount}
            onValueChange={(v) => onChange("weeklyGuildShopCount", v)}
          />
        </div>
      </ZzolSection>

      <ZzolSection title="28일 단위 상점에서 구매할 열쇠 개수">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <ZzolNumberInput
            name="monthlyArenaShopCount"
            label="결투장 상점 구매 횟수"
            value={value.monthlyArenaShopCount}
            onValueChange={(v) => onChange("monthlyArenaShopCount", v)}
          />
          <ZzolNumberInput
            name="monthlyGuildWarShopCount"
            label="길드전 상점 구매 횟수"
            value={value.monthlyGuildWarShopCount}
            onValueChange={(v) => onChange("monthlyGuildWarShopCount", v)}
          />
          <ZzolNumberInput
            name="monthlyTotalWarShopCount"
            label="총력전 상점 구매 횟수"
            value={value.monthlyTotalWarShopCount}
            onValueChange={(v) => onChange("monthlyTotalWarShopCount", v)}
          />
        </div>
      </ZzolSection>

      <ZzolSection title="추가 입력">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ZzolNumberInput
            name="dailyRaidCount"
            label="일일 레이드 횟수 (11단계 이상 가정)"
            value={value.dailyRaidCount}
            onValueChange={(v) => onChange("dailyRaidCount", v)}
          />

          <ZzolSelect
            name="totalWarTier"
            label="총력전 티어"
            value={value.totalWarTier}
            onValueChange={(v) => onChange("totalWarTier", v as ZzolTotalWarTier)}
            options={totalWarTierOptions}
          />

          <ZzolButtonRadioGroup
            name="towerMedal"
            label="시련의 탑 메달"
            value={value.towerMedal}
            onValueChange={(v) => onChange("towerMedal", v as ZzolTowerMedal)}
            options={towerMedalOptions}
          />

          <ZzolNumberInput
            name="dailyRubySpend"
            label="매일 일정하게 사용하는 루비"
            value={value.dailyRubySpend}
            onValueChange={(v) => onChange("dailyRubySpend", v)}
          />
        </div>
      </ZzolSection>
    </div>
  );
}


