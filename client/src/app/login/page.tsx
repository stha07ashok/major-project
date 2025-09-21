"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "../api/user/routes";
import { signIn, useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const LoginPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Handle NextAuth session (Google login)
  useEffect(() => {
    if (session?.accessToken) {
      localStorage.setItem("authToken", session.accessToken);
      localStorage.setItem("user", JSON.stringify(session.user));
      window.dispatchEvent(new CustomEvent("authChange", { detail: true }));

      toast.success("Login Successful!", {
        style: {
          background: document.documentElement.classList.contains("dark")
            ? "#1f2b34"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        },
        position: "top-center",
        duration: 3000,
      });

      router.push("/");
    }
  }, [session, router]);

  // Email + password login
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await api.post("/login", data);

      localStorage.setItem("authToken", res.data.authToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new CustomEvent("authChange", { detail: true }));

      toast.success("Login Successful!", {
        style: {
          background: document.documentElement.classList.contains("dark")
            ? "#1f2b34"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        },
        position: "top-center",
        duration: 3000,
      });

      router.push("/");
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.response?.data?.message || "Login Failed", {
        style: {
          background: document.documentElement.classList.contains("dark")
            ? "#1f2b34"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        },
        position: "top-center",
        duration: 3000,
      });
    }
  };

  // Forgot password
  const handleForgotPassword = async () => {
    const email = prompt("Enter your email to reset password:");
    if (email) {
      try {
        const res = await api.post("/forgetpassword", { email });

        toast.success(res.data.message || "Reset link sent!", {
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
      } catch (error) {
        const err = error as ApiError;

        toast.error(
          err.response?.data?.message || "Failed to send reset link",
          {
            style: {
              background: document.documentElement.classList.contains("dark")
                ? "#1f2b34"
                : "#fff",
              color: document.documentElement.classList.contains("dark")
                ? "#fff"
                : "#000",
            },
            position: "top-center",
            duration: 3000,
          }
        );
      }
    }
  };

  // Google login
  const handleLoginWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await signIn("google");
  };

  return (
    <div className="min-h-[calc(160vh-450px)] px-4 py-22 flex items-center justify-center sm:px-6 lg:px-8">
      {/* Toaster */}
      <Toaster />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2b34]"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100"
        >
          Login
        </motion.h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 sm:gap-6"
        >
          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              {...register("email", { required: "Email is required" })}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 sm:py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-[#28343d] text-gray-900 dark:text-gray-100"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                {...register("password", { required: "Password is required" })}
                className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 sm:py-3 pr-10 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-[#28343d] text-gray-900 dark:text-gray-100"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-700 dark:text-gray-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-base gap-2 sm:gap-0">
            <Link
              href="/register"
              className="hover:underline text-indigo-600 dark:text-indigo-400"
            >
              Create new account
            </Link>
            <p
              onClick={handleForgotPassword}
              className="hover:underline text-indigo-600 dark:text-indigo-400 cursor-pointer"
            >
              Forgot password?
            </p>
          </div>

          {/* Login button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 sm:py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Login
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-2">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              or
            </span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* Google login */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 sm:py-3 font-medium shadow-sm transition bg-white dark:bg-[#28343d] text-gray-900 dark:text-gray-100 hoverEffect"
            onClick={handleLoginWithGoogle}
          >
            <FaGoogle className="text-red-500" /> Login with Google
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
