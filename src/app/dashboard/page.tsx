import DashboardModules from "@/Modules/DashboardModules";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default async function DashboardPage() {
  return (
    <ProtectedRoute isDashboard={true}>
      <DashboardModules />
    </ProtectedRoute>
  );
}
