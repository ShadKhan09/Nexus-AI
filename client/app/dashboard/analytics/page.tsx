"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { MessageSquare, ImageIcon, TrendingUp, Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/analytics/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#0a0a14]">
      <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
    </div>
  );

  const dataCards = [
    { label: "Total Chats", value: stats?.totalMessages || 0, icon: MessageSquare, color: "text-blue-500" },
    { label: "Images Generated", value: stats?.totalImages || 0, icon: ImageIcon, color: "text-pink-500" },
    { label: "System Health", value: "99.9%", icon: TrendingUp, color: "text-green-500" },
  ];

  return (
    <div className="p-6 md:p-10 bg-[#0a0a14] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-10">Platform Analytics</h1>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {dataCards.map((card, i) => (
          <div key={i} className="bg-[#16162a] border border-slate-800 p-6 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-8 h-8 ${card.color}`} />
              <span className="text-xs font-bold text-slate-500 uppercase">Real-time</span>
            </div>
            <p className="text-slate-400 text-sm font-medium">{card.label}</p>
            <h2 className="text-4xl font-bold mt-1">{card.value}</h2>
          </div>
        ))}
      </div>

      {}
      <div className="bg-[#16162a] border border-slate-800 p-8 rounded-3xl shadow-2xl">
        <h3 className="text-xl font-bold mb-6">Usage Overview</h3>
        
        {}
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats?.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e30" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1e1e30", border: "none", borderRadius: "12px", color: "#fff" }}
                cursor={{ fill: '#1e1e30' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}