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
      setPrompt(""); 
    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-10 bg-[#0a0a14] min-h-screen text-white">
      
      {/* Header - Mobile friendly font sizes */}
      <div className="max-w-4xl mx-auto text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3 tracking-tighter">
          <Sparkles className="text-indigo-500 w-6 h-6 md:w-10 md:h-10" /> IMAGE STUDIO
        </h1>
        <p className="text-slate-400 text-sm md:text-lg font-medium">
          Imagination ko reality mein badlo. <br className="md:hidden" /> High-quality AI visuals in seconds.
        </p>
      </div>

      {/* Prompt Box - Responsive padding & layout */}
      <div className="max-w-3xl mx-auto mb-10 md:mb-16">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 p-2 bg-[#16162a] border border-slate-800 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl shadow-indigo-500/5">
          <input
            className="flex-1 bg-transparent px-5 py-3 md:px-8 md:py-5 outline-none text-base md:text-lg placeholder:text-slate-600 font-medium"
            placeholder="A futuristic city with flying cars..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 md:px-10 md:py-5 rounded-xl md:rounded-[2rem] font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-sm md:text-base uppercase tracking-wider"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> <span>Creating...</span>
              </>
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-indigo-400">
          <ImageIcon className="w-5 h-5" /> Gallery
        </h2>

        {isFetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-[#16162a] border border-dashed border-slate-800 rounded-3xl">
            <p className="text-slate-500 font-medium">Abhi tak kuch generate nahi kiya. Shuru ho jao!</p>
          </div>
        ) : (
          /* Grid - 1 col on mobile, 2 on small tablets, 3 on desktop */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className="group relative bg-[#16162a] border border-slate-800 rounded-2xl md:rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all shadow-xl"
              >
                <img 
                  src={img.url} 
                  alt={img.prompt} 
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay - Mobile par clickable, Desktop par hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <p className="text-xs md:text-sm text-slate-200 line-clamp-2 mb-4 font-medium italic">"{img.prompt}"</p>
                  <div className="flex gap-2">
                    <a 
                      href={img.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs md:text-sm font-bold transition-colors"
                    >
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}