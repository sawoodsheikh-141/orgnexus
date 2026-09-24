import "server-only";
import { adminDb } from "@/lib/firebase/admin";
import { COLLECTIONS } from "@/lib/firebase/collections";

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onTransport: number;
  pendingRequests: number;
}

/** Counts use Firestore aggregation queries — no document reads, cheap at scale. */
export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const [
    totalEmployeesSnap,
    presentTodaySnap,
    activeBusesSnap,
    pendingRequestsSnap,
  ] = await Promise.all([
    adminDb
      .collection(COLLECTIONS.employees)
      .where("status", "==", "active")
      .count()
      .get(),
    adminDb
      .collection(COLLECTIONS.attendance)
      .where("date", "==", today)
      .where("status", "in", ["present", "late", "half_day"])
      .count()
      .get(),
    // Bus collection is small (dozens, not thousands), so summing
    // assignedPassengerCount in-memory is fine; switch to a
    // denormalized org-level counter if this ever needs to scale.
    adminDb
      .collection(COLLECTIONS.buses)
      .where("status", "==", "active")
      .get(),
    adminDb
      .collection(COLLECTIONS.requests)
      .where("status", "==", "PENDING")
      .count()
      .get(),
  ]);

  const onTransport = activeBusesSnap.docs.reduce(
    (sum, doc) => sum + (doc.data().assignedPassengerCount ?? 0),
    0,
  );

  return {
    totalEmployees: totalEmployeesSnap.data().count,
    presentToday: presentTodaySnap.data().count,
    onTransport,
    pendingRequests: pendingRequestsSnap.data().count,
  };
}
