"use client";

import {
  ArrowUpRight,
  Building2,
  MoreHorizontal,
  Plus,
  Users,
} from "lucide-react";

const departments = [
  { name: "Engineering", code: "ENG", head: "Michael Chen", employees: 312, growth: "+8.4%" },
  { name: "Operations", code: "OPS", head: "Nadia Thomas", employees: 274, growth: "+4.1%" },
  { name: "Sales", code: "SAL", head: "Daniel Brooks", employees: 186, growth: "+11.2%" },
  { name: "Finance", code: "FIN", head: "David Miller", employees: 142, growth: "+2.8%" },
  { name: "Human Resources", code: "HR", head: "Sarah Wilson", employees: 64, growth: "+1.6%" },
  { name: "Marketing", code: "MKT", head: "Olivia Carter", employees: 118, growth: "+6.7%" },
  { name: "Product", code: "PRD", head: "Alex Johnson", employees: 89, growth: "+9.3%" },
  { name: "Administration", code: "ADM", head: "James Wilson", employees: 63, growth: "+0.9%" },
];

export default function DepartmentGrid() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-white/70">All departments</p>
          <p className="mt-1 text-[9px] text-white/25">
            8 departments · 1,248 employees
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-[10px] font-semibold text-black transition hover:bg-white/90">
          <Plus className="h-3.5 w-3.5" />
          Add department
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {departments.map((department) => (
          <article
            key={department.code}
            className="group rounded-2xl border border-white/[0.07] bg-[#101113] p-4 transition hover:border-white/[0.13] hover:bg-[#121315]"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035]">
                <Building2 className="h-4 w-4 text-white/50" />
              </div>

              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-white/20 transition hover:bg-white/[0.05] hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[13px] font-semibold text-white/85">
                  {department.name}
                </h3>
                <span className="text-[8px] tracking-[0.12em] text-white/20">
                  {department.code}
                </span>
              </div>

              <p className="mt-1 text-[9px] text-white/30">
                Head · {department.head}
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-white/[0.06] pt-4">
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-white/25" />
                <span className="text-lg font-semibold tracking-[-0.04em]">
                  {department.employees}
                </span>
                <span className="text-[8px] text-white/25">people</span>
              </div>

              <div className="flex items-center gap-1 text-[8px] text-white/35">
                <ArrowUpRight className="h-3 w-3" />
                {department.growth}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
