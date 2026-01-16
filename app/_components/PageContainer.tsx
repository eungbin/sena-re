import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

const BASE_CLASS_NAME =
  "mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-4 lg:py-8";

export function PageContainer({ children, className }: PageContainerProps) {
  const merged = className ? `${BASE_CLASS_NAME} ${className}` : BASE_CLASS_NAME;

  return <main className={merged}>{children}</main>;
}


