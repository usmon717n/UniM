import React from 'react';
import { 
  User, 
  Heart, 
  Wrench, 
  MapPin, 
  ShoppingBag, 
  GraduationCap, 
  BookOpen, 
  Lightbulb 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Akkaunt',
    subtitle: 'Shaxsiy ma\'lumotlar saqlash',
    icon: User,
    gradient: 'from-[#2D3A5D] to-[#1A1C1E]',
    textColor: 'text-white'
  },
  {
    title: 'Yaqinlar',
    subtitle: 'Yaqinlar ma\'lumotlari',
    icon: Heart,
    gradient: 'from-[#FF6B6B] to-[#E84393]',
  },
  {
    title: 'Hizmat',
    subtitle: 'Kuryerdan ta\'mirgacha',
    icon: Wrench,
    gradient: 'from-[#FF9F43] to-[#FF6B6B]',
  },
  {
    title: 'Maskan',
    subtitle: 'JKX, aqlli uy, lokatsiya',
    icon: MapPin,
    gradient: 'from-[#48D1CC] to-[#2D3A5D]',
  },
  {
    title: 'Mahsulot',
    subtitle: 'Tovarlar — 0% komissiya',
    icon: ShoppingBag,
    gradient: 'from-[#FF9F43] to-[#EE5253]',
  },
  {
    title: 'Mutaxassis',
    subtitle: 'Shifokor, yurist, maslahatchi',
    icon: GraduationCap,
    gradient: 'from-[#1DD1A1] to-[#10AC84]',
  },
  {
    title: 'Bilim',
    subtitle: 'Foydali bilimlar',
    icon: BookOpen,
    gradient: 'from-[#54A0FF] to-[#5F27CD]',
  },
  {
    title: 'G\'oyalar',
    subtitle: 'Tavsiyalar va maslahatlar',
    icon: Lightbulb,
    gradient: 'from-[#FF9F43] to-[#FF6B6B]',
  },
];

const MenuGrid = () => {
  return (
    <div className="px-5 pb-32 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {menuItems.map((item, index) => {
        const CardContent = (
          <div
            className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer aspect-square justify-center w-full h-full"
          >
            <div className={cn(
              "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center mb-4 shadow-inner",
              item.gradient
            )}>
              <item.icon size={30} className={item.textColor || "text-white"} />
            </div>
            <h3 className="text-[#1A1C1E] text-sm font-bold mb-1 leading-tight">
              {item.title}
            </h3>
            <p className="text-[#8E949A] text-[10px] font-medium leading-tight px-1 line-clamp-2">
              {item.subtitle}
            </p>
          </div>
        );

        if (item.title === 'Akkaunt') {
          return (
            <Link key={index} href="/akkaunt" className="w-full h-full">
              {CardContent}
            </Link>
          );
        }

        if (item.title === 'Maskan') {
          return (
            <Link key={index} href="/maskan" className="w-full h-full">
              {CardContent}
            </Link>
          );
        }

        if (item.title === 'Mutaxassis') {
          return (
            <Link key={index} href="/mutaxassis" className="w-full h-full">
              {CardContent}
            </Link>
          );
        }

        return (
          <div key={index} className="w-full h-full">
            {CardContent}
          </div>
        );
      })}
    </div>
  );
};

export default MenuGrid;
