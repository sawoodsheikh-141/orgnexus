import AppShell from "@/components/layout/AppShell";
import NoticeBoard from "@/components/notices/NoticeBoard";
import { requireUserOrRedirect } from "@/lib/auth/session";
import { getNoticesForUser } from "@/lib/data/notices";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import type { Department } from "@/lib/types/entities";

export default async function NoticesPage() {
  const user = await requireUserOrRedirect();
  const [notices, deptSnap] = await Promise.all([
    getNoticesForUser(user),
    adminDb.collection(COLLECTIONS.departments).get(),
  ]);

  const departments = deptSnap.docs.map((d) => d.data() as Department);

  // Who is allowed to post where: global roles (admin/dean) can post
  // campus-wide or to any department; HOD can only post to their own.
  const canPostGlobal = user.roleId === "admin" || user.roleId === "dean";
  const canPostDepartment = user.roleId === "hod" && user.departmentId;

  return (
    <AppShell>
      <NoticeBoard
        notices={notices}
        departments={departments}
        currentUserId={user.id}
        canCreate={canPostGlobal || Boolean(canPostDepartment)}
        postableDepartmentIds={
          canPostGlobal
            ? departments.map((d) => d.id)
            : canPostDepartment
              ? [user.departmentId as string]
              : []
        }
        canPostCampusWide={canPostGlobal}
      />
    </AppShell>
  );
}
