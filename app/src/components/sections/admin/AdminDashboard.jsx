import { useEffect } from "react";

export default function AdminDashboard() {
  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, admin.</p>
    </div>
  );
}
