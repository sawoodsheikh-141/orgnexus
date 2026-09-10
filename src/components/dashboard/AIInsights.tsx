import {
  AlertCircle,
  Bus,
  Clock3,
  MessageSquare,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type InsightData = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const insights: InsightData[] = [
  {
    icon: AlertCircle,
    title: "Attendance anomaly",
    text: "Engineering attendance is 6.4% lower than the weekly average.",
  },
  {
    icon: Bus,
    title: "Transport optimisation",
    text: "Route B-04 has 18% unused capacity during the morning shift.",
  },
  {
    icon: Clock3,
    title: "Peak request period",
    text: "Most employee requests arrive between 10:00 and 11:30 AM.",
  },
];

export default function AIInsights() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113]">
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/[0.035] blur-3xl" />

      <div className="relative border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black">
            <Sparkles className="h-3.5 w-3.5" />
          </div>

          <div>
            <h2 className="text-[12px] font-semibold">
              AI insights
            </h2>

            <p className="text-[9px] text-white/30">
              OrgNexus intelligence
            </p>
          </div>
        </div>
      </div>

      <div className="relative space-y-3 p-5">
        {insights.map((insight) => (
          <Insight
            key={insight.title}
            icon={insight.icon}
            title={insight.title}
            text={insight.text}
          />
        ))}

        <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white/[0.06] py-2.5 text-[9px] font-medium text-white/55 transition hover:bg-white/[0.09] hover:text-white">
          <MessageSquare className="h-3 w-3" />
          Ask AI about your organisation
        </button>
      </div>
    </div>
  );
}

function Insight({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5">
      <div className="mb-2 flex items-center gap-2">
        <Icon
          className="h-3.5 w-3.5 text-white/45"
          strokeWidth={1.6}
        />

        <p className="text-[9px] font-semibold text-white/65">
          {title}
        </p>
      </div>

      <p className="text-[8px] leading-4 text-white/30">
        {text}
      </p>
    </div>
  );
}