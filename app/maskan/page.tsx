import React from 'react';
import { 
  Building2, 
  Zap, 
  Wind, 
  Droplets, 
  Wifi, 
  Lightbulb, 
  Thermometer, 
  Lock, 
  Shield 
} from 'lucide-react';
import MaskanHeader from '@/components/MaskanHeader';
import SectionTitle from '@/components/SectionTitle';
import HomeInfoCard from '@/components/HomeInfoCard';
import UtilityCard from '@/components/UtilityCard';
import SmartHomeCard from '@/components/SmartHomeCard';
import NearbyPlaceCard from '@/components/NearbyPlaceCard';
import EmergencyCard from '@/components/EmergencyCard';
import BottomNav from '@/components/BottomNav';

export default function MaskanPage() {
  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-10">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <MaskanHeader />

        {/* Page Title */}
        <SectionTitle 
          title="Maskan"
          subtitle="Infratuzilma — JKX, aqlli uy, lokatsiya"
          icon={Building2}
        />

        {/* Home Info */}
        <HomeInfoCard />

        {/* Utilities Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            KOMMUNAL XIZMATLAR (JKX)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <UtilityCard 
              title="Elektr"
              subtitle="342 kWh — 68,400 so'm"
              status="To'langan"
              icon={Zap}
              iconBg="bg-amber-50"
              iconColor="text-amber-500"
            />
            <UtilityCard 
              title="Gaz"
              subtitle="12.5 m³ — 15,000 so'm"
              status="To'langan"
              icon={Wind}
              iconBg="bg-blue-50"
              iconColor="text-blue-500"
            />
            <UtilityCard 
              title="Suv"
              subtitle="8.2 m³ — 12,300 so'm"
              status="Qarzdor"
              icon={Droplets}
              iconBg="bg-teal-50"
              iconColor="text-teal-500"
              showPayButton={true}
            />
            <UtilityCard 
              title="Internet"
              subtitle="100 Mb/s — 89,000 so'm"
              status="To'langan"
              icon={Wifi}
              iconBg="bg-purple-50"
              iconColor="text-purple-500"
            />
          </div>
        </div>

        {/* Smart Home Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            AQLLI UY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SmartHomeCard 
              title="Yoritgich — Yotoqxona"
              status="Yoqilgan"
              icon={Lightbulb}
              iconColor="text-amber-500"
              isActive={true}
            />
            <SmartHomeCard 
              title="Harorat nazorati"
              status="Yoqilgan"
              icon={Thermometer}
              iconColor="text-orange-500"
              isActive={true}
            />
            <SmartHomeCard 
              title="Eshik qulfi"
              status="Yoqilgan"
              icon={Lock}
              iconColor="text-emerald-500"
              isActive={true}
            />
            <SmartHomeCard 
              title="Xavfsizlik kamerasi"
              status="O'chirilgan"
              icon={Shield}
              iconColor="text-red-400"
              isActive={false}
            />
          </div>
        </div>

        {/* Nearby Places Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            YAQIN ATROFDAGI JOYLAR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <NearbyPlaceCard 
              title="City Med Center"
              subtitle="Klinika"
              distance="0.3"
              emoji="🏥"
            />
            <NearbyPlaceCard 
              title="Grand Pharma"
              subtitle="Dorixona"
              distance="0.5"
              emoji="💊"
            />
            <NearbyPlaceCard 
              title="FitZone Gym"
              subtitle="Sport zali"
              distance="0.8"
              emoji="🏋️"
            />
            <NearbyPlaceCard 
              title="Oasis Park"
              subtitle="Park"
              distance="1.2"
              emoji="🌳"
            />
          </div>
        </div>

        {/* Emergency Card */}
        <EmergencyCard />

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </main>
  );
}
