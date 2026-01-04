// app/components/Header.tsx
"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "./AdminHeader";   // الهيدر الخاص بالـ Admin
import DefaultHeader from "./DefaultHeader"; // الهيدر العادي

export default function Header() {
  const pathname = usePathname();

  // لو الصفحة /admin، اعرض الهيدر الخاص بالـ Admin
  if (pathname.startsWith("/admin")) {
    return <AdminHeader />;
  }

  // أي صفحة تانية استخدم الهيدر العادي
  return <DefaultHeader />;
}
