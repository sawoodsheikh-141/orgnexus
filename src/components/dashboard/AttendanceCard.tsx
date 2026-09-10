import { MoreHorizontal } from "lucide-react";

const departments = [
  {
    name: "Engineering",
    present: 284,
    total: 312,
    percentage: 91,
  },
  {
    name: "Operations",
    present: 236,
    total: 274,
    percentage: 86,
  },
  {
    name: "Human Resources",
    present: 58,
    total: 64,
    percentage: 91,
  },
  {
    name: "Finance",
    present: 83,
    total: 91,
    percentage: 91,
  },
  {
    name: "Marketing",
    present: 71,
    total: 86,
    percentage: 83,
  },
];

export default function AttendanceCard() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <h2 className="text-[12px] font-semibold">
            Today&apos;s attendance
          </h2>

          <p className="mt-1 text-[9px] text-white/30">
            September 08, 2026
          </p>
        </div>

        <button className="text-white/30 transition hover:text-white">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-6">
          <AttendanceRing percentage={88.6} />

          <div className="space-y-3">
            <AttendanceLegend
              label="Present"
              value="1,106"
              percentage="88.6%"
            />

            <AttendanceLegend
              label="Late"
              value="64"
              percentage="5.1%"
            />

            <AttendanceLegend
              label="Absent"
              value="51"
              percentage="4.1%"
            />

            <AttendanceLegend
              label="On leave"
              value="27"
              percentage="2.2%"
            />
          </div>
        </div>

        <div className="mt-7 border-t border-white/[0.06] pt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-medium text-white/55">
              By department
            </p>

            <span className="text-[9px] text-white/25">Present</span>
          </div>

          <div className="space-y-3">
            {departments.slice(0, 4).map((department) => (
              <div key={department.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[9px] text-white/40">
                    {department.name}
                  </span>

                  <span className="text-[9px] text-white/55">
                    {department.percentage}%
                  </span>
                </div>

                <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-white/60"
                    style={{ width: `${department.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AttendanceRing({ percentage }: { percentage: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative h-[110px] w-[110px] shrink-0">
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="7"
        />

        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.72)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[20px] font-semibold tracking-[-0.04em]">
          {percentage}%
        </span>

        <span className="text-[8px] text-white/25">
          attendance
        </span>
      </div>
    </div>
  );
}

function AttendanceLegend({
  label,
  value,
  percentage,
}: {
  label: string;
  value: string;
  percentage: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />

      <div className="min-w-[65px]">
        <p className="text-[9px] text-white/35">{label}</p>
      </div>

      <p className="text-[10px] font-medium">{value}</p>

      <p className="text-[8px] text-white/25">{percentage}</p>
    </div>
  );
}