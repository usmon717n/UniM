'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminAuth } from '@/lib/contexts/admin-auth-context';
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LogOut,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Foydalanuvchilar', icon: Users },
  { href: '/admin/audit-logs', label: 'Audit Log', icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, clearAdminAuth } = useAdminAuth();
  const router = useRouter();

  function handleLogout() {
    clearAdminAuth();
    router.push('/admin/login');
  }

  const roleLabel: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    MANAGER: 'Menejer',
    SUPPORT: 'Qo\'llab-quvvatlash',
  };

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 text-slate-100">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">Avimed</p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5 flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Admin info + logout */}
      <div className="px-4 py-4 border-t border-slate-800">
        {admin && (
          <div className="mb-3 px-2">
            <p className="text-sm font-semibold text-white truncate">{admin.fullName}</p>
            <p className="text-xs text-slate-400">{roleLabel[admin.role] ?? admin.role}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          <span>Chiqish</span>
        </button>
      </div>
    </aside>
  );
}
