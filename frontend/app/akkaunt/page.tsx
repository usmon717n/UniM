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
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SubPageHeader from '@/components/SubPageHeader';
import ProfileCard from '@/components/ProfileCard';
import UnimPassCard from '@/components/UnimPassCard';
import MemoryCard from '@/components/MemoryCard';
import DocumentItem from '@/components/DocumentItem';
import PaymentCard from '@/components/PaymentCard';
import SecurityItem from '@/components/SecurityItem';
import BottomNav from '@/components/BottomNav';
import { useAuth } from '@/lib/contexts/auth-context';
import { cn } from '@/lib/utils';

export default function AkkauntPage() {
  const router = useRouter();
  const { user, isLoading, clearAuth } = useAuth();
  const [activeFilter, setActiveFilter] = useState('Hammasi');

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

  const documents = [
    { title: 'Pasport', subtitle: 'Hujjat • 2024-01-15', icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { title: 'Tibbiy karta', subtitle: 'Tibbiyot • 2024-03-20', icon: Heart, iconBg: 'bg-rose-50', iconColor: 'text-rose-500' },
    { title: 'Haydovchilik guvohnomasi', subtitle: 'Hujjat • 2023-11-05', icon: CreditCard, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { title: 'Sug\'urta polisi', subtitle: 'Moliya • 2024-06-01', icon: Shield, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { title: 'Diplom', subtitle: 'Ta\'lim • 2020-07-15', icon: File, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' }
  ];

  const paymentCards = [
    { title: 'Humo ****4521', subtitle: 'Humo', gradient: 'bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6]' },
    { title: 'UzCard ****7890', subtitle: 'UzCard', gradient: 'bg-gradient-to-br from-[#065f46] via-[#047857] to-[#10b981]' }
  ];

  const securityItems = [
    { title: 'Biometrik kirish', subtitle: 'Face ID / Touch ID', icon: Fingerprint, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { title: 'Parol o\'zgartirish', subtitle: 'Oxirgi o\'zgarish: 30 kun oldin', icon: KeyRound, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { title: 'Ulangan qurilmalar', subtitle: 'iPhone 15, Apple Watch', icon: Smartphone, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { title: 'Wearable Sync', subtitle: 'Apple Watch, Mi Band', icon: Watch, iconBg: 'bg-teal-50', iconColor: 'text-teal-500' }
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
    <main className="min-h-screen bg-[#F4F6F9] pb-32 overflow-x-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[1100px] mx-auto relative min-h-screen"
      >
        {/* Header */}
        <SubPageHeader />

        {/* Profile Card */}
        <ProfileCard name={user?.name ?? ''} email={user?.email ?? ''} />

        {/* Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8">
          
          {/* Left Column: ID & Stats */}
          <div className="lg:col-span-5 flex flex-col">
            <UnimPassCard />
            <MemoryCard />
          </div>

          {/* Right Column: Docs & Payments */}
          <div className="lg:col-span-7">
            
            {/* Documents Section */}
            <motion.div variants={itemVariants} className="px-5 mb-10">
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-[#1A1C1E] text-lg font-black tracking-tight uppercase">Hujjatlar</h2>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                    <Search size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2 px-1">
                {['Hammasi', 'Hujjat', 'Tibbiyot', 'Moliya', 'Ta\'lim'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={cn(
                      "px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-300 border whitespace-nowrap",
                      activeFilter === filter 
                        ? "bg-[#1A1C1E] text-white border-[#1A1C1E] shadow-lg scale-105" 
                        : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-1">
                {documents.map((doc, idx) => (
                  <DocumentItem key={idx} {...doc} />
                ))}
              </div>
            </motion.div>

            {/* Payment Cards Section */}
            <motion.div variants={itemVariants} className="px-5 mb-10">
              <div className="flex items-center justify-between mb-6 px-1">
                <h2 className="text-[#1A1C1E] text-lg font-black tracking-tight uppercase">To&apos;lov Kartalari</h2>
                <button className="text-teal-600 text-xs font-black uppercase tracking-widest hover:underline">Hammasi</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {paymentCards.map((card, idx) => (
                  <PaymentCard key={idx} {...card} />
                ))}
              </div>
              
              {/* Add Card Premium Button */}
              <motion.button 
                whileHover={{ scale: 1.01, borderColor: '#10b981' }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-24 border-2 border-dashed border-gray-200 bg-white/50 rounded-[24px] flex flex-col items-center justify-center gap-2 group transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-all duration-500">
                  <Plus size={20} strokeWidth={3} />
                </div>
                <span className="text-gray-500 text-[11px] font-black uppercase tracking-widest group-hover:text-teal-600 transition-colors">
                  Karta qo&apos;shish
                </span>
              </motion.button>
            </motion.div>

            {/* Security Section */}
            <motion.div variants={itemVariants} className="px-5 mb-10">
              <h2 className="text-[#1A1C1E] text-lg font-black tracking-tight uppercase mb-6 px-1">Xavfsizlik</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                {securityItems.map((item, idx) => (
                  <SecurityItem key={idx} {...item} />
                ))}
              </div>
            </motion.div>

            {/* Logout Section */}
            <motion.div variants={itemVariants} className="px-5 mb-16">
              <motion.button
                onClick={handleLogout}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(239, 68, 68, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full h-16 bg-white border border-red-100 rounded-[28px] flex items-center justify-center gap-3 group overflow-hidden transition-all duration-300"
              >
                {/* Red Gradient Background Aura (Hidden until hover) */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex items-center gap-3">
                  <motion.div 
                    animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                    className="p-2 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-all duration-300"
                  >
                    <LogOut size={18} strokeWidth={2.5} />
                  </motion.div>
                  <span className="text-red-500 text-sm font-black tracking-tight group-hover:text-red-600">
                    Hisobdan chiqish
                  </span>
                </div>
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
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

