'use client';

import { Bot } from 'lucide-react';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';

const AiSearch = () => {
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  function handleFocus() {
    if (!user) openModal('/');
  }

  return (
    <div className="px-5 mb-6">
      <div className="relative group">
        <input
          type="text"
          placeholder="UniM AI'dan so'rang... (masalan: plumber kerak)"
          onFocus={handleFocus}
          readOnly={!user}
          className="w-full h-14 bg-white rounded-full px-6 pr-14 text-sm font-medium text-[#1A1C1E] placeholder-[#8E949A] shadow-md border border-gray-100 outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-slate-400 group-focus-within:text-teal-600 transition-colors">
          <Bot size={22} />
        </div>
      </div>
    </div>
  );
};

export default AiSearch;
