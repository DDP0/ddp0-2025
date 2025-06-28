import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {

  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
