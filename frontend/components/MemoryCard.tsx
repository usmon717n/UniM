'use client';

import React, { useState, useEffect } from 'react';
import { FileText, Image as ImageIcon, Folder, Upload, Plus, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

const CountUp = ({ value }: { value: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const animation = animate(count, value, { duration: 2, ease: "easeOut" });
    return animation.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
};

const MemoryCard = () => {
  const stats = [
    { label: 'Hujjatlar', value: 12, icon: FileText, gradient: 'from-blue-500/10 to-indigo-500/10', color: 'text-blue-600' },
    { label: 'Rasmlar', value: 34, icon: ImageIcon, gradient: 'from-rose-500/10 to-orange-500/10', color: 'text-rose-600' },
    { label: 'Tahlillar', value: 8, icon: Folder, gradient: 'from-emerald-500/10 to-teal-500/10', color: 'text-emerald-600' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="px-5 mb-8"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#1A1C1E] text-lg font-black tracking-tight flex items-center gap-2">
            Shaxsiy xotira
            <Sparkles size={16} className="text-teal-500" />
          </h2>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md">
            Cloud Sync
          </span>
        </div>
        
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              className={cn(
                "relative group flex flex-col items-center p-4 rounded-3xl border border-transparent hover:border-white hover:shadow-xl transition-all duration-300 overflow-hidden",
                "bg-gradient-to-br", stat.gradient
              )}
            >
              <div className={cn("p-3 rounded-2xl bg-white shadow-sm mb-3 group-hover:rotate-12 transition-transform duration-500", stat.color)}>
                <stat.icon size={20} strokeWidth={2.5} />
              </div>
              <span className="text-[#1A1C1E] text-2xl font-black leading-none mb-1">
                <CountUp value={stat.value} />
              </span>
              <span className="text-[#8E949A] text-[9px] font-black uppercase tracking-[0.1em] text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Large Dashed Dropzone Upload Button */}
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 via-blue-500/20 to-purple-500/20 rounded-[28px] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative w-full border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-white hover:border-teal-500/50 rounded-[24px] py-8 flex flex-col items-center justify-center gap-3 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform duration-500">
              <Upload size={22} strokeWidth={2.5} />
            </div>
            <div className="text-center">
              <p className="text-[#1A1C1E] text-sm font-black tracking-tight">Fayl yuklash</p>
              <p className="text-[#8E949A] text-[10px] font-bold uppercase tracking-widest mt-1">Drag & Drop fayllarni shu yerga</p>
            </div>
            
            {/* Animated Plus Icon */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute top-4 right-4 text-gray-300 opacity-20 group-hover:opacity-100 group-hover:text-teal-500 transition-all"
            >
              <Plus size={24} />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MemoryCard;

