"use client";

import {
  Activity,
  Bus,
  Check,
  FileText,
  LayoutDashboard,
  PanelLeftClose,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Users", icon: Users, path: "/users" },
  { label: "Departments", icon: PanelLeftClose, path: "/departments" },
  { label: "Roles & Access", icon: ShieldCheck, path: "/roles" },
  { label: "Attendance", icon: UserCheck, path: "/attendance" },
  { label: "Transport", icon: Bus, path: "/transport" },
  { label: "Tasks", icon: Check, path: "/tasks" },
  { label: "Requests", icon: FileText, path: "/requests" },
  { label: "Reports", icon: Activity, path: "/reports" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={`hidden border-r border-white/[0.07] bg-[#0d0e10] transition-all duration-300 lg:flex lg:flex-col ${
        collapsed ? "w-[76px]" : "w-[250px]"
      }`}
    >
      {/* BRAND */}
      <div className="flex h-[76px] items-center border-b border-white/[0.07] px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black">
            <span className="text-sm font-bold">O</span>
          </div>

          {!collapsed && (
            <div className="overflow-hidden">
              <p className="truncate text-[15px] font-semibold tracking-[-0.02em]">
                OrgNexus
              </p>
              <p className="truncate text-[10px] uppercase tracking-[0.18em] text-white/35">
                Organisation OS
              </p>
            </div>
          )}
        </div>
      </div>

      {/* WORKSPACE */}
      {!collapsed && (
        <div className="px-4 pt-5">
          <button className="flex w-full items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-left transition hover:bg-white/[0.05]">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-[11px] font-semibold">
                AC
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium">Acme Corp</p>
                <p className="truncate text-[10px] text-white/35">
                  Main workspace
                </p>
              </div>
            </div>

            <span className="text-[10px] text-white/30">⌄</span>
          </button>
        </div>
      )}

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pt-6">
        {!collapsed && (
          <p className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
            Workspace
          </p>
        )}

        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            item.path === "/"
              ? pathname === "/"
              : pathname.startsWith(item.path);

          return (
            <button
              key={item.label}
              onClick={() => router.push(item.path)}
              className={`group flex w-full items-center rounded-xl transition ${
                collapsed
                  ? "justify-center px-2 py-3"
                  : "gap-3 px-3 py-2.5"
              } ${
                active
                  ? "bg-white/[0.09] text-white"
                  : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
              }`}
            >
              <Icon
                className={`h-[17px] w-[17px] shrink-0 ${
                  active ? "text-white" : "text-white/40"
                }`}
                strokeWidth={active ? 2 : 1.7}
              />

              {!collapsed && (
                <span className="text-[12px] font-medium">
                  {item.label}
                </span>
              )}

              {item.label === "Requests" && !collapsed && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-[9px] text-white/55">
                  27
                </span>
              )}
            </button>
          );
        })}

        {!collapsed && (
          <p className="mb-3 mt-8 px-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
            System
          </p>
        )}

        {[
          { label: "AI Assistant", icon: Sparkles },
          { label: "Settings", icon: Settings },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex w-full items-center rounded-xl text-white/45 transition hover:bg-white/[0.04] hover:text-white/80 ${
                collapsed
                  ? "justify-center px-2 py-3"
                  : "gap-3 px-3 py-2.5"
              }`}
            >
              <Icon className="h-[17px] w-[17px]" strokeWidth={1.7} />

              {!collapsed && (
                <span className="text-[12px] font-medium">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* USER */}
      <div className="border-t border-white/[0.07] p-3">
        <div
          className={`flex items-center rounded-xl bg-white/[0.025] ${
            collapsed ? "justify-center p-2" : "gap-3 p-2.5"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-300 to-zinc-600 text-[10px] font-semibold text-black">
            AD
          </div>

          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium">Admin</p>
                <p className="truncate text-[9px] text-white/30">
                  Administrator
                </p>
              </div>

              <button
                onClick={onToggle}
                className="text-[11px] text-white/25 hover:text-white"
              >
                ‹
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}