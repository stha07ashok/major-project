"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface User {
  profilePicture?: string;
  image?: string | null;
}

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setUser({
        profilePicture: session.user.image || undefined,
        image: session.user.image || undefined,
      });
    } else {
      setUser({ image: "/images/default-avatar.png" });
    }
  }, [session]);

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

  return (
    <div className="flex flex-col items-center m-6 shadow-lg gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
      <Image
        src={user?.image || "/images/default-avatar.png"}
        alt="Profile"
        width={100}
        height={100}
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
  );
};

export default Profile;
