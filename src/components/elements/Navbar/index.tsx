"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { User2Icon } from "lucide-react";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const { user, signOut, isAuthenticated, isLoading } = useSession();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogin = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/regist");
    }
    setMenuOpen(false);
    setLoggedIn(true);
    return;
  };
  const handleLogout = () => {
    signOut();
    setMenuOpen(false);
    setLoggedIn(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-linear-white-disabled shadow-md m-4 text-white rounded-full">
      <nav className="bg-navbar grid grid-cols-2 md:grid-cols-[1fr_2fr_1fr]  m-[1.5px] text-white  items-center justify-between p-4 rounded-full">
        <div className="flex items-center space-x-4 px-3 md:px-6">
          <Image
            src="/logo.svg"
            alt="DDP0 Logo"
            width={30}
            height={30}
            className=""
          />
          <Image
            src="/DDP-0.svg"
            alt="DDP-0 Logo"
            width={70}
            height={70}
            className="hidden md:block"
          />
        </div>
        <div className="hidden md:flex items-center justify-center space-x-4 px-3 md:px-6">
          <Link href={"/"} className="px-4 py-2 hover:opacity-50 ">
            Page 1
          </Link>
          <Link href={"/"} className="px-4 py-2  hover:opacity-50 ">
            Page 2
          </Link>
          <Link href={"/"} className="px-4 py-2 hover:opacity-50 ">
            Page 3
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-end space-x-4 px-3 md:px-6">
          {isAuthenticated && !isLoading ? (
            <div className="flex items-center space-x-6 justify-center">
              <Button variant="default" className="py-1" onClick={handleLogin}>
                <User2Icon />
                {user?.email || ""}
              </Button>
              <span
                className="text-red-500 font-josefin-sans font-semibold cursor-pointer hover:opacity-50"
                onClick={handleLogout}
              >
                Logout
              </span>
            </div>
          ) : (
            <Button variant="kiwi" className="py-1" onClick={handleLogin}>
              Login
            </Button>
          )}
        </div>
        <div className="flex md:hidden justify-end px-4 ">
          <Button variant="default">
            <div
              onClick={toggleMenu}
              className={`md:hidden relative w-6 h-8 flex flex-col justify-center ${
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
        className={`md:hidden absolute top-full left-4 right-4 mt-2 shadow-xl z-50 bg-black/50 border-[1.5px] border-t-gray-200 border-l-gray-300 border-r-gray-300 border-b-gray-400 backdrop-blur-md transform transition-all duration-300 ease-out rounded-4xl ${
          isMenuOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className=" p-6 rounded-4xl ">
          <div className="space-y-6 mb-6 font-josefin-sans">
            <Link
              href="#"
              className={`block text-white text-lg hover:text-gray-300 transition-all duration-200 transform ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? "100ms" : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              Page 1
            </Link>
            <Link
              href="#"
              className={`block text-white text-lg hover:text-gray-300 transition-all duration-200 transform ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? "150ms" : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              Page 2
            </Link>
            <Link
              href="#"
              className={`block text-white text-lg hover:text-gray-300 transition-all duration-200 transform ${
                isMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: isMenuOpen ? "200ms" : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              Page 3
            </Link>
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
                {user?.email || ""}
              </Button>
            ) : (
              <Button
                variant="kiwi"
                className={`py-2 w-full  transition-all duration-200 transform  ${
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
            {isLoggedIn && (
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
