import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 👈 ده المفتاح اللي يخلّي الموقع يتحول لملفات HTML ثابتة
  images: {
    unoptimized: true, // ضروري لو بتستخدم <Image /> من Next.js
  },
  trailingSlash: true, // مفيد لتوليد ملفات مستقرة في الرفع
};

module.exports = nextConfig;

export default nextConfig;
