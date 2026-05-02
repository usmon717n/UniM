'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useAdminAuth } from '@/lib/contexts/admin-auth-context';
import {
  apiGetUsers,
  apiToggleBlockUser,
  apiDeleteUser,
  type AdminUser,
  type Paginated,
} from '@/lib/api/admin';
import AdminTopbar from '@/components/admin/AdminTopbar';
import {
  Search,
  Filter,
  UserX,
  UserCheck,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_SIZE = 20;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded bg-slate-200 ${className}`} />;
}

function ConfirmDialog({
  message,
  onConfirm,
  onCancel,
  danger,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4"
      >
        <p className="text-sm text-slate-700 mb-5">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Bekor qilish
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
              danger ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            Tasdiqlash
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function UsersPage() {
  const { token } = useAdminAuth();
  const [data, setData] = useState<Paginated<AdminUser> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filterBlocked, setFilterBlocked] = useState<boolean | undefined>(undefined);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{
    type: 'block' | 'unblock' | 'delete';
    user: AdminUser;
  } | null>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchUsers = useCallback(
    async (p: number, s: string, blocked: boolean | undefined) => {
      if (!token) return;
      setLoading(true);
      setError('');
      try {
        const res = await apiGetUsers(token, {
          page: p,
          limit: PAGE_SIZE,
          search: s || undefined,
          isBlocked: blocked,
        });
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
    fetchUsers(page, search, filterBlocked);
  }, [fetchUsers, page, filterBlocked]);

  function handleSearchChange(val: string) {
    setSearch(val);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setPage(1);
      fetchUsers(1, val, filterBlocked);
    }, 400);
  }

  async function executeAction(type: 'block' | 'unblock' | 'delete', user: AdminUser) {
    if (!token) return;
    setActionLoading(user.id);
    try {
      if (type === 'delete') {
        await apiDeleteUser(token, user.id);
        setData((d) =>
          d ? { ...d, items: d.items.filter((u) => u.id !== user.id), total: d.total - 1 } : d,
        );
      } else {
        const updated = await apiToggleBlockUser(token, user.id);
        setData((d) =>
          d
            ? {
                ...d,
                items: d.items.map((u) => (u.id === user.id ? { ...u, isBlocked: updated.isBlocked } : u)),
              }
            : d,
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
    } finally {
      setActionLoading(null);
      setConfirm(null);
    }
  }

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="flex flex-col h-full">
      <AdminTopbar title="Foydalanuvchilar" />

      <div className="flex-1 p-6 overflow-auto">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Ism, email yoki telefon..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
            {(
              [
                { label: 'Barchasi', value: undefined },
                { label: 'Faol', value: false },
                { label: 'Bloklangan', value: true },
              ] as { label: string; value: boolean | undefined }[]
            ).map((f) => (
              <button
                key={String(f.value)}
                onClick={() => {
                  setFilterBlocked(f.value);
                  setPage(1);
                }}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  filterBlocked === f.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {f.label}
              </button>
            ))}
            <button
              onClick={() => fetchUsers(page, search, filterBlocked)}
              className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Foydalanuvchi
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                    Telefon
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Ro'yxatdan o'tgan
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Holat
                  </th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Amallar
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-full" />
                            <div className="space-y-1.5">
                              <Skeleton className="h-3 w-28" />
                              <Skeleton className="h-3 w-40" />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 hidden sm:table-cell">
                          <Skeleton className="h-3 w-28" />
                        </td>
                        <td className="px-4 py-3.5 hidden md:table-cell">
                          <Skeleton className="h-3 w-20" />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <Skeleton className="h-5 w-16 mx-auto rounded-full" />
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <Skeleton className="h-8 w-20 ml-auto rounded-lg" />
                        </td>
                      </tr>
                    ))
                  : (data?.items ?? []).map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-200 text-slate-500 text-sm font-semibold flex-shrink-0">
                              {(user.name ?? user.email ?? user.phoneNumber ?? '?')
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-slate-700">
                                {user.name ?? (
                                  <span className="text-slate-400 italic">Ism yo'q</span>
                                )}
                              </p>
                              <p className="text-xs text-slate-400 truncate max-w-[200px]">
                                {user.email ?? '—'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 hidden sm:table-cell">
                          {user.phoneNumber ?? '—'}
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 hidden md:table-cell">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.isBlocked
                                ? 'bg-red-100 text-red-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {user.isBlocked ? 'Bloklangan' : 'Faol'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1.5">
                            {actionLoading === user.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
                            ) : (
                              <>
                                <button
                                  onClick={() =>
                                    setConfirm({
                                      type: user.isBlocked ? 'unblock' : 'block',
                                      user,
                                    })
                                  }
                                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                    user.isBlocked
                                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                      : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                  }`}
                                >
                                  {user.isBlocked ? (
                                    <UserCheck className="w-3.5 h-3.5" />
                                  ) : (
                                    <UserX className="w-3.5 h-3.5" />
                                  )}
                                  {user.isBlocked ? 'Blokdan chiqar' : 'Bloklash'}
                                </button>
                                <button
                                  onClick={() => setConfirm({ type: 'delete', user })}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  O'chirish
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}

                {!loading && (data?.items ?? []).length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                      Foydalanuvchilar topilmadi
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
                Jami {data.total} ta ·{' '}
                {PAGE_SIZE * (page - 1) + 1}–{Math.min(PAGE_SIZE * page, data.total)} ko'rsatilmoqda
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

      {/* Confirm dialog */}
      <AnimatePresence>
        {confirm && (
          <ConfirmDialog
            message={
              confirm.type === 'delete'
                ? `"${confirm.user.name ?? confirm.user.email ?? confirm.user.id}" foydalanuvchini o'chirishni tasdiqlaysizmi? Bu amal qaytarib bo'lmaydi.`
                : confirm.type === 'block'
                ? `"${confirm.user.name ?? confirm.user.email ?? confirm.user.id}" foydalanuvchini bloklamoqchimisiz?`
                : `"${confirm.user.name ?? confirm.user.email ?? confirm.user.id}" foydalanuvchini blokdan chiqarmoqchimisiz?`
            }
            danger={confirm.type === 'delete'}
            onConfirm={() => executeAction(confirm.type, confirm.user)}
            onCancel={() => setConfirm(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
