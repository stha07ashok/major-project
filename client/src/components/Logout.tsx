"use client";

import api from "@/app/api/user/routes";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

const Logout = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleLogout = async () => {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      setLoading(true);
      try {
        await api.post(
          "/logout",
          {},
          {
            headers: { Authorization: `Bearer ${authToken}` },
            withCredentials: true,
          }
        );
      } catch {
        console.warn("Backend logout failed, continuing frontend logout");
      }
      setLoading(false);
    }

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.dispatchEvent(new CustomEvent("authChange", { detail: false }));

    await signOut({ redirect: false });
    router.push("/");

    toast.success("Logout Successful!", {
      style: {
        background: document.documentElement.classList.contains("dark")
          ? "#1f2b34"
          : "#fff",
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
      },
      position: "top-center",
    });
  };
  return (
    <div>
      <Toaster />{" "}
      <button
        className="mt-6 border border-gray-300 dark:border-gray-700 dark:bg-[#1f2b34] shadow-md rounded-full px-6 py-2 text-sm md:text-base font-bold hoverEffect"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
