import { FileText, Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />

          <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
            Overview
          </span>
        </div>

        <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-white md:text-[34px]">
          Good afternoon, Admin.
        </h1>

        <p className="mt-1.5 text-[12px] text-white/35">
          Here&apos;s what&apos;s happening across your organisation today.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-[10px] font-medium text-white/65 transition hover:bg-white/[0.06]">
          <FileText className="h-3.5 w-3.5" />
          Generate report
        </button>

        <button className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-2.5 text-[10px] font-semibold text-black transition hover:bg-white/90">
          <Plus className="h-3.5 w-3.5" />
          Add employee
        </button>
      </div>
    </div>
  );
}