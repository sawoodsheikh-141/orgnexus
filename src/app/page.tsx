import AppShell from "@/components/layout/AppShell";
import DashboardOverview from "../components/dashboard/DashboardOverview";

export default function Home() {
  return (
    <AppShell>
      <DashboardOverview />
    </AppShell>
  );
}