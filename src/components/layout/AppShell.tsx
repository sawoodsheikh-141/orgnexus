"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#090a0c]">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <section className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setCollapsed(!collapsed)} />

        <div className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </div>
      </section>
    </div>
  );
}
