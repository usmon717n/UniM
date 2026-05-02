'use client';

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
  Shield,
  Hospital,
  Pill,
  Dumbbell,
  TreePine
} from 'lucide-react';
import SubPageHeader from '@/components/SubPageHeader';
import { useT } from '@/lib/hooks/useT';
import SectionTitle from '@/components/SectionTitle';
import HomeInfoCard from '@/components/HomeInfoCard';
import UtilityCard from '@/components/UtilityCard';
import SmartHomeCard from '@/components/SmartHomeCard';
import NearbyPlaceCard from '@/components/NearbyPlaceCard';
import EmergencyCard from '@/components/EmergencyCard';
import BottomNav from '@/components/BottomNav';

export default function MaskanPage() {
  const tr = useT();
  const m = tr.pages.maskan;

  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-10">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Header */}
        <SubPageHeader />

        {/* Page Title */}
        <SectionTitle
          title={m.title}
          subtitle={m.subtitle}
          icon={Building2}
        />

        {/* Home Info */}
        <HomeInfoCard />

        {/* Utilities Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {m.utilities}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <UtilityCard
              title={m.utilElectricity}
              subtitle="342 kWh — 68,400 so'm"
              status="paid"
              icon={Zap}
              iconBg="bg-amber-50"
              iconColor="text-amber-500"
            />
            <UtilityCard
              title={m.utilGas}
              subtitle="12.5 m³ — 15,000 so'm"
              status="paid"
              icon={Wind}
              iconBg="bg-blue-50"
              iconColor="text-blue-500"
            />
            <UtilityCard
              title={m.utilWater}
              subtitle="8.2 m³ — 12,300 so'm"
              status="debt"
              icon={Droplets}
              iconBg="bg-teal-50"
              iconColor="text-teal-500"
              showPayButton={true}
            />
            <UtilityCard
              title={m.utilInternet}
              subtitle="100 Mb/s — 89,000 so'm"
              status="paid"
              icon={Wifi}
              iconBg="bg-purple-50"
              iconColor="text-purple-500"
            />
          </div>
        </div>

        {/* Smart Home Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {m.smartHome}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SmartHomeCard
              title={m.smartLight}
              status={m.smartOn}
              icon={Lightbulb}
              iconColor="text-amber-500"
              isActive={true}
            />
            <SmartHomeCard
              title={m.smartTemp}
              status={m.smartOn}
              icon={Thermometer}
              iconColor="text-orange-500"
              isActive={true}
            />
            <SmartHomeCard
              title={m.smartDoor}
              status={m.smartOn}
              icon={Lock}
              iconColor="text-emerald-500"
              isActive={true}
            />
            <SmartHomeCard
              title={m.smartCamera}
              status={m.smartOff}
              icon={Shield}
              iconColor="text-red-400"
              isActive={false}
            />
          </div>
        </div>

        {/* Nearby Places Section */}
        <div className="px-5 mb-8">
          <h2 className="text-[#8E949A] text-[10px] font-black tracking-[0.1em] uppercase mb-4 px-1">
            {m.nearby}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <NearbyPlaceCard
              title="City Med Center"
              subtitle={m.nearbyClinic}
              distance="0.3"
              icon={Hospital}
              iconBg="bg-rose-50"
              iconColor="text-rose-500"
            />
            <NearbyPlaceCard
              title="Grand Pharma"
              subtitle={m.nearbyPharmacy}
              distance="0.5"
              icon={Pill}
              iconBg="bg-emerald-50"
              iconColor="text-emerald-500"
            />
            <NearbyPlaceCard
              title="FitZone Gym"
              subtitle={m.nearbyGym}
              distance="0.8"
              icon={Dumbbell}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
            />
            <NearbyPlaceCard
              title="Oasis Park"
              subtitle={m.nearbyPark}
              distance="1.2"
              icon={TreePine}
              iconBg="bg-lime-50"
              iconColor="text-lime-600"
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
