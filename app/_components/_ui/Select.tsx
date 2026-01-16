"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = {
  name?: string;
  options: SelectOption[];
  label?: string;
  helperText?: string;
  id?: string;
  disabled?: boolean;

  /** controlled */
  value?: string;
  /** uncontrolled */
  defaultValue?: string;

  placeholder?: string;
  onValueChange?: (value: string) => void;

  size?: "md" | "sm";
  className?: string;
  triggerClassName?: string;
};

function cx(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

function nextEnabledIndex(options: SelectOption[], start: number, dir: 1 | -1) {
  if (options.length === 0) return -1;
  let i = start;
  for (let step = 0; step < options.length; step++) {
    i = (i + dir + options.length) % options.length;
    if (!options[i]?.disabled) return i;
  }
  return -1;
}

export function Select({
  name,
  options,
  label,
  helperText,
  id,
  disabled,
  value,
  defaultValue,
  placeholder = "선택",
  onValueChange,
  size = "md",
  className,
  triggerClassName,
}: SelectProps) {
  const reactId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const labelId = `${id ?? reactId}-label`;
  const triggerId = `${id ?? reactId}-trigger`;
  const listboxId = `${id ?? reactId}-listbox`;

  const isControlled = typeof value === "string";
  const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(
    defaultValue ?? options.find((o) => !o.disabled)?.value,
  );
  const selectedValue = isControlled ? value : uncontrolledValue;

  const selectedOption = useMemo(() => {
    return options.find((o) => o.value === selectedValue) ?? null;
  }, [options, selectedValue]);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const idx = options.findIndex((o) => o.value === selectedValue);
    return idx >= 0 ? idx : options.findIndex((o) => !o.disabled);
  });

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      const el = rootRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };
    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // open 상태에서 바깥 클릭으로 닫히는 것만 처리
  }, [open, options, selectedValue]);

  useEffect(() => {
    if (!open) return;
    // open 시 리스트로 스크롤 포커싱
    const t = window.setTimeout(() => {
      const list = listRef.current;
      if (!list) return;
      const activeEl = list.querySelector<HTMLElement>("[data-active='true']");
      activeEl?.scrollIntoView({ block: "nearest" });
    }, 0);
    return () => window.clearTimeout(t);
  }, [open, activeIndex]);

  const triggerSizeClass =
    size === "sm" ? "px-3 py-1.5 text-sm" : "px-3 py-2 text-sm";

  const setSelected = (next: string) => {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next);
  };

  const computeActiveIndex = () => {
    const idx = options.findIndex((o) => o.value === selectedValue);
    return idx >= 0 ? idx : options.findIndex((o) => !o.disabled);
  };

  const openList = () => {
    if (disabled) return;
    setActiveIndex(computeActiveIndex());
    setOpen(true);
  };

  const closeList = () => setOpen(false);

  const onTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openList();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((p) => {
        const next = !p;
        if (next) setActiveIndex(computeActiveIndex());
        return next;
      });
    }
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeList();
      (document.getElementById(triggerId) as HTMLButtonElement | null)?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const start = prev >= 0 ? prev : -1;
        const next = nextEnabledIndex(options, start, 1);
        return next >= 0 ? next : prev;
      });
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const start = prev >= 0 ? prev : 0;
        const next = nextEnabledIndex(options, start, -1);
        return next >= 0 ? next : prev;
      });
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      const idx = options.findIndex((o) => !o.disabled);
      if (idx >= 0) setActiveIndex(idx);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      for (let i = options.length - 1; i >= 0; i--) {
        if (!options[i]?.disabled) {
          setActiveIndex(i);
          break;
        }
      }
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt && !opt.disabled) {
        setSelected(opt.value);
        closeList();
        (document.getElementById(triggerId) as HTMLButtonElement | null)?.focus();
      }
      return;
    }
  };

  return (
    <div ref={rootRef} className={className}>
      {label ? (
        <div
          id={labelId}
          className={cx(
            "block select-none text-sm text-foreground",
            disabled ? "cursor-not-allowed opacity-60" : "cursor-default",
          )}
        >
          {label}
        </div>
      ) : null}

      {name ? <input type="hidden" name={name} value={selectedValue ?? ""} /> : null}

      <button
        id={triggerId}
        type="button"
        disabled={disabled}
        onClick={() =>
          setOpen((p) => {
            const next = !p;
            if (next) setActiveIndex(computeActiveIndex());
            return next;
          })
        }
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : "false"}
        aria-controls={listboxId}
        aria-labelledby={label ? labelId : undefined}
        className={cx(
          "w-full cursor-pointer rounded-xl border border-border bg-background text-left text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-60",
          triggerSizeClass,
          triggerClassName,
        )}
      >
        <span className="flex items-center justify-between gap-3">
          <span className={selectedOption ? "" : "text-muted"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className="text-muted">▾</span>
        </span>
      </button>

      {open ? (
        <div
          ref={listRef}
          className="relative"
          onKeyDown={onListKeyDown}
        >
          <div
            id={listboxId}
            role="listbox"
            tabIndex={-1}
            className={cx(
              "absolute z-[120] mt-2 max-h-64 w-full overflow-auto rounded-xl border border-border bg-surface p-1 shadow-2xl",
              "ring-1 ring-white/5",
            )}
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === selectedValue;
              const isActive = idx === activeIndex;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected ? "true" : "false"}
                  disabled={opt.disabled}
                  data-active={isActive ? "true" : "false"}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    if (opt.disabled) return;
                    setSelected(opt.value);
                    closeList();
                    (document.getElementById(triggerId) as HTMLButtonElement | null)?.focus();
                  }}
                  className={cx(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    opt.disabled && "cursor-not-allowed opacity-50",
                    // 가시성 강화: hover/active를 accent 계열로 올려 대비를 높임
                    !opt.disabled && "hover:bg-accent/18 hover:text-foreground",
                    isActive && "bg-accent/22 text-foreground ring-1 ring-accent/30",
                    isSelected ? "text-foreground" : "text-muted",
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected ? <span className="text-accent-2">✓</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {helperText ? <p className="mt-2 text-xs text-muted">{helperText}</p> : null}
    </div>
  );
}


