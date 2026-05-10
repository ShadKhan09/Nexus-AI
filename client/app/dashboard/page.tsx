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
    // Mobile par p-4, badi screen par p-8
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Welcome Card - Responsive Padding & Font */}
      <div className="bg-card p-6 md:p-10 rounded-2xl md:rounded-[2rem] border border-border shadow-xl shadow-indigo-500/5">
        <h1 className="text-3xl md:text-5xl font-black mb-2 md:mb-3 tracking-tighter">Dashboard</h1>
        <p className="text-muted-foreground text-sm md:text-lg font-medium leading-tight">
          Welcome back, <span className="text-indigo-600 font-bold">{user.name}</span>! <br className="md:hidden" /> Ready for some AI magic?
        </p>
      </div>

      {/* Grid - Mobile par 1 column, Medium (md) screen se 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card) => (
          <div 
            key={card.name}
            onClick={() => router.push(card.path)}
            className="bg-card p-6 md:p-8 rounded-2xl md:rounded-3xl border border-border hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all cursor-pointer group flex flex-col"
          >
            {/* Icon - Mobile par thoda chota */}
            <div className={`w-12 h-12 md:w-14 md:h-14 ${card.bg} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
              <card.icon className={`w-6 h-6 md:w-8 md:h-8 ${card.color}`} />
            </div>

            <h3 className="text-xl md:text-2xl font-black mb-2 tracking-tight">{card.name} ✨</h3>
            <p className="text-muted-foreground text-xs md:text-sm font-medium mb-6 leading-relaxed">
              {card.desc}
            </p>

            <div className="mt-auto flex items-center text-indigo-600 font-bold text-[10px] md:text-xs uppercase tracking-widest gap-2">
              Launch Tool <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}