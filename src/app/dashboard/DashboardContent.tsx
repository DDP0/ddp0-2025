"use client";
import { useSession } from "@/hooks/useSession";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function DashboardContent() {
  const { user, signOut } = useSession();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          {user && (
            <div className="mb-6">
              <h2 className="text-xl mb-2">Welcome, {user.name}!</h2>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Email Verified:</strong>{" "}
                  {user.emailVerified ? "Yes" : "No"}
                </p>
                {user.image && (
                  <div>
                    <p>
                      <strong>Profile Picture:</strong>
                    </p>
                    <Image
                      src={user.image}
                      alt="Profile"
                      width={64}
                      height={64}
                      className="rounded-full mt-2"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          <Button
            onClick={signOut}
            className="mt-4 border border-gray-300 hover:bg-gray-50"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
