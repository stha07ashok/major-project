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
    <div className="min-h-[calc(160vh-450px)] px-10 py-22 mx-12 flex items-center justify-center sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-2xl shadow-lg p-8 border border-gray-200"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl font-bold text-center mb-6"
        >
          Register
        </motion.h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              {...register("firstName", { required: "Email is required" })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
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
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <motion.input
                type={showPassword ? "text" : "password"}
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                {...register("lastName", { required: "Password is required" })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center "
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

          <div className="flex gap-2 text-sm">
            <span>Have an account?</span>
            <a href="/register" className="hover:underline">
              Login
            </a>
          </div>

          {/* register button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Register
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-2 my-2">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="text-sm ">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Google register */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 w-full rounded-lg border border-gray-300 px-4 py-2  font-medium shadow-sm  transition"
            onClick={() => console.log("Login with Google")}
          >
            <FaGoogle className="text-red-500" /> Register with Google
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
