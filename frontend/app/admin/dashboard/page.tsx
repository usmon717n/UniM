'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '@/lib/contexts/admin-auth-context';
import { apiGetDashboardStats, type DashboardStats, type AdminUser } from '@/lib/api/admin';
import AdminTopbar from '@/components/admin/AdminTopbar';
import {
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  CheckCircle2,
  Activity,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { motion } from 'framer-motion';

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200 ${className}`} />;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export default function DashboardPage() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchStats = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const data = await apiGetDashboardStats(token);
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const cards = stats
    ? [
        { icon: Users, label: 'Jami foydalanuvchilar', value: stats.users.total, color: 'bg-blue-500', delay: 0 },
        { icon: TrendingUp, label: 'Bugun qo\'shilganlar', value: stats.users.newToday, color: 'bg-emerald-500', delay: 0.05 },
        { icon: UserCheck, label: 'Faol foydalanuvchilar', value: stats.users.active, color: 'bg-teal-500', delay: 0.1 },
        { icon: UserX, label: 'Bloklangan', value: stats.users.blocked, color: 'bg-red-500', delay: 0.15 },
        { icon: ClipboardList, label: 'Jami vazifalar', value: stats.planTasks.total, color: 'bg-violet-500', delay: 0.2 },
        { icon: CheckCircle2, label: 'Bajarilgan vazifalar', value: `${stats.planTasks.completionRate}%`, color: 'bg-amber-500', delay: 0.25 },
        { icon: Activity, label: 'Sog\'liq yozuvlari', value: stats.healthMetrics.total, color: 'bg-pink-500', delay: 0.3 },
        { icon: ShieldCheck, label: 'Faol adminlar', value: stats.admins.total, color: 'bg-indigo-500', delay: 0.35 },
      ]
    : [];

  return (
    <div className="flex flex-col h-full">
      <AdminTopbar title="Dashboard" />

      <div className="flex-1 p-6 overflow-auto">
        {error && (
          <div className="flex items-center gap-2 mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button
              onClick={fetchStats}
              className="flex items-center gap-1 hover:text-red-800 font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Qayta urinish
            </button>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-24" />)
            : cards.map((c) => <StatCard key={c.label} {...c} />)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent users */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700">So'nggi foydalanuvchilar</h2>
              <button
                onClick={fetchStats}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Yangilash
              </button>
            </div>

            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-44" />
                    </div>
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                ))}
              </div>
            ) : (stats?.recentUsers ?? []).length === 0 ? (
              <p className="text-slate-400 text-sm text-center py-10">
                Foydalanuvchilar yo'q
              </p>
            ) : (
              <div className="divide-y divide-slate-50">
                {(stats?.recentUsers ?? []).map((user: AdminUser) => (
                  <div key={user.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-sm font-semibold flex-shrink-0">
                      {(user.name ?? user.email ?? user.phoneNumber ?? '?')
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {user.name ?? (
                          <span className="italic text-slate-400">Ism yo'q</span>
                        )}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user.email ?? user.phoneNumber ?? user.id}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          user.isBlocked
                            ? 'bg-red-100 text-red-600'
                            : 'bg-emerald-100 text-emerald-600'
                        }`}
                      >
                        {user.isBlocked ? 'Bloklangan' : 'Faol'}
                      </span>
                      <span className="text-xs text-slate-400">{formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Plan tasks by type */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="text-sm font-semibold text-slate-700">Vazifalar statistikasi</h2>
            </div>

            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            ) : (
              <div className="p-5 space-y-4">
                {/* Completion rate bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Bajarilish darajasi</span>
                    <span className="font-semibold text-slate-700">
                      {stats?.planTasks.completionRate ?? 0}%
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats?.planTasks.completionRate ?? 0}%` }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-emerald-50 rounded-xl p-3">
                    <p className="text-xs text-emerald-600 mb-0.5">Bajarilgan</p>
                    <p className="text-xl font-bold text-emerald-700">
                      {stats?.planTasks.completed ?? 0}
                    </p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3">
                    <p className="text-xs text-amber-600 mb-0.5">Kutilmoqda</p>
                    <p className="text-xl font-bold text-amber-700">
                      {stats?.planTasks.pending ?? 0}
                    </p>
                  </div>
                </div>

                {(stats?.planTasks.byType ?? []).length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-xs text-slate-500 mb-2 font-medium">Turlar bo'yicha</p>
                    <div className="space-y-1.5">
                      {stats?.planTasks.byType.map(({ type, count }) => (
                        <div key={type} className="flex justify-between text-xs">
                          <span className="text-slate-600 capitalize">{type.toLowerCase()}</span>
                          <span className="font-semibold text-slate-700">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
