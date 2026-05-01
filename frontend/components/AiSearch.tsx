'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Search, Loader2, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';
import { cn } from '@/lib/utils';

const suggestions = [
  "Plumber kerak...",
  "Doktor topib ber...",
  "Uy ijarasi...",
  "Yaqin atrofdagi dorixonalar...",
  "Ta'mir xizmatlari..."
];

const AiSearch = () => {
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Rotate suggestions
  useEffect(() => {
    const interval = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  function handleFocus() {
    if (!user) {
      openModal('/');
      return;
    }
    setIsFocused(true);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000); // Simulate AI thinking
  };

  return (
    <div className="px-5 mb-10 w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative group"
      >
        {/* Cursor Follow Glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[999px] z-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.08), transparent 40%)`
          }}
        />

        {/* Shine Sweep Animation */}
        <div className="absolute inset-0 overflow-hidden rounded-[999px] pointer-events-none z-0">
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 5 }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg]"
          />
        </div>

        {/* Main Input Container */}
        <motion.form 
          onSubmit={handleSubmit}
          animate={isFocused ? { scale: 1.015 } : { scale: 1 }}
          className={cn(
            "relative z-10 flex items-center bg-white/60 backdrop-blur-xl rounded-[999px] p-1.5 border transition-all duration-500",
            isFocused 
              ? "border-teal-500/50 shadow-[0_0_40px_rgba(20,184,166,0.15)] ring-4 ring-teal-500/5" 
              : "border-white shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
          )}
        >
          {/* Left Icon */}
          <div className="pl-5 text-gray-400">
            <Search size={20} className={cn("transition-colors duration-300", isFocused && "text-teal-500")} />
          </div>

          {/* Input Field */}
          <div className="relative flex-1 h-12">
            <input
              type="text"
              onFocus={handleFocus}
              onBlur={() => setIsFocused(false)}
              readOnly={!user}
              className="w-full h-full bg-transparent px-4 outline-none text-[#1A1C1E] text-[15px] font-medium placeholder-transparent"
            />
            
            {/* Animated Placeholder */}
            <AnimatePresence mode="wait">
              {!isFocused && (
                <motion.div
                  key={suggestionIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center px-4 pointer-events-none"
                >
                  <span className="text-gray-400 text-[15px] font-medium">
                    UniM AI'dan so'rang: <span className="text-teal-600/60 italic">{suggestions[suggestionIndex]}</span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 pr-2">
            {!isFocused && (
              <div className="hidden sm:flex items-center gap-1 bg-gray-100/80 px-2 py-1 rounded-lg border border-gray-200/50">
                <Command size={10} className="text-gray-400" />
                <span className="text-[10px] font-black text-gray-400 tracking-tighter">K</span>
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "relative h-11 w-11 sm:w-auto sm:px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-500 overflow-hidden",
                "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20 active:scale-95"
              )}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
              
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline text-[13px] font-bold">UniM AI</span>
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles size={18} className="text-white/90" />
                  </motion.div>
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Background Aura */}
        <div className={cn(
          "absolute -inset-4 bg-gradient-to-tr from-teal-500/5 via-blue-500/5 to-purple-500/5 rounded-[999px] blur-3xl -z-10 transition-opacity duration-1000",
          isFocused ? "opacity-100" : "opacity-0"
        )} />
      </motion.div>

      {/* Quick Suggestions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 flex flex-wrap justify-center gap-2"
      >
        {["🏠 Ijaraga uy", "🔧 Usta kerak", "🏥 Shifokor", "📜 Huquqiy yordam"].map((tag) => (
          <button 
            key={tag}
            className="text-[11px] font-bold text-gray-400 bg-white/40 hover:bg-white hover:text-teal-600 px-3 py-1.5 rounded-full border border-white/60 transition-all duration-300"
          >
            {tag}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default AiSearch;

