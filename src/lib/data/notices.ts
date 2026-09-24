import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { AppUser, Notice } from "@/lib/types/entities";

/**
 * Everyone sees campus-wide notices (departmentId === null). If the
 * viewer belongs to a department (HOD or Student), they additionally
 * see that department's notices. Admin/Dean see everything, since
 * they're global-scope and department-run notices concern them too.
 */
export async function getNoticesForUser(user: AppUser): Promise<Notice[]> {
  const now = new Date().toISOString();

  const queries = [
    adminDb.collection(COLLECTIONS.notices).where("departmentId", "==", null).get(),
  ];

  if (user.departmentId) {
    queries.push(
      adminDb
        .collection(COLLECTIONS.notices)
        .where("departmentId", "==", user.departmentId)
        .get(),
    );
  } else if (user.roleId === "admin" || user.roleId === "dean") {
    // Global-scope roles see every department's notices too.
    queries.push(adminDb.collection(COLLECTIONS.notices).get());
  }

  const snaps = await Promise.all(queries);
  const byId = new Map<string, Notice>();
  for (const snap of snaps) {
    for (const doc of snap.docs) {
      byId.set(doc.id, doc.data() as Notice);
    }
  }

  return Array.from(byId.values())
    .filter((n) => !n.expiresAt || n.expiresAt > now)
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return b.createdAt.localeCompare(a.createdAt);
    });
}
