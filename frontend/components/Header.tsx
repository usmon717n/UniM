'use client';

import { ShoppingCart, Bell, MessageSquare, ChevronDown, Check, Globe, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

const Header = () => {
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const router = useRouter();
  
  const [lang, setLang] = useState('uz');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function guard(href: string) {
    if (!user) {
      openModal(href);
      return;
    }
    router.push(href);
  }

  const firstName = user?.name?.split(' ')[0] ?? 'Usmon';
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

  const currentLang = languages.find(l => l.code === lang) || languages[0];

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

      <div className="max-w-[1100px] mx-auto flex items-center justify-between relative">
        
        {/* Left Side: Avatar & Greeting */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Premium Avatar */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative group cursor-pointer"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white p-0.5 shadow-sm border border-gray-100">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-500 via-blue-500 to-emerald-600 flex items-center justify-center overflow-hidden relative">
                {initials ? (
                  <span className="text-white text-sm sm:text-base font-black tracking-tight">{initials}</span>
                ) : (
                  <User size={24} className="text-white/90" />
                )}
                {/* Shine Animation */}
                <motion.div 
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 4 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg]"
                />
              </div>
            </div>
            {/* Online Pulse Indicator */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"
            />
          </motion.div>

          <div className="flex flex-col">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1.5"
            >
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-[#1A1C1E]">
                Salom, <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">{firstName}!</span>
              </h1>
              <span className="text-xl animate-bounce-subtle">👋</span>
            </motion.div>
            <motion.p 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[#8E949A] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mt-0.5"
            >
              UNIM: Shu yerda va hozir
            </motion.p>
          </div>
        </div>

        {/* Right Side: Actions Container */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 sm:gap-3"
        >
          {/* Glass Container - Pill Shape */}
          <div className="flex items-center bg-white/70 backdrop-blur-md px-2 py-1.5 rounded-[24px] border border-white/80 shadow-sm relative">
            
            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-white/80 transition-all duration-300 group"
              >
                <span className="text-base sm:text-lg leading-none transform group-hover:scale-110 transition-transform">{currentLang.flag}</span>
                <span className="text-[12px] font-black text-[#1A1C1E] uppercase tracking-tighter">{currentLang.code}</span>
                <ChevronDown size={12} className={cn("text-gray-400 transition-transform duration-300", isLangOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-3 w-40 bg-white/95 backdrop-blur-xl border border-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] py-2.5 overflow-hidden z-50"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-teal-50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{l.flag}</span>
                          <span className={cn("text-[13px] font-bold", lang === l.code ? "text-teal-600" : "text-gray-600")}>
                            {l.name}
                          </span>
                        </div>
                        {lang === l.code && <Check size={16} className="text-teal-600" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1.5px] h-6 bg-gray-200/60 mx-1.5" />

            {/* Action Icons */}
            <div className="flex items-center">
              <button
                onClick={() => guard('/suhbatlar')}
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#5C6166] hover:bg-white hover:text-teal-600 transition-all duration-300 group"
                title="Xabarlar"
              >
                <motion.div whileHover={{ y: -2, scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                  <MessageSquare strokeWidth={2.2} size={20} />
                </motion.div>
              </button>
              
              <button
                onClick={() => guard('/')}
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#5C6166] relative hover:bg-white hover:text-teal-600 transition-all duration-300 group"
                title="Savat"
              >
                <motion.div whileHover={{ rotate: 12, scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                  <ShoppingCart strokeWidth={2.2} size={20} />
                </motion.div>
                <motion.span 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-2 right-2 min-w-[16px] h-4 px-1 bg-[#FF3B30] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm"
                >
                  3
                </motion.span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-3px) rotate(8deg); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;




