'use client';

import React, { useRef } from 'react';
import { CreditCard, Lock, Sparkles, Cpu } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PaymentCardProps {
  title: string;
  subtitle: string;
  gradient: string;
}

const PaymentCard = ({ title, subtitle, gradient }: PaymentCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full h-44 rounded-[24px] p-6 text-white overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-500 hover:shadow-teal-500/10 mb-4",
        gradient
      )}
    >
      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      
      {/* Shine Sweep Animation */}
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 5 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[45deg] pointer-events-none"
      />

      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">Premium Bank</span>
            <span className="text-xl font-black tracking-tight">{subtitle}</span>
          </div>
          <Cpu size={28} className="text-white/40" strokeWidth={1.5} />
        </div>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="text-lg font-mono tracking-[0.2em]">{title}</div>
          </div>
          
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-widest opacity-50">Card Holder</span>
              <span className="text-xs font-bold tracking-wider uppercase">Usmon Alimov</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-5 bg-white/20 rounded-md backdrop-blur-sm flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white/40 -mr-1" />
                <div className="w-3 h-3 rounded-full bg-white/40" />
              </div>
              <Lock size={12} className="opacity-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sparkles (on hover) */}
      <motion.div 
        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.2, rotate: 180 }}
      >
        <Sparkles size={16} className="text-white/40" />
      </motion.div>
    </motion.div>
  );
};

export default PaymentCard;

