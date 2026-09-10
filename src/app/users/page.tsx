import AppShell from "@/components/layout/AppShell";
import EmployeeTable from "@/components/users/EmployeeTable";

export default function UsersPage() {
  return (
    <AppShell>
      <main className="dashboard-grid min-h-full">
        <div className="mx-auto w-full max-w-[1700px] p-5 lg:p-7">
          <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
                  Organisation
                </span>
              </div>

              <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-white md:text-[34px]">
                Employees
              </h1>

              <p className="mt-1.5 text-[12px] text-white/35">
                Manage your organisation&apos;s people, roles and access.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <MiniStat label="Total employees" value="1,248" />
              <MiniStat label="Active" value="1,192" />
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <MiniStat label="Engineering" value="312" />
            <MiniStat label="Operations" value="274" />
            <MiniStat label="Human Resources" value="64" />
            <MiniStat label="Other departments" value="598" />
          </div>

          <EmployeeTable />

          <div className="flex items-center justify-between py-7 text-[9px] text-white/20">
            <p>OrgNexus · Employee Management</p>
            <p>Last synced just now</p>
          </div>
        </div>
      </main>
    </AppShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#101113] px-4 py-3.5">
      <p className="text-[8px] uppercase tracking-[0.14em] text-white/25">
        {label}
      </p>
      <p className="mt-0.5 text-lg font-semibold tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
}
