"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../api/user/routes";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const ResetPasswordPage = () => {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const getToastStyle = () => ({
    background: document.documentElement.classList.contains("dark")
      ? "#1f2b34"
      : "#fff",
    color: document.documentElement.classList.contains("dark")
      ? "#fff"
      : "#000",
  });

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords don't match! Please ensure both fields match.", {
        style: getToastStyle(),
        position: "top-center",
        duration: 3000,
      });
      return;
    }

    try {
      const res = await api.post(`/resetpassword/${token}`, { password });

      toast.success(res.data.message || "Password reset successful!", {
        style: getToastStyle(),
        position: "top-center",
        duration: 3000,
      });

      router.push("/login");
    } catch (error) {
      const err = error as ApiError;
      toast.error(
        err.response?.data?.message || "Password reset failed. Try again.",
        {
          style: getToastStyle(),
          position: "top-center",
          duration: 3000,
        }
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-2xl">
      {/* Toaster for notifications */}
      <Toaster />

      <div className="max-w-md w-full p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2b34] space-y-6 mt-10">
        <form onSubmit={handleReset} className="space-y-4">
          <h2 className="text-4xl font-bold text-center text-green-600 border-b border-gray-200 pb-4 mb-4 shadow-md">
            Reset Password
          </h2>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
