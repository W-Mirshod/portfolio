import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  useEffect(() => {
    document.title = "Welcome Mirshod";
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.translate(w / 2, h / 2);
      for (let i = 0; i < 80; i++) {
        let angle = (i / 80) * Math.PI * 2 + t * 0.2;
        let radius = 220 + Math.sin(t + i) * 40;
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius * 0.5;
        ctx.beginPath();
        ctx.arc(x, y, 2.5 + Math.sin(t + i) * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${120 + Math.sin(angle + t) * 80},${180 + Math.cos(angle + t) * 60},255,0.7)`;
        ctx.shadowColor = '#00eaff';
        ctx.shadowBlur = 12;
        ctx.fill();
      }
      ctx.restore();
      t += 0.012;
      requestAnimationFrame(draw);
    }
    draw();
    function handleResize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen h-screen overflow-hidden bg-[#0a0f1c]">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" style={{pointerEvents:'none'}} />
      <div className="relative z-10 w-full max-w-xl p-10 rounded-3xl border border-cyan-700 bg-[#181f2e]/70 backdrop-blur-2xl flex flex-col items-center justify-center shadow-2xl" style={{boxShadow:'0 8px 40px 0 #00eaff44, 0 1.5px 8px 0 #00eaff22', height: '90vh', maxHeight: 600}}>
      <button
        className="absolute top-6 left-6 z-20 px-4 py-2 bg-[#0a0f1c]/80 text-cyan-200 font-semibold rounded-lg border border-cyan-700 hover:bg-cyan-900/80 hover:text-white transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow"
        style={{backdropFilter:'blur(8px)'}}
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
        <h1 className="text-3xl font-extrabold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400 tracking-wider select-none" style={{letterSpacing:'0.08em',fontFamily:'Orbitron, sans-serif',textShadow:'0 2px 24px #0ff2,0 1px 0 #222'}}>
          Welcome Mirshod
        </h1>
        <p className="text-cyan-200 text-center mb-6 text-base font-medium select-none" style={{textShadow:'0 1px 8px #2228'}}>what's up today, bro?</p>
        <div className="grid grid-cols-2 gap-4 w-full mt-2">
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/request-logs")}
          >
            Request Logs
          </button>
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/ai-agent")}
          >
            AI Agent
          </button>
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/cloud-server")}
          >
            Cloud Server
          </button>
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/user-management")}
          >
            User Management
          </button>
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/analytics")}
          >
            Analytics
          </button>
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/security")}
          >
            Security Center
          </button>
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/health-check")}
          >
            Health Check
          </button>
          <button
            className="px-3 py-2 bg-gradient-to-r from-[#0ff] to-[#00eaff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
            style={{boxShadow:'0 0 12px #00eaff88'}} onClick={() => navigate("/admin/career-center")}
          >
            Career Center
          </button>
        </div>
        <button
          className="mt-8 w-full px-3 py-2 bg-gradient-to-r from-[#00eaff] to-[#0ff] text-[#101624] font-semibold rounded-xl border border-cyan-400 hover:from-cyan-400 hover:to-blue-400 hover:border-blue-400 transition-all duration-150 text-sm tracking-wider focus:outline-none focus:ring-2 focus:ring-cyan-400/60 shadow-lg backdrop-blur-md"
          style={{boxShadow:'0 0 16px #00eaffcc'}} onClick={() => navigate("/admin/settings")}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
