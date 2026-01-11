import { QuickLinkCard } from "./_components/QuickLinkCard";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">세븐나이츠-리버스</h1>
        <p className="text-muted">
          자주 쓰는 기능을 카드로 빠르게 이동할 수 있어요.
        </p>
      </div>

      <section className="mt-6">
        <h2 className="text-sm font-semibold tracking-tight text-muted">
          바로가기
        </h2>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickLinkCard
            title="쫄작"
            description="쫄작 계산기"
            href="/zzol"
          />
          <QuickLinkCard
            title="장비 시뮬레이션"
            description="장비 강화 및 재구성 시뮬레이션"
            href="/equipment"
          />
          <QuickLinkCard
            title="패치노트"
            description="업데이트 내역/변경점"
            href="#"
          />
        </div>
      </section>
    </main>
  );
}
