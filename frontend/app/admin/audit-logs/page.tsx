'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAdminAuth } from '@/lib/contexts/admin-auth-context';
import { apiGetAuditLogs, type AuditLog, type Paginated } from '@/lib/api/admin';
import AdminTopbar from '@/components/admin/AdminTopbar';
import {
  ClipboardList,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

const PAGE_SIZE = 30;

const ACTION_COLORS: Record<string, string> = {
  CREATE: 'bg-emerald-100 text-emerald-700',
  UPDATE: 'bg-blue-100 text-blue-700',
  DELETE: 'bg-red-100 text-red-700',
  BLOCK: 'bg-amber-100 text-amber-700',
  UNBLOCK: 'bg-teal-100 text-teal-700',
  LOGIN: 'bg-violet-100 text-violet-700',
};

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AuditLogsPage() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<Paginated<AuditLog> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);

  const fetchLogs = useCallback(
    async (p: number) => {
      if (!token) return;
      setLoading(true);
      setError('');
      try {
        const res = await apiGetAuditLogs(token, { page: p, limit: PAGE_SIZE });
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      } finally {
        setLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchLogs(page);
  }, [fetchLogs, page]);

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="flex flex-col h-full">
      <AdminTopbar title="Audit Log" />

      <div className="flex-1 p-6 overflow-auto">
        {error && (
          <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => fetchLogs(page)} className="font-medium hover:text-red-800">
              Qayta urinish
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-slate-400" />
              Admin harakatlari tarixi
            </h2>
            <button
              onClick={() => fetchLogs(page)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Yangilash
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Amal
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                    Ob'ekt
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Admin
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    IP manzil
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Vaqt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading
                  ? Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-5 py-3.5">
                          <Skeleton className="h-5 w-20 rounded-full" />
                        </td>
                        <td className="px-4 py-3.5 hidden sm:table-cell">
                          <Skeleton className="h-3 w-24" />
                        </td>
                        <td className="px-4 py-3.5 hidden md:table-cell">
                          <Skeleton className="h-3 w-28" />
                        </td>
                        <td className="px-4 py-3.5 hidden lg:table-cell">
                          <Skeleton className="h-3 w-20" />
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Skeleton className="h-3 w-28 ml-auto" />
                        </td>
                      </tr>
                    ))
                  : (data?.items ?? []).map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              ACTION_COLORS[log.action] ?? 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 hidden sm:table-cell">
                          <p className="text-slate-700 font-medium">{log.entity}</p>
                          {log.entityId && (
                            <p className="text-xs text-slate-400 font-mono truncate max-w-[120px]">
                              {log.entityId}
                            </p>
                          )}
                        </td>
                        <td className="px-4 py-3.5 hidden md:table-cell">
                          <p className="text-slate-700">{log.admin?.fullName ?? '—'}</p>
                          <p className="text-xs text-slate-400">{log.admin?.role ?? ''}</p>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 font-mono text-xs hidden lg:table-cell">
                          {log.ipAddress ?? '—'}
                        </td>
                        <td className="px-5 py-3.5 text-right text-xs text-slate-500">
                          {formatDate(log.createdAt)}
                        </td>
                      </tr>
                    ))}

                {!loading && (data?.items ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                      Audit yozuvlar topilmadi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.total > PAGE_SIZE && (
            <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
              <p className="text-xs text-slate-500">
                Jami {data.total} ta · {PAGE_SIZE * (page - 1) + 1}–
                {Math.min(PAGE_SIZE * page, data.total)} ko'rsatilmoqda
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-600 px-2">
                  {page} / {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
