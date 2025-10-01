import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com", "res.cloudinary.com"], // allow Google profile images
  },
};

export default nextConfig;
