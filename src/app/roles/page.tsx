import AppShell from "@/components/layout/AppShell";
import RolesOverview from "@/components/roles/RolesOverview";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { getRolesOverview } from "@/lib/data/roles";

export default async function RolesPage() {
  await requireUserOrRedirect();
  const { roles, permissions } = await getRolesOverview();

  return (
    <AppShell>
      <RolesOverview roles={roles} permissions={permissions} />
    </AppShell>
  );
}