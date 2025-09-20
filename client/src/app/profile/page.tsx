"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "../api/user/routes";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (storedUser && Object.keys(storedUser).length > 0) {
      reset({
        fullName: storedUser.fullName || "",
        phoneNumber: storedUser.phoneNumber || "",
        dateOfBirth: storedUser.dateOfBirth || "",
        address: storedUser.address || "",
        email: storedUser.email || "",
      });
    }
  }, [reset]);

  const onSubmit = async (data: any) => {
    try {
      await api.put("/update-profile", data, { withCredentials: true });

      localStorage.setItem("user", JSON.stringify(data)); // update localStorage

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
        position: "top",
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Update failed", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong. Try again.",
        timer: 1500,
        showConfirmButton: false,
        position: "top",
      });
    }
  };

  console.log("Stored User:", storedUser.lastlogin);

  const handleLogout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      router.push("/");

      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      window.dispatchEvent(new CustomEvent("authChange", { detail: false }));

      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        text: "You have successfully logged out.",
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Logout failed", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong, please try again.",
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-[calc(160vh-450px)] px-4 py-22  flex flex-col items-center">
      <div className=" shadow-md rounded-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">PERSONAL INFORMATION</h1>
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="border px-3 py-1 rounded-md shadow-lg flex items-center gap-1 hoverEffect"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {!isEditing ? (
          // 📌 Display mode
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 dark:text-gray-300">Full Name</p>
              <p className="font-medium">{storedUser.fullName}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Email</p>
              <p className="font-medium">{storedUser.email}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Phone</p>
              <p className="font-medium">{storedUser.phoneNumber}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-300">Date of Birth</p>
              <p className="font-medium">{storedUser.dateOfBirth}</p>
            </div>{" "}
            <div>
              <p className="text-gray-500 dark:text-gray-300">Address</p>
              <p className="font-medium">{storedUser.address}</p>
            </div>
          </div>
        ) : (
          // ✍️ Edit mode form
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                {...register("fullName")}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                {...register("phoneNumber")}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                {...register("address")}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="border px-3 py-1 rounded-md shadow-lg flex items-center gap-1 hoverEffect"
            >
              Save
            </button>
          </form>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-10">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Manage your account settings and set e-mail preferences.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 dark:text-gray-300">Last Login</p>
            <p className="font-medium">
              {storedUser.lastlogin
                ? new Date(storedUser.lastlogin).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-300">Created At</p>
            <p className="font-medium">
              {storedUser.createdAt
                ? new Date(storedUser.createdAt).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <button
        className="mt-6 border border-gray-300 shadow-lg rounded-full px-4 py-2 font-bold hoverEffect"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
