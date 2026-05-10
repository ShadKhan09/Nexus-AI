"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Bot, User, Loader2 } from "lucide-react";
import api from "@/lib/axios";

export default function ChatPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [userName, setUserName] = useState("User");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const userRes = await api.get("/auth/me");
        setUserName(userRes.data.name);
        const chatRes = await api.get("/chat/history");
        setMessages(Array.isArray(chatRes.data) ? chatRes.data : []);
      } catch (err) {
        router.push("/auth/login");
      } finally {
        setIsFetching(false);
      }
    };
    initChat();
  }, [router]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const onSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");
    setLoading(true);
    try {
      const res = await api.post("/chat/send", { message: currentInput });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Service unavailable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a14] text-white overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#0a0a14]">
        {isFetching ? (
          <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-indigo-500" /></div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-20">
            <Bot className="w-16 h-16 mb-4" />
            <p className="text-xl font-medium">How can I help {userName} today?</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 pb-10">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-4 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${m.role === "user" ? "bg-indigo-600" : "bg-[#1e1e30] border border-slate-700"}`}>
                    {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-indigo-400" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[15px] ${m.role === "user" ? "bg-indigo-600 rounded-tr-none" : "bg-[#16162a] border border-slate-800 rounded-tl-none"}`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        )}
      </div>
      <div className="p-4 md:p-8 bg-[#0a0a14] border-t border-slate-800/30">
        <div className="max-w-4xl mx-auto relative">
          <input className="w-full bg-[#111122] border border-slate-800 rounded-2xl py-4 pl-6 pr-16 outline-none" placeholder="Ask anything..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onSend()} />
          <button onClick={onSend} disabled={loading || !input.trim()} className="absolute right-2 top-2 bottom-2 px-5 bg-indigo-600 rounded-xl">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}