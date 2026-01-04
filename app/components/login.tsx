"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const users = [
    { username: "mustafa", password: "1234" },
    { username: "rashwan", password: "1222" },
    { username: "mohamed", password: "4321" },
  ];

  const handleLogin = () => {
    if (users.some(u => u.username === username && u.password === password)) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("username", username);

      router.push("/admin");
    } else {
      alert("اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="container">
    <main className="flex overflow-hidden mt-30 mb-30 border border-[#dbdbdb] bg-[#faf9f7] rounded-lg border-[5px] justify-center items-center">
    <div className="flex py-10 px-12 flex-col  flex-1 items-center justify-center gap-4">
      <div className="flex flex-col gap-1 text-center w-full">
      <h2 className="text-2xl font-bold">Login to your Account</h2>
      <p className="text-sm text-gray-600">Enter your credentials to access your account</p>
      </div>
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-[#f0b100] cursor-pointer hover:bg-[#f0b100]/80 transition-colors duration-300 ease-in-out text-white px-4 py-2 rounded" onClick={handleLogin}>Login</button>
    </div>
    <div className=" flex-1 md:block hidden">
      <img className="  max-w-full max-h-full object-cover" src="/about3.jpg" alt="" />
    </div>
    </main>
    </div>
  );
}
