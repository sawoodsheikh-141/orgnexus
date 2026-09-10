import AppShell from "@/components/layout/AppShell";
import AttendanceOverview from "@/components/attendance/AttendanceOverview";

export default function AttendancePage() {
  return (
    <AppShell>
      <main className="dashboard-grid min-h-full">
        <div className="mx-auto w-full max-w-[1700px] p-5 lg:p-7">
          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                Workforce
              </span>
            </div>

            <h1 className="text-[28px] font-semibold tracking-[-0.04em] md:text-[34px]">
              Attendance
            </h1>

            <p className="mt-1.5 text-[12px] text-white/35">
              Monitor workforce presence, punctuality and department trends.
            </p>
          </div>

          <AttendanceOverview />
        </div>
      </main>
    </AppShell>
  );
}
