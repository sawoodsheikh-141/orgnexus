import {
  Bus,
  Check,
  FileText,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

type Activity = {
  title: string;
  person: string;
  time: string;
  icon: LucideIcon;
};

const activities: Activity[] = [
  {
    title: "Attendance report generated",
    person: "Admin",
    time: "8 min ago",
    icon: FileText,
  },
  {
    title: "New employee added",
    person: "HR Department",
    time: "21 min ago",
    icon: UserCheck,
  },
  {
    title: "Bus route B-04 started",
    person: "Transport",
    time: "34 min ago",
    icon: Bus,
  },
  {
    title: "Leave request approved",
    person: "Sarah Wilson",
    time: "52 min ago",
    icon: Check,
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-[12px] font-semibold">
            Recent activity
          </h2>

          <p className="mt-1 text-[9px] text-white/30">
            Latest organisation events
          </p>
        </div>

        <button className="text-[9px] text-white/30 hover:text-white">
          View all
        </button>
      </div>

      <div className="p-5">
        <div className="relative">
          <div className="absolute bottom-5 left-[13px] top-5 w-px bg-white/[0.06]" />

          <div className="space-y-5">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="relative flex gap-3"
                >
                  <div className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-[#151619] text-white/45">
                    <Icon
                      className="h-3.5 w-3.5"
                      strokeWidth={1.6}
                    />
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <p className="text-[10px] font-medium text-white/70">
                      {activity.title}
                    </p>

                    <p className="mt-1 text-[9px] text-white/25">
                      {activity.person} · {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}