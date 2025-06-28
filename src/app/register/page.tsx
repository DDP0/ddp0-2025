"use client";
import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import Loader from "@/components/elements/Loader";
import RegistFillDetails from "@/Modules/RegistModules/FillDetails";
import RegistrationModules from "@/Modules/RegistModules";
import { useRouter } from "next/navigation";

export default function DashboardContent() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useSession();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.fillDetails) {
      router.push("/dashboard");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return <Loader />;
  }

  if (user && !user.fillDetails) {
    return <RegistFillDetails />;
  }

  if (!isAuthenticated) {
    return <RegistrationModules isRegisterPage={true} />;
  }

  return null;
}
