import {
  Bus,
  FileText,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { DashboardStats } from "@/lib/data/stats";

type Stat = {
  label: string;
  value: string;
  icon: LucideIcon;
};

interface StatCardsProps {
  stats: DashboardStats;
}

export default function StatCards({ stats }: StatCardsProps) {
  const cards: Stat[] = [
    {
      label: "Total employees",
      value: stats.totalEmployees.toLocaleString(),
      icon: Users,
    },
    {
      label: "Present today",
      value: stats.presentToday.toLocaleString(),
      icon: UserCheck,
    },
    {
      label: "On transport",
      value: stats.onTransport.toLocaleString(),
      icon: Bus,
    },
    {
      label: "Pending requests",
      value: stats.pendingRequests.toLocaleString(),
      icon: FileText,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat) => {
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
