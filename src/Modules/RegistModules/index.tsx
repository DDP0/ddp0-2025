"use client";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons/Google";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import { authClient } from "@/lib/auth-client";
import Background from "./Background";

export const registerDate = new Date(
  process.env.NEXT_PUBLIC_REGISTER_DATE || "2025-07-22T00:00:00+07:00"
);
const nowInJakarta = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
);

const RegistrationModules = ({
  isRegisterPage,
  isMentor = false, // Default to false if not provided
}: {
  isRegisterPage: boolean;
  isMentor?: boolean;
}) => {
  const toast = useToast();

  const handleGoogleSignUp = async () => {
    if (
      process.env.NODE_ENV === "production" &&
      isMentor === false &&
      nowInJakarta < registerDate
    ) {
      toast.show(
        "warning",
        "Registrasi DDD-0 Belum dibuka, silakan coba lagi nanti."
      );
      return;
    }
    try {
      toast.show("loading", "Sedang mengalihkan ke Google");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: isMentor
          ? "/mentor/form"
          : isRegisterPage
          ? "/register/form"
          : "/dashboard", // Redirect to dashboard after successful sign up
      });
    } catch (error) {
      console.error("Google sign up error:", error);
      toast.show("error", "Gagal masuk dengan Google. Silakan coba lagi.");
    }
  };
  return (
    <main className="relative h-screen overflow-hidden flex flex-col gap-6 max-lg:gap-5 max-md:gap-4 max-sm:gap-2.5 justify-center items-center max-sm:px-8 font-josefin-sans bg-blend-overlay">
      <h1 className="text-h4 max-lg:text-h5 max-md:text-headline">
        Selamat datang di DDP-0!
      </h1>
      <div className="relative w-[40%] max-lg:w-[70%] max-md:w-[80%] max-sm:w-full rounded-xl p-[1px] bg-component-border">
        <div className="w-full rounded-xl flex flex-col gap-6 bg-card glass p-16 max-lg:p-14 max-md:p-10 max-sm:px-8 max-sm:py-12">
          <h4 className="text-h4 max-sm:text-h5-mobile text-center">
            {isMentor ? "Mentor" : isRegisterPage ? "Registration" : "Login"}
          </h4>
          <Button className="w-full" onClick={handleGoogleSignUp}>
            <Google size="size-6 max-sm:size-4" />
            Lanjutkan dengan Google
          </Button>

          {!isMentor && (
            <p className="text-center text-base max-sm:text-sm">
              {isRegisterPage ? "Sudah memiliki akun?" : "Belum memiliki akun?"}
              <Link href={isRegisterPage ? "/login" : "/register"}>
                {" "}
                <span className="bg-clip-text text-transparent bg-gradient-kiwi">
                  {isRegisterPage ? "Masuk" : "Daftar"}
                </span>
              </Link>
            </p>
          )}
        </div>
      </div>
      <Background />
    </main>
  );
};

export default RegistrationModules;
