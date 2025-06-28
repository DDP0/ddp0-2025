"use client";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons/Google";
import Link from "next/link";
import { useToast } from "@/hooks/useToast";
import { authClient } from "@/lib/auth-client";
import Background from "./Background";

const RegistrationModules = () => {
  const toast = useToast();

  const handleGoogleSignUp = async () => {
    try {
      toast.show("loading", "Sedang mengalihkan ke Google");
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/profile", // Redirect to profile after successful sign up
      });
    } catch (error) {
      console.error("Google sign up error:", error);
      toast.show("error", "Gagal masuk dengan Google. Silakan coba lagi.");
    }
  };
  return (
    <main className="relative h-screen overflow-hidden flex flex-col gap-6 max-lg:gap-5 max-md:gap-4 max-sm:gap-2.5 justify-center items-center px-120 max-lg:px-25 max-md:px-20 max-sm:px-8 font-josefin-sans bg-blend-overlay">
      <h1 className="text-h4 max-lg:text-h5 max-md:text-headline">
        Selamat datang di DDP-0!
      </h1>
      <div className="relative w-full rounded-xl p-[1px] bg-component-border">
        <div className="w-full rounded-xl flex flex-col gap-6 bg-card glass p-16 max-lg:p-14 max-md:p-10 max-sm:px-8 max-sm:py-12">
          <h4 className="text-h4 max-sm:text-h5-mobile text-center">
            Registration
          </h4>
          <Button className="w-full" onClick={handleGoogleSignUp}>
            <Google size="size-6 max-sm:size-4" />
            Lanjutkan dengan Google
          </Button>
          <p className="text-center text-base max-sm:text-sm">
            Sudah memiliki akun?{" "}
            <Link href={"/"}>
              {" "}
              <span className="bg-clip-text text-transparent bg-gradient-kiwi">
                Masuk sekarang
              </span>
            </Link>
          </p>
        </div>
      </div>
      <Background />
    </main>
  );
};

export default RegistrationModules;
