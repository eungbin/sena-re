type QuickValueButton = {
  label: string;
  value: number;
};

type ZzolQuickValueButtonsProps = {
  buttons: QuickValueButton[];
  onSelect: (value: number) => void;
  disabled?: boolean;
};

export function ZzolQuickValueButtons({
  buttons,
  onSelect,
  disabled,
}: ZzolQuickValueButtonsProps) {
  return (
    <>
      {buttons.map((b) => (
        <button
          key={`${b.label}:${b.value}`}
          type="button"
          onClick={() => onSelect(b.value)}
          disabled={disabled}
          className="cursor-pointer rounded-lg border border-border bg-background/60 px-3 py-1 text-xs text-foreground transition-colors duration-150 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95 active:bg-background/80 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        >
          {b.label}
        </button>
      ))}
    </>
  );
}


