'use client';

import React, { useState } from 'react';
import { QrCode, ShieldCheck, Eye, EyeOff, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const AvimedPassCard = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-6 sm:mb-8"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white flex flex-col items-center relative overflow-hidden group">
        
        {/* Animated Background Gradient */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.03)_0%,transparent_70%)] pointer-events-none"
        />

        <div className="w-full flex justify-between items-center mb-6 sm:mb-8 relative z-10">
          <div className="flex items-center gap-2.5 text-[#1A1C1E]">
            <div className="p-2 bg-teal-50 rounded-xl">
              <QrCode size={18} className="text-teal-600" />
            </div>
            <span className="text-base font-black tracking-tight">Avimed Pass</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-100/50">
            <ShieldCheck size={12} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-wider">Active ID</span>
          </div>
        </div>

        {/* QR Section Container */}
        <div className="relative mb-6 sm:mb-8 group/qr">
          {/* Rotating Gradient Border */}
          <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 rounded-[2.5rem] blur opacity-20 group-hover/qr:opacity-40 transition-opacity duration-500 animate-spin-slow" />
          
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-white rounded-[2.5rem] shadow-2xl border border-gray-50 flex items-center justify-center overflow-hidden">
            {/* Scanning Line Animation */}
            <AnimatePresence>
              {isVisible && (
                <motion.div 
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent z-20 shadow-[0_0_15px_rgba(20,184,166,0.8)]"
                />
              )}
            </AnimatePresence>

            {/* QR Placeholder / Content */}
            <div className={cn(
              "transition-all duration-700 flex flex-col items-center justify-center gap-3",
              !isVisible ? "filter blur-md grayscale scale-95 opacity-40" : "filter blur-0 grayscale-0 scale-100 opacity-100"
            )}>
              <QrCode size={80} className="text-[#1A1C1E] stroke-[1.5] sm:hidden" />
              <QrCode size={90} className="text-[#1A1C1E] stroke-[1.5] hidden sm:block" />
              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                <Sparkles size={10} className="text-teal-500" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Digital Signature</span>
              </div>
            </div>

            {/* Hidden Overlay */}
            {!isVisible && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="p-4 bg-white/40 backdrop-blur-sm rounded-full">
                  <EyeOff size={32} className="text-gray-400 opacity-40" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Button */}
        <button 
          onClick={() => setIsVisible(!isVisible)}
          className="relative w-full max-w-[200px] h-12 bg-[#1A1C1E] rounded-2xl flex items-center justify-center gap-2.5 text-white overflow-hidden group/btn hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center gap-2.5">
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            <span className="text-sm font-black tracking-tight">{isVisible ? "Hide Pass" : "Show Pass"}</span>
          </div>
        </button>

        <p className="mt-5 sm:mt-6 text-[#8E949A] text-[10px] sm:text-[11px] font-bold text-center leading-relaxed max-w-[220px] uppercase tracking-wider opacity-60">
          Emergency medical access QR signature
        </p>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default AvimedPassCard;
