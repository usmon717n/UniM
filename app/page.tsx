import Header from '@/components/Header';
import HealthStats from '@/components/HealthStats';
import AiSearch from '@/components/AiSearch';
import PlanSection from '@/components/PlanSection';
import MenuGrid from '@/components/MenuGrid';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-20">
      <div className="max-w-[1100px] mx-auto bg-[#F4F6F9] relative min-h-screen">
        {/* Top Header */}
        <Header />

        {/* Health Stats */}
        <HealthStats />

        {/* AI Search */}
        <AiSearch />

        {/* My Plan Section */}
        <PlanSection />

        {/* Main Menu Grid */}
        <MenuGrid />

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </main>
  );
}
