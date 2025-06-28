"use client";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./elements/Loader";
import RegistFillDetails from "@/Modules/RegistModules/FillDetails";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  redirectTo = "/register",
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo, user]);

  if (isLoading) {
    return fallback || <Loader />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }
  if (user && user?.fillDetails === false) {
    return <RegistFillDetails />;
  }

  return <>{children}</>;
}
