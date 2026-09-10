"use client";

import { useState } from "react";
import {
  Shield,
  Users,
  UserPlus,
  MoreHorizontal,
  Check,
  Lock,
  Search,
  Plus,
  ChevronRight,
} from "lucide-react";

type Role = {
  name: string;
  description: string;
  users: number;
  permissions: number;
  color: string;
  system?: boolean;
};

const roles: Role[] = [
  {
    name: "Super Admin",
    description: "Full system access and organisation control",
    users: 2,
    permissions: 42,
    color: "bg-white",
    system: true,
  },
  {
    name: "HR Manager",
    description: "Manage employees, attendance and requests",
    users: 8,
    permissions: 31,
    color: "bg-blue-400",
  },
  {
    name: "Department Head",
    description: "Manage department employees and operations",
    users: 14,
    permissions: 24,
    color: "bg-violet-400",
  },
  {
    name: "Transport Manager",
    description: "Manage routes, buses and transport operations",
    users: 5,
    permissions: 18,
    color: "bg-emerald-400",
  },
  {
    name: "Team Lead",
    description: "Manage assigned teams and tasks",
    users: 27,
    permissions: 16,
    color: "bg-amber-400",
  },
  {
    name: "Employee",
    description: "Standard employee access",
    users: 1192,
    permissions: 9,
    color: "bg-white/50",
  },
];

const permissionGroups = [
  {
    title: "Organisation",
    items: ["View organisation", "Manage departments", "Manage roles"],
  },
  {
    title: "People",
    items: ["View employees", "Add employees", "Edit employees", "Delete employees"],
  },
  {
    title: "Operations",
    items: ["View attendance", "Manage transport", "Manage tasks", "Manage requests"],
  },
  {
    title: "Reports",
    items: ["View reports", "Export reports"],
  },
];

export default function RolesOverview() {
  const [selectedRole, setSelectedRole] = useState("Super Admin");
  const [search, setSearch] = useState("");

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(search.toLowerCase()) ||
      role.description.toLowerCase().includes(search.toLowerCase())
  );

  const activeRole =
    roles.find((role) => role.name === selectedRole) ?? roles[0];

  return (
    <main className="min-h-full bg-[#090a0c]">
      <div className="mx-auto w-full max-w-[1700px] p-5 lg:p-7">
        {/* Header */}
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
              <Shield size={12} />
              Access control
            </div>

            <h1 className="text-2xl font-medium tracking-tight text-white">
              Roles & Access
            </h1>

            <p className="mt-1 text-xs text-white/35">
              Control permissions and access across your organisation.
            </p>
          </div>

          <button className="flex h-9 items-center justify-center gap-2 rounded-lg bg-white px-4 text-xs font-medium text-black transition hover:bg-white/90">
            <Plus size={14} />
            Create role
          </button>
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Metric
            icon={<Shield size={15} />}
            label="Total roles"
            value="6"
            detail="2 system roles"
          />
          <Metric
            icon={<Users size={15} />}
            label="Assigned users"
            value="1,248"
            detail="100% coverage"
          />
          <Metric
            icon={<Lock size={15} />}
            label="Permissions"
            value="42"
            detail="Across all modules"
          />
        </div>

        {/* Main */}
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[420px_minmax(0,1fr)]">
          {/* Role list */}
          <section className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025]">
            <div className="border-b border-white/[0.06] p-4">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search roles..."
                  className="h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.025] pl-9 pr-3 text-xs text-white outline-none placeholder:text-white/20 focus:border-white/15"
                />
              </div>
            </div>

            <div className="p-2">
              {filteredRoles.map((role) => {
                const active = selectedRole === role.name;

                return (
                  <button
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`group flex w-full items-center gap-3 rounded-lg p-3 text-left transition ${
                      active
                        ? "bg-white/[0.07]"
                        : "hover:bg-white/[0.035]"
                    }`}
                  >
                    <span
                      className={`h-8 w-8 shrink-0 rounded-lg ${role.color} flex items-center justify-center`}
                    >
                      <Shield
                        size={14}
                        className={
                          role.color === "bg-white"
                            ? "text-black"
                            : "text-black/70"
                        }
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-xs font-medium text-white">
                          {role.name}
                        </span>

                        {role.system && (
                          <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-white/30">
                            System
                          </span>
                        )}
                      </span>

                      <span className="mt-0.5 block truncate text-[10px] text-white/30">
                        {role.users} users · {role.permissions} permissions
                      </span>
                    </span>

                    <ChevronRight
                      size={14}
                      className={`transition ${
                        active
                          ? "text-white/50"
                          : "text-white/10 group-hover:text-white/30"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Permission panel */}
          <section className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex flex-col justify-between gap-4 border-b border-white/[0.06] p-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <Shield size={17} className="text-black" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium text-white">
                      {activeRole.name}
                    </h2>

                    {activeRole.system && (
                      <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[8px] uppercase tracking-wider text-white/35">
                        Protected
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-[10px] text-white/30">
                    {activeRole.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-8 items-center gap-2 rounded-lg border border-white/[0.08] px-3 text-[10px] text-white/50 transition hover:bg-white/[0.04] hover:text-white">
                  <Users size={13} />
                  {activeRole.users} users
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 transition hover:bg-white/[0.04] hover:text-white">
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>

            <div className="p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-medium text-white">
                    Permissions
                  </h3>
                  <p className="mt-1 text-[10px] text-white/25">
                    Configure what this role can access.
                  </p>
                </div>

                <span className="text-[10px] text-white/30">
                  {activeRole.permissions} enabled
                </span>
              </div>

              <div className="space-y-3">
                {permissionGroups.map((group) => (
                  <div
                    key={group.title}
                    className="overflow-hidden rounded-lg border border-white/[0.06]"
                  >
                    <div className="border-b border-white/[0.05] bg-white/[0.025] px-4 py-3">
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                        {group.title}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 divide-y divide-white/[0.05] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                      {group.items.map((permission) => (
                        <div
                          key={permission}
                          className="flex items-center justify-between px-4 py-3"
                        >
                          <span className="text-[11px] text-white/55">
                            {permission}
                          </span>

                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.07]">
                            <Check size={11} className="text-white/70" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2">
                  <UserPlus size={14} className="text-white/30" />
                  <span className="text-[10px] text-white/40">
                    {activeRole.users} users have this role
                  </span>
                </div>

                <button className="text-[10px] font-medium text-white/60 transition hover:text-white">
                  Manage users →
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className="flex flex-col items-center justify-between gap-2 py-7 text-[9px] text-white/20 sm:flex-row">
          <p>OrgNexus · Organisation Management System</p>

          <div className="flex items-center gap-4">
            <span>Access control active</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
              All services online
            </span>
          </div>
        </footer>
      </div>
    </main>
  );
}

function Metric({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
      <div className="mb-3 flex items-center gap-2 text-white/30">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-xl font-medium tracking-tight text-white">
          {value}
        </span>

        <span className="text-[9px] text-white/25">{detail}</span>
      </div>
    </div>
  );
}