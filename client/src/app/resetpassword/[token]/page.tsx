"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../api/user/routes";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster />

      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2b34] space-y-6 mt-10">
        <form onSubmit={handleReset} className="space-y-6">
          <h2 className="text-4xl font-bold text-center text-green-600 border-b border-gray-200 pb-4 mb-4 shadow-md">
            Reset Password
          </h2>

          {/* New Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-[#1f2b34] dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-medium text-gray-700 dark:text-gray-200"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-[#1f2b34] dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full hoverEffect bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
