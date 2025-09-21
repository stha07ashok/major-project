"use client";
import React, { useState, useEffect } from "react";
import { IoCameraOutline } from "react-icons/io5";
import Dark from "./DarkMode";
import { RxDashboard } from "react-icons/rx";
import { LuBrain } from "react-icons/lu";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  profilePicture?: string | null;
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { data: session } = useSession();
  console.log("Navbar session:", session);

  useEffect(() => {
    if (session?.user) {
      localStorage.setItem("user", JSON.stringify(session.user));
      localStorage.setItem("authToken", session.accessToken!);
      setUser(session.user);
    }

    // update if auth changes
    const handleAuthChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(JSON.parse(updatedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, [session]);

  return (
    <div className="border-b bg-white dark:border-gray-600 dark:bg-[#1a252d] border-gray-200 w-full shadow-lg fixed top-0 z-50">
      <div className="flex justify-between items-center px-3 md:px-10 py-3 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex gap-3 cursor-pointer">
          <div className="h-9 my-1">
            <IoCameraOutline className="h-9 w-9 text-green-200 border rounded-lg p-1 bg-blue-700" />
          </div>
          <div className="h-9">
            <div className="font-bold text-sm md:text-base">
              TrafficWatch AI
            </div>
            <div className="text-xs md:text-sm font-light">
              Smart Traffic Monitoring System
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className="font-bold hover:underline flex gap-1 items-center group hover:scale-105 transition-transform"
          >
            <RxDashboard className="text-green-400" />
            Dashboard
          </Link>
          <Link
            href="/aboutproject"
            className="font-bold hover:underline flex gap-1 items-center group hover:scale-105 transition-transform"
          >
            <LuBrain className="text-green-400" />
            About Project
          </Link>
          <Dark />

          {user || session?.user ? (
            <Link href="/profile">
              <Image
                src={
                  user?.profilePicture ||
                  session?.user?.image ||
                  "/images/default-avatar.png"
                }
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full border border-green-400 cursor-pointer hover:scale-105 transition-transform"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="font-bold border border-green-400 rounded-full px-3 py-1 shadow-lg hover:scale-105 transition-transform"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            {menuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#1a252d] border-t border-gray-200 dark:border-gray-600 px-6 py-4 flex flex-col items-center gap-4">
          <Link
            href="/"
            className="font-bold hover:underline flex gap-2 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <RxDashboard className="text-green-400" />
            Dashboard
          </Link>
          <Link
            href="/aboutproject"
            className="font-bold hover:underline flex gap-2 items-center"
            onClick={() => setMenuOpen(false)}
          >
            <LuBrain className="text-green-400" />
            About Project
          </Link>
          <Dark />
          {user ? (
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2"
            >
              <Image
                src={user.profilePicture || "/default-avatar.png"}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-lg p-1 border border-green-400"
              />
              <span className="font-bold">{user.name || "Profile"}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="font-bold border border-green-400 rounded-full px-3 py-1 shadow-lg text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
