'use client';

import React from 'react';
import { Star, ExternalLink, LucideIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/hooks/useT';

interface ProductCardProps {
  name: string;
  description: string;
  rating: number;
  category: string;
  icon: LucideIcon;
  gradient: string;
  colorClass: string;
}

const ProductCard = ({
  name,
  description,
  rating,
  category,
  icon: Icon,
  gradient,
  colorClass
}: ProductCardProps) => {
  const tr = useT();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.5 }}
      className="group bg-white/80 backdrop-blur-md rounded-[28px] p-6 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-white hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 mb-5 relative overflow-hidden"
    >
      {/* Decorative Aura */}
      <div className={cn("absolute -right-16 -top-16 w-40 h-40 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full", gradient)} />

      <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1 relative z-10">
        {/* Premium Icon Container */}
        <div className={cn(
          "w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[22px] flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden shrink-0",
          gradient, colorClass
        )}>
          <div className="absolute inset-0 bg-white/20 rounded-[18px] sm:rounded-[22px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <Icon size={24} className="relative z-10 sm:hidden" strokeWidth={2.2} />
          <Icon size={30} className="relative z-10 hidden sm:block" strokeWidth={2.2} />
          
          {/* Animated Sweep Effect */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 4 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg]"
          />
        </div>
        
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 mb-1 sm:mb-1.5">
            <h3 className="text-[#1A1C1E] text-[17px] sm:text-xl font-black tracking-tight leading-tight truncate">{name}</h3>
            <div className="w-fit px-2 py-0.5 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">{category}</span>
            </div>
          </div>
          
          <p className="text-[#64748B] text-[12px] sm:text-[13px] font-bold leading-relaxed mb-3 sm:mb-4 line-clamp-1 sm:line-clamp-2 pr-2 sm:pr-4 opacity-90">
            {description}
          </p>
          
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Rating Badge */}
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-amber-100/50 shadow-sm transition-all hover:bg-amber-100">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-[#1A1C1E] text-[11px] sm:text-[12px] font-black">{rating}</span>
              </div>
              
              {/* Verified Seller / Status */}
              <div className="hidden xs:flex items-center gap-1 text-teal-600">
                <Sparkles size={12} strokeWidth={3} />
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider">Top Choice</span>
              </div>
            </div>

            {/* Premium CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-4 py-2 sm:px-7 sm:py-3.5 rounded-full flex items-center gap-2 text-[11px] sm:text-[12px] font-black tracking-tight shadow-[0_10px_20px_rgba(20,184,166,0.2)] hover:shadow-[0_15px_30px_rgba(20,184,166,0.3)] transition-all duration-300"
            >
              <span>{tr.common.open}</span>
              <ExternalLink size={13} className="sm:hidden" strokeWidth={3} />
              <ExternalLink size={15} className="hidden sm:block" strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

