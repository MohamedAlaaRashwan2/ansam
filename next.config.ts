import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true, 
        domains: [
      "paleturquoise-beaver-156875.hostingersite.com", // اسم الدومين اللي فيه الصور
    ],
  },
  trailingSlash: true, 
};

export default nextConfig;
