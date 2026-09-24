import DashboardHeader from "./DashboardHeader";
import StatCards from "./StatCards";
import TransportMap from "./TransportMap";
import AttendanceCard from "./AttendanceCard";
import PendingRequests from "./PendingRequests";
import AIInsights from "./AIInsights";
import RecentActivity from "./RecentActivity";
import type { AppUser } from "@/lib/types/entities";
import type { DashboardStats } from "@/lib/data/stats";

interface DashboardOverviewProps {
  user: AppUser;
  stats: DashboardStats;
}

export default function DashboardOverview({ user, stats }: DashboardOverviewProps) {
  return (
    <main className="dashboard-grid min-h-full">
      <div className="mx-auto w-full max-w-[1700px] p-5 lg:p-7">
        <DashboardHeader user={user} />

        <StatCards stats={stats} />

        <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(310px,0.8fr)]">
          <TransportMap />
          <AttendanceCard />
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <PendingRequests />
          <AIInsights />
          <RecentActivity />
        </div>

        <footer className="flex flex-col items-center justify-between gap-2 py-7 text-[9px] text-white/20 sm:flex-row">
          <p>OrgNexus · Organisation Management System</p>

          <div className="flex items-center gap-4">
            <span>System operational</span>

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