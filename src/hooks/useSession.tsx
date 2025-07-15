"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  fillDetails?: boolean;
  role?: string | null;
  gender?: string | null;
  NPM?: string | null;
  idLine?: string | null;
  idDiscord?: string | null;
  buktiMasuk?: string | null;
  buktiShare?: string | null;
  jalurMasuk?: string | null;
  jurusan?: string | null;
  asalSekolah?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionData {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  user: User;
  session: SessionData;
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSession = async () => {
    try {
      const response = await authClient.getSession();
      if (response.data) {
        setSession(response.data);
      } else {
        setSession(null);
      }
    } catch (error) {
      console.error("Failed to get session:", error);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  const signOut = async () => {
    try {
      await authClient.signOut();
      setSession(null);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return {
    session,
    user: session?.user || null,
    isLoading,
    isAuthenticated: !!session,
    signOut,
    refreshSession: getSession,
  };
}
