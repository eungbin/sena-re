"use client";

import { cx } from "./cx";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "pill"
  | "danger"
  | "ghost";

export type ButtonSize = "md" | "sm" | "xs";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "secondary",
  size = "md",
  className,
  disabled,
  type,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 border font-semibold transition-colors cursor-pointer";

  const sizes =
    size === "xs"
      ? "rounded-full px-2.5 py-1 text-sm"
      : size === "sm"
        ? "rounded-xl px-3 py-1.5 text-sm"
        : "rounded-xl px-4 py-2 text-sm";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "border-accent/60 bg-gradient-to-r from-accent/30 to-accent-2/10 text-foreground hover:from-accent/35",
    secondary:
      "border-border bg-background/20 text-muted hover:border-accent/40 hover:text-foreground",
    pill: "rounded-full border-border bg-background/20 px-3 py-1.5 text-sm text-muted hover:border-accent/40 hover:text-foreground",
    danger:
      "border-red-500/40 bg-red-500/10 text-foreground hover:bg-red-500/15",
    ghost: "border-transparent bg-transparent text-muted hover:text-foreground",
  };

  const disabledCls = "disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      className={cx(base, sizes, variants[variant], disabledCls, className)}
      {...props}
    />
  );
}


