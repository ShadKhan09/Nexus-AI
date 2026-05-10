"use client";
import { useState, useEffect } from "react";
import { ImageIcon, Loader2, Sparkles, Download } from "lucide-react";
import api from "@/lib/axios";

export default function ImageGenPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

 
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await api.get("/image/gallery");
        setImages(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Gallery load error:", err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchGallery();
  }, []);

 
  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    try {
      const res = await api.post("/image/generate", { prompt });
      
      const newImageData = {
        url: res.data.url,
        prompt: prompt,
        timestamp: new Date(),
      };
      setImages((prev) => [newImageData, ...prev]);
      setPrompt(""); // Clear input
    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-[#0a0a14] min-h-screen text-white">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Sparkles className="text-indigo-500" /> AI Image Studio
        </h1>
        <p className="text-slate-400">Turn your imagination into high-quality AI visuals.</p>
      </div>

      {}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row gap-4 p-2 bg-[#16162a] border border-slate-800 rounded-3xl shadow-xl">
          <input
            className="flex-1 bg-transparent px-6 py-4 outline-none text-lg placeholder:text-slate-600"
            placeholder="A futuristic city with flying cars and neon lights..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Generating...
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>

      {}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-indigo-400" /> Recent Creations
        </h2>

        {isFetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-[#16162a] border border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500">No images generated yet. Start creating!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#16162a] border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-lg"
              >
                <img 
                  src={img.url} 
                  alt={img.prompt} 
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <p className="text-xs text-slate-200 line-clamp-2 mb-3 italic">"{img.prompt}"</p>
                  <a 
                    href={img.url} 
                    download={`ai-image-${idx}.png`}
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white py-2 rounded-xl text-sm transition-colors"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}