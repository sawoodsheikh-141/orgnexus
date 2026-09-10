"use client";

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Download,
  MoreHorizontal,
  Users,
} from "lucide-react";

const departments = [
  { name: "Engineering", employees: 312, attendance: 94, productivity: 91 },
  { name: "Operations", employees: 274, attendance: 91, productivity: 87 },
  { name: "Sales", employees: 186, attendance: 87, productivity: 84 },
  { name: "Finance", employees: 142, attendance: 90, productivity: 93 },
  { name: "Marketing", employees: 118, attendance: 84, productivity: 82 },
  { name: "Human Resources", employees: 64, attendance: 96, productivity: 95 },
];

const activity = [
  {
    label: "Employee attendance",
    value: "88.6%",
    change: "+2.4%",
    up: true,
  },
  {
    label: "Task completion",
    value: "64.7%",
    change: "+6.8%",
    up: true,
  },
  {
    label: "Request resolution",
    value: "91.2%",
    change: "+3.1%",
    up: true,
  },
  {
    label: "Transport utilisation",
    value: "76.4%",
    change: "-1.7%",
    up: false,
  },
];

export default function ReportOverview() {
  return (
    <div className="space-y-3">
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/[0.07] bg-[#101113] p-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
            <CalendarDays className="h-4 w-4 text-white/35" />
          </div>

          <div>
            <p className="text-[10px] font-medium text-white/65">
              Reporting period
            </p>

            <p className="mt-0.5 text-[8px] text-white/25">
              September 01 — September 08, 2026
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[8px] text-white/35 hover:bg-white/[0.06] hover:text-white/60">
            This month
          </button>

          <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[8px] text-white/45 hover:bg-white/[0.06] hover:text-white/70">
            <Download className="h-3 w-3" />
            Export
          </button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={Users}
          label="Workforce"
          value="1,248"
          change="+8.2%"
          up
        />

        <Metric
          icon={Activity}
          label="Attendance"
          value="88.6%"
          change="+2.4%"
          up
        />

        <Metric
          icon={CheckCircle2}
          label="Tasks completed"
          value="64.7%"
          change="+6.8%"
          up
        />

        <Metric
          icon={BarChart3}
          label="Operational score"
          value="91.4"
          change="+4.1%"
          up
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
            <div>
              <p className="text-xs font-medium text-white/70">
                Organisation performance
              </p>

              <p className="mt-1 text-[9px] text-white/25">
                Department-level operational metrics
              </p>
            </div>

            <MoreHorizontal className="h-4 w-4 text-white/20" />
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-[1.5fr_0.6fr_0.8fr_0.8fr] border-b border-white/[0.05] px-5 py-3 text-[7px] uppercase tracking-[0.14em] text-white/20">
                <span>Department</span>
                <span>Employees</span>
                <span>Attendance</span>
                <span>Productivity</span>
              </div>

              <div className="divide-y divide-white/[0.05]">
                {departments.map((department) => (
                  <DepartmentRow
                    key={department.name}
                    department={department}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="border-b border-white/[0.06] p-5">
            <p className="text-xs font-medium text-white/70">
              Key indicators
            </p>

            <p className="mt-1 text-[9px] text-white/25">
              Compared with previous period
            </p>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {activity.map((item) => (
              <Indicator key={item.label} {...item} />
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-white/70">
              Attendance trend
            </p>

            <p className="mt-1 text-[9px] text-white/25">
              Average daily attendance over the current period
            </p>
          </div>

          <span className="text-sm font-semibold text-white/65">
            88.6%
          </span>
        </div>

        <div className="mt-7 flex h-44 items-end gap-2 border-b border-white/[0.05] px-2">
          {[74, 82, 79, 91, 87, 94, 89, 96].map((height, index) => (
            <div
              key={index}
              className="group relative flex h-full flex-1 items-end"
            >
              <div
                className="w-full rounded-t-md bg-white/[0.12] transition group-hover:bg-white/[0.25]"
                style={{ height: `${height}%` }}
              />

              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] text-white/15">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function DepartmentRow({
  department,
}: {
  department: (typeof departments)[number];
}) {
  return (
    <div className="grid grid-cols-[1.5fr_0.6fr_0.8fr_0.8fr] items-center px-5 py-4">
      <div>
        <p className="text-[10px] font-medium text-white/60">
          {department.name}
        </p>

        <p className="mt-1 text-[7px] text-white/20">
          Department performance
        </p>
      </div>

      <span className="text-[9px] text-white/40">
        {department.employees}
      </span>

      <div className="flex items-center gap-2">
        <div className="h-1 w-16 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-white/45"
            style={{ width: `${department.attendance}%` }}
          />
        </div>

        <span className="text-[8px] text-white/35">
          {department.attendance}%
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-1 w-16 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-white/45"
            style={{ width: `${department.productivity}%` }}
          />
        </div>

        <span className="text-[8px] text-white/35">
          {department.productivity}%
        </span>
      </div>
    </div>
  );
}

function Indicator({
  label,
  value,
  change,
  up,
}: {
  label: string;
  value: string;
  change: string;
  up: boolean;
}) {
  const Icon = up ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="p-5">
      <p className="text-[9px] text-white/30">{label}</p>

      <div className="mt-2 flex items-end justify-between">
        <span className="text-xl font-semibold tracking-[-0.04em]">
          {value}
        </span>

        <span className="flex items-center gap-1 text-[8px] text-white/30">
          <Icon className="h-3 w-3" />
          {change}
        </span>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  change,
  up,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  change: string;
  up: boolean;
}) {
  const ChangeIcon = up ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113] p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-white/30" />

        <span className="flex items-center gap-1 text-[8px] text-white/25">
          <ChangeIcon className="h-3 w-3" />
          {change}
        </span>
      </div>

      <p className="mt-5 text-[9px] text-white/30">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-[-0.05em]">
        {value}
      </p>
    </div>
  );
}