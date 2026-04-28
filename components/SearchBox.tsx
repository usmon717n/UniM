import React from 'react';
import { Search } from 'lucide-react';

const SearchBox = () => {
  return (
    <div className="px-5 mb-6">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#2D3A5D] transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Qidirish..."
          className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-[#1A1C1E] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D3A5D]/5 focus:border-[#2D3A5D] transition-all shadow-sm"
        />
      </div>
    </div>
  );
};

export default SearchBox;
