"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function RegisterPage() {
  const router = useRouter();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", data);
      router.push("/auth/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4">
      <div className="bg-[#111122] border border-slate-800 p-8 rounded-3xl w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-2">Create an account</h1>
        <p className="text-slate-400 mb-6">Enter your details to create your account</p>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-xl mb-6 text-sm">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
            <input 
              className="w-full bg-[#0a0a14] border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none" 
              type="text" 
              placeholder="Your Name"
              onChange={(e) => setData({...data, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input 
              className="w-full bg-[#0a0a14] border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none" 
              type="email" 
              placeholder="email@example.com"
              onChange={(e) => setData({...data, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input 
              className="w-full bg-[#0a0a14] border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-indigo-500 outline-none" 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setData({...data, password: e.target.value})}
              required
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-slate-500 mt-6 text-sm">
          Already have an account? <a href="/auth/login" className="text-indigo-400 hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}