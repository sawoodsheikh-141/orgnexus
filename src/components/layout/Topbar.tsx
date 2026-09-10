"use client";

import {
  Bell,
  CalendarDays,
  CircleHelp,
  Menu,
  Search,
} from "lucide-react";
import { useState } from "react";

interface TopbarProps {
  onMenuClick: () => void;
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center border-b border-white/[0.07] bg-[#090a0c]/90 px-5 backdrop-blur-xl lg:px-7">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-white/45 transition hover:bg-white/[0.05] hover:text-white lg:flex"
        >
          <Menu className="h-[17px] w-[17px]" />
        </button>

        <div className="relative hidden max-w-[340px] flex-1 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/25" />

          <input
            placeholder="Search anything..."
            className="h-9 w-full rounded-lg border border-white/[0.07] bg-white/[0.025] pl-9 pr-12 text-[11px] text-white outline-none placeholder:text-white/25 focus:border-white/15"
          />

          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-white/[0.08] px-1.5 py-0.5 text-[8px] text-white/25">
            ⌘ K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="hidden items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[10px] text-white/55 transition hover:bg-white/[0.05] sm:flex">
          <CalendarDays className="h-3.5 w-3.5" />
          Sep 08, 2026
        </button>

        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-white/45 transition hover:bg-white/[0.05] hover:text-white"
          >
            <Bell className="h-[16px] w-[16px]" strokeWidth={1.8} />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-white" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-11 z-50 w-72 rounded-2xl border border-white/[0.08] bg-[#131416] p-3 shadow-2xl">
              <div className="mb-2 flex items-center justify-between px-2">
                <p className="text-xs font-semibold">Notifications</p>
                <span className="text-[9px] text-white/25">3 new</span>
              </div>

              <Notification
                title="3 new leave requests"
                time="5 min ago"
              />

              <Notification
                title="Bus B-04 reached campus"
                time="18 min ago"
              />

              <Notification
                title="Monthly report is ready"
                time="1 hr ago"
              />
            </div>
          )}
        </div>

        <button className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-white/45 transition hover:bg-white/[0.05] hover:text-white sm:flex">
          <CircleHelp className="h-[16px] w-[16px]" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}

function Notification({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <div className="rounded-xl p-2.5 transition hover:bg-white/[0.04]">
      <p className="text-[10px] font-medium text-white/65">{title}</p>
      <p className="mt-1 text-[8px] text-white/25">{time}</p>
    </div>
  );
}