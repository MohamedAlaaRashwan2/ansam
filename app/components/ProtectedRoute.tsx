"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      router.push("/login");
    } else {
      setAllowed(true);
    }
  }, [router]);

  if (!allowed) return <div>Loading...</div>;

  return <>{children}</>;
}
