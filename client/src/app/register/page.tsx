"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

type FormData = {
  firstName: string;
  lastName: string;
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="min-h-[calc(160vh-450px)] px-4 py-22 flex items-center justify-center sm:px-6 lg:px-8 ">
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

        <form onSubmit={onSubmit} className="flex flex-col gap-5 sm:gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              {...register("firstName", { required: "Email is required" })}
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 sm:py-3 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none bg-white dark:bg-[#28343d] text-gray-900 dark:text-gray-100"
              placeholder="Enter your email"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.firstName.message}
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
                {...register("lastName", { required: "Password is required" })}
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
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lastName.message}
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

          {/* Register button */}
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

          {/* Google register */}
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
      </motion.div>
    </div>
  );
};

export default RegisterPage;
