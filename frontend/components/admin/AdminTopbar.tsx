'use client';

import { useAdminAuth } from '@/lib/contexts/admin-auth-context';
import { Bell } from 'lucide-react';

interface Props {
  title: string;
}

const roleLabel: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  MANAGER: 'Menejer',
  SUPPORT: 'Qo\'llab-quvvatlash',
};

export default function AdminTopbar({ title }: Props) {
  const { admin } = useAdminAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>

        {admin && (
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-semibold">
              {admin.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-700 leading-tight">{admin.fullName}</p>
              <p className="text-xs text-slate-400">{roleLabel[admin.role] ?? admin.role}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
