"use client";
import { useSession } from "@/hooks/useSession";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "./elements/Loader";
import DashboardModules from "@/Modules/DashboardModules";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
  isDashboard?: boolean;
}

export function ProtectedRoute({
  children,
  redirectTo = "/register",
  fallback,
  isDashboard = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      setRedirecting(true);
      router.replace(redirectTo);
      return;
    }

    if (user && user.fillDetails === false && pathname !== "/register/form") {
      setRedirecting(true);
      router.replace("/register/form");
    }
  }, [isAuthenticated, isLoading, user, router, redirectTo, pathname]);

  if (isLoading || redirecting) {
    return fallback || <Loader />;
  }
  if (isDashboard) {
    return <DashboardModules isMentor={user?.role === "Mentor"} />;
  }

  return <>{children}</>;
}
