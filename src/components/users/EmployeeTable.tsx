"use client";

import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

type Employee = {
  name: string;
  email: string;
  department: string;
  role: string;
  status: "Active" | "On leave" | "Inactive";
  joined: string;
};

const employees: Employee[] = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@acme.com",
    department: "Engineering",
    role: "Senior Developer",
    status: "Active",
    joined: "Mar 12, 2023",
  },
  {
    name: "Sarah Wilson",
    email: "sarah.wilson@acme.com",
    department: "Human Resources",
    role: "HR Manager",
    status: "Active",
    joined: "Jun 08, 2022",
  },
  {
    name: "Michael Chen",
    email: "michael.chen@acme.com",
    department: "Engineering",
    role: "Tech Lead",
    status: "Active",
    joined: "Jan 17, 2021",
  },
  {
    name: "Nadia Thomas",
    email: "nadia.thomas@acme.com",
    department: "Operations",
    role: "Operations Manager",
    status: "On leave",
    joined: "Aug 24, 2023",
  },
  {
    name: "David Miller",
    email: "david.miller@acme.com",
    department: "Finance",
    role: "Financial Analyst",
    status: "Active",
    joined: "Nov 03, 2024",
  },
  {
    name: "Alex Johnson",
    email: "alex.johnson@acme.com",
    department: "Operations",
    role: "Operations Executive",
    status: "Active",
    joined: "Feb 19, 2024",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@acme.com",
    department: "Engineering",
    role: "Product Designer",
    status: "Inactive",
    joined: "Sep 11, 2022",
  },
  {
    name: "Daniel Brooks",
    email: "daniel.brooks@acme.com",
    department: "Sales",
    role: "Sales Executive",
    status: "Active",
    joined: "May 27, 2025",
  },
];

const departments = [
  "All departments",
  "Engineering",
  "Operations",
  "Human Resources",
  "Finance",
  "Sales",
];

export default function EmployeeTable() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");

  const filteredEmployees = useMemo(() => {
    const query = search.toLowerCase().trim();

    return employees.filter((employee) => {
      const matchesSearch =
        !query ||
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query);

      const matchesDepartment =
        department === "All departments" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [search, department]);

  return (
    <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113]">
      {/* TOOLBAR */}
      <div className="flex flex-col gap-3 border-b border-white/[0.07] p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-[320px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search employees..."
            className="h-10 w-full rounded-xl border border-white/[0.07] bg-white/[0.025] pl-10 pr-4 text-[11px] text-white outline-none transition placeholder:text-white/25 focus:border-white/15"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="h-10 rounded-xl border border-white/[0.07] bg-[#151619] px-3 text-[10px] text-white/55 outline-none"
          >
            {departments.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 text-[10px] text-white/50 transition hover:bg-white/[0.05] hover:text-white">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </button>

          <button className="flex h-10 items-center gap-2 rounded-xl bg-white px-3.5 text-[10px] font-semibold text-black transition hover:bg-white/90">
            <Plus className="h-3.5 w-3.5" />
            Add employee
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3 text-left text-[9px] font-medium uppercase tracking-[0.14em] text-white/25">
                Employee
              </th>
              <th className="px-4 py-3 text-left text-[9px] font-medium uppercase tracking-[0.14em] text-white/25">
                Department
              </th>
              <th className="px-4 py-3 text-left text-[9px] font-medium uppercase tracking-[0.14em] text-white/25">
                Role
              </th>
              <th className="px-4 py-3 text-left text-[9px] font-medium uppercase tracking-[0.14em] text-white/25">
                Status
              </th>
              <th className="px-4 py-3 text-left text-[9px] font-medium uppercase tracking-[0.14em] text-white/25">
                Joined
              </th>
              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.email}
                className="group border-b border-white/[0.05] transition hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={employee.name} />

                    <div>
                      <p className="text-[11px] font-medium text-white/85">
                        {employee.name}
                      </p>
                      <p className="mt-0.5 text-[9px] text-white/30">
                        {employee.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-[10px] text-white/50">
                  {employee.department}
                </td>

                <td className="px-4 py-4 text-[10px] text-white/50">
                  {employee.role}
                </td>

                <td className="px-4 py-4">
                  <StatusBadge status={employee.status} />
                </td>

                <td className="px-4 py-4 text-[10px] text-white/35">
                  {employee.joined}
                </td>

                <td className="px-4 py-4">
                  <button className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 opacity-0 transition hover:bg-white/[0.06] hover:text-white group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}

            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <p className="text-xs text-white/40">
                    No employees found.
                  </p>
                  <p className="mt-1 text-[9px] text-white/20">
                    Try changing your search or department filter.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3.5">
        <p className="text-[9px] text-white/25">
          Showing{" "}
          <span className="text-white/50">
            {filteredEmployees.length}
          </span>{" "}
          of <span className="text-white/50">1,248</span> employees
        </p>

        <div className="flex items-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] text-white/25 transition hover:bg-white/[0.04] hover:text-white">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <button className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-white px-2 text-[9px] font-semibold text-black">
            1
          </button>

          <button className="flex h-7 min-w-7 items-center justify-center rounded-lg text-[9px] text-white/35 transition hover:bg-white/[0.04] hover:text-white">
            2
          </button>

          <button className="flex h-7 min-w-7 items-center justify-center rounded-lg text-[9px] text-white/35 transition hover:bg-white/[0.04] hover:text-white">
            3
          </button>

          <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] text-white/25 transition hover:bg-white/[0.04] hover:text-white">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[9px] font-semibold text-white/55">
      {initials}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Employee["status"];
}) {
  const styles = {
    Active: "border-white/[0.08] bg-white/[0.05] text-white/60",
    "On leave": "border-white/[0.08] bg-white/[0.025] text-white/40",
    Inactive: "border-white/[0.06] bg-black/10 text-white/25",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-1 text-[8px] font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}