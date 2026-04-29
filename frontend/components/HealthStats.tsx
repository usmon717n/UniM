import React from 'react';
import { Heart, Footprints, Moon } from 'lucide-react';

const HealthStats = () => {
  return (
    <div className="px-5 mb-5">
      <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50 flex items-center justify-between">
        {/* Heart Rate */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-2">
            <Heart size={20} fill="currentColor" />
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[#8E949A] font-medium leading-none mb-1">Yurak urishi</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[#1A1C1E] text-base font-bold">72</span>
              <span className="text-[10px] text-[#8E949A] font-medium">bpm</span>
            </div>
          </div>
        </div>

        <div className="w-[1px] h-12 bg-gray-100 mx-2" />

        {/* Steps */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2">
            <Footprints size={20} />
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[#8E949A] font-medium leading-none mb-1">Qadamlar</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[#1A1C1E] text-base font-bold">6,842</span>
            </div>
          </div>
        </div>

        <div className="w-[1px] h-12 bg-gray-100 mx-2" />

        {/* Sleep */}
        <div className="flex flex-col items-center flex-1">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-2">
            <Moon size={20} fill="currentColor" />
          </div>
          <div className="text-center">
            <p className="text-[10px] text-[#8E949A] font-medium leading-none mb-1">Uyqu</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-[#1A1C1E] text-base font-bold">7.2</span>
              <span className="text-[10px] text-[#8E949A] font-medium">h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthStats;
