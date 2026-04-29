import React from 'react';
import { Pin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatCardProps {
  title: string;
  message: string;
  time: string;
  unreadCount?: number;
  icon: React.ReactNode;
  iconBg?: string;
  isPinned?: boolean;
  isPremium?: boolean;
  bgColor?: string;
  borderColor?: string;
}

const ChatCard = ({
  title,
  message,
  time,
  unreadCount,
  icon,
  iconBg,
  isPinned,
  isPremium,
  bgColor = "bg-white",
  borderColor = "border-gray-50"
}: ChatCardProps) => {
  return (
    <div className={cn(
      "rounded-[24px] p-4 shadow-sm border flex items-center gap-4 mb-3 active:scale-[0.98] transition-all cursor-pointer",
      bgColor,
      borderColor
    )}>
      {/* Avatar */}
      <div className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-inner flex-shrink-0",
        iconBg || "bg-gray-50"
      )}>
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center flex-wrap gap-2 mb-1">
          <h3 className="text-[#1A1C1E] text-[15px] font-bold truncate">{title}</h3>
          
          {isPinned && (
            <div className="flex items-center gap-1 border border-emerald-500/30 bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-md">
              <Pin size={10} className="fill-current" />
              <span className="text-[9px] font-bold">Qadoqlangan</span>
            </div>
          )}
          
          {isPremium && (
            <div className="bg-orange-500 text-white px-1.5 py-0.5 rounded-md text-[9px] font-bold">
              Premium AI
            </div>
          )}
        </div>
        
        <p className={cn(
          "text-[13px] font-medium truncate",
          unreadCount ? "text-[#1A1C1E]" : "text-[#8E949A]"
        )}>
          {message}
        </p>
      </div>

      {/* Meta */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-[11px] font-medium text-[#8E949A]">{time}</span>
        {unreadCount && (
          <div className="w-5 h-5 bg-[#2D3A5D] rounded-full flex items-center justify-center text-white text-[10px] font-bold">
            {unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatCard;
