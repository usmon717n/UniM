import React from 'react';
import { CreditCard, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentCardProps {
  title: string;
  subtitle: string;
  gradient: string;
}

const PaymentCard = ({ title, subtitle, gradient }: PaymentCardProps) => {
  return (
    <div className={cn(
      "rounded-[24px] p-5 mb-4 text-white flex items-center justify-between shadow-lg active:scale-[0.98] transition-transform cursor-pointer",
      gradient
    )}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <CreditCard size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-tight">{title}</span>
          <span className="text-[10px] font-medium opacity-80">{subtitle}</span>
        </div>
      </div>

      <Lock size={18} className="opacity-40" />
    </div>
  );
};

export default PaymentCard;
