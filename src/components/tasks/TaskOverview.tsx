"use client";

import {
  CheckCircle2,
  Circle,
  Clock3,
  Flag,
  ListTodo,
  MoreHorizontal,
  Plus,
  UserRound,
} from "lucide-react";

const tasks = [
  {
    title: "Review Q3 attendance report",
    project: "Operations",
    assignee: "Sarah Khan",
    priority: "High",
    status: "In progress",
    due: "Today",
    progress: 72,
  },
  {
    title: "Update employee transport routes",
    project: "Transport",
    assignee: "Arjun Mehta",
    priority: "Medium",
    status: "In progress",
    due: "Sep 10",
    progress: 48,
  },
  {
    title: "Prepare onboarding documents",
    project: "Human Resources",
    assignee: "Ayesha Rahman",
    priority: "Medium",
    status: "Todo",
    due: "Sep 11",
    progress: 0,
  },
  {
    title: "Audit department access roles",
    project: "IT Administration",
    assignee: "Daniel Joseph",
    priority: "High",
    status: "Todo",
    due: "Sep 12",
    progress: 0,
  },
  {
    title: "Finalize monthly payroll",
    project: "Finance",
    assignee: "Mariam Ali",
    priority: "Low",
    status: "Completed",
    due: "Sep 07",
    progress: 100,
  },
];

export default function TaskOverview() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={ListTodo}
          label="Total tasks"
          value="184"
          detail="+12 this week"
        />
        <Metric
          icon={Clock3}
          label="In progress"
          value="47"
          detail="25.5% of total"
        />
        <Metric
          icon={CheckCircle2}
          label="Completed"
          value="119"
          detail="64.7% of total"
        />
        <Metric
          icon={Flag}
          label="Overdue"
          value="18"
          detail="Needs attention"
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
            <div>
              <p className="text-xs font-medium text-white/70">
                Task overview
              </p>
              <p className="mt-1 text-[9px] text-white/25">
                Recent organisation tasks
              </p>
            </div>

            <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-[9px] font-medium text-white/55 transition hover:bg-white/[0.07] hover:text-white">
              <Plus className="h-3 w-3" />
              New task
            </button>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {tasks.map((task) => (
              <TaskRow key={task.title} task={task} />
            ))}
          </div>
        </section>

        <div className="space-y-3">
          <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-white/70">
                  Completion
                </p>
                <p className="mt-1 text-[9px] text-white/25">
                  Overall task progress
                </p>
              </div>

              <span className="text-xl font-semibold tracking-[-0.04em]">
                64.7%
              </span>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-white"
                style={{ width: "64.7%" }}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <ProgressStat label="Todo" value="18%" />
              <ProgressStat label="Active" value="25%" />
              <ProgressStat label="Done" value="65%" />
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-white/70">
                  Workload
                </p>
                <p className="mt-1 text-[9px] text-white/25">
                  Tasks by team
                </p>
              </div>

              <MoreHorizontal className="h-4 w-4 text-white/25" />
            </div>

            <div className="mt-5 space-y-4">
              <Workload label="Engineering" value={42} percent={82} />
              <Workload label="Operations" value={31} percent={64} />
              <Workload label="Human Resources" value={18} percent={44} />
              <Workload label="Finance" value={12} percent={31} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TaskRow({
  task,
}: {
  task: (typeof tasks)[number];
}) {
  const completed = task.status === "Completed";

  return (
    <div className="group flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.015]">
      <div className="shrink-0">
        {completed ? (
          <CheckCircle2 className="h-4 w-4 text-white/70" />
        ) : (
          <Circle className="h-4 w-4 text-white/20" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className={`truncate text-[11px] font-medium ${
              completed ? "text-white/35 line-through" : "text-white/75"
            }`}
          >
            {task.title}
          </p>

          <Priority priority={task.priority} />
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[8px] text-white/25">
          <span>{task.project}</span>

          <span className="flex items-center gap-1">
            <UserRound className="h-2.5 w-2.5" />
            {task.assignee}
          </span>

          <span>Due {task.due}</span>
        </div>
      </div>

      <div className="hidden w-24 shrink-0 md:block">
        <div className="mb-1.5 flex justify-between text-[8px] text-white/25">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>

        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-white/60"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      <Status status={task.status} />
    </div>
  );
}

function Priority({ priority }: { priority: string }) {
  const opacity =
    priority === "High"
      ? "text-white/70"
      : priority === "Medium"
        ? "text-white/45"
        : "text-white/25";

  return (
    <span className={`flex items-center gap-1 text-[7px] ${opacity}`}>
      <span className="h-1 w-1 rounded-full bg-current" />
      {priority}
    </span>
  );
}

function Status({ status }: { status: string }) {
  return (
    <span className="shrink-0 rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[7px] text-white/35">
      {status}
    </span>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof ListTodo;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113] p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-white/30" />
        <span className="text-[8px] text-white/20">{detail}</span>
      </div>

      <p className="mt-5 text-[9px] text-white/30">{label}</p>

      <p className="mt-1 text-2xl font-semibold tracking-[-0.05em]">
        {value}
      </p>
    </div>
  );
}

function ProgressStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
      <p className="text-[8px] text-white/25">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Workload({
  label,
  value,
  percent,
}: {
  label: string;
  value: number;
  percent: number;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[9px] text-white/45">{label}</span>
        <span className="text-[8px] text-white/25">{value} tasks</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full rounded-full bg-white/50"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}