'use client';

import React from 'react';
import { ChevronLeft, Globe, Check, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '@/components/BrandLogo';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import LanguageFlag from '@/components/LanguageFlag';

const languages = [
  { code: 'uz', name: "O'zbekcha" },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
] as const;

const SubPageHeader = () => {
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

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  return (
    <header className="flex items-center justify-between px-5 pt-7 pb-4 relative z-50">
      <div className="flex items-center gap-4">
        {/* Premium Back Button */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link href="/">
            <motion.div 
              whileHover={{ x: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group w-11 h-11"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full h-full bg-white/80 backdrop-blur-md rounded-full border border-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] flex items-center justify-center text-[#1A1C1E] transition-all duration-300 group-hover:border-teal-500/30 group-hover:shadow-teal-500/10">
                <ChevronLeft size={22} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Brand Logo Area */}
        <motion.div 
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2.5"
        >
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full blur-sm opacity-20" />
            <BrandLogo className="relative w-full h-full rounded-full p-1 shadow-lg border border-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#1A1C1E] text-lg font-black tracking-tighter leading-none">Avimed</span>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-teal-600 mt-0.5">Personal Hub</span>
          </div>
        </motion.div>
      </div>

      {/* Language Area */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
        ref={langRef}
      >
        <button 
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="bg-white/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded-2xl flex items-center gap-2 border border-white shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 group active:scale-95"
        >
          <Globe size={14} className="text-gray-400 group-hover:text-teal-600 transition-colors" />
          <span className="text-[11px] font-black text-[#1A1C1E] uppercase tracking-wider">{currentLang.code}</span>
          <ChevronDown size={10} className={cn("text-gray-400 transition-transform duration-300", isLangOpen && "rotate-180")} />
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
                    <LanguageFlag code={l.code} className="h-[18px] w-[26px] rounded-md shadow-sm ring-1 ring-black/5" />
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
      </motion.div>
    </header>
  );
};

export default SubPageHeader;
