import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { AppUser, Id, PermissionKey, Role } from "@/lib/types/entities";
import { requireUser } from "@/lib/auth/session";

// Roles rarely change; cache within a single request lifecycle is enough
// for now. If this becomes hot, swap for a short-TTL in-memory cache.
async function getRolePermissionKeys(roleId: string): Promise<Set<PermissionKey>> {
  const roleSnap = await adminDb.collection(COLLECTIONS.roles).doc(roleId).get();
  if (!roleSnap.exists) return new Set();

  const role = roleSnap.data() as Omit<Role, "id">;
  if (role.permissionIds.length === 0) return new Set();

  const permSnaps = await adminDb
    .collection(COLLECTIONS.permissions)
    .where("__name__", "in", role.permissionIds.slice(0, 30)) // Firestore `in` cap
    .get();

  return new Set(
    permSnaps.docs.map((d) => d.data().key as PermissionKey),
  );
}

export async function userHasPermission(
  user: AppUser,
  permission: PermissionKey,
): Promise<boolean> {
  const keys = await getRolePermissionKeys(user.roleId);
  return keys.has(permission);
}

async function getRoleScope(roleId: string): Promise<Role["scope"] | null> {
  const roleSnap = await adminDb.collection(COLLECTIONS.roles).doc(roleId).get();
  if (!roleSnap.exists) return null;
  return (roleSnap.data() as Omit<Role, "id">).scope;
}

/**
 * Requires an authenticated user AND a specific permission, additionally
 * checking scope against a target department. Use this for anything that
 * touches a specific department's data (attendance, NOC/requests, tasks):
 *
 *   const user = await requirePermissionForDepartment("requests.approve", noc.departmentId);
 *
 * - global scope (Admin, Dean): allowed regardless of targetDepartmentId
 * - department scope (HOD): allowed only if targetDepartmentId === user.departmentId
 * - self scope (Student): never allowed here — students act on their own
 *   records only, which callers should check directly (requesterId === user's
 *   employeeId), not through this department-level gate
 */
export async function requirePermissionForDepartment(
  permission: PermissionKey,
  targetDepartmentId: Id | null,
): Promise<AppUser> {
  const user = await requireUser();
  const [hasPerm, scope] = await Promise.all([
    userHasPermission(user, permission),
    getRoleScope(user.roleId),
  ]);

  if (!hasPerm) throw new Error("FORBIDDEN");

  if (scope === "global") return user;
  if (scope === "department") {
    if (targetDepartmentId && targetDepartmentId === user.departmentId) return user;
    throw new Error("FORBIDDEN");
  }

  throw new Error("FORBIDDEN"); // "self" scope must not grant department-wide access
}

/**
 * Requires an authenticated user AND a specific permission. This is
 * the standard guard to call at the top of every server action /
 * route handler that reads or mutates protected data:
 *
 *   const user = await requirePermission("users.update");
 */
export async function requirePermission(
  permission: PermissionKey,
): Promise<AppUser> {
  const user = await requireUser();
  const allowed = await userHasPermission(user, permission);
  if (!allowed) throw new Error("FORBIDDEN");
  return user;
}
