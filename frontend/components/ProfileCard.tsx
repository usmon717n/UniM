import React from 'react';
import { User, Camera, ShieldCheck } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  email: string;
}

const ProfileCard = ({ name, email }: ProfileCardProps) => {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="px-5 mb-4">
      <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex items-center gap-5">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
            {initials ? (
              <span className="text-white text-2xl font-bold">{initials}</span>
            ) : (
              <User size={48} strokeWidth={1.5} className="text-white" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 w-7 h-7 bg-teal-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-sm active:scale-90 transition-transform">
            <Camera size={14} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 min-w-0">
          <h2 className="text-[#1A1C1E] text-xl font-bold mb-0.5 tracking-tight truncate">{name}</h2>
          <p className="text-[#8E949A] text-sm font-medium mb-3 truncate">{email}</p>

          <div className="flex flex-wrap gap-2">
            <div className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg flex items-center gap-1.5">
              <ShieldCheck size={12} />
              <span className="text-[10px] font-bold">Tasdiqlangan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
