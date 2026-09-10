"use client";

import {
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  FileText,
  MoreHorizontal,
  Plane,
  UserRound,
  X,
} from "lucide-react";

const requests = [
  {
    id: "REQ-1048",
    employee: "Ayesha Rahman",
    department: "Human Resources",
    type: "Leave Request",
    detail: "Annual leave · Sep 12–14",
    submitted: "12 min ago",
    status: "Pending",
    priority: "Normal",
    icon: CalendarDays,
  },
  {
    id: "REQ-1047",
    employee: "Arjun Mehta",
    department: "Engineering",
    type: "Work From Home",
    detail: "WFH · Sep 10",
    submitted: "34 min ago",
    status: "Pending",
    priority: "Normal",
    icon: UserRound,
  },
  {
    id: "REQ-1046",
    employee: "Sarah Khan",
    department: "Operations",
    type: "Transport Change",
    detail: "Route B-07 · Morning shift",
    submitted: "1 hr ago",
    status: "Pending",
    priority: "High",
    icon: ArrowUpRight,
  },
  {
    id: "REQ-1045",
    employee: "Daniel Joseph",
    department: "Finance",
    type: "Expense Claim",
    detail: "Client visit · ₹8,450",
    submitted: "2 hrs ago",
    status: "Approved",
    priority: "Normal",
    icon: FileText,
  },
  {
    id: "REQ-1044",
    employee: "Mariam Ali",
    department: "Marketing",
    type: "Leave Request",
    detail: "Casual leave · Sep 09",
    submitted: "3 hrs ago",
    status: "Rejected",
    priority: "Normal",
    icon: Plane,
  },
];

export default function RequestOverview() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric
          icon={Clock3}
          label="Pending"
          value="27"
          detail="Needs review"
        />

        <Metric
          icon={Check}
          label="Approved"
          value="142"
          detail="This month"
        />

        <Metric
          icon={X}
          label="Rejected"
          value="19"
          detail="This month"
        />

        <Metric
          icon={FileText}
          label="Total requests"
          value="188"
          detail="September"
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.4fr_0.6fr]">
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
            <div>
              <p className="text-xs font-medium text-white/70">
                Request queue
              </p>

              <p className="mt-1 text-[9px] text-white/25">
                Review and manage employee requests
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[8px] text-white/35 transition hover:bg-white/[0.06] hover:text-white/60">
                All
              </button>

              <button className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[8px] text-white/35 transition hover:bg-white/[0.06] hover:text-white/60">
                Pending
              </button>

              <button className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-2 text-white/25 transition hover:bg-white/[0.06] hover:text-white/60">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {requests.map((request) => (
              <RequestRow key={request.id} request={request} />
            ))}
          </div>
        </section>

        <div className="space-y-3">
          <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-white/70">
                  Request types
                </p>

                <p className="mt-1 text-[9px] text-white/25">
                  Distribution this month
                </p>
              </div>

              <MoreHorizontal className="h-4 w-4 text-white/20" />
            </div>

            <div className="mt-6 space-y-5">
              <RequestType
                label="Leave"
                value="76"
                percent={40}
              />

              <RequestType
                label="Work from home"
                value="43"
                percent={23}
              />

              <RequestType
                label="Expenses"
                value="31"
                percent={16}
              />

              <RequestType
                label="Transport"
                value="21"
                percent={11}
              />

              <RequestType
                label="Other"
                value="17"
                percent={9}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
            <div>
              <p className="text-xs font-medium text-white/70">
                Approval activity
              </p>

              <p className="mt-1 text-[9px] text-white/25">
                Recent workflow activity
              </p>
            </div>

            <div className="mt-5 space-y-4">
              <Activity
                title="Leave request approved"
                person="Daniel Joseph"
                time="18 min ago"
              />

              <Activity
                title="WFH request submitted"
                person="Arjun Mehta"
                time="34 min ago"
              />

              <Activity
                title="Expense claim approved"
                person="Mariam Ali"
                time="1 hr ago"
              />

              <Activity
                title="Transport request escalated"
                person="Sarah Khan"
                time="2 hrs ago"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function RequestRow({
  request,
}: {
  request: (typeof requests)[number];
}) {
  const Icon = request.icon;

  return (
    <div className="group flex items-center gap-4 px-5 py-4 transition hover:bg-white/[0.015]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025]">
        <Icon className="h-4 w-4 text-white/35" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[10px] font-medium text-white/70">
            {request.type}
          </p>

          {request.priority === "High" && (
            <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[7px] uppercase tracking-wider text-white/50">
              High
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-[8px] text-white/25">
          <span>{request.employee}</span>
          <span className="text-white/10">•</span>
          <span>{request.department}</span>
        </div>

        <p className="mt-1 truncate text-[8px] text-white/20">
          {request.detail}
        </p>
      </div>

      <div className="hidden shrink-0 text-right md:block">
        <p className="text-[8px] text-white/25">{request.id}</p>
        <p className="mt-1 text-[8px] text-white/15">
          {request.submitted}
        </p>
      </div>

      <RequestStatus status={request.status} />
    </div>
  );
}

function RequestStatus({ status }: { status: string }) {
  const pending = status === "Pending";
  const approved = status === "Approved";

  return (
    <span
      className={`shrink-0 rounded-md border px-2 py-1 text-[7px] ${
        pending
          ? "border-white/[0.08] bg-white/[0.04] text-white/50"
          : approved
            ? "border-white/[0.06] bg-white/[0.025] text-white/35"
            : "border-white/[0.05] bg-white/[0.015] text-white/20"
      }`}
    >
      {status}
    </span>
  );
}

function RequestType({
  label,
  value,
  percent,
}: {
  label: string;
  value: string;
  percent: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] text-white/40">{label}</span>

        <span className="text-[8px] text-white/25">
          {value}
        </span>
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

function Activity({
  title,
  person,
  time,
}: {
  title: string;
  person: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />

      <div className="min-w-0 flex-1">
        <p className="text-[9px] text-white/50">{title}</p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-[8px] text-white/20">
            {person}
          </span>

          <span className="shrink-0 text-[8px] text-white/15">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113] p-4">
      <div className="flex items-center justify-between">
        <Icon className="h-4 w-4 text-white/30" />

        <span className="text-[8px] text-white/20">
          {detail}
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