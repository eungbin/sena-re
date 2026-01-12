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
}: ZzolNumberInputProps) {
  const inputId = id ?? name;
  const isControlled = typeof value === "number" || value === "";

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm text-foreground">
        {label}
      </label>
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
          onValueChange?.(Number.isNaN(next) ? "" : next);
        }}
        disabled={disabled}
        inputMode="numeric"
        className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}


