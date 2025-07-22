"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { User2Icon } from "lucide-react";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { data } from "./const";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const { user, signOut, isAuthenticated, isLoading } = useSession();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogin = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
    setMenuOpen(false);
    return;
  };
  const handleLogout = () => {
    signOut();
    router.push("/");
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-linear-white-disabled shadow-md mx-20 max-lg:mx-14 max-md:mx-10 max-sm:mx-5 my-5 text-white rounded-full">
      <nav className="bg-card glass grid grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] m-[1.5px] text-white items-center justify-between py-4 max-sm:py-3 px-4 max-sm:px-3 rounded-full">
        <Link href={"/"} className="flex items-center space-x-4 px-3 md:px-6">
          <Image
            src="/logo-new.png"
            alt="DDP0 Logo"
            width={25}
            height={25}
            className=""
          />
          <span className="font-spectral text-h4 hidden lg:block bg-gradient-logo bg-clip-text text-transparent">
            DDP-0
          </span>
        </Link>

        <div className="hidden lg:flex items-center justify-center space-x-4 px-3 md:px-6">
          {data.map((item, index) => (
            <Link
              key={index}
              href={item.isAvailable ? item.href : "#"}
              className={`px-4 py-2 font-josefin-sans  ${
                item.isAvailable
                  ? "hover:opacity-50"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex items-center justify-end space-x-4 px-3 md:px-6 font-josefin-sans">
          {isAuthenticated && !isLoading ? (
            <div className="flex items-center space-x-6 justify-center">
              <Button variant="default" className="py-1" onClick={handleLogin}>
                <User2Icon />
                {user?.name ? user.name.split(" ").slice(0, 2).join(" ") : ""}
              </Button>
              <span
                className="text-red-500 font-josefin-sans font-semibold cursor-pointer hover:opacity-50"
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          ) : (
            <Button
              variant="kiwi"
              className="py-1 font-josefin-sans"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </div>
        <div className="flex lg:hidden justify-end px-4 ">
          <Button variant="default">
            <div
              onClick={toggleMenu}
              className={`lg:hidden relative w-6 h-8 flex flex-col justify-center ${
                isMenuOpen ? "items-center" : "items-end"
              } text-white hover:text-gray-300 transition-colors`}
            >
              <span
                className={`block w-3 h-0.5 bg-current transform transition-all duration-300 rounded-full ${
                  isMenuOpen
                    ? "rotate-45 translate-y-0.5 w-5"
                    : "-translate-y-1"
                }`}
              ></span>
              <span
                className={`block w-5 h-0.5 bg-current transition-all duration-300 rounded-full ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block w-4 h-0.5 bg-current transform transition-all duration-300 rounded-full ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-0.5 w-5"
                    : "translate-y-1"
                }`}
              ></span>
            </div>
          </Button>
        </div>
      </nav>
      <div
        className={`lg:hidden absolute top-full left-4 glass right-4 mt-2 shadow-xl z-50 border-[1.5px] border-t-gray-200 border-l-gray-300 border-r-gray-300 border-b-gray-400 backdrop-blur-md transform transition-all duration-300 ease-out rounded-4xl ${
          isMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className=" p-6 rounded-4xl ">
          <div className="space-y-6 mb-6 font-josefin-sans">
            {data.map((item, index) => (
              <Link
                href={item.isAvailable ? item.href : "#"}
                key={index}
                className={`block text-white text-lg hover:text-gray-300  transition-all duration-200 transform ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100 "
                    : "-translate-x-4 opacity-0"
                } ${
                  item.isAvailable ? "" : "text-white/50 cursor-not-allowed"
                }`}
                style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
                onClick={() => setMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {isAuthenticated && !isLoading ? (
              <Button
                className={`w-full flex items-center justify-center py-2  transition-all duration-200 transform  ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
                variant="default"
                onClick={handleLogin}
              >
                <User2Icon className="mb-px h-4 w-4" />
                {user?.name ? user.name.split(" ").slice(0, 2).join(" ") : ""}
              </Button>
            ) : (
              <Button
                variant="kiwi"
                className={`py-2 w-full  transition-all duration-200 transform font-josefin-sans ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
            {isAuthenticated && !isLoading && (
              <div
                className={`w-full flex flex-col items-start gap-4 justify-center  transition-all duration-200 transform  ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
                style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
              >
                <span
                  className="text-red-500 w-full font-josefin-sans font-semibold cursor-pointer hover:opacity-50"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
