"use client";

import LogoutButton from "@/app/components/LogoutButton";

export default function Dashboard() {
  return (
    <div className="container">
        <div className="flex justify-between items-start h-[calc(100vh-80px)] py-5">
            <LogoutButton />
            <h1 className="text-2xl font-bold">Welcome Admin {localStorage.getItem("username")} </h1>
        </div>
    </div>
  );
}
