'use client';

import React from 'react';
import { Home, MessageSquare, ShieldAlert, UserCog, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/hooks/useT';

const BottomNav = () => {
  const pathname = usePathname();
  const tr = useT();

  const navItems = [
    { name: tr.nav.home,    icon: Home,      path: '/' },
    { name: tr.nav.service, icon: UserCog,   path: '/mutaxassis' },
    { name: tr.nav.market,  icon: ShoppingBag, path: '/mahsulot' },
    { name: tr.nav.profile, icon: User,      path: '/akkaunt' },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none md:hidden">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-full max-w-[440px] h-[76px] bg-white/70 backdrop-blur-[24px] border border-white/40 rounded-[36px] shadow-[0_15px_50px_rgba(0,0,0,0.12)] flex items-center justify-between px-2 pointer-events-auto relative"
      >
        {/* Left Side Items */}
        <div className="flex flex-1 justify-around items-center h-full">
          {navItems.slice(0, 2).map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path} className="flex flex-col items-center justify-center gap-1 flex-1">
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2.5 rounded-[18px] transition-all duration-300",
                    isActive ? "text-teal-600 bg-teal-50/60 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-widest transition-colors",
                  isActive ? "text-teal-600" : "text-gray-400"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* SOS Center Button */}
        <div className="w-20 relative flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -top-14"
          >
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 bg-red-500 rounded-full blur-xl"
            />
            
            <div className="relative w-20 h-20 bg-gradient-to-br from-[#FF4D4D] via-[#FF3B30] to-[#D70000] rounded-full border-[6px] border-white/90 shadow-[0_12px_40px_rgba(255,59,48,0.45)] flex flex-col items-center justify-center text-white overflow-hidden">
              <ShieldAlert size={30} strokeWidth={2.5} />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] mt-0.5">SOS</span>
              
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[45deg]"
              />
            </div>
          </motion.button>
        </div>

        {/* Right Side Items */}
        <div className="flex flex-1 justify-around items-center h-full">
          {navItems.slice(2, 4).map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} href={item.path} className="flex flex-col items-center justify-center gap-1 flex-1">
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "p-2.5 rounded-[18px] transition-all duration-300",
                    isActive ? "text-teal-600 bg-teal-50/60 shadow-sm" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-widest transition-colors",
                  isActive ? "text-teal-600" : "text-gray-400"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default BottomNav;

