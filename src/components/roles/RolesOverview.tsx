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
  Globe,
  Building2,
  User,
} from "lucide-react";
import type { Permission } from "@/lib/types/entities";
import type { RoleWithCounts } from "@/lib/data/roles";

interface RolesOverviewProps {
  roles: RoleWithCounts[];
  permissions: Permission[];
}

const ROLE_COLORS = ["bg-white", "bg-blue-400", "bg-violet-400", "bg-amber-400"];

const SCOPE_META = {
  global: { label: "Global", icon: Globe, hint: "Applies org-wide" },
  department: { label: "Department", icon: Building2, hint: "Own department only" },
  self: { label: "Self", icon: User, hint: "Own records only" },
} as const;

// Groups permission keys by their prefix for display, e.g. "users.read" -> "People"
const GROUP_LABELS: Record<string, string> = {
  users: "People",
  departments: "Organisation",
  attendance: "Attendance",
  transport: "Transport",
  tasks: "Tasks",
  requests: "Requests",
  reports: "Reports",
  settings: "Settings",
};

function groupPermissions(permissions: Permission[]) {
  const groups = new Map<string, Permission[]>();
  for (const perm of permissions) {
    const prefix = perm.key.split(".")[0];
    const label = GROUP_LABELS[prefix] ?? prefix;
    if (!groups.has(label)) groups.set(label, []);
    groups.get(label)!.push(perm);
  }
  return Array.from(groups.entries()).map(([title, items]) => ({ title, items }));
}

export default function RolesOverview({ roles, permissions }: RolesOverviewProps) {
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id ?? "");
  const [search, setSearch] = useState("");

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(search.toLowerCase()) ||
      SCOPE_META[role.scope].label.toLowerCase().includes(search.toLowerCase()),
  );

  const activeRole = roles.find((role) => role.id === selectedRoleId) ?? roles[0];
  const permissionGroups = groupPermissions(permissions);
  const totalAssignedUsers = roles.reduce((sum, r) => sum + r.assignedUserCount, 0);

  if (!activeRole) {
    return (
      <main className="flex min-h-full items-center justify-center bg-[#090a0c] p-7 text-white/40">
        <p className="text-xs">No roles found. Run the seed script to create Admin, Dean, HOD and Student roles.</p>
      </main>
    );
  }

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
            value={String(roles.length)}
            detail={`${roles.filter((r) => r.isSystemRole).length} system roles`}
          />
          <Metric
            icon={<Users size={15} />}
            label="Assigned users"
            value={totalAssignedUsers.toLocaleString()}
            detail="Active logins"
          />
          <Metric
            icon={<Lock size={15} />}
            label="Permissions"
            value={String(permissions.length)}
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
              {filteredRoles.map((role, index) => {
                const active = selectedRoleId === role.id;
                const color = ROLE_COLORS[index % ROLE_COLORS.length];
                const ScopeIcon = SCOPE_META[role.scope].icon;

                return (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                    className={`group flex w-full items-center gap-3 rounded-lg p-3 text-left transition ${
                      active
                        ? "bg-white/[0.07]"
                        : "hover:bg-white/[0.035]"
                    }`}
                  >
                    <span
                      className={`h-8 w-8 shrink-0 rounded-lg ${color} flex items-center justify-center`}
                    >
                      <Shield
                        size={14}
                        className={color === "bg-white" ? "text-black" : "text-black/70"}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-xs font-medium text-white">
                          {role.name}
                        </span>

                        {role.isSystemRole && (
                          <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-white/30">
                            System
                          </span>
                        )}

                        <span className="flex items-center gap-1 rounded-full border border-white/10 px-1.5 py-0.5 text-[8px] uppercase tracking-wider text-white/30">
                          <ScopeIcon size={8} />
                          {SCOPE_META[role.scope].label}
                        </span>
                      </span>

                      <span className="mt-0.5 block truncate text-[10px] text-white/30">
                        {role.assignedUserCount} users · {role.permissionIds.length} permissions
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

                    {activeRole.isSystemRole && (
                      <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[8px] uppercase tracking-wider text-white/35">
                        Protected
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-[10px] text-white/30">
                    {SCOPE_META[activeRole.scope].hint}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex h-8 items-center gap-2 rounded-lg border border-white/[0.08] px-3 text-[10px] text-white/50 transition hover:bg-white/[0.04] hover:text-white">
                  <Users size={13} />
                  {activeRole.assignedUserCount} users
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
                    {activeRole.scope === "department"
                      ? "Enabled permissions apply only within this role's own department."
                      : activeRole.scope === "self"
                        ? "Enabled permissions apply only to this user's own records."
                        : "Enabled permissions apply organisation-wide."}
                  </p>
                </div>

                <span className="text-[10px] text-white/30">
                  {activeRole.permissionIds.length} enabled
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
                      {group.items.map((permission) => {
                        const enabled = activeRole.permissionIds.includes(permission.id);

                        return (
                          <div
                            key={permission.id}
                            className="flex items-center justify-between px-4 py-3"
                          >
                            <span className={`text-[11px] ${enabled ? "text-white/55" : "text-white/25"}`}>
                              {permission.label}
                            </span>

                            <span
                              className={`flex h-5 w-5 items-center justify-center rounded-md ${
                                enabled ? "bg-white/[0.07]" : "bg-white/[0.02]"
                              }`}
                            >
                              {enabled && <Check size={11} className="text-white/70" />}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <div className="flex items-center gap-2">
                  <UserPlus size={14} className="text-white/30" />
                  <span className="text-[10px] text-white/40">
                    {activeRole.assignedUserCount} users have this role
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
