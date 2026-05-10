"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", data);
      if (res.data) {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4">
      <div className="bg-[#111122] border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome Back</h1>
        <p className="text-slate-400 mb-8 text-center text-sm uppercase tracking-widest font-bold">Enterprise Intelligence Suite</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="email"
                required
                className="w-full bg-[#ebf2ff] border-none rounded-2xl py-4 pl-12 pr-4 text-[#0a0a14] font-medium outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="Enter your email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="password"
                required
                className="w-full bg-[#ebf2ff] border-none rounded-2xl py-4 pl-12 pr-4 text-[#0a0a14] font-medium outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="••••••••"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#1d63ff] hover:bg-[#1a56db] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 group uppercase tracking-widest"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                LOGIN <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Don't have an account? <a href="/auth/register" className="text-indigo-400 hover:underline font-bold">Register</a>
        </p>
      </div>
    </div>
  );
}