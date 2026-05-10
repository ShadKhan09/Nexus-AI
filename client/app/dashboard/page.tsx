"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Bot, ImageIcon, BarChart3, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        router.push("/auth/login");
      }
    };
    fetchUser();
  }, [router]);

  if (!user) return null;

  const cards = [
    { name: "Chat AI", icon: Bot, path: "/dashboard/chat", desc: "Interact with advanced language models", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { name: "Image Gen", icon: ImageIcon, path: "/dashboard/image", desc: "Create stunning visuals from text", color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics", desc: "Monitor your usage and stats", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="bg-card p-10 rounded-[2rem] border border-border shadow-xl shadow-indigo-500/5">
        <h1 className="text-5xl font-black mb-3 tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground text-lg font-medium">
          Welcome back, <span className="text-indigo-600 font-bold">{user.name}</span>! Ready for some AI magic?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div 
            key={card.name}
            onClick={() => router.push(card.path)}
            className="bg-card p-8 rounded-3xl border border-border hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col"
          >
            <div className={`w-14 h-14 ${card.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <card.icon className={`w-8 h-8 ${card.color}`} />
            </div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">{card.name} ✨</h3>
            <p className="text-muted-foreground text-sm font-medium mb-6 leading-relaxed">{card.desc}</p>
            <div className="mt-auto flex items-center text-indigo-600 font-bold text-xs uppercase tracking-widest gap-2">
              Launch Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}