"use client";
import React from "react";
import { useRouter } from "next/navigation";
import api from "../api/user/routes";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      router.push("/");

      localStorage.removeItem("authToken"); // Clear token
      localStorage.removeItem("user");

      // Dispatch a custom event when login is successful
      window.dispatchEvent(new CustomEvent("authChange", { detail: false }));

      // Show success alert
      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        text: "You have successfully logged out.",
        position: "top", // Position the alert at the top
        showConfirmButton: false, // Hide the "OK" button
        timer: 1000, // Auto close after 2 seconds
        timerProgressBar: true, // Show progress bar
        customClass: {
          popup: "sm:w-80", // Custom width to make alert smaller
        },
      });
    } catch (error) {
      console.error("Logout failed", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong, please try again.",
        position: "top", // Position the alert at the top-center
        showConfirmButton: false, // Hide the "OK" button
        timer: 1000, // Show the alert for 3 seconds
        timerProgressBar: true, // Show progress bar
        customClass: {
          popup: "sm:w-80", // Custom width for smaller error alert
        },
      });
    }
  };
  return (
    <div className="min-h-[calc(160vh-450px)] px-4 py-22">
      <div className="flex flex-col items-center justify-center mt-20 gap-6">
        <button
          className="border border-gray-300 shadow-lg rounded-full px-4 py-2 hoverEffect font-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
