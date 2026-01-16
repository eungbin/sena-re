"use client";

import { Button } from "./Button";
import { cx } from "./cx";

export function TabButton({
  active,
  children,
  disabled,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="secondary"
      size="sm"
      disabled={disabled}
      onClick={onClick}
      className={cx(
        "rounded-full px-3",
        active && "border-accent/50 bg-gradient-to-r from-accent/25 to-accent-2/10 text-foreground",
      )}
    >
      {children}
    </Button>
  );
}


