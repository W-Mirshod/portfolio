import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const res = await fetch("/api/admin/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ new_password: newPassword })
    });
    if (res.status === 401) {
      navigate("/admin/login");
      return;
    }
    if (res.ok) {
      setSuccess("Password changed successfully");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      const data = await res.json();
      setError(data.detail || "Failed to change password");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0f1c]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-cyan-700 bg-[#181f2e]/80 backdrop-blur-2xl shadow-2xl">
        <button
          className="mb-6 px-4 py-2 bg-[#0a0f1c]/80 text-cyan-200 font-semibold rounded-lg border border-cyan-700 hover:bg-cyan-900/80 hover:text-white transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow"
          style={{backdropFilter:'blur(8px)'}}
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-cyan-300 mb-4 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            className="px-3 py-2 rounded-lg border border-cyan-400 bg-[#101624] text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="px-3 py-2 rounded-lg border border-cyan-400 bg-[#101624] text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-400 text-sm text-center">{error}</div>}
          {success && <div className="text-green-400 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="mt-2 px-3 py-2 bg-gradient-to-r from-[#00eaff] to-[#0ff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 16px #00eaffcc'}}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
