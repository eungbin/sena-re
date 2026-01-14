import type { ZzolFormState, ZzolResults } from "./types";
import { constants } from "./constants";

/**
 * 쫄작 계산기 결과 계산
 * - SRP: React/UI와 분리된 순수 함수로 유지
 */
export function calcZzolResults(_state: ZzolFormState): ZzolResults {
  let fourWeeksGetKeyCount: number = 0; // 4주 총 열쇠 획득량
  let fourWeeksGetRubyCount: number = 0; // 4주 총 루비 획득량
  let fourWeeksSpendKeyCount: number = 0; // 4주 총 열쇠 소비량
  let fourWeeksSpendRubyCount: number = 0; // 4주 총 루비 소비량

  fourWeeksGetKeyCount += (getDailyKeyCount(_state) + constants.ATTEMP_300_KEY_COUNT_PER_DAILY) * 28
                                                    + constants.WEEKEND_PUSH_KEY_COUNT * 4
                                                    + constants.UPDATE_KEY_COUNT_PER_2WEEKS * 2
                                                    + constants.RELAY_KEY_COUNT_PER_2WEEKS * 2;
  fourWeeksGetRubyCount += (getDailyRubyCount(_state) + constants.ATTEMP_300_RUBY_COUNT_PER_DAILY) * 28
                                                      + constants.WEEKEND_BOOST_RUBY_COUNT * 4
                                                      + constants.RELAY_RUBY_COUNT_PER_2WEEKS * 2
                                                      + constants.MONTHLY_RUBY_RUBY_COUNT * 1
                                                      + constants.MONTHLY_KEY_RUBY_COUNT * 1;

  const keyFromRuby: { dailySpendRuby: number, keyCount: number } = getDailyRubySpendForKey(_state);

  fourWeeksGetKeyCount += keyFromRuby.keyCount * 28;
  fourWeeksSpendRubyCount += keyFromRuby.dailySpendRuby * 28

  const rubyFromZzol: { oneCycleGetRuby: number, oneCycleSpendKey: number, oneCycleCount: number } = getDailyRubyFromZzol(_state);
  const totalZzolCycleCount: number = fourWeeksGetKeyCount/rubyFromZzol.oneCycleSpendKey; // 총 쫄작 사이클 횟수
  const totalZzolGameCount: number = totalZzolCycleCount * rubyFromZzol.oneCycleCount; // 총 쫄작 게임 횟수
  const totalZzolCount: number = totalZzolCycleCount * constants.ZZOL_MONSTER_COUNT; // 총 쫄몹
  const spendKeyForZzol: number = totalZzolGameCount * constants.ZZOL_SPEND_KEY_PER_GAME; // 쫄작에 사용하는 총 열쇠 개수
  const getRubyForZzol: number = rubyFromZzol.oneCycleGetRuby * totalZzolCycleCount; // 쫄작에서 획득하는 총 루비 개수
  
  fourWeeksSpendKeyCount += spendKeyForZzol; // 쫄작에 사용하는 열쇠 개수 추가
  fourWeeksGetRubyCount += getRubyForZzol; // 쫄작에서 획득하는 루비 개수 추가

  const fourWeeksGetRuby: number = Math.floor(fourWeeksGetRubyCount - fourWeeksSpendRubyCount);

  return {
    rubyNetProfit: {
      dailyAvg: Math.floor(fourWeeksGetRuby/28).toString(),
      weeks2: Math.floor(fourWeeksGetRuby/2).toString(),
      weeks4: (fourWeeksGetRuby).toString(),
    },
    levelingMobs: {
      dailyAvg: Math.floor(totalZzolCount/28).toString(),
      weeks2: Math.floor(totalZzolCount/2).toString(),
      weeks4: Math.floor(totalZzolCount).toString(),
    },
    nightmareLegendAccessoryCeiling: {
      duration: '0일',
    }
  };
}

/**
 * 하루에 획득할 수 있는 열쇠 개수
 * @param state - 쫄작 계산기 입력값
 * @returns - 일일 열쇠 개수
 */
function getDailyKeyCount(state: ZzolFormState): number {
  const defaultKey: number = state.isKeyMonthly ? 720 : 480;
  const dailyMission: number = 60; // 일일미션 열쇠
  const dailyGuild: number = 60; // 길드출석 열쇠
  const dailyFreeShopKey: number = 90; // 일일 무료상점 열쇠
  const dailyKeyMonthly: number = state.isKeyMonthly ? 80 : 0; // 월정액권 열쇠
  const dailyGuildContents: number = 20; // 일일 길드 공성전 열쇠
  
  return defaultKey + dailyMission + dailyGuild + dailyFreeShopKey + dailyKeyMonthly + dailyGuildContents;
}

/**
 * 하루에 획득할 수 있는 루비 개수
 * @param state - 쫄작 계산기 입력값
 * @returns - 일일 루비 개수
 */
function getDailyRubyCount(state: ZzolFormState ): number {
  const dailyRubyAtMonthly = state.isRubyMonthly ? 200 : 0; // 월정액권 루비 200개
  const dailyMission: number = 100; // 일일미션 루비 100개
  const dailyFreeShopRuby: number = 30; // 일일 무료상점 루비 30개

  return dailyRubyAtMonthly + dailyMission + dailyFreeShopRuby;
}

/**
 * 50~120루비단 열쇠 구매에 드는 루비 개수
 * @param state - 쫄작 계산기 입력값
 * @returns { dailySpendRuby: number, keyCount: number } - 일일 루비 소비량(열쇠 구매)과 구매한 열쇠 개수
 */
function getDailyRubySpendForKey(state: ZzolFormState ): { dailySpendRuby: number, keyCount: number } {
  if(state.keyBox === 'none') return { dailySpendRuby: 0, keyCount: 0 };

  const RUBYDAN_AMOUNT = {
    '50': 20,
    '80': 50,
    '100': 50,
    '120': 50
  }
  const ORDER: ('50' | '80' | '100' | '120')[] = ['50', '80', '100', '120'];
  
  const priceParam: '50' | '80' | '100' | '120' = state.keyBox; // 0, 50~120 루비단
  const startIdx = ORDER.indexOf(priceParam);
  let dailySpendRuby: number = 0;
  let keyCount: number = 0;

  for(let i=startIdx; i>=0; i--) {
    dailySpendRuby += Number(ORDER[i]) * RUBYDAN_AMOUNT[ORDER[i]];
    keyCount += RUBYDAN_AMOUNT[ORDER[i]] * 60;
  }

  return { dailySpendRuby, keyCount };
}

/**
 * 쫄작으로부터 나오는 루비 개수 및 열쇠 소모량 및 한 사이클 횟수
 * @param state - 쫄작 계산기 입력값
 * @returns { dailyRuby: number, keyCount: number, oneCycleCount: number } - 쫄작 한 사이클로부터 나오는 루비 개수 및 열쇠 소모량 및 한 사이클 횟수
 */
function getDailyRubyFromZzol(state: ZzolFormState): { oneCycleGetRuby: number, oneCycleSpendKey: number, oneCycleCount: number } {
  const oneCycleCount: number = getOneCycleZzol(state.isRubyMonthly);
  const oneCycleSpendKey = oneCycleCount * constants.ZZOL_SPEND_KEY_PER_GAME; // 쫄작 만렙 한 사이클 열쇠 소모량
  const oneCycleGetRuby: number = 160; // 쫄작 만렙 한 사이클 루비 획득량

  return { oneCycleGetRuby, oneCycleSpendKey, oneCycleCount };
}

/**
 * 
 * @param isRubyMonthly - 루비월정액 여부(루비 월정액 결제 시 경험치10% 추가획득)
 * @returns - 루비월정액 여부에 따른 쫄 만렙 판수
 */
function getOneCycleZzol(isRubyMonthly: boolean): number {
  return isRubyMonthly ? 10 : 11
}