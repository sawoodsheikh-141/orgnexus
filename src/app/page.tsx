import AppShell from "@/components/layout/AppShell";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { getDashboardStats } from "@/lib/data/stats";

export default async function Home() {
  // Verifies the session cookie server-side (middleware only checked
  // that a cookie exists) and redirects to /login if invalid/expired.
  const user = await requireUserOrRedirect();
  const stats = await getDashboardStats();

  return (
    <AppShell>
      <DashboardOverview user={user} stats={stats} />
    </AppShell>
  );
}