"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/user/routes";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

interface User {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  profilePicture?: string;
  lastlogin?: string;
  createdAt?: string;
  image?: string;
}

interface ProfileFormData {
  fullName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: string;
  email?: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleProfilePictureChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.length) return;
    setUploading(true);
    try {
      const file = event.target.files[0];
      console.log("Uploading file:", file);
      toast.success("Profile picture uploaded!", {
        style: {
          background: document.documentElement.classList.contains("dark")
            ? "#1f2b34"
            : "#fff",
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#000",
        },
      });
    } finally {
      setUploading(false);
    }
  };

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser && Object.keys(storedUser).length > 0) {
        setUser(storedUser);
        reset({
          fullName: storedUser.fullName || "",
          phoneNumber: storedUser.phoneNumber || "",
          dateOfBirth: storedUser.dateOfBirth || "",
          address: storedUser.address || "",
          email: storedUser.email || "",
        });
      }
    }
  }, [reset]);

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Submitting profile update with data:", data);
    toast.success("Profile updated successfully!", {
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

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (authToken) {
        try {
          await api.post(
            "/logout",
            {},
            {
              headers: { Authorization: `Bearer ${authToken}` },
              withCredentials: true,
            }
          );
        } catch (err) {
          console.warn("Backend logout failed, continuing frontend logout");
        }
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
    } catch (error) {
      toast.error("Logout Failed. Please try again.", {
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

  return (
    <div className="min-h-[calc(160vh-450px)] px-4 py-22 flex flex-col items-center">
      {/* Toaster */}
      <Toaster />

      {/* Profile Picture */}
      {user && (
        <div className="flex flex-col items-center m-6">
          <Image
            src={user.image || "/images/default-avatar.png"}
            alt="Profile"
            width={140}
            height={140}
            className="rounded-full border-2 border-green-400 cursor-pointer hover:scale-105 transition-transform object-cover"
          />
          <label className="mt-3 text-sm cursor-pointer border border-gray-300 dark:border-gray-700 dark:bg-[#1f2b34] px-4 py-2 rounded-lg shadow-md hoverEffect">
            {uploading ? "Uploading..." : "Change Picture"}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Personal Info */}
      <div className="border border-gray-300 dark:border-gray-700 dark:bg-[#1f2b34] shadow-md rounded-xl w-full max-w-3xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg md:text-2xl font-bold">
            PERSONAL INFORMATION
          </h1>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-md shadow-lg text-sm md:text-base hoverEffect"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {!isEditing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm md:text-base">
            <div>
              <p className="text-gray-500 dark:text-gray-300">Full Name</p>
              <p className="font-medium">{user?.fullName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Phone</p>
              <p className="font-medium">{user?.phoneNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Date of Birth</p>
              <p className="font-medium">{user?.dateOfBirth || "N/A"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-gray-500 dark:text-gray-300">Address</p>
              <p className="font-medium">{user?.address || "N/A"}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                {...register("fullName")}
                className="w-full border border-gray-300 dark:border-gray-700 shadow-sm rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                {...register("phoneNumber")}
                className="w-full border border-gray-300 dark:border-gray-700 shadow-sm rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="w-full border border-gray-300 dark:border-gray-700 shadow-sm rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                {...register("address")}
                className="w-full border border-gray-300 dark:border-gray-700 shadow-sm rounded-md px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg shadow-md text-sm font-medium hoverEffect"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>

      {/* Logout */}
      <button
        className="mt-6 border border-gray-300 dark:border-gray-700 dark:bg-[#1f2b34] shadow-md rounded-full px-6 py-2 text-sm md:text-base font-bold hoverEffect"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
