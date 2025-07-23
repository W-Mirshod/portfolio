import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-900/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 flex flex-col gap-5 border border-gray-700">
        <h2 className="text-3xl font-bold text-blue-400 text-center mb-2 tracking-tight">Admin Login</h2>
        <div className="flex flex-col gap-2">
          <label className="text-blue-300 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-blue-100 placeholder:text-gray-400"
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-blue-300 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-blue-100 placeholder:text-gray-400"
          />
        </div>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold w-full py-2 rounded-lg transition">Login</button>
        {error && <div className="text-red-400 mt-2 text-center">{error}</div>}
        <Link to="/" className="text-blue-400 hover:underline text-center mt-4">Back to main page</Link>
      </form>
    </div>
  );
}
