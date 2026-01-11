import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight text-foreground">
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            세븐나이츠-리버스
          </span>
        </Link>

        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-4 text-sm text-muted">
            <li>
              <Link href="/zzol" className="hover:text-accent-2">
                쫄작 계산기
              </Link>
            </li>
            <li>
              <Link href="/equipment" className="hover:text-accent-2">
                장비 시뮬레이션
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}


