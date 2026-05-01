'use client';

import { useRouter } from 'next/navigation';
import {
  User,
  Heart,
  Wrench,
  MapPin,
  ShoppingBag,
  GraduationCap,
  BookOpen,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';

const menuItems = [
  { 
    title: 'Akkaunt', 
    subtitle: 'Shaxsiy ma\'lumotlar va profilingizni boshqarish', 
    icon: User, 
    gradient: 'from-blue-500 to-indigo-600', 
    glow: 'bg-blue-400/20',
    href: '/akkaunt' 
  },
  { 
    title: 'Yaqinlar', 
    subtitle: 'Oilangiz va yaqinlaringiz salomatligi nazorati', 
    icon: Heart, 
    gradient: 'from-rose-500 to-pink-600', 
    glow: 'bg-rose-400/20',
    href: null 
  },
  { 
    title: 'Hizmat', 
    subtitle: 'Maishiy texnika va uy jihozlarini ta\'mirlash', 
    icon: Wrench, 
    gradient: 'from-amber-500 to-orange-600', 
    glow: 'bg-amber-400/20',
    href: null 
  },
  { 
    title: 'Maskan', 
    subtitle: 'Aqlli uy tizimi va lokatsiya boshqaruvi', 
    icon: MapPin, 
    gradient: 'from-teal-500 to-emerald-600', 
    glow: 'bg-teal-400/20',
    href: '/maskan' 
  },
  { 
    title: 'Mahsulot', 
    subtitle: 'Sifatli mahsulotlar — 0% komissiya bilan', 
    icon: ShoppingBag, 
    gradient: 'from-violet-500 to-purple-600', 
    glow: 'bg-violet-400/20',
    href: '/mahsulot' 
  },
  { 
    title: 'Mutaxassis', 
    subtitle: 'Shifokor va yuristlardan professional maslahat', 
    icon: GraduationCap, 
    gradient: 'from-cyan-500 to-blue-600', 
    glow: 'bg-cyan-400/20',
    href: '/mutaxassis' 
  },
  { 
    title: 'Bilim', 
    subtitle: 'Siz uchun foydali va kerakli bilimlar bazasi', 
    icon: BookOpen, 
    gradient: 'from-indigo-500 to-purple-600', 
    glow: 'bg-indigo-400/20',
    href: null 
  },
  { 
    title: 'G\'oyalar', 
    subtitle: 'Hayotingizni osonlashtiruvchi yangi tavsiyalar', 
    icon: Lightbulb, 
    gradient: 'from-orange-500 to-red-600', 
    glow: 'bg-orange-400/20',
    href: null 
  },
];

const MenuGrid = () => {
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  const router = useRouter();

  function handleClick(href: string | null) {
    if (!user) {
      openModal(href ?? '/');
      return;
    }
    if (href) router.push(href);
  }

  return (
    <div className="px-4 sm:px-5 pb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {menuItems.map((item) => (
        <button
          key={item.title}
          onClick={() => handleClick(item.href)}
          className="group relative text-left outline-none"
        >
          {/* Card Main Body */}
          <div className="relative h-full bg-gradient-to-br from-white to-gray-50/50 rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-white hover:border-white/80 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 sm:hover:-translate-y-1.5 transition-all duration-500 overflow-hidden flex flex-row sm:flex-col items-center sm:items-start gap-4 sm:gap-5">
            
            {/* Light Reflection Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            {/* Icon Section */}
            <div className="relative flex-shrink-0">
              {/* Outer Glow */}
              <div className={cn(
                "absolute -inset-2 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                item.glow
              )} />
              
              {/* Icon Container */}
              <div className={cn(
                "relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                "bg-gradient-to-br",
                item.gradient
              )}>
                <item.icon className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                
                {/* Inner shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent rounded-xl sm:rounded-2xl" />
              </div>
            </div>

            {/* Text Section */}
            <div className="space-y-0.5 sm:space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[#1A1C1E] text-[17px] sm:text-lg font-bold tracking-tight truncate">
                  {item.title}
                </h3>
                <ArrowRight className="hidden sm:block w-4 h-4 text-teal-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
              <p className="text-gray-500 text-[12px] sm:text-[13px] font-medium leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                {item.subtitle}
              </p>
            </div>

            {/* Subtle Bottom Glow */}
            <div className={cn(
              "absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              "bg-gradient-to-r from-transparent via-current to-transparent",
              item.gradient.split(' ')[1].replace('to-', 'text-')
            )} />
          </div>
        </button>
      ))}
    </div>
  );
};

export default MenuGrid;

