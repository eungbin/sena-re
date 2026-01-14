import type { ReactNode } from "react";

type ZzolNumberInputProps = {
  name: string;
  label: string;
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  defaultValue?: number;
  value?: number | "";
  onValueChange?: (value: number | "") => void;
  disabled?: boolean;
  /** Optional right-side content shown next to the label (e.g. quick action buttons). */
  headerRight?: ReactNode;
};

export function ZzolNumberInput({
  name,
  label,
  id,
  min = 0,
  max,
  step = 1,
  placeholder = "0",
  defaultValue,
  value,
  onValueChange,
  disabled,
  headerRight,
}: ZzolNumberInputProps) {
  const inputId = id ?? name;
  const isControlled = typeof value === "number" || value === "";

  const clampToRange = (n: number) => {
    let next = n;
    next = Math.max(min, next);
    if (typeof max === "number") {
      next = Math.min(max, next);
    }
    return next;
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={inputId} className="block text-sm text-foreground">
          {label}
        </label>
        {headerRight ? <div className="flex items-center gap-2">{headerRight}</div> : null}
      </div>
      <input
        id={inputId}
        type="number"
        name={name}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        {...(isControlled ? { value } : { defaultValue })}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === "") {
            onValueChange?.("");
            return;
          }
          const next = Number(raw);
          if (Number.isNaN(next)) {
            onValueChange?.("");
            return;
          }
          onValueChange?.(clampToRange(next));
        }}
        disabled={disabled}
        inputMode="numeric"
        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}


