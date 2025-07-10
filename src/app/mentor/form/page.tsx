"use client";

import { useEffect } from "react";
import { useSession } from "@/hooks/useSession";
import Loader from "@/components/elements/Loader";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import RegistFillDetails from "@/Modules/MentorModules/FormMentor";

const Page = () => {
  const router = useRouter();
  const { show } = useToast();
  const { user, isLoading, isAuthenticated } = useSession();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      show("error", "Anda harus login terlebih dahulu");
      router.push("/mentor");
    }
  }, [isLoading, isAuthenticated, router, show]);

  if (isLoading || (!isAuthenticated && typeof window !== "undefined")) {
    return <Loader />;
  }

  return (
    <div>
      <RegistFillDetails />
    </div>
  );
};

export default Page;
