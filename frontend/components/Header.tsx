'use client';

import React from 'react';
import { ShoppingCart, Bell, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/auth-context';

const Header = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'Mehmon';
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '👤';

  return (
    <header className="flex items-center justify-between px-5 pt-6 pb-4">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg border-2 border-white overflow-hidden">
          <span className="text-white text-sm font-bold">{initials}</span>
        </div>

        <div className="flex flex-col">
          <h1 className="text-[#1A1C1E] text-lg font-bold leading-tight flex items-center gap-1">
            👋 Salom, {firstName}!
          </h1>
          <p className="text-[#8E949A] text-xs font-medium">
            UniM: Shu yerda va Hozir.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {/* Language Pill */}
        <button className="bg-[#EDF1F5] px-3 py-1 rounded-full flex items-center gap-1.5 hover:bg-gray-200 transition-colors">
          <span className="text-sm">🇺🇿</span>
          <span className="text-[11px] font-bold text-[#1A1C1E]">UZ</span>
        </button>

        <div className="flex items-center gap-3">
          <Link 
            href="/suhbatlar"
            className="w-9 h-9 rounded-full bg-[#EDF1F5] flex items-center justify-center text-[#5C6166] hover:bg-gray-200 transition-colors"
          >
            <MessageSquare size={18} />
          </Link>
          <button className="w-9 h-9 rounded-full bg-[#EDF1F5] flex items-center justify-center text-[#5C6166] hover:bg-gray-200 transition-colors">
            <ShoppingCart size={18} />
          </button>
          <button className="w-9 h-9 rounded-full bg-[#EDF1F5] flex items-center justify-center text-[#5C6166] relative hover:bg-gray-200 transition-colors">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
