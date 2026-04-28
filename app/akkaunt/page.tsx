import React from 'react';
import { 
  FileText, 
  Heart, 
  CreditCard, 
  Shield, 
  File, 
  Fingerprint, 
  KeyRound, 
  Smartphone, 
  Watch 
} from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import ProfileCard from '@/components/ProfileCard';
import UnimPassCard from '@/components/UnimPassCard';
import MemoryCard from '@/components/MemoryCard';
import DocumentItem from '@/components/DocumentItem';
import PaymentCard from '@/components/PaymentCard';
import SecurityItem from '@/components/SecurityItem';
import BottomNav from '@/components/BottomNav';

export default function AkkauntPage() {
  const documents = [
    { title: 'Pasport', subtitle: 'Hujjat • 2024-01-15', icon: FileText, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { title: 'Tibbiy karta', subtitle: 'Tibbiyot • 2024-03-20', icon: Heart, iconBg: 'bg-rose-50', iconColor: 'text-rose-500' },
    { title: 'Haydovchilik guvohnomasi', subtitle: 'Hujjat • 2023-11-05', icon: CreditCard, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { title: 'Sug\'urta polisi', subtitle: 'Moliya • 2024-06-01', icon: Shield, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { title: 'Diplom', subtitle: 'Ta\'lim • 2020-07-15', icon: File, iconBg: 'bg-purple-50', iconColor: 'text-purple-500' }
  ];

  const paymentCards = [
    { title: 'Humo ****4521', subtitle: 'Humo', gradient: 'bg-gradient-to-r from-blue-600 to-purple-600' },
    { title: 'UzCard ****7890', subtitle: 'UzCard', gradient: 'bg-gradient-to-r from-emerald-500 to-teal-600' }
  ];

  const securityItems = [
    { title: 'Biometrik kirish', subtitle: 'Face ID / Touch ID', icon: Fingerprint, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
    { title: 'Parol o\'zgartirish', subtitle: 'Oxirgi o\'zgarish: 30 kun oldin', icon: KeyRound, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
    { title: 'Ulangan qurilmalar', subtitle: 'iPhone 15, Apple Watch', icon: Smartphone, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
    { title: 'Wearable Sync', subtitle: 'Apple Watch, Mi Band', icon: Watch, iconBg: 'bg-teal-50', iconColor: 'text-teal-500' }
  ];

  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-32">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <SubPageHeader />

        {/* Profile */}
        <ProfileCard />

        {/* UniM Pass */}
        <UnimPassCard />

        {/* Personal Memory */}
        <MemoryCard />

        {/* Documents Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            HUJJATLAR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {documents.map((doc, idx) => (
              <DocumentItem key={idx} {...doc} />
            ))}
          </div>
        </div>

        {/* Payment Cards Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            TO&apos;LOV KARTALARI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-4">
            {paymentCards.map((card, idx) => (
              <PaymentCard key={idx} {...card} />
            ))}
          </div>
          <button className="w-full border-2 border-dashed border-gray-200 bg-gray-50/50 rounded-[24px] py-5 flex items-center justify-center gap-3 text-[#1A1C1E] text-sm font-bold hover:bg-gray-100 transition-colors active:scale-[0.99]">
            <CreditCard size={20} className="text-[#2D3A5D]" />
            Karta qo&apos;shish
          </button>
        </div>

        {/* Security Section */}
        <div className="px-5 mb-12">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            XAVFSIZLIK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {securityItems.map((item, idx) => (
              <SecurityItem key={idx} {...item} />
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </main>
  );
}
