"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";
import { requirePermissionForDepartment } from "@/lib/permissions";
import { requireUser } from "@/lib/auth/session";

const createNoticeSchema = z.object({
  title: z.string().trim().min(3).max(120),
  body: z.string().trim().min(3).max(2000),
  // null/"" => campus-wide; only global-scope roles (Admin/Dean) may post those.
  departmentId: z.string().min(1).nullable(),
  pinned: z.boolean().default(false),
});

export async function createNoticeAction(input: {
  title: string;
  body: string;
  departmentId: string | null;
  pinned: boolean;
}) {
  const parsed = createNoticeSchema.parse(input);

  // Scope check: HOD can only post to their own department; global roles
  // (Admin/Dean) can post to any department OR campus-wide (null).
  const user = await requirePermissionForDepartment(
    "notices.create",
    parsed.departmentId,
  );

  const now = new Date().toISOString();
  const ref = adminDb.collection(COLLECTIONS.notices).doc();
  await ref.set({
    id: ref.id,
    title: parsed.title,
    body: parsed.body,
    departmentId: parsed.departmentId,
    authorId: user.id,
    pinned: parsed.pinned,
    createdAt: now,
    expiresAt: null,
  });

  revalidatePath("/notices");
  revalidatePath("/");
}

export async function deleteNoticeAction(noticeId: string) {
  const user = await requireUser();
  const ref = adminDb.collection(COLLECTIONS.notices).doc(noticeId);
  const snap = await ref.get();
  if (!snap.exists) return;

  const notice = snap.data() as { departmentId: string | null; authorId: string };

  // Author can always remove their own notice; otherwise fall back to the
  // normal department-scoped manage check (HOD for their dept, Admin/Dean global).
  if (notice.authorId !== user.id) {
    await requirePermissionForDepartment("notices.manage", notice.departmentId);
  }

  await ref.delete();
  revalidatePath("/notices");
  revalidatePath("/");
}
