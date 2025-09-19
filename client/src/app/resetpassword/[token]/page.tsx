"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import api from "../../api/user/routes";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords don't match!",
        text: "Please make sure both fields match.",
        position: "top",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
      return;
    }

    try {
      const res = await api.post(`/resetpassword/${token}`, { password });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.data.message || "Password reset successful.",
        position: "top",
        timer: 1500,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      router.push("/login");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to reset password.",
        position: "top",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-screen text-2xl  flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2b34] space-y-6 mt-10">
        <form onSubmit={handleReset} className="space-y-4">
          <h2 className="text-4xl font-bold text-center text-green-600 border-b border-gray-200 pb-4 mb-4 shadow-md">
            Reset Password
          </h2>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium ">
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
            <label
              htmlFor="confirmPassword"
              className="block mb-1 font-medium "
            >
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
