'use client';

import React, { useState, useRef } from 'react';
import { User, Camera, ShieldCheck, Sparkles, Pencil, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  name: string;
  email: string;
}

const ProfileCard = ({ name: initialName, email }: ProfileCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName || 'Usmon Alimov');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const initials = name
    ? name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-6 sm:mb-8"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white flex flex-col sm:flex-row items-center gap-5 sm:gap-8 relative overflow-hidden group">
        
        {/* Decorative Background Aura */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

        {/* Avatar Section */}
        <div className="relative shrink-0">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="relative"
          >
            {/* Outer Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-teal-400/20 via-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Avatar Container */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl border border-white/50 overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-teal-500 via-blue-500 to-indigo-600 flex items-center justify-center relative overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : initials ? (
                  <span className="text-white text-2xl sm:text-3xl font-black tracking-tighter drop-shadow-lg">{initials}</span>
                ) : (
                  <User size={56} strokeWidth={1.5} className="text-white/90" />
                )}
                
                {/* Shine Sweep Effect */}
                {!profileImage && (
                  <motion.div 
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 3 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg]"
                  />
                )}
              </div>
            </div>

            {/* Online Indicator Pulse */}
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-1.5 right-1.5 w-4 h-4 bg-emerald-500 border-3 border-white rounded-full shadow-lg z-10"
            />
          </motion.div>

          {/* Edit Avatar Button */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-md rounded-full border border-gray-100 flex items-center justify-center text-gray-700 shadow-xl hover:bg-teal-500 hover:text-white transition-all duration-300 active:scale-90 group/cam z-20"
          >
            <Camera size={15} strokeWidth={2.5} className="group-hover/cam:scale-110 transition-transform" />
          </button>
        </div>

        {/* Info Section */}
        <div className="flex flex-col items-center sm:items-start flex-1 min-w-0 space-y-2 sm:space-y-3">
          <div className="text-center sm:text-left min-w-0 w-full relative">
            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-3"
                >
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-lg font-bold text-[#1A1C1E] focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
                    placeholder="Ism va Familiya"
                  />
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-500 text-white rounded-lg text-xs font-bold hover:bg-teal-600 transition-colors shadow-lg shadow-teal-500/20"
                    >
                      <Check size={14} strokeWidth={3} />
                      <span>Saqlash</span>
                    </button>
                    <button
                      onClick={() => {
                        setName(initialName);
                        setIsEditing(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-500 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
                    >
                      <X size={14} strokeWidth={3} />
                      <span>Bekor qilish</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <div className="flex items-center justify-center sm:justify-start gap-2 group/name">
                    <h2 className="text-[#1A1C1E] text-[22px] sm:text-3xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent truncate">
                      {name}
                    </h2>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 text-gray-400 hover:text-teal-500 transition-all duration-300 active:scale-90"
                    >
                      <Pencil size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                  <p className="text-[#8E949A] text-sm sm:text-base font-medium tracking-tight truncate">{email}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            {/* Verified Badge */}
            <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 border border-emerald-100/50 shadow-sm transition-all hover:bg-emerald-100 hover:scale-105">
              <ShieldCheck size={13} strokeWidth={2.5} />
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider">Verified</span>
            </div>
            
            {/* Premium Badge */}
            <div className="bg-teal-50 text-teal-600 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 border border-teal-100/50 shadow-sm transition-all hover:bg-teal-100 hover:scale-105">
              <Sparkles size={13} strokeWidth={2.5} />
              <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-wider">Premium</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;

