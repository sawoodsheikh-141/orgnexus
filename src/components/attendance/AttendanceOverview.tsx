"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  UserCheck,
  UserMinus,
  Users,
} from "lucide-react";

const departments = [
  ["Engineering", 94],
  ["Operations", 91],
  ["Sales", 87],
  ["Finance", 90],
  ["Human Resources", 96],
  ["Marketing", 84],
];

export default function AttendanceOverview() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Users} label="Workforce" value="1,248" change="+2.4%" />
        <Metric icon={UserCheck} label="Present today" value="1,106" change="+3.4%" up />
        <Metric icon={Clock3} label="Late arrivals" value="48" change="-6.2%" up />
        <Metric icon={UserMinus} label="Absent" value="94" change="+1.8%" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
          <div className="mb-7 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-white/70">
                Department attendance
              </p>
              <p className="mt-1 text-[9px] text-white/25">
                Today · September 9, 2026
              </p>
            </div>

            <span className="rounded-full border border-white/[0.07] px-2.5 py-1 text-[8px] text-white/35">
              88.6% overall
            </span>
          </div>

          <div className="space-y-5">
            {departments.map(([name, percentage]) => (
              <div key={name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] text-white/50">{name}</span>
                  <span className="text-[10px] font-medium text-white/60">
                    {percentage}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-white/70"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
          <p className="text-xs font-medium text-white/70">Today `&apos;`s presence</p>

          <div className="mt-7 flex justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[18px] border-white/[0.05]">
              <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-l-white/80 border-t-white/80 rotate-[25deg]" />
              <div className="text-center">
                <p className="text-3xl font-semibold tracking-[-0.06em]">
                  88.6%
                </p>
                <p className="mt-1 text-[9px] text-white/25">
                  attendance
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2">
            <Presence label="Present" value="1,106" />
            <Presence label="Late" value="48" />
            <Presence label="Absent" value="94" />
          </div>
        </section>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  change,
  up = false,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  change: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113] p-4">
      <Icon className="h-4 w-4 text-white/30" />

      <p className="mt-5 text-[9px] text-white/30">{label}</p>

      <div className="mt-1 flex items-end justify-between">
        <p className="text-2xl font-semibold tracking-[-0.05em]">{value}</p>

        <span className="flex items-center gap-1 text-[8px] text-white/35">
          {up ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {change}
        </span>
      </div>
    </div>
  );
}

function Presence({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/[0.025] p-3 text-center">
      <p className="text-sm font-semibold">{value}</p>
      <p className="mt-1 text-[8px] text-white/25">{label}</p>
    </div>
  );
}
