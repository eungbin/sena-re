type StatItem = {
  label: string;
  value?: string;
};

type StatGroup = {
  title: string;
  items: StatItem[];
};

type ZzolResultsFloatingPanelProps = {
  rubyNetProfit?: {
    dailyAvg?: string;
    weeks2?: string;
    weeks4?: string;
  };
  levelingMobs?: {
    dailyAvg?: string;
    weeks2?: string;
    weeks4?: string;
  };
  nightmareLegendAccessoryCeiling?: {
    duration?: string;
  };
};

function ValueRow({ label, value }: StatItem) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-semibold tabular-nums text-foreground">
        {value ?? "—"}
      </span>
    </div>
  );
}

function Group({ title, items }: StatGroup) {
  return (
    <div className="rounded-xl border border-border bg-background/30 p-4">
      <h3 className="text-sm font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <div className="mt-3 flex flex-col gap-2">
        {items.map((it) => (
          <ValueRow key={it.label} label={it.label} value={it.value} />
        ))}
      </div>
    </div>
  );
}

export function ZzolResultsFloatingPanel(props: ZzolResultsFloatingPanelProps) {
  const groups: StatGroup[] = [
    {
      title: "루비 순이익",
      items: [
        { label: "일평균", value: props.rubyNetProfit?.dailyAvg },
        { label: "2주간", value: props.rubyNetProfit?.weeks2 },
        { label: "4주간", value: props.rubyNetProfit?.weeks4 },
      ],
    },
    {
      title: "만렙찍는 쫄몹 수",
      items: [
        { label: "일평균", value: props.levelingMobs?.dailyAvg },
        { label: "2주간", value: props.levelingMobs?.weeks2 },
        { label: "4주간", value: props.levelingMobs?.weeks4 },
      ],
    },
    {
      title: "악몽 전설 장신구",
      items: [
        {
          label: "천장 소요 기간",
          value: props.nightmareLegendAccessoryCeiling?.duration,
        },
      ],
    },
  ];

  return (
    <aside aria-label="계산 결과" className="flex flex-col gap-3">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight text-muted">
            계산 결과
          </h2>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {groups.map((g) => (
            <Group key={g.title} title={g.title} items={g.items} />
          ))}
        </div>
      </div>
    </aside>
  );
}


