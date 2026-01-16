type ZzolButtonRadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type ZzolButtonRadioGroupProps = {
  name: string;
  label: string;
  options: ZzolButtonRadioOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
};

export function ZzolButtonRadioGroup({
  name,
  label,
  options,
  defaultValue,
  value,
  onValueChange,
  disabled,
}: ZzolButtonRadioGroupProps) {
  const isControlled = typeof value === "string";

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm text-foreground">{label}</legend>

      <div className="inline-flex w-fit overflow-hidden rounded-xl border border-border bg-background/30 mt-2">
        {options.map((opt) => {
          const id = `${name}-${opt.value}`;
          const isDisabled = disabled || opt.disabled;

          return (
            <label
              key={opt.value}
              htmlFor={id}
              className="relative"
              aria-disabled={isDisabled || undefined}
            >
              <input
                id={id}
                className="peer sr-only"
                type="radio"
                name={name}
                value={opt.value}
                {...(isControlled
                  ? { checked: value === opt.value }
                  : { defaultChecked: defaultValue === opt.value })}
                onChange={() => onValueChange?.(opt.value)}
                disabled={isDisabled}
              />
              <span className="block cursor-pointer select-none px-4 py-2 text-sm text-muted transition-colors peer-checked:bg-accent/20 peer-checked:text-foreground peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-disabled:cursor-not-allowed peer-disabled:opacity-60">
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}


