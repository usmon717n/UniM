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
        "relative w-full aspect-[1.586/1] sm:h-auto rounded-[24px] p-5 sm:p-6 text-white overflow-hidden cursor-pointer shadow-2xl transition-shadow duration-500 hover:shadow-teal-500/20 mb-2 border border-white/20",
        gradient
      )}
    >
      {/* Premium Glass Reflections */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
      
      {/* Shine Sweep Animation */}
      <motion.div 
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 5 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] pointer-events-none"
      />

      {/* Card Content */}
      <div className="relative h-full flex flex-col justify-between z-10" style={{ transform: "translateZ(40px)" }}>
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5" style={{ transform: "translateZ(20px)" }}>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Premium Bank</span>
            <span className="text-[22px] font-black tracking-tight drop-shadow-sm">{subtitle}</span>
          </div>
          <div style={{ transform: "translateZ(30px)" }}>
            <Cpu size={26} className="text-white/60" strokeWidth={1.5} />
          </div>
        </div>

        {/* Middle Section: Card Number */}
        <div className="flex items-center justify-start py-1" style={{ transform: "translateZ(50px)" }}>
          <span className="text-[17px] sm:text-xl font-mono tracking-[0.25em] text-white/90 drop-shadow-md">
            {title}
          </span>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end" style={{ transform: "translateZ(30px)" }}>
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/50">Card Holder</span>
            <span className="text-[13px] font-black tracking-wide uppercase text-white/90">Usmon Alimov</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center relative h-6 w-10">
              <div className="absolute left-0 w-6 h-6 rounded-full bg-white/20 backdrop-blur-md border border-white/10" />
              <div className="absolute right-0 w-6 h-6 rounded-full bg-white/30 backdrop-blur-md border border-white/10" />
            </div>
            <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-md border border-white/10">
              <Lock size={12} className="text-white/60" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 blur-3xl rounded-full pointer-events-none" />
    </motion.div>
  );
};

export default PaymentCard;

