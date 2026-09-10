import {
  ArrowDownRight,
  ArrowUpRight,
  Bus,
  FileText,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

type Stat = {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: LucideIcon;
};

const stats: Stat[] = [
  {
    label: "Total employees",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    icon: Users,
  },
  {
    label: "Present today",
    value: "1,106",
    change: "+3.4%",
    positive: true,
    icon: UserCheck,
  },
  {
    label: "On transport",
    value: "384",
    change: "-2.1%",
    positive: false,
    icon: Bus,
  },
  {
    label: "Pending requests",
    value: "27",
    change: "+5",
    positive: false,
    icon: FileText,
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113] p-5 transition hover:border-white/[0.12]"
          >
            <div className="mb-7 flex items-start justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/45">
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </div>

              <span
                className={`flex items-center gap-0.5 text-[9px] font-medium ${
                  stat.positive ? "text-white/55" : "text-white/35"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}

                {stat.change}
              </span>
            </div>

            <p className="text-[10px] text-white/35">{stat.label}</p>

            <p className="mt-1 text-[26px] font-semibold tracking-[-0.04em]">
              {stat.value}
            </p>

            <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/[0.02] blur-2xl transition group-hover:bg-white/[0.04]" />
          </div>
        );
      })}
    </div>
  );
}