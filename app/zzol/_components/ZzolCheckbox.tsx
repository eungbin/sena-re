type ZzolCheckboxProps = {
  /** form name */
  name: string;
  /** label text shown to user */
  label: string;
  /** optional id (defaults to name) */
  id?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
};

export function ZzolCheckbox({
  name,
  label,
  id,
  defaultChecked,
  checked,
  onCheckedChange,
  disabled,
}: ZzolCheckboxProps) {
  const inputId = id ?? name;
  const isControlled = typeof checked === "boolean";

  return (
    <label
      htmlFor={inputId}
      aria-disabled={disabled || undefined}
      className={`flex items-center gap-3 rounded-xl border border-border bg-background/30 px-4 py-3 select-none ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
    >
      <input
        id={inputId}
        type="checkbox"
        name={name}
        {...(isControlled ? { checked } : { defaultChecked })}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 cursor-pointer rounded border-border bg-background text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}


