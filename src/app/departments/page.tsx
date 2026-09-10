import AppShell from "@/components/layout/AppShell";
import DepartmentGrid from "@/components/departments/DepartmentGrid";

export default function DepartmentsPage() {
  return (
    <AppShell>
      <main className="dashboard-grid min-h-full">
        <div className="mx-auto w-full max-w-[1700px] p-5 lg:p-7">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  Organisation
                </span>
              </div>

              <h1 className="text-[28px] font-semibold tracking-[-0.04em] md:text-[34px]">
                Departments
              </h1>

              <p className="mt-1.5 text-[12px] text-white/35">
                Structure your organisation and manage team ownership.
              </p>
            </div>

            <div className="flex gap-2">
              <Stat label="Departments" value="8" />
              <Stat label="Employees" value="1,248" />
              <Stat label="Avg. team size" value="156" />
            </div>
          </div>

          <DepartmentGrid />
        </div>
      </main>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-2.5">
      <p className="text-[8px] uppercase tracking-[0.14em] text-white/25">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}
