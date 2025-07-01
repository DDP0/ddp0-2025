"use client";
import { useSession } from "@/hooks/useSession";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Loader from "./elements/Loader";

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
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (user && user.fillDetails === false && pathname !== "/register/form") {
      router.push("/register/form");
      return;
    }

    if (user && user.fillDetails === true && pathname !== "/dashboard") {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, user, router, redirectTo, pathname]);

  if (isLoading) {
    return fallback || <Loader />;
  }

  if (
    !isAuthenticated ||
    (user && user.fillDetails === false && pathname !== "/register/form")
  ) {
    return null;
  }

  return <>{children}</>;
}
