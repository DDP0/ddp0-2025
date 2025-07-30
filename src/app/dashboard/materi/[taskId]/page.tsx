import TaskPage from "@/Modules/MateriPageModules/components/TaskPage";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default async function MateriDetailPage() {
  return (
    <ProtectedRoute>
      <TaskPage />
    </ProtectedRoute>
  );
}
