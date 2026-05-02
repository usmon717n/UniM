'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Heart,
  CreditCard,
  Shield,
  File,
  Fingerprint,
  KeyRound,
  Smartphone,
  Watch,
  LogOut,
  Plus,
  Search,
  Filter,
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubPageHeader from '@/components/SubPageHeader';
import ProfileCard from '@/components/ProfileCard';
import AvimedPassCard from '@/components/AvimedPassCard';
import MemoryCard from '@/components/MemoryCard';
import DocumentItem from '@/components/DocumentItem';
import PaymentCard from '@/components/PaymentCard';
import SecurityItem from '@/components/SecurityItem';
import { useAuth } from '@/lib/contexts/auth-context';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/hooks/useT';

export default function AkkauntPage() {
  const router = useRouter();
  const { user, isLoading, clearAuth } = useAuth();
  const tr = useT();
  const [activeFilter, setActiveFilter] = useState('Hammasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  function handleLogout() {
    clearAuth();
    router.push('/');
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F4F6F9] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-3 border-teal-500 border-t-transparent rounded-full"
        />
      </main>
    );
  }

  const DOC_DATA = [
    { titleKey: 'passport' as const, catKey: 'Hujjat',   date: '2024-01-15', icon: FileText,  iconBg: 'bg-blue-50',    iconColor: 'text-blue-500' },
    { titleKey: 'medCard'  as const, catKey: 'Tibbiyot', date: '2024-03-20', icon: Heart,     iconBg: 'bg-rose-50',    iconColor: 'text-rose-500' },
    { titleKey: 'license'  as const, catKey: 'Hujjat',   date: '2023-11-05', icon: CreditCard,iconBg: 'bg-orange-50',  iconColor: 'text-orange-500' },
    { titleKey: 'insurance'as const, catKey: 'Moliya',   date: '2024-06-01', icon: Shield,    iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { titleKey: 'diploma'  as const, catKey: "Ta'lim",   date: '2020-07-15', icon: File,      iconBg: 'bg-purple-50',  iconColor: 'text-purple-500' },
  ];

  const documents = DOC_DATA.map(d => ({
    ...d,
    title:    tr.akkaunt.docTitles[d.titleKey],
    subtitle: `${tr.akkaunt.docCats[d.catKey as keyof typeof tr.akkaunt.docCats]} • ${d.date}`,
  }));

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = activeFilter === 'Hammasi' || doc.catKey === activeFilter;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const paymentCards = [
    { title: 'Humo ****4521', subtitle: 'Humo', gradient: 'bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6]' },
    { title: 'UzCard ****7890', subtitle: 'UzCard', gradient: 'bg-gradient-to-br from-[#065f46] via-[#047857] to-[#10b981]' }
  ];

  const securityItems = [
    { title: tr.akkaunt.secItems.biometric.title, subtitle: tr.akkaunt.secItems.biometric.sub, icon: Fingerprint, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { title: tr.akkaunt.secItems.password.title,  subtitle: tr.akkaunt.secItems.password.sub,  icon: KeyRound,    iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { title: tr.akkaunt.secItems.devices.title,   subtitle: tr.akkaunt.secItems.devices.sub,   icon: Smartphone,  iconBg: 'bg-blue-50',   iconColor: 'text-blue-500' },
    { title: tr.akkaunt.secItems.wearable.title,  subtitle: tr.akkaunt.secItems.wearable.sub,  icon: Watch,       iconBg: 'bg-teal-50',   iconColor: 'text-teal-500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-32 sm:pb-20 overflow-x-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1100px] mx-auto relative min-h-screen"
      >
        {/* Header */}
        <SubPageHeader />

        {/* Profile Card */}
        <div className="px-4 sm:px-5">
          <ProfileCard name={user?.name ?? ''} email={user?.email ?? ''} />
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">
          
          {/* Left Column: ID & Stats */}
          <div className="lg:col-span-5 flex flex-col">
            <AvimedPassCard />
            <MemoryCard />
          </div>

          {/* Right Column: Docs & Payments */}
          <div className="lg:col-span-7">
            
            {/* Documents Section */}
            <div className="px-4 sm:px-5 mb-6 sm:mb-8">
              <div className="flex items-center justify-between mb-4 px-1 h-10">
                <AnimatePresence mode="wait">
                  {isSearchOpen ? (
                    <motion.div 
                      key="search-input"
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      className="flex-1 flex items-center bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-3.5 mr-2 h-11"
                    >
                      <Search size={15} className="text-slate-400 mr-2.5" />
                      <input 
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={tr.akkaunt.searchDoc}
                        className="flex-1 bg-transparent border-none outline-none text-[13px] font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
                      />
                      <button 
                        onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                        className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                      >
                        <X size={15} className="text-slate-400" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.h2 
                      key="title"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-slate-900 text-sm sm:text-base font-black tracking-widest uppercase"
                    >
                      {tr.akkaunt.documents}
                    </motion.h2>
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-2">
                  {!isSearchOpen && (
                    <motion.div 
                      whileTap={{ scale: 0.92 }}
                      onClick={() => setIsSearchOpen(true)}
                      className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-white flex items-center justify-center cursor-pointer hover:bg-white transition-all group"
                    >
                      <Search size={18} className="text-slate-400 group-hover:text-teal-600 transition-colors" />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Filter Chips - More Compact & Premium */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-1 px-1">
                {['Hammasi', 'Hujjat', 'Tibbiyot', 'Moliya', "Ta'lim"].map((key, i) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.12em] transition-all duration-500 border whitespace-nowrap",
                      activeFilter === key
                        ? "bg-slate-900 text-white border-slate-900 shadow-[0_10px_20px_rgba(15,23,42,0.15)] scale-105"
                        : "bg-white/60 text-slate-400 border-white hover:border-slate-200"
                    )}
                  >
                    {tr.akkaunt.docFilters[i]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-1 min-h-[100px]">
                {filteredDocuments.map((doc, idx) => (
                  <DocumentItem key={idx} {...doc} />
                ))}
                {filteredDocuments.length === 0 && (
                  <div className="py-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                    {tr.akkaunt.noDocuments}
                  </div>
                )}
              </div>
              </div>

            {/* Payment Cards Section */}
            <div className="px-4 sm:px-5 mb-8 sm:mb-10">
              <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
                <h2 className="text-[#1A1C1E] text-base sm:text-lg font-black tracking-tight uppercase">{tr.akkaunt.paymentCards}</h2>
                <button className="text-teal-600 text-[11px] sm:text-xs font-black uppercase tracking-widest hover:underline">{tr.akkaunt.viewAll}</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-5 sm:mb-6">
                {paymentCards.map((card, idx) => (
                  <PaymentCard key={idx} {...card} />
                ))}
              </div>
              
              {/* Add Card Premium Button */}
              <motion.button 
                whileHover={{ scale: 1.01, borderColor: '#10b981' }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-20 sm:h-24 border-2 border-dashed border-gray-200 bg-white/50 rounded-[24px] flex flex-col items-center justify-center gap-1.5 sm:gap-2 group transition-all duration-300"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all duration-500">
                  <Plus size={18} className="sm:hidden" strokeWidth={3} />
                  <Plus size={20} className="hidden sm:block" strokeWidth={3} />
                </div>
                <span className="text-gray-500 text-[10px] sm:text-[11px] font-black uppercase tracking-widest group-hover:text-teal-600 transition-colors">
                  {tr.akkaunt.addCard}
                </span>
              </motion.button>
              </div>

            {/* Security Section */}
            <div className="px-4 sm:px-5 mb-8 sm:mb-10">
              <h2 className="text-[#1A1C1E] text-base sm:text-lg font-black tracking-tight uppercase mb-4 sm:mb-6 px-1">{tr.akkaunt.security}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                {securityItems.map((item, idx) => (
                  <SecurityItem key={idx} {...item} />
                ))}
              </div>
              </div>

            {/* Logout Section */}
            <div className="px-4 sm:px-5 mb-16 sm:mb-20">
              <motion.button
                onClick={handleLogout}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full h-14 sm:h-16 bg-white border border-red-100 rounded-[24px] sm:rounded-[28px] flex items-center justify-center gap-3 group overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center gap-3">
                  <div className="p-1.5 sm:p-2 bg-red-50 text-red-500 rounded-lg sm:rounded-xl group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                    <LogOut size={16} className="sm:hidden" strokeWidth={2.5} />
                    <LogOut size={18} className="hidden sm:block" strokeWidth={2.5} />
                  </div>
                  <span className="text-red-500 text-xs sm:text-sm font-black tracking-tight group-hover:text-red-600 uppercase">
                    {tr.akkaunt.logout}
                  </span>
                </div>
              </motion.button>
              </div>
          </div>
        </div>
      </motion.div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}
