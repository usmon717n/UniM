'use client';

import React from 'react';
import { Star, ExternalLink, LucideIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/hooks/useT';

interface SpecialistCardProps {
  name: string;
  description: string;
  rating: number;
  category: string;
  icon: LucideIcon;
  gradient: string;
  colorClass: string;
}

const SpecialistCard = ({
  name,
  description,
  rating,
  category,
  icon: Icon,
  gradient,
  colorClass
}: SpecialistCardProps) => {
  const tr = useT();
  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }}
      className="group bg-white/70 backdrop-blur-md rounded-[32px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white hover:bg-white hover:shadow-xl transition-all duration-500 mb-5 relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className={cn("absolute -right-12 -top-12 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full", gradient)} />

      <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1 relative z-10">
        {/* Premium Icon Container */}
        <div className={cn(
          "w-16 h-16 rounded-[24px] flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-500 relative overflow-hidden",
          gradient, colorClass
        )}>
          <div className="absolute inset-0 bg-white/30 rounded-[24px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <Icon size={28} strokeWidth={2.2} className="relative z-10" />
          
          {/* Animated Shine */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 5 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg]"
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-[#1A1C1E] text-lg font-black tracking-tight leading-tight">{name}</h3>
            <div className="px-1.5 py-0.5 bg-gray-50 rounded-md border border-gray-100">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{category}</span>
            </div>
          </div>
          <p className="text-[#8E949A] text-xs font-bold leading-relaxed mb-3 pr-4 opacity-80">{description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100/50 shadow-sm">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-[#1A1C1E] text-[12px] font-black">{rating}</span>
              </div>
              <div className="flex items-center gap-1 text-teal-600">
                <Sparkles size={12} />
                <span className="text-[10px] font-black uppercase tracking-wider">Top Rated</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#1A1C1E] text-white px-6 py-3 rounded-2xl flex items-center gap-2 text-[12px] font-black tracking-tight shadow-xl hover:bg-teal-600 transition-all duration-300"
            >
              <span>{tr.common.open}</span>
              <ExternalLink size={14} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpecialistCard;
