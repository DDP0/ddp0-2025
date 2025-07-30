import MateriPageModules from "@/Modules/MateriPageModules";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default async function MateriPage() {
  return (
    <ProtectedRoute>
      <MateriPageModules />
    </ProtectedRoute>
  );
}
