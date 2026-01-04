"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("username");
    router.push("/login");
  };

  return <button className="bg-[#f0b100] cursor-pointer hover:bg-[#f0b100]/80 transition-colors duration-300 ease-in-out text-white px-4 py-2 rounded" onClick={logout}>Logout</button>;
}
