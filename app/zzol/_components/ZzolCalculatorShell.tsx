"use client";

import { useMemo, useReducer } from "react";
import { calcZzolResults } from "../_lib/calc";
import type { ZzolFormState } from "../_lib/types";
import { ZzolResultsFloatingPanel } from "./ZzolResultsFloatingPanel";
import { ZzolCalculator } from "./ZzolCalculator";

type Action =
  | { type: "set"; key: keyof ZzolFormState; value: ZzolFormState[keyof ZzolFormState] }
  | { type: "reset" };

const initialState: ZzolFormState = {
  isRubyMonthly: false,
  isKeyMonthly: false,
  keyBox: "none",
  weeklyHonorShopCount: "",
  weeklyGuildShopCount: "",
  monthlyArenaShopCount: "",
  monthlyGuildWarShopCount: "",
  monthlyTotalWarShopCount: "",
  dailyRaidCount: "",
  totalWarTier: "normal",
  towerMedal: "90",
  dailyRubySpend: "",
};

function reducer(state: ZzolFormState, action: Action): ZzolFormState {
  switch (action.type) {
    case "set":
      return { ...state, [action.key]: action.value } as ZzolFormState;
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function ZzolCalculatorShell() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const results = useMemo(() => calcZzolResults(state), [state]);

  const setField = <K extends keyof ZzolFormState>(key: K, value: ZzolFormState[K]) => {
    dispatch({ type: "set", key, value });
  };

  return (
    <div className="mt-4 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-4">
        <ZzolCalculator value={state} onChange={setField} />

        <div className="lg:hidden">
          <ZzolResultsFloatingPanel {...results} />
        </div>
      </div>

      <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:h-fit">
        <ZzolResultsFloatingPanel {...results} />
      </div>
    </div>
  );
}


