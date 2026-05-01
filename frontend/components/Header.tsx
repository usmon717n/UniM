'use client';

import { Hand } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';
import { cn } from '@/lib/utils';
import BrandLogo from '@/components/BrandLogo';

const Header = () => {
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const router = useRouter();

  function guard(href: string) {
    if (!user) {
      openModal(href);
      return;
    }
    router.push(href);
  }

  const firstName = user?.name?.split(' ')[0] ?? 'Mehmon';

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 py-4 bg-white/70 backdrop-blur-xl border-b border-gray-100/50">
      {/* Neural Light Line Container (Subtle & Restricted) */}
      <div className="absolute top-0 left-0 w-full h-[1px] overflow-hidden pointer-events-none opacity-30">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          className="w-full h-full bg-gradient-to-r from-transparent via-teal-400 to-transparent"
        />
      </div>

      <div className="max-w-[1100px] mx-auto flex items-center justify-between gap-2 relative">
        
        {/* Left Side: Avatar & Greeting */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {/* Brand Logo */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative group cursor-pointer shrink-0"
          >
            <BrandLogo
              priority
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full p-1.5 shadow-sm border border-gray-100"
            />
            {/* Online Pulse Indicator */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-0.5 right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
            />
          </motion.div>

          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 sm:gap-3"
            >
              <h1 className="text-[22px] sm:text-[32px] font-bold tracking-[-0.03em] leading-tight text-[#0F172A] truncate">
                Salom, <span className="bg-gradient-to-r from-[#0EA5A4] to-[#3B82F6] bg-clip-text text-transparent">{firstName}!</span>
              </h1>
              <motion.div 
                whileHover={{ rotate: 20, scale: 1.1 }}
                className="hidden sm:flex w-9 h-9 rounded-full bg-teal-500/10 backdrop-blur-sm items-center justify-center border border-teal-500/20 flex-shrink-0"
              >
                <Hand size={20} className="text-[#0EA5A4]" />
              </motion.div>
            </motion.div>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#94A3B8] text-[11px] sm:text-[13px] font-medium uppercase tracking-[0.1em] sm:tracking-[0.15em] opacity-90 leading-none truncate"
            >
              AVIMED: <span className="text-[#64748B]">Shu yerda va hozir</span>
            </motion.p>
          </div>
        </div>

        {/* Right Side: Empty for a cleaner, minimalist look */}
        <div className="w-10 sm:w-12 shrink-0" />
      </div>
    </header>
  );
};

export default Header;
