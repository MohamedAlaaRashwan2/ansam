import type { NextConfig } from "next";
const nextConfig: NextConfig = {

  images: {
    unoptimized: true,
    domains: [
      "paleturquoise-beaver-156875.hostingersite.com",
    ],
  },
  trailingSlash: true,
  experimental: {
    optimizeCss: false, 
  },
};

export default nextConfig;
