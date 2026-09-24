/**
 * Firestore document shapes. Timestamps are stored as Firestore
 * `Timestamp` on write and normalized to ISO strings when handed to
 * client components (see lib/firebase/serialize.ts, added alongside
 * the first read query that needs it).
 */

export type Id = string;

export type PermissionKey =
  | "users.read" | "users.create" | "users.update" | "users.delete"
  | "departments.read" | "departments.create" | "departments.update" | "departments.delete"
  | "attendance.read" | "attendance.manage"
  | "transport.read" | "transport.manage"
  | "tasks.read" | "tasks.create" | "tasks.update" | "tasks.delete"
  | "requests.read" | "requests.approve" | "requests.reject"
  | "reports.read" | "reports.generate"
  | "settings.manage"
  | "notices.read" | "notices.create" | "notices.manage";

export interface Permission {
  id: Id;
  key: PermissionKey;
  label: string;
}

export interface Role {
  id: Id;
  name: string;
  permissionIds: Id[];
  /**
   * "global": permission applies org-wide (Admin, Dean).
   * "department": permission only applies to records in the user's
   *   own departmentId (HOD) — checked via requirePermissionForDepartment.
   * "self": user can only act on their own records (Student) — checked
   *   at the query/action level (e.g. "your own attendance/requests").
   */
  scope: "global" | "department" | "self";
  isSystemRole: boolean; // seeded roles (Admin, etc.) can't be deleted
}

export type UserStatus = "active" | "suspended";

/** Mirrors a Firebase Auth user; uid === Firebase Auth uid === doc id. */
export interface AppUser {
  id: Id; // Firebase Auth uid
  email: string;
  employeeId: Id | null;
  roleId: Id;
  /**
   * Set for department-scoped roles (HOD). Admin/Dean leave this null
   * since their access isn't department-limited. Used by
   * requirePermissionForDepartment to check "is this HOD's own dept".
   */
  departmentId: Id | null;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export type EmploymentStatus = "active" | "on_leave" | "inactive";

export interface Employee {
  id: Id;
  employeeCode: string; // human-facing e.g. "EMP-0042"
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  departmentId: Id | null;
  roleId: Id | null; // job/org role, distinct from AppUser.roleId (access role)
  status: EmploymentStatus;
  joiningDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: Id;
  name: string;
  headEmployeeId: Id | null;
  memberCount: number; // denormalized, updated via server action transaction
  createdAt: string;
  updatedAt: string;
}

export type AttendanceStatus = "present" | "absent" | "late" | "leave" | "half_day";

export interface AttendanceRecord {
  id: Id;
  employeeId: Id;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkIn: string | null;
  checkOut: string | null;
  createdAt: string;
}

export type BusStatus = "active" | "inactive" | "maintenance";

export interface Bus {
  id: Id;
  registrationNumber: string;
  routeId: Id | null;
  driverId: Id | null; // employeeId
  capacity: number;
  assignedPassengerCount: number;
  status: BusStatus;
}

export interface RouteStop {
  name: string;
  order: number;
}

export type RouteStatus = "active" | "inactive";

export interface TransportRoute {
  id: Id;
  name: string;
  code: string;
  stops: RouteStop[];
  status: RouteStatus;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: Id;
  title: string;
  description: string;
  assigneeId: Id; // employeeId
  creatorId: Id; // employeeId
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export type RequestType = "leave" | "permission" | "resource" | "administrative";
export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export interface OrgRequest {
  id: Id;
  requesterId: Id; // employeeId
  type: RequestType;
  description: string;
  status: RequestStatus;
  approverId: Id | null;
  decisionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: Id;
  userId: Id;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ActivityLog {
  id: Id;
  actorId: Id; // AppUser id
  action: string; // e.g. "employee.created"
  targetType: string; // e.g. "employee"
  targetId: Id;
  metadata: Record<string, unknown>;
  createdAt: string;
}

/**
 * The persistent replacement for "notes shared in a WhatsApp group
 * 4 months ago, now unfindable." departmentId null = campus-wide
 * (posted by Admin/Dean); set = department-only (posted by that HOD).
 * expiresAt is optional — exam notices etc. can auto-drop off the
 * board once irrelevant instead of accumulating forever.
 */
export interface Notice {
  id: Id;
  title: string;
  body: string;
  departmentId: Id | null;
  authorId: Id; // AppUser id
  pinned: boolean;
  createdAt: string;
  expiresAt: string | null;
}
