import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function formatTime(iso) {
  const date = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return date.toLocaleString();
}

export default function RequestLogs() {
  const [logs, setLogs] = useState([]);
  const [ipFilter, setIpFilter] = useState("");
  const [uaFilter, setUaFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 50;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/request-logs")
      .then(res => {
        if (res.status === 401) {
          navigate("/admin/login");
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setLogs(data);
      });
  }, [navigate]);

  const filtered = logs.filter(log =>
    (!ipFilter || (log.ip && log.ip.includes(ipFilter))) &&
    (!uaFilter || (log.user_agent && log.user_agent.toLowerCase().includes(uaFilter.toLowerCase())))
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-blue-100 p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/admin")}
          className="mb-6 px-4 py-2 rounded bg-gray-800 border border-gray-700 text-blue-200 hover:bg-gray-700 transition"
        >Back to Dashboard</button>
        <h1 className="text-3xl font-bold mb-8 text-blue-300 tracking-tight">Request Logs</h1>
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            placeholder="Filter by IP"
            value={ipFilter}
            onChange={e => { setIpFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-blue-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            placeholder="Filter by User Agent"
            value={uaFilter}
            onChange={e => { setUaFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-blue-100 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="ml-auto text-xs text-blue-300 opacity-70 mt-2">Showing {filtered.length} of {logs.length}</span>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-800 bg-gray-900/80">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-blue-300">
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">IP</th>
                <th className="p-3 text-left">User Agent</th>
                <th className="p-3 text-left">Method</th>
                <th className="p-3 text-left">URL</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 && (
                <tr><td colSpan={5} className="text-center text-blue-400 py-8">No logs found</td></tr>
              )}
              {paged.map((log, i) => (
                <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/60 transition">
                  <td className="p-3 whitespace-nowrap text-blue-200 font-mono">{formatTime(log.timestamp)}</td>
                  <td className="p-3 whitespace-nowrap text-blue-300 font-semibold">{log.ip}</td>
                  <td className="p-3 max-w-xs truncate text-blue-100" title={log.user_agent}>{log.user_agent}</td>
                  <td className="p-3 text-blue-400 font-bold">{log.method}</td>
                  <td className="p-3 max-w-xs truncate text-blue-200" title={log.url}>{log.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => goToPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-800 border border-gray-700 text-blue-200 disabled:opacity-40"
          >Prev</button>
          <span className="mx-2 text-blue-300">Page {page} / {totalPages}</span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-gray-800 border border-gray-700 text-blue-200 disabled:opacity-40"
          >Next</button>
        </div>
      </div>
    </div>
  );
}
