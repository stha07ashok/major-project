import React from "react";
import Image from "next/image";
import Link from "next/link";
import Dark from "./darkMode";

const Navbar = () => {
  return (
    <header className=" shadow-md sticky top-0 z-50 border-b border-gray-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/traffic_logo.png"
            alt="Traffic Logo"
            width={40}
            height={40}
            priority
            className="object-fit"
          />
        </Link>

        <div className="space-x-6 hidden md:flex">asdfjass</div>

        {/* Optional Button */}
        <div className="flex">
          <div className="py-2">
            <Dark />
          </div>
          <Link
            href="/login"
            className="border-1 border-gray-500 shadow-lg px-3 py-2 rounded-md"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
