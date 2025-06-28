"use client";
import { useSession } from "@/hooks/useSession";
import Loader from "@/components/elements/Loader";
import RegistFillDetails from "@/Modules/RegistModules/FillDetails";

export default function DashboardContent() {
  const { user, isLoading } = useSession();
  if (isLoading) {
    return <Loader />;
  } else if (!user?.fillDetails) {
    return <RegistFillDetails />;
  } else {
    return <div>No bukti masuk available</div>;
  }
}
