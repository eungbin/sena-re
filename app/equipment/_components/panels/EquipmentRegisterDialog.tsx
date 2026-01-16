"use client";

import { useMemo, useState } from "react";
import type { EquipmentItem, SubOption, EquipmentSetName } from "../../_lib/types";
import { MAIN_OPTIONS_BY_SLOT, SUB_OPTIONS } from "../../_lib/options";
import { Dialog } from "../_ui/Dialog";
import { Select as UiSelect } from "../../../_components/_ui/Select";
import { Button } from "../_ui/Button";
import { cx } from "../_ui/cx";

type Draft = {
  name: string;
  slot: EquipmentItem["slot"];
  setName: EquipmentSetName;
  mainOptionName: string;
  mainOptionLabel: string;
  subOptions: Array<{ label: string; plus: string }>; // 2~4
};

function makeDefaultDraft(): Draft {
  return {
    name: "",
    slot: "무기",
    setName: "선봉장",
    mainOptionName: MAIN_OPTIONS_BY_SLOT["무기"][0] ?? "모든 공격력%",
    mainOptionLabel: "",
    subOptions: [{ label: "", plus: "0" }, { label: "", plus: "0" }, { label: "", plus: "0" }, { label: "", plus: "0" }],
  };
}

function clampSubOptions(list: Array<{ label: string; plus: string }>) {
  if (list.length < 2) return list.slice(0, 2);
  if (list.length > 4) return list.slice(0, 4);
  return list;
}

function toInt(v: string, fallback: number) {
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : fallback;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs font-semibold text-muted">{children}</div>;
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "w-full rounded-xl border border-border bg-background/10 px-3 py-2 text-sm text-foreground",
        "placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        props.className,
      )}
    />
  );
}

export function EquipmentRegisterDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (item: EquipmentItem) => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => makeDefaultDraft());

  const subOptionsView = useMemo(() => draft.subOptions, [draft.subOptions]);

  const canAdd = draft.subOptions.length < 4;
  const canRemove = draft.subOptions.length > 2;

  const addSubOption = () => {
    if (!canAdd) return;
    setDraft((p) => ({
      ...p,
      subOptions: clampSubOptions([...p.subOptions, { label: "", plus: "0" }]),
    }));
  };

  const removeSubOption = () => {
    if (!canRemove) return;
    setDraft((p) => ({
      ...p,
      subOptions: clampSubOptions(p.subOptions.slice(0, -1)),
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      title="장비 등록"
    >
      <form
        className="grid gap-3"
        onSubmit={(e) => {
          e.preventDefault();

          const subOptions: SubOption[] = subOptionsView.map((s, idx) => ({
            id: `s${idx + 1}`,
            label: s.label.trim() || `서브옵션 ${idx + 1}`,
            plus: toInt(s.plus, 0),
          }));

          const item: EquipmentItem = {
            id: `local-${Date.now()}`,
            name: draft.name.trim() || "이름 없는 장비",
            slot: draft.slot,
            setName: draft.setName,
            mainOptionLabel: draft.mainOptionName || "메인 옵션(미선택)",
            subOptions,
          };

          onCreate(item);
          setDraft(makeDefaultDraft());
          onClose();
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <FieldLabel>이름</FieldLabel>
            <TextInput
              placeholder="예: 복수자-치피"
              value={draft.name}
              onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
            />
          </div>

          <div className="grid gap-1.5">
            <FieldLabel>부위</FieldLabel>
            <UiSelect
              options={[
                { value: "무기", label: "무기" },
                { value: "방어구", label: "방어구" },
              ]}
              value={draft.slot}
              onValueChange={(v) => {
                const nextSlot = v as EquipmentItem["slot"];
                const nextMain = MAIN_OPTIONS_BY_SLOT[nextSlot]?.[0] ?? "모든 공격력%";
                setDraft((p) => ({ ...p, slot: nextSlot, mainOptionName: nextMain }));
              }}
            />
          </div>

          <div className="grid gap-1.5">
            <FieldLabel>세트명</FieldLabel>
            <UiSelect
              options={[
                { value: "선봉장", label: "선봉장" },
                { value: "추적자", label: "추적자" },
                { value: "성기사", label: "성기사" },
                { value: "수문장", label: "수문장" },
                { value: "수호자", label: "수호자" },
                { value: "암살자", label: "암살자" },
                { value: "복수자", label: "복수자" },
                { value: "주술사", label: "주술사" },
                { value: "조율자", label: "조율자" },
              ]}
              value={draft.setName}
              onValueChange={(v) => setDraft((p) => ({ ...p, setName: v as EquipmentSetName }))}
            />
          </div>

          <div className="grid gap-1.5">
            <FieldLabel>주 옵션</FieldLabel>
            <UiSelect
              options={MAIN_OPTIONS_BY_SLOT[draft.slot].map((x) => ({ value: x, label: x }))}
              value={draft.mainOptionName}
              onValueChange={(v) => setDraft((p) => ({ ...p, mainOptionName: v }))}
            />
          </div>
        </div>

        <div className="mt-1 rounded-xl border border-border bg-background/10 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-sm font-semibold text-foreground">서브 옵션</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">
                슬롯 수: <span className="font-semibold text-foreground">{draft.subOptions.length}</span>
              </span>
              <Button size="sm" variant="primary" onClick={addSubOption} disabled={!canAdd} className="px-3">
                추가
              </Button>
              <Button size="sm" variant="secondary" onClick={removeSubOption} disabled={!canRemove} className="px-3">
                삭제
              </Button>
            </div>
          </div>

          <div className="mt-3 grid gap-2">
            {subOptionsView.map((s, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 gap-2 rounded-xl border border-border bg-background/10 p-3 sm:grid-cols-[1fr_120px]"
              >
                <div className="grid gap-1.5">
                  <FieldLabel>옵션 {idx + 1}</FieldLabel>
                  <UiSelect
                    options={SUB_OPTIONS.map((x) => ({ value: x, label: x }))}
                    placeholder="옵션 선택"
                    value={s.label}
                    onValueChange={(v) => {
                      setDraft((p) => {
                        const next = [...p.subOptions];
                        next[idx] = { ...next[idx], label: v };
                        return { ...p, subOptions: next };
                      });
                    }}
                  />
                </div>
                <div className="grid gap-1.5">
                  <FieldLabel>강화(+)</FieldLabel>
                  <TextInput
                    inputMode="numeric"
                    placeholder="0"
                    value={s.plus}
                    onChange={(e) => {
                      const v = e.target.value;
                      setDraft((p) => {
                        const next = [...p.subOptions];
                        next[idx] = { ...next[idx], plus: v };
                        return { ...p, subOptions: next };
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1 flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setDraft(makeDefaultDraft());
              onClose();
            }}
          >
            취소
          </Button>
          <Button type="submit" variant="primary">
            등록
          </Button>
        </div>
      </form>
    </Dialog>
  );
}


