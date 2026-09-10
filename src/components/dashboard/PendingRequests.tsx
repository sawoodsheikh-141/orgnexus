import { FileText } from "lucide-react";

type Request = {
  type: string;
  title: string;
  person: string;
  time: string;
};

const requests: Request[] = [
  {
    type: "Leave",
    title: "Annual leave request",
    person: "Michael Chen",
    time: "12 min ago",
  },
  {
    type: "Transport",
    title: "Route change request",
    person: "David Miller",
    time: "31 min ago",
  },
  {
    type: "Access",
    title: "Role permission update",
    person: "Nadia Thomas",
    time: "48 min ago",
  },
  {
    type: "Expense",
    title: "Travel reimbursement",
    person: "Alex Johnson",
    time: "1 hr ago",
  },
];

export default function PendingRequests() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-[12px] font-semibold">
            Pending requests
          </h2>

          <p className="mt-1 text-[9px] text-white/30">
            Requires your attention
          </p>
        </div>

        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-black">
          27
        </span>
      </div>

      <div className="divide-y divide-white/[0.05]">
        {requests.map((request) => (
          <RequestRow
            key={request.title}
            type={request.type}
            title={request.title}
            person={request.person}
            time={request.time}
          />
        ))}
      </div>

      <div className="p-3">
        <button className="w-full rounded-lg border border-white/[0.07] py-2 text-[9px] font-medium text-white/40 transition hover:bg-white/[0.04] hover:text-white">
          View all requests
        </button>
      </div>
    </div>
  );
}

function RequestRow({
  type,
  title,
  person,
  time,
}: {
  type: string;
  title: string;
  person: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-white/[0.02]">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
        <FileText className="h-3.5 w-3.5" strokeWidth={1.6} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[9px] font-medium text-white/65">
          {title}
        </p>

        <p className="mt-1 truncate text-[8px] text-white/25">
          {person} · {time}
        </p>
      </div>

      <span className="rounded-md border border-white/[0.06] px-1.5 py-1 text-[7px] text-white/30">
        {type}
      </span>
    </div>
  );
}