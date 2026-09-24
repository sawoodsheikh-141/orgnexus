import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Permission, Role } from "@/lib/types/entities";

export interface RoleWithCounts extends Role {
  assignedUserCount: number;
}

export async function getRolesOverview(): Promise<{
  roles: RoleWithCounts[];
  permissions: Permission[];
}> {
  const [roleSnaps, permSnaps, userSnaps] = await Promise.all([
    adminDb.collection(COLLECTIONS.roles).get(),
    adminDb.collection(COLLECTIONS.permissions).get(),
    adminDb.collection(COLLECTIONS.users).where("status", "==", "active").get(),
  ]);

  const userCountByRole = new Map<string, number>();
  for (const doc of userSnaps.docs) {
    const roleId = doc.data().roleId as string;
    userCountByRole.set(roleId, (userCountByRole.get(roleId) ?? 0) + 1);
  }

  const roles: RoleWithCounts[] = roleSnaps.docs
    .map((doc) => {
      const role = doc.data() as Role;
      return { ...role, assignedUserCount: userCountByRole.get(role.id) ?? 0 };
    })
    // Admin first, then by descending permission count, matches prior UI ordering intent
    .sort((a, b) => b.permissionIds.length - a.permissionIds.length);

  const permissions = permSnaps.docs.map((doc) => doc.data() as Permission);

  return { roles, permissions };
}
