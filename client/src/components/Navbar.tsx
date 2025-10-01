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
import Logout from "./Logout";
import api from "@/app/api/user/routes";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  profilePicture?: string;
  image?: string | null;
  picture?: string | null;
}

const Navbar = () => {
  const { theme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Load user from session or localStorage
  useEffect(() => {
    const mapUser = (u: Partial<User>): User => ({
      ...u,
      id: u.id ?? "",
      profilePicture: u.profilePicture || u.picture || u.image || undefined,
    });

    if (session?.user) {
      const mappedUser = mapUser(session.user);
      localStorage.setItem("user", JSON.stringify(mappedUser));
      if (session.accessToken) {
        localStorage.setItem("authToken", session.accessToken);
      }
      setUser(mappedUser);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(mapUser(JSON.parse(storedUser)));
      } else {
        setUser(null);
      }
    }

    const handleAuthChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        setUser(mapUser(JSON.parse(updatedUser)));
      } else {
        setUser(null);
      }
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, [session]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".profile-dropdown") && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/uploadprofilepicture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (response.data.success) {
        const updatedUser: User = {
          ...user,
          id: user?.id ?? "",
          profilePicture: response.data.pictureUrl,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success(response.data.message || "Profile picture updated!", {
          style: {
            background: theme === "dark" ? "#1f2b34" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
          },
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image", {
        style: {
          background: theme === "dark" ? "#1f2b34" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
        },
        position: "top-center",
      });
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="border-b bg-white dark:border-gray-600 dark:bg-[#1a252d] border-gray-200 w-full shadow-lg fixed top-0 z-50">
      <Toaster />
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
        <div className="hidden md:flex gap-6 justify-center relative">
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
            <div className="relative profile-dropdown">
              <div
                className="flex gap-2 items-center cursor-pointer group hoverEffect hover:underline"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-green-400 cursor-pointer hover:scale-105 transition-transform">
                  <Image
                    src={
                      user?.profilePicture ||
                      session?.user?.image ||
                      "/images/default-avatar.png"
                    }
                    alt="Profile"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                </div>
                <span className="font-bold text-lg">
                  {user?.name || "Profile"}
                </span>
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-white dark:bg-[#1f2b34] border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg p-4 z-50 flex flex-col items-center gap-4">
                  {/* Large Profile */}
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-400">
                    <Image
                      src={
                        user?.profilePicture ||
                        session?.user?.image ||
                        "/images/default-avatar.png"
                      }
                      alt="Profile"
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <span className="font-bold text-lg">
                    {user?.name || "Profile"}
                  </span>

                  {/* Upload */}
                  <div className="border dark:bg-[#293944] border-gray-200 dark:border-gray-700 rounded-lg shadow-lg gap-2 p-4 text-sm w-full flex flex-col items-center">
                    <span className="text-lg font-light">
                      Update Your Profile Picture
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mb-2 border dark:bg-[#1f2b34] border-gray-200 dark:border-gray-700 rounded-lg shadow-lg gap-2 p-2 text-sm w-full"
                      title="Select a profile picture"
                    />
                    <button
                      onClick={handleUpload}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hoverEffect w-full"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Change Profile"}
                    </button>
                  </div>
                  <Logout />
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="font-bold border border-green-400  rounded-full px-3 py-1 shadow-lg hover:scale-105 transition-transform"
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
            className="font-bold hover:underline flex items-center justify-center gap-2 w-full"
            onClick={() => setMenuOpen(false)}
          >
            <RxDashboard className="text-green-400" />
            Dashboard
          </Link>
          <Link
            href="/aboutproject"
            className="font-bold hover:underline flex items-center justify-center gap-2 w-full"
            onClick={() => setMenuOpen(false)}
          >
            <LuBrain className="text-green-400" />
            About Project
          </Link>
          <Dark />
          {user || session?.user ? (
            <div className="relative profile-dropdown gap-2 flex flex-col items-center w-full">
              <div
                className="flex gap-2 items-center cursor-pointer group hoverEffect hover:underline"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-green-400 cursor-pointer hover:scale-105 transition-transform">
                  <Image
                    src={
                      user?.profilePicture ||
                      session?.user?.image ||
                      "/images/default-avatar.png"
                    }
                    alt="Profile"
                    width={36}
                    height={36}
                    className="object-cover w-full h-full"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                </div>
                <span className="font-bold text-lg">
                  {user?.name || "Profile"}
                </span>
              </div>

              {dropdownOpen && (
                <div className="flex flex-col  w-full items-center gap-2 mt-2">
                  <div className="border dark:bg-[#293944] border-gray-200 dark:border-gray-700 rounded-lg shadow-lg gap-2 p-4 text-sm w-full flex flex-col items-center">
                    <span className="text-lg font-light">
                      Update Your Profile Picture
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="mb-2 border dark:bg-[#1f2b34] border-gray-200 dark:border-gray-700 rounded-lg shadow-lg gap-2 p-2 text-sm w-full"
                      title="Select a profile picture"
                      placeholder="Choose image"
                    />
                    <button
                      onClick={handleUpload}
                      className="px-4 py-1 bg-green-500 text-white rounded-lg shadow-lg hover:scale-105 transition w-full"
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Change Profile"}
                    </button>
                  </div>
                  <Logout />
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="font-bold border border-green-400 rounded-full px-3 py-1 shadow-lg text-center w-full"
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
