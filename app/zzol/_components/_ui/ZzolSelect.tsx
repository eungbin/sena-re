type ZzolSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type ZzolSelectProps = {
  name: string;
  label: string;
  options: ZzolSelectOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  id?: string;
  helperText?: string;
  disabled?: boolean;
};

export function ZzolSelect({
  name,
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  id,
  helperText,
  disabled,
}: ZzolSelectProps) {
  const selectId = id ?? name;
  const isControlled = typeof value === "string";

  return (
    <div>
      <label
        htmlFor={selectId}
        aria-disabled={disabled || undefined}
        className={`block text-sm text-foreground select-none ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        {...(isControlled ? { value } : { defaultValue })}
        onChange={(e) => onValueChange?.(e.target.value)}
        disabled={disabled}
        className="mt-2 w-full cursor-pointer rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      {helperText ? <p className="mt-2 text-xs text-muted">{helperText}</p> : null}
    </div>
  );
}


