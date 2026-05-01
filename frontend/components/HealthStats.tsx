'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Heart, Footprints, Moon, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/contexts/auth-context';
import {
  apiGetHealthSummary,
  type HealthSummary,
  type MetricType,
} from '@/lib/api/health';
import { LogMetricModal } from './LogMetricModal';

// ── Status helpers ─────────────────────────────────────────────────────────

const HR_STATUS = {
  low:    { label: 'Past',    ring: 'ring-yellow-300/60', dot: 'bg-yellow-400' },
  normal: { label: 'Normal',  ring: 'ring-green-300/60',  dot: 'bg-green-400'  },
  high:   { label: 'Yuqori',  ring: 'ring-red-300/60',    dot: 'bg-red-400'    },
} as const;

const STEPS_STATUS = {
  behind:   { label: 'Orqada',   color: 'text-gray-400'    },
  on_track: { label: 'Yo\'lda',  color: 'text-teal-500'    },
  exceeded: { label: 'Bajarildi',color: 'text-emerald-600' },
} as const;

const SLEEP_STATUS = {
  short: { label: 'Kam', color: 'text-orange-500' },
  good:  { label: 'Yaxshi', color: 'text-violet-600' },
  long:  { label: 'Ko\'p',  color: 'text-blue-500'  },
} as const;

const STEPS_GOAL = 10_000;

// ── Skeleton ───────────────────────────────────────────────────────────────

function Skeleton({ className }: { className: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-gray-100 ${className}`} />
  );
}

// ── Main component ─────────────────────────────────────────────────────────

const HealthStats = () => {
  const { token } = useAuth();
  const [data, setData] = useState<HealthSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [logOpen, setLogOpen] = useState(false);
  const [logDefaultType, setLogDefaultType] = useState<MetricType>('HEART_RATE');

  const fetchSummary = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const summary = await apiGetHealthSummary(token);
      setData(summary);
    } catch {
      // silent — show demo values
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  function openLog(type: MetricType) {
    setLogDefaultType(type);
    setLogOpen(true);
  }

  // ── Derived display values ─────────────────────────────────────────────

  const hr = data?.heartRate;
  const steps = data?.steps;
  const sleep = data?.sleep;

  const hrStatus = hr ? HR_STATUS[hr.status] : null;
  const stepsStatusInfo = steps ? STEPS_STATUS[steps.status] : null;
  const sleepStatusInfo = sleep ? SLEEP_STATUS[sleep.status] : null;

  return (
    <>
      <div className="px-5 mb-8">
        <div className="bg-[#FDFDFD] rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-white/80 overflow-hidden relative">

          {/* Subtle glows */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-50/30 blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-rose-50/30 blur-[60px] pointer-events-none" />

          {/* Log button */}
          {token && (
            <button
              onClick={() => openLog('HEART_RATE')}
              className="absolute top-4 right-4 z-10 w-7 h-7 rounded-xl bg-gray-100 hover:bg-teal-50 hover:text-teal-600 text-gray-400 flex items-center justify-center transition-all duration-200 active:scale-90"
              title="Yangi ma'lumot kiritish"
            >
              <Plus size={14} strokeWidth={2.5} />
            </button>
          )}

          {/* ── Main 3-column row ── */}
          <div className="p-6 sm:p-7 flex items-center justify-between">

            {/* Heart Rate */}
            <div
              className="flex flex-col items-center flex-1 group cursor-pointer"
              onClick={() => token && openLog('HEART_RATE')}
            >
              <div className="relative mb-3">
                <div
                  className={`w-12 h-12 rounded-full bg-[#FFF5F5] flex items-center justify-center text-[#E31E24] shadow-inner transition-all duration-500 group-hover:scale-110 ring-2 ${
                    hrStatus?.ring ?? 'ring-transparent'
                  }`}
                >
                  <Heart size={22} fill="currentColor" className="drop-shadow-[0_2px_4px_rgba(227,30,36,0.2)]" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>
                {/* Live pulse dot */}
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#FDFDFD] shadow-[0_0_8px_rgba(96,165,250,0.6)] ${
                    hrStatus?.dot ?? 'bg-blue-400'
                  }`}
                />
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1 opacity-80">
                Yurak urishi
              </p>
              {loading ? (
                <Skeleton className="w-12 h-7" />
              ) : (
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[#334155] text-xl sm:text-2xl font-black tracking-tight">
                    {hr ? hr.value : 72}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-bold">bpm</span>
                </div>
              )}
            </div>

            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-gray-100/60 to-transparent mx-1" />

            {/* Steps */}
            <div
              className="flex flex-col items-center flex-1 group cursor-pointer"
              onClick={() => token && openLog('STEPS')}
            >
              <div className="relative mb-3">
                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center text-[#10B981] shadow-inner transition-all duration-500 group-hover:scale-110">
                  <Footprints size={22} className="drop-shadow-[0_2px_4px_rgba(16,185,129,0.2)]" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1 opacity-80">
                Qadamlar
              </p>
              {loading ? (
                <Skeleton className="w-16 h-7" />
              ) : (
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[#334155] text-xl sm:text-2xl font-black tracking-tight">
                    {steps ? steps.value.toLocaleString() : '6,842'}
                  </span>
                </div>
              )}
            </div>

            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-gray-100/60 to-transparent mx-1" />

            {/* Sleep */}
            <div
              className="flex flex-col items-center flex-1 group cursor-pointer"
              onClick={() => token && openLog('SLEEP')}
            >
              <div className="relative mb-3">
                <div className="w-12 h-12 rounded-full bg-[#F5F3FF] flex items-center justify-center text-[#8B5CF6] shadow-inner transition-all duration-500 group-hover:scale-110">
                  <Moon size={22} fill="currentColor" className="drop-shadow-[0_2px_4px_rgba(139,92,246,0.2)]" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-semibold uppercase tracking-wider mb-1 opacity-80">
                Uyqu
              </p>
              {loading ? (
                <Skeleton className="w-10 h-7" />
              ) : (
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-[#334155] text-xl sm:text-2xl font-black tracking-tight">
                    {sleep ? sleep.value : '7.2'}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-bold">h</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Detail footer (only when real data present) ── */}
          <AnimatePresence>
            {data && (hr || steps || sleep) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 space-y-3 border-t border-gray-50">

                  {/* Steps progress bar */}
                  {steps && (
                    <div className="pt-4">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[11px] font-bold ${stepsStatusInfo?.color}`}>
                          {stepsStatusInfo?.label}
                        </span>
                        <span className="text-[11px] font-bold text-[#94A3B8]">
                          {steps.value.toLocaleString()} / {STEPS_GOAL.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${steps.progress}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                          className={`h-full rounded-full ${
                            steps.status === 'exceeded'
                              ? 'bg-gradient-to-r from-emerald-400 to-green-500'
                              : steps.status === 'on_track'
                              ? 'bg-gradient-to-r from-teal-400 to-emerald-500'
                              : 'bg-gradient-to-r from-gray-300 to-gray-400'
                          }`}
                        />
                      </div>
                      <div className="flex gap-3 mt-2">
                        <span className="text-[10px] text-[#94A3B8] font-semibold">
                          📍 {steps.distanceKm} km
                        </span>
                        <span className="text-[10px] text-[#94A3B8] font-semibold">
                          🔥 {steps.calories} kcal
                        </span>
                        <span className="text-[10px] text-[#94A3B8] font-semibold">
                          {steps.progress.toFixed(0)}% bajarildi
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Heart Rate + Sleep inline pills */}
                  {(hr || sleep) && (
                    <div className="flex gap-2 flex-wrap">
                      {hr && (
                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${hrStatus?.dot ?? 'bg-gray-300'}`} />
                          <span className="text-[11px] font-bold text-[#334155]">
                            {hrStatus?.label}
                          </span>
                          {hr.weeklyAvg && (
                            <span className="text-[10px] text-[#94A3B8]">
                              · 7 kun o'rt: {hr.weeklyAvg} bpm
                            </span>
                          )}
                        </div>
                      )}
                      {sleep && (
                        <div className="flex items-center gap-1.5 bg-gray-50 rounded-xl px-3 py-1.5">
                          <span className={`text-[11px] font-bold ${sleepStatusInfo?.color}`}>
                            {sleepStatusInfo?.label}
                          </span>
                          <span className="text-[10px] text-[#94A3B8]">
                            · Sifat: {sleep.qualityScore}/100
                          </span>
                          {sleep.sleepDebt > 0 && (
                            <span className="text-[10px] text-orange-400 font-semibold">
                              · −{sleep.sleepDebt}h qarz
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* No data hint (logged in but no records yet) */}
          {token && !loading && data && !hr && !steps && !sleep && (
            <div className="px-6 pb-5 pt-0">
              <button
                onClick={() => openLog('HEART_RATE')}
                className="w-full py-2.5 rounded-2xl border border-dashed border-gray-200 text-[12px] font-semibold text-gray-400 hover:border-teal-300 hover:text-teal-500 transition-all duration-200"
              >
                + Bugungi ko'rsatkichlarni kiriting
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Log Modal */}
      <LogMetricModal
        isOpen={logOpen}
        defaultType={logDefaultType}
        onClose={() => setLogOpen(false)}
        onSaved={fetchSummary}
      />
    </>
  );
};

export default HealthStats;
