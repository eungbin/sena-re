export type ZzolTotalWarTier = "normal" | "advanced" | "rare" | "legend";

export type ZzolKeyBox = "none" | "50" | "80" | "100" | "120";

export type ZzolTowerMedal = "90" | "120";

export type ZzolFormState = {
  // 월정액
  isRubyMonthly: boolean;
  isKeyMonthly: boolean;

  // 열쇠상자
  keyBox: ZzolKeyBox;

  // 7일 단위
  weeklyHonorShopCount: number | "";
  weeklyGuildShopCount: number | "";

  // 28일 단위
  monthlyArenaShopCount: number | "";
  monthlyGuildWarShopCount: number | "";
  monthlyTotalWarShopCount: number | "";

  // 추가 입력
  dailyRaidCount: number | "";
  totalWarTier: ZzolTotalWarTier;
  towerMedal: ZzolTowerMedal;
  dailyRubySpend: number | "";
};

export type ZzolResults = {
  rubyNetProfit?: {
    dailyAvg?: string;
    weeks2?: string;
    weeks4?: string;
  };
  levelingMobs?: {
    dailyAvg?: string;
    weeks2?: string;
    weeks4?: string;
  };
  nightmareLegendAccessoryCeiling?: {
    duration?: string;
  };
};


