"use client";

import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import api from "../api/user/routes";
import Swal from "sweetalert2";

type FormData = {
  email: string;
  password: string;
};

// Proper API error type
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [emailForVerification, setEmailForVerification] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Register form submit
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await api.post("/register", data);
      setEmailForVerification(data.email);
      setShowVerificationInput(true);

      Swal.fire({
        icon: "info",
        title: "Verify Email",
        text: "A 6-digit code has been sent to your email. Please verify.",
        timer: 2000,
        timerProgressBar: true,
        position: "top",
        showConfirmButton: false,
      });
    } catch (error) {
      const err = error as ApiError;
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong. Try again.",
        timer: 2000,
        timerProgressBar: true,
        position: "top",
        showConfirmButton: false,
      });
    }
  };

  // Verification submit
  const handleVerificationSubmit = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Code",
        text: "Please enter a 6-digit verification code.",
        timer: 2000,
        timerProgressBar: true,
        position: "top",
        showConfirmButton: false,
      });
      return;
    }

    try {
      const res: { data: { success: boolean; message: string } } =
        await api.post("/verify-email", {
          email: emailForVerification,
          code: verificationCode,
        });

      Swal.fire({
        icon: "success",
        title: res.data.message || "User Verified Successfully!",
        timer: 1500,
        timerProgressBar: true,
        position: "top",
        showConfirmButton: false,
      });

      router.push("/login");
    } catch (error) {
      const err = error as ApiError;
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: err.response?.data?.message || "Invalid verification code.",
        timer: 2000,
        timerProgressBar: true,
        position: "top",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-[calc(160vh-450px)] px-4 py-22 flex items-center justify-center sm:px-6 lg:px-8">
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
          Register
        </motion.h2>

        {!showVerificationInput ? (
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
                  {...register("password", {
                    required: "Password is required",
                  })}
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

            <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-2 text-sm sm:text-base">
              <span className="text-gray-700 dark:text-gray-200">
                Have an account?
              </span>
              <a
                href="/login"
                className="hover:underline text-indigo-600 dark:text-indigo-400"
              >
                Login
              </a>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2 sm:py-3 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
            >
              Register
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
              <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                or
              </span>
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Google Register */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 sm:py-3 font-medium shadow-sm transition bg-white dark:bg-[#28343d] text-gray-900 dark:text-gray-100"
              onClick={() => console.log("Register with Google")}
            >
              <FaGoogle className="text-red-500" /> Register with Google
            </motion.button>
          </form>
        ) : (
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-center text-green-600">
              Verify Email
            </h2>
            <input
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-center"
              placeholder="Enter 6-digit code"
            />
            <button
              onClick={handleVerificationSubmit}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 px-4"
            >
              Verify and Complete Registration
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RegisterPage;
