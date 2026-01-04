import ProtectedRoute from "@/app/components/ProtectedRoute";
import Dashboard from "@/app/admin/Dashboard";
import { Suspense } from "react";

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    </Suspense>
  );
}
