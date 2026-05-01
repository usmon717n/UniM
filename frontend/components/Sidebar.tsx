'use client';

import { useRouter, usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Heart,
  Wrench,
  MapPin,
  MessageSquare,
  ShoppingBag,
  ShieldAlert,
  LogIn,
} from 'lucide-react';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';
import BrandLogo from '@/components/BrandLogo';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/', protected: false },
  { label: 'Akkaunt', icon: User, href: '/akkaunt', protected: true },
  { label: 'Suhbatlar', icon: MessageSquare, href: '/suhbatlar', protected: true },
  { label: 'Mahsulot', icon: ShoppingBag, href: '/mahsulot', protected: true },
  { label: 'Maskan', icon: MapPin, href: '/maskan', protected: true },
  { label: 'Yaqinlar', icon: Heart, href: '#', protected: true },
  { label: 'Xizmatlar', icon: Wrench, href: '#', protected: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  function handleNav(href: string, isProtected: boolean) {
    if (isProtected && !user) {
      openModal(href === '#' ? '/' : href);
      return;
    }
    if (href !== '#') router.push(href);
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-gray-100 flex-col z-40">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-3">
          <BrandLogo className="w-9 h-9 rounded-xl p-1 shadow-md shadow-teal-200/60 border border-gray-100" />
          <div className="leading-tight">
            <p className="text-[#1A1A1A] font-black text-xl tracking-tight leading-none">Avimed</p>
            <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
              Health Platform
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-3">
          Menyu
        </p>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <button
              key={item.label}
              onClick={() => handleNav(item.href, item.protected)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 text-left ${
                active
                  ? 'bg-teal-50 text-teal-700'
                  : 'text-[#6B7280] hover:bg-gray-50 hover:text-[#1A1A1A]'
              }`}
            >
              <item.icon
                size={16}
                strokeWidth={active ? 2.5 : 1.8}
                className={active ? 'text-teal-600' : ''}
              />
              {item.label}
              {active && (
                <div className="ml-auto w-1.5 h-1.5 bg-teal-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-5 pt-3 border-t border-gray-100 shrink-0 space-y-1">
        {user ? (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold">
                {user.name?.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) ?? '?'}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#1A1A1A] truncate leading-none">{user.name ?? 'Foydalanuvchi'}</p>
              <p className="text-[10px] text-gray-400 truncate mt-0.5">{user.email ?? ''}</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => openModal('/')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-teal-600 hover:bg-teal-50 transition-all"
          >
            <LogIn size={16} strokeWidth={2} />
            Kirish
          </button>
        )}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-bold text-red-500 hover:bg-red-50 transition-all">
          <ShieldAlert size={16} strokeWidth={2} />
          SOS Yordam
        </button>
      </div>
    </aside>
  );
}
