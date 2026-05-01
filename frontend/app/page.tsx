import Header from '@/components/Header';
import HealthStats from '@/components/HealthStats';
import AiSearch from '@/components/AiSearch';
import PlanSection from '@/components/PlanSection';
import MenuGrid from '@/components/MenuGrid';
import BottomNav from '@/components/BottomNav';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F6F9] pb-10 md:pb-10 overflow-x-hidden">
      {/* Full-width Sticky Header */}
      <Header />

      {/* Constrained Content Container */}
      <div className="max-w-[1100px] mx-auto relative min-h-screen">
        <div className="pt-4">
          {/* Health Stats */}
          <HealthStats />

          {/* AI Search */}
          <AiSearch />

          {/* My Plan Section */}
          <PlanSection />

          {/* Main Menu Grid */}
          <MenuGrid />
        </div>

        {/* Bottom Navigation (Mobile only) */}
        <BottomNav />
      </div>
    </main>
  );
}

