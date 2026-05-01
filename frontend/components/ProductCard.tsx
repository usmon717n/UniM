'use client';

import React from 'react';
import { Star, ExternalLink, LucideIcon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-1 relative z-10">
        {/* Premium Icon Container */}
        <div className={cn(
          "w-16 h-16 rounded-[22px] flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:scale-110 transition-all duration-500 relative overflow-hidden",
          gradient, colorClass
        )}>
          <div className="absolute inset-0 bg-white/20 rounded-[22px] blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          <Icon size={30} strokeWidth={2.2} className="relative z-10" />
          
          {/* Animated Sweep Effect */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 4 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg]"
          />
        </div>
        
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2.5 mb-1.5">
            <h3 className="text-[#1A1C1E] text-xl font-black tracking-tight leading-tight">{name}</h3>
            <div className="px-2 py-0.5 bg-gray-50 rounded-lg border border-gray-100">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{category}</span>
            </div>
          </div>
          
          <p className="text-[#64748B] text-[13px] font-bold leading-relaxed mb-4 line-clamp-2 pr-4 opacity-90">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Rating Badge */}
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full border border-amber-100/50 shadow-sm transition-all hover:bg-amber-100">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-[#1A1C1E] text-[12px] font-black">{rating}</span>
              </div>
              
              {/* Verified Seller / Status */}
              <div className="hidden sm:flex items-center gap-1 text-teal-600">
                <Sparkles size={12} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-wider">Top Choice</span>
              </div>
            </div>

            {/* Premium CTA Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-7 py-3.5 rounded-full flex items-center gap-2.5 text-[12px] font-black tracking-tight shadow-[0_10px_20px_rgba(20,184,166,0.2)] hover:shadow-[0_15px_30px_rgba(20,184,166,0.3)] transition-all duration-300"
            >
              <span>Ochish</span>
              <ExternalLink size={15} strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

