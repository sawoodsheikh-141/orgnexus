/** Central registry of Firestore top-level collection names. */
export const COLLECTIONS = {
  organisations: "organisations",
  users: "users",
  employees: "employees",
  departments: "departments",
  roles: "roles",
  permissions: "permissions",
  attendance: "attendance",
  buses: "buses",
  routes: "routes",
  tasks: "tasks",
  requests: "requests",
  notifications: "notifications",
  activityLogs: "activityLogs",
  notices: "notices",
} as const;
