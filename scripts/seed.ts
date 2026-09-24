/**
 * Seeds Firestore with permissions, roles, a first admin account, and
 * enough demo data for every dashboard page to look populated.
 *
 * Usage:
 *   1. Fill in .env.local (see .env.example)
 *   2. Optionally set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD
 *   3. npm run seed
 *
 * Safe to re-run: uses deterministic doc IDs for permissions/roles/org
 * and upserts (set with merge) rather than blindly appending.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { COLLECTIONS } from "../src/lib/firebase/collections";
import type {
  Bus,
  Department,
  Employee,
  Permission,
  PermissionKey,
  Role,
  TransportRoute,
} from "../src/lib/types/entities";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

const app = initializeApp({
  credential: cert({
    projectId: requireEnv("FIREBASE_PROJECT_ID"),
    clientEmail: requireEnv("FIREBASE_CLIENT_EMAIL"),
    privateKey: requireEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  }),
});

const auth = getAuth(app);
const db = getFirestore(app);

const ALL_PERMISSIONS: { key: PermissionKey; label: string }[] = [
  { key: "users.read", label: "View employees" },
  { key: "users.create", label: "Create employees" },
  { key: "users.update", label: "Edit employees" },
  { key: "users.delete", label: "Delete/deactivate employees" },
  { key: "departments.read", label: "View departments" },
  { key: "departments.create", label: "Create departments" },
  { key: "departments.update", label: "Edit departments" },
  { key: "departments.delete", label: "Delete departments" },
  { key: "attendance.read", label: "View attendance" },
  { key: "attendance.manage", label: "Manage attendance" },
  { key: "transport.read", label: "View transport" },
  { key: "transport.manage", label: "Manage transport" },
  { key: "tasks.read", label: "View tasks" },
  { key: "tasks.create", label: "Create tasks" },
  { key: "tasks.update", label: "Edit tasks" },
  { key: "tasks.delete", label: "Delete tasks" },
  { key: "requests.read", label: "View requests" },
  { key: "requests.approve", label: "Approve requests" },
  { key: "requests.reject", label: "Reject requests" },
  { key: "reports.read", label: "View reports" },
  { key: "reports.generate", label: "Generate reports" },
  { key: "settings.manage", label: "Manage settings" },
  { key: "notices.read", label: "View notices" },
  { key: "notices.create", label: "Post notices" },
  { key: "notices.manage", label: "Delete any notice" },
];

async function seedPermissions(): Promise<Record<PermissionKey, string>> {
  const idByKey = {} as Record<PermissionKey, string>;
  const batch = db.batch();

  for (const perm of ALL_PERMISSIONS) {
    const ref = db.collection(COLLECTIONS.permissions).doc(perm.key); // key IS the id, stable
    const doc: Permission = { id: perm.key, key: perm.key, label: perm.label };
    batch.set(ref, doc, { merge: true });
    idByKey[perm.key] = perm.key;
  }

  await batch.commit();
  console.log(`Seeded ${ALL_PERMISSIONS.length} permissions.`);
  return idByKey;
}

async function seedRoles(permissionIds: Record<PermissionKey, string>) {
  const allKeys = Object.values(permissionIds);
  const readOnlyKeys = ALL_PERMISSIONS.filter((p) => p.key.endsWith(".read")).map(
    (p) => p.key,
  );

  // Admin: full system access, unscoped.
  // Dean: campus-wide oversight — approvals, reports, reads everywhere,
  //   but doesn't manage system settings or roles.
  // HOD: same operational powers as Dean but scoped to their own
  //   department only (enforced via requirePermissionForDepartment, not
  //   by the permission list itself).
  // Student: self-service only — read own attendance/tasks, submit
  //   requests (leave/NOC/etc), read notices. No manage/approve powers.
  const roles: Record<string, Role> = {
    admin: {
      id: "admin",
      name: "Admin",
      permissionIds: allKeys,
      scope: "global",
      isSystemRole: true,
    },
    dean: {
      id: "dean",
      name: "Dean",
      permissionIds: [
        ...readOnlyKeys,
        "users.update",
        "departments.update",
        "attendance.manage",
        "requests.approve",
        "requests.reject",
        "tasks.create",
        "tasks.update",
        "reports.generate",
        "notices.create",
        "notices.manage",
      ],
      scope: "global",
      isSystemRole: true,
    },
    hod: {
      id: "hod",
      name: "HOD",
      permissionIds: [
        ...readOnlyKeys,
        "users.update",
        "attendance.manage",
        "requests.approve",
        "requests.reject",
        "tasks.create",
        "tasks.update",
        "reports.generate",
        "notices.create",
        "notices.manage",
      ],
      scope: "department",
      isSystemRole: true,
    },
    student: {
      id: "student",
      name: "Student",
      permissionIds: [
        "attendance.read",
        "tasks.read",
        "requests.read",
        "transport.read",
        "notices.read",
      ],
      scope: "self",
      isSystemRole: true,
    },
  };

  const batch = db.batch();
  for (const role of Object.values(roles)) {
    batch.set(db.collection(COLLECTIONS.roles).doc(role.id), role, { merge: true });
  }
  await batch.commit();
  console.log(`Seeded ${Object.keys(roles).length} roles (Admin, Dean, HOD, Student).`);
}

async function seedAdminUser() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@orgnexus.dev";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  let uid: string;
  try {
    const existing = await auth.getUserByEmail(email);
    uid = existing.uid;
    console.log(`Admin auth user already exists (${email}).`);
  } catch {
    const created = await auth.createUser({ email, password, emailVerified: true });
    uid = created.uid;
    console.log(`Created admin auth user: ${email} / ${password} (CHANGE THIS PASSWORD).`);
  }

  const now = Timestamp.now().toDate().toISOString();
  await db.collection(COLLECTIONS.users).doc(uid).set(
    {
      email,
      employeeId: null,
      roleId: "admin",
      departmentId: null,
      status: "active",
      createdAt: now,
      updatedAt: now,
    },
    { merge: true },
  );
  console.log("Linked admin Firestore user doc.");
  return uid;
}

async function seedDemoData() {
  const now = new Date().toISOString();
  const today = now.slice(0, 10);

  // Departments
  const departments: Department[] = [
    { id: "dept-cse", name: "Computer Science Engineering", headEmployeeId: "emp-2", memberCount: 3, createdAt: now, updatedAt: now },
    { id: "dept-mech", name: "Mechanical Engineering", headEmployeeId: "emp-5", memberCount: 2, createdAt: now, updatedAt: now },
    { id: "dept-exam", name: "Examination Cell", headEmployeeId: null, memberCount: 1, createdAt: now, updatedAt: now },
  ];

  // Employees (students + HOD-designated staff; roleId here is the
  // access role granted to their linked AppUser login, see seedDemoUsers)
  const employees: Employee[] = [
    { id: "emp-1", employeeCode: "STU-0001", firstName: "Aarav", lastName: "Sharma", email: "aarav@orgnexus.dev", phone: "+91 90000 00001", departmentId: "dept-cse", roleId: "student", status: "active", joiningDate: "2023-03-11", createdAt: now, updatedAt: now },
    { id: "emp-2", employeeCode: "STF-0001", firstName: "Meera", lastName: "Iyer", email: "meera@orgnexus.dev", phone: "+91 90000 00002", departmentId: "dept-cse", roleId: "hod", status: "active", joiningDate: "2022-07-02", createdAt: now, updatedAt: now },
    { id: "emp-3", employeeCode: "STU-0002", firstName: "Kabir", lastName: "Khan", email: "kabir@orgnexus.dev", phone: "+91 90000 00003", departmentId: "dept-cse", roleId: "student", status: "active", joiningDate: "2024-01-15", createdAt: now, updatedAt: now },
    { id: "emp-4", employeeCode: "STU-0003", firstName: "Divya", lastName: "Nair", email: "divya@orgnexus.dev", phone: "+91 90000 00004", departmentId: "dept-mech", roleId: "student", status: "active", joiningDate: "2023-09-20", createdAt: now, updatedAt: now },
    { id: "emp-5", employeeCode: "STF-0002", firstName: "Rohan", lastName: "Verma", email: "rohan@orgnexus.dev", phone: "+91 90000 00005", departmentId: "dept-mech", roleId: "hod", status: "active", joiningDate: "2021-11-08", createdAt: now, updatedAt: now },
    { id: "emp-6", employeeCode: "STF-0003", firstName: "Sana", lastName: "Ali", email: "sana@orgnexus.dev", phone: "+91 90000 00006", departmentId: "dept-exam", roleId: "dean", status: "active", joiningDate: "2024-04-01", createdAt: now, updatedAt: now },
  ];

  // Attendance for today
  const attendanceStatuses = ["present", "present", "present", "late", "present", "absent"] as const;

  // Transport
  const routes: TransportRoute[] = [
    { id: "route-1", name: "Campus Loop", code: "R1", stops: [{ name: "Hostel", order: 1 }, { name: "Engineering Block", order: 2 }, { name: "Campus", order: 3 }], status: "active" },
  ];
  const buses: Bus[] = [
    { id: "bus-1", registrationNumber: "KA-09-AB-1234", routeId: "route-1", driverId: null, capacity: 40, assignedPassengerCount: 28, status: "active" },
    { id: "bus-2", registrationNumber: "KA-09-AB-5678", routeId: "route-1", driverId: null, capacity: 40, assignedPassengerCount: 19, status: "active" },
  ];

  const batch = db.batch();

  departments.forEach((d) => batch.set(db.collection(COLLECTIONS.departments).doc(d.id), d, { merge: true }));
  employees.forEach((e) => batch.set(db.collection(COLLECTIONS.employees).doc(e.id), e, { merge: true }));
  employees.forEach((e, i) => {
    const attId = `att-${e.id}-${today}`;
    batch.set(
      db.collection(COLLECTIONS.attendance).doc(attId),
      {
        id: attId,
        employeeId: e.id,
        date: today,
        status: attendanceStatuses[i],
        checkIn: attendanceStatuses[i] === "absent" ? null : "09:0" + i,
        checkOut: null,
        createdAt: now,
      },
      { merge: true },
    );
  });
  routes.forEach((r) => batch.set(db.collection(COLLECTIONS.routes).doc(r.id), r, { merge: true }));
  buses.forEach((b) => batch.set(db.collection(COLLECTIONS.buses).doc(b.id), b, { merge: true }));

  // A couple of pending requests
  batch.set(db.collection(COLLECTIONS.requests).doc("req-1"), {
    id: "req-1", requesterId: "emp-1", type: "leave", description: "Annual leave, 3 days", status: "PENDING", approverId: null, decisionReason: null, createdAt: now, updatedAt: now,
  }, { merge: true });
  batch.set(db.collection(COLLECTIONS.requests).doc("req-2"), {
    id: "req-2", requesterId: "emp-4", type: "resource", description: "New laptop request", status: "PENDING", approverId: null, decisionReason: null, createdAt: now, updatedAt: now,
  }, { merge: true });

  // Demo notices — the WhatsApp-group replacement
  batch.set(db.collection(COLLECTIONS.notices).doc("notice-1"), {
    id: "notice-1", title: "Hall ticket window opens Monday", body: "Hall tickets for the upcoming semester exams can be collected from the exam cell starting Monday 9 AM. Bring your ID card.", departmentId: null, authorId: "seed", pinned: true, createdAt: now, expiresAt: null,
  }, { merge: true });
  batch.set(db.collection(COLLECTIONS.notices).doc("notice-2"), {
    id: "notice-2", title: "Mid-sem revision notes uploaded", body: "Uploaded the consolidated revision notes for units 1-4. Covers everything discussed in the last two review sessions.", departmentId: "dept-cse", authorId: "emp-2", pinned: false, createdAt: now, expiresAt: null,
  }, { merge: true });

  await batch.commit();
  console.log("Seeded departments, employees, attendance, transport, requests and notices.");
}

async function seedDemoUsers() {
  // Gives you a real login for each non-admin role so scope can be
  // demoed (e.g. HOD only seeing their own department's data).
  const demoAccounts = [
    { email: "meera@orgnexus.dev", password: "ChangeMe123!", roleId: "hod", employeeId: "emp-2", departmentId: "dept-cse" },
    { email: "aarav@orgnexus.dev", password: "ChangeMe123!", roleId: "student", employeeId: "emp-1", departmentId: "dept-cse" },
  ];

  const now = new Date().toISOString();

  for (const acc of demoAccounts) {
    let uid: string;
    try {
      const existing = await auth.getUserByEmail(acc.email);
      uid = existing.uid;
    } catch {
      const created = await auth.createUser({
        email: acc.email,
        password: acc.password,
        emailVerified: true,
      });
      uid = created.uid;
      console.log(`Created demo login: ${acc.email} / ${acc.password} (role: ${acc.roleId})`);
    }

    await db.collection(COLLECTIONS.users).doc(uid).set(
      {
        email: acc.email,
        employeeId: acc.employeeId,
        roleId: acc.roleId,
        departmentId: acc.departmentId,
        status: "active",
        createdAt: now,
        updatedAt: now,
      },
      { merge: true },
    );
  }
  console.log("Linked demo HOD and Student user docs.");
}

async function main() {
  const permissionIds = await seedPermissions();
  await seedRoles(permissionIds);
  await seedAdminUser();
  await seedDemoData();
  await seedDemoUsers();
  console.log("\nSeed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
