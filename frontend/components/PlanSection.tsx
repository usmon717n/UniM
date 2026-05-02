'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pill, Droplets, Dumbbell, Check, ArrowRight, Sparkles, Clock3, Plus, Pencil, Trash2, X, Trophy } from 'lucide-react';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import {
  apiCompletePlanTask,
  apiCreatePlanTask,
  apiDeletePlanTask,
  apiGetPlanTasks,
  apiGetTodayPlan,
  apiUpdatePlanTask,
  apiUncompletePlanTask,
  type PlanTask,
  type PlanTaskType,
} from '@/lib/api/plan-tasks';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';
import { useT } from '@/lib/hooks/useT';

const TYPE_STYLES: Record<
  PlanTaskType,
  {
    icon: typeof Pill;
    gradient: string;
    glow: string;
  }
> = {
  MEDICINE: { icon: Pill, gradient: 'from-emerald-400 to-teal-500', glow: 'bg-emerald-400/20' },
  WATER: { icon: Droplets, gradient: 'from-blue-400 to-indigo-500', glow: 'bg-blue-400/20' },
  SPORT: { icon: Dumbbell, gradient: 'from-rose-400 to-orange-500', glow: 'bg-rose-400/20' },
  VITAMIN: { icon: Pill, gradient: 'from-amber-400 to-orange-500', glow: 'bg-amber-400/20' },
  CUSTOM: { icon: Pill, gradient: 'from-violet-400 to-fuchsia-500', glow: 'bg-violet-400/20' },
};

const PlanSection = () => {
  const { token } = useAuth();
  const { openModal } = useAuthModal();
  const tr = useT();
  const [plans, setPlans] = useState<PlanTask[]>([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('12:00');
  const [newType, setNewType] = useState<PlanTaskType>('CUSTOM');
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [allTasks, setAllTasks] = useState<PlanTask[]>([]);
  const [editingTask, setEditingTask] = useState<PlanTask | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editTime, setEditTime] = useState('12:00');
  const [isSavingEdit, setIsSavingEdit] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const loadTodayPlan = useCallback(async () => {
    if (!token) {
      setPlans([]);
      setProgressPercent(0);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await apiGetTodayPlan(token);
      setPlans(data.tasks);
      setProgressPercent(data.progress);
    } catch (e) {
      setError(e instanceof Error ? e.message : tr.plan.errors.loadFailed);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void loadTodayPlan();
  }, [loadTodayPlan]);

  useEffect(() => {
    if (!isCreateOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isCreating) {
        setIsCreateOpen(false);
        setCreateError(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCreateOpen, isCreating]);

  const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 300 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 4000);
  };

  const requireAuth = () => {
    if (token) return true;
    openModal('/');
    return false;
  };

  const toggleComplete = async (task: PlanTask) => {
    if (!requireAuth() || !token) return;

    // Optimistic Update: Update local state immediately for instant feedback
    const oldPlans = [...plans];
    const oldProgress = progressPercent;
    
    // Calculate new progress optimistically
    const newPlans = plans.map(p => 
      p.id === task.id ? { ...p, isCompleted: !p.isCompleted } : p
    );
    const completedCount = newPlans.filter(p => p.isCompleted).length;
    const newProgress = Math.round((completedCount / newPlans.length) * 100);

    setPlans(newPlans);
    setProgressPercent(newProgress);

    // Trigger celebration only if progress just reached 100%
    if (newProgress === 100 && oldProgress < 100) {
      triggerCelebration();
    }

    try {
      if (task.isCompleted) {
        await apiUncompletePlanTask(token, task.id);
      } else {
        await apiCompletePlanTask(token, task.id);
      }
      // Re-sync with server to be sure, but UI is already updated
      const data = await apiGetTodayPlan(token);
      setPlans(data.tasks);
      setProgressPercent(data.progress);
    } catch (e) {
      // Rollback on error
      setPlans(oldPlans);
      setProgressPercent(oldProgress);
      setError(e instanceof Error ? e.message : tr.plan.errors.updateFailed);
    }
  };

  const handleAddTask = () => {
    if (!requireAuth()) return;
    setNewTitle('');
    setNewTime('12:00');
    setNewType('CUSTOM');
    setError(null);
    setCreateError(null);
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    if (isCreating) return;
    setIsCreateOpen(false);
    setCreateError(null);
  };

  const handleCreateDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 90 || info.velocity.y > 700) {
      closeCreateModal();
    }
  };

  const handleCreateSubmit = async () => {
    if (!requireAuth() || !token) return;
    if (!newTitle.trim()) {
      setCreateError(tr.plan.errors.titleRequired);
      return;
    }
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(newTime)) {
      setCreateError(tr.plan.errors.timeFormat);
      return;
    }

    try {
      setIsCreating(true);
      setError(null);
      setCreateError(null);
      await apiCreatePlanTask(token, {
        title: newTitle.trim(),
        type: newType,
        scheduledTime: newTime.trim(),
        date: new Date().toISOString().slice(0, 10),
        repeatType: 'NONE',
      });
      setIsCreateOpen(false);
      await loadTodayPlan();
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : tr.plan.errors.createFailed);
    } finally {
      setIsCreating(false);
    }
  };

  const hasTasks = useMemo(() => plans.length > 0, [plans.length]);

  const loadAllTasks = useCallback(async () => {
    if (!token) return;
    try {
      const data = await apiGetPlanTasks(token);
      setAllTasks(data.items);
    } catch (e) {
      setError(e instanceof Error ? e.message : tr.plan.errors.loadFailed);
    }
  }, [token]);

  const openAllModal = async () => {
    if (!requireAuth()) return;
    setIsAllOpen(true);
    await loadAllTasks();
  };

  const handleDelete = async (task: PlanTask) => {
    if (!requireAuth() || !token) return;
    const ok = window.confirm(tr.plan.deleteConfirm(task.title));
    if (!ok) return;

    try {
      await apiDeletePlanTask(token, task.id);
      await Promise.all([loadTodayPlan(), loadAllTasks()]);
    } catch (e) {
      setError(e instanceof Error ? e.message : tr.plan.errors.deleteFailed);
    }
  };

  const openEdit = (task: PlanTask) => {
    if (!requireAuth()) return;
    setEditingTask(task);
    setEditTitle(task.title);
    setEditTime(task.scheduledTime);
  };

  const handleEditSave = async () => {
    if (!requireAuth() || !token || !editingTask) return;
    if (!editTitle.trim()) {
      setError(tr.plan.errors.titleRequired);
      return;
    }
    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(editTime)) {
      setError(tr.plan.errors.timeFormat);
      return;
    }

    try {
      setIsSavingEdit(true);
      await apiUpdatePlanTask(token, editingTask.id, {
        title: editTitle.trim(),
        scheduledTime: editTime.trim(),
      });
      setEditingTask(null);
      await Promise.all([loadTodayPlan(), loadAllTasks()]);
    } catch (e) {
      setError(e instanceof Error ? e.message : tr.plan.errors.saveFailed);
    } finally {
      setIsSavingEdit(false);
    }
  };

  return (
    <div className="mb-10">
      {/* Section Header & Progress */}
      <div className="px-5 mb-8">
        <div className="flex items-end justify-between mb-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[#0F172A] text-2xl font-black tracking-tight">
                {tr.plan.title}
              </h2>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 bg-teal-500/10 backdrop-blur-md px-3 py-1 rounded-full border border-teal-500/20"
              >
                <Sparkles size={12} className="text-teal-600 animate-pulse" />
                <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">{tr.plan.today}</span>
              </motion.div>
            </div>
            <p className="text-[#64748B] text-[13px] font-bold tracking-tight">{tr.plan.subtitle}</p>
          </div>
          
          <motion.button
            whileHover={{ x: 3 }}
            onClick={() => void openAllModal()}
            className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 text-teal-600 hover:bg-white/60 transition-all group shadow-sm"
          >
            <span className="text-[13px] font-black uppercase tracking-wider">{tr.plan.viewAll}</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </div>

        {/* Liquid Progress Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/30 backdrop-blur-2xl rounded-[28px] sm:rounded-[32px] p-5 sm:p-6 border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden group"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col gap-3 sm:gap-4">
            <div className="flex justify-between items-end">
              <div className="space-y-0.5 sm:space-y-1">
                <span className="text-[10px] sm:text-[11px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                <h4 className="text-slate-900 font-black text-sm sm:text-lg truncate max-w-[150px] sm:max-w-none">
                  {!token ? tr.plan.loginPrompt :
                   progressPercent === 100 ? tr.plan.allDone :
                   progressPercent > 50 ? tr.plan.halfway :
                   progressPercent > 0 ? tr.plan.greatStart : tr.plan.useTime}
                </h4>
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl sm:text-3xl font-black text-teal-600 leading-none">{progressPercent}</span>
                <span className="text-[12px] sm:text-sm font-black text-teal-600/60">%</span>
              </div>
            </div>

            <div className="relative h-2.5 sm:h-3 w-full bg-slate-200/50 rounded-full overflow-hidden border border-white/20">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ 
                  width: `${progressPercent}%`,
                  backgroundColor: progressPercent === 100 ? '#10b981' : // Emerald 500
                                  progressPercent > 70 ? '#10b981' :    // Emerald 500
                                  progressPercent > 35 ? '#f59e0b' :    // Amber 500
                                  '#f43f5e'                            // Rose 500
                }}
                transition={{ 
                  width: { type: "spring", stiffness: 100, damping: 20 },
                  backgroundColor: { duration: 0.8 }
                }}
                className={cn(
                  "h-full relative shadow-[0_0_15px_rgba(20,184,166,0.3)]",
                  progressPercent === 100 && "shadow-[0_0_25px_rgba(16,185,129,0.5)]"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {error && (
        <div className="px-5 mb-4">
          <div className="rounded-2xl border border-red-100 bg-red-50/50 backdrop-blur-md px-4 py-3 text-sm font-bold text-red-600">
            {error}
          </div>
        </div>
      )}

      {/* Horizontal Carousel */}
      <div className="flex overflow-x-auto gap-3 sm:gap-4 px-4 sm:px-5 pb-6 no-scrollbar snap-x snap-mandatory">
        {isLoading && plans.length === 0 && (
          <div className="flex-shrink-0 w-[160px] sm:w-[200px] snap-start rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 bg-white border border-white text-sm text-gray-500">
            {tr.plan.loading}
          </div>
        )}

        {!token && (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => openModal('/')}
            className="flex-shrink-0 w-[260px] snap-start rounded-[24px] sm:rounded-[32px] p-5 bg-white/50 backdrop-blur-xl border border-white/60 text-left shadow-sm"
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
              <Sparkles size={20} strokeWidth={2.2} />
            </div>
            <h3 className="text-[15px] font-black text-slate-900">{tr.plan.locked}</h3>
            <p className="mt-1 text-[12px] font-semibold leading-relaxed text-slate-500">
              {tr.plan.lockedDesc}
            </p>
          </motion.button>
        )}

        {token && !isLoading && !hasTasks && (
          <div className="flex-shrink-0 w-[240px] snap-start rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 bg-white border border-white text-sm text-gray-500">
            {tr.plan.noTasks}
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {token && plans.map((plan) => {
            const style = TYPE_STYLES[plan.type];
            return (
              <motion.div
                layout
                key={plan.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => void toggleComplete(plan)}
                className={cn(
                  "flex-shrink-0 w-[160px] sm:w-[200px] snap-start relative group cursor-pointer overflow-hidden",
                  "bg-white/20 backdrop-blur-2xl rounded-[24px] sm:rounded-[32px] p-4 sm:p-5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-white/40",
                  "hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:bg-white/30 transition-all duration-500",
                  plan.isCompleted && "bg-emerald-500/10 border-emerald-500/20"
                )}
              >
                {/* Glass Sheen Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                
                <div className="flex flex-col gap-4 sm:gap-5 relative z-10">
                  {/* Top Row: Icon & Checkbox */}
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className={cn(
                        "absolute -inset-2 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                        style.glow
                      )} />
                      <div className={cn(
                        "relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md bg-gradient-to-br transition-transform duration-500 group-hover:scale-110",
                        style.gradient
                      )}>
                        <style.icon size={18} className="text-white sm:hidden" />
                        <style.icon size={22} className="text-white hidden sm:block" />
                      </div>
                    </div>

                    {/* Custom Checkbox (Glassy) */}
                    <div className={cn(
                      "w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center backdrop-blur-md",
                      plan.isCompleted 
                        ? "bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-110" 
                        : "bg-white/20 border-white/40 group-hover:border-teal-400"
                    )}>
                      <AnimatePresence>
                        {plan.isCompleted && (
                          <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 45 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          >
                            <Check size={14} className="text-white sm:hidden" />
                            <Check size={16} className="text-white hidden sm:block" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Bottom Section: Text */}
                  <div className="space-y-1 sm:space-y-1.5">
                    <h3 className={cn(
                      "text-[#1A1C1E] text-[14px] sm:text-[15px] font-black leading-tight transition-all duration-300 truncate",
                      plan.isCompleted && "text-gray-400 line-through decoration-emerald-500/50 decoration-2"
                    )}>
                      {plan.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-1 h-1 rounded-full transition-colors duration-300",
                        plan.isCompleted ? "bg-gray-300" : "bg-teal-500"
                      )} />
                      <span className="text-[#8E949A] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] sm:tracking-[0.15em]">
                        {plan.scheduledTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Completion Ripple (Glassy) */}
                <AnimatePresence>
                  {plan.isCompleted && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-emerald-500/5 pointer-events-none" 
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Add Task Placeholder */}
        {token && (
          <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => void handleAddTask()}
            className="flex-shrink-0 w-[120px] snap-start border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center gap-2 group cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-teal-500 shadow-sm transition-all">
              <Plus size={20} strokeWidth={2.2} />
            </div>
            <span className="text-[11px] font-bold text-gray-400 group-hover:text-teal-600 uppercase tracking-widest">{tr.plan.addNew}</span>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {isCreateOpen && (
          <motion.div
            className="fixed inset-0 z-[220] flex items-end justify-center p-0 sm:p-4"
            initial={false}
          >
            <motion.button
              type="button"
              aria-label="close"
              onClick={closeCreateModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-[10px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              drag="y"
              dragDirectionLock
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.28 }}
              onDragEnd={handleCreateDragEnd}
              initial={{ y: '100%', opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: '105%', opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 360, damping: 32, mass: 0.9 }}
              className="relative w-full max-w-md max-h-[calc(100dvh-16px)] overflow-y-auto rounded-t-[32px] rounded-b-none border border-white/60 bg-white/95 p-6 pb-[calc(24px+env(safe-area-inset-bottom))] shadow-[0_30px_90px_rgba(15,23,42,0.24)] backdrop-blur-xl sm:max-h-[calc(100dvh-48px)] sm:rounded-[28px]"
            >
              <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-slate-300/80" />

              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">{tr.plan.title}</p>
                  <h3 className="mt-1 text-xl font-black text-slate-900">{tr.plan.addTitle}</h3>
                </div>
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 active:scale-95"
                >
                  <X size={18} />
                </button>
              </div>

              {createError && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
                >
                  {createError}
                </motion.div>
              )}

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{tr.plan.taskName}</span>
                  <input
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                      setCreateError(null);
                    }}
                    placeholder={tr.plan.placeholder}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                  />
                </label>

                {/* Category/Icon Selector */}
                <div className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">{tr.plan.category}</span>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(TYPE_STYLES) as PlanTaskType[]).map((type) => {
                      const style = TYPE_STYLES[type];
                      const isSelected = newType === type;
                      return (
                        <motion.button
                          key={type}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setNewType(type)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300",
                            isSelected 
                              ? "bg-white border-teal-500 shadow-md shadow-teal-500/10 ring-2 ring-teal-500/10" 
                              : "bg-slate-50 border-slate-200 hover:border-slate-300"
                          )}
                        >
                          <div className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gradient-to-br",
                            style.gradient
                          )}>
                            <style.icon size={16} />
                          </div>
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-wider",
                            isSelected ? "text-slate-900" : "text-slate-500"
                          )}>
                            {tr.plan.types[type]}
                          </span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <Clock3 size={13} />
                    {tr.plan.time}
                  </span>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => {
                      setNewTime(e.target.value);
                      setCreateError(null);
                    }}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                  />
                </label>
              </div>

              <div className="mt-6 flex gap-2.5">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={closeCreateModal}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  {tr.plan.cancel}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  disabled={isCreating}
                  onClick={() => void handleCreateSubmit()}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(16,185,129,0.25)] transition hover:from-teal-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isCreating ? tr.plan.saving : tr.plan.save}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAllOpen && (
        <div className="fixed inset-0 z-[220] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="close-all"
            onClick={() => setIsAllOpen(false)}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/70 bg-white p-5 shadow-[0_30px_80px_rgba(2,132,199,0.18)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">{tr.plan.allPlans}</h3>
              <button onClick={() => setIsAllOpen(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              {allTasks.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                  {tr.plan.noPlans}
                </div>
              )}
              {allTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{task.title}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {task.type} • {task.scheduledTime}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(task)}
                      className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                      title={tr.plan.editTask}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => void handleDelete(task)}
                      className="rounded-xl border border-red-200 p-2 text-red-600 hover:bg-red-50"
                      title={tr.plan.deleteBtn}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {editingTask && (
        <div className="fixed inset-0 z-[230] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="close-edit"
            onClick={() => setEditingTask(null)}
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white p-6 shadow-[0_30px_80px_rgba(2,132,199,0.18)]">
            <h3 className="text-lg font-black text-slate-900">{tr.plan.editTask}</h3>
            <div className="mt-4 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{tr.plan.taskName}</span>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">{tr.plan.time}</span>
                <input
                  type="time"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
                />
              </label>
            </div>
            <div className="mt-6 flex gap-2.5">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                {tr.plan.cancel}
              </button>
              <button
                type="button"
                disabled={isSavingEdit}
                onClick={() => void handleEditSave()}
                className="flex-1 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-sm font-black text-white shadow-[0_12px_24px_rgba(16,185,129,0.25)] transition hover:from-teal-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSavingEdit ? tr.plan.saving : tr.plan.save}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white/85 backdrop-blur-3xl rounded-[32px] sm:rounded-[40px] border border-white p-6 sm:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.12)] flex flex-col items-center text-center w-full max-w-[280px] sm:max-w-xs"
            >
              <div className="relative mb-4 sm:mb-6">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl sm:rounded-3xl flex items-center justify-center text-white shadow-lg shadow-amber-500/20"
                >
                  <Trophy size={32} className="sm:hidden" strokeWidth={2.5} />
                  <Trophy size={40} className="hidden sm:block" strokeWidth={2.5} />
                </motion.div>
                <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-full flex items-center justify-center text-white border-[3px] sm:border-4 border-white shadow-md">
                  <Check size={12} className="sm:hidden" strokeWidth={4} />
                  <Check size={16} className="hidden sm:block" strokeWidth={4} />
                </div>
              </div>
              <div className="mb-1.5 sm:mb-2 flex items-center justify-center gap-2">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {tr.plan.congrats}
                </h4>
                <Sparkles size={20} className="text-amber-500" strokeWidth={2.4} />
              </div>
              <p className="text-slate-500 font-bold text-[12px] sm:text-sm">
                {tr.plan.allComplete}
              </p>
              <div className="mt-4 sm:mt-6 flex items-center gap-2">
                <div className="h-1 w-10 sm:w-12 bg-teal-500 rounded-full opacity-50" />
                <Sparkles size={14} className="text-amber-500 animate-pulse" />
                <div className="h-1 w-10 sm:w-12 bg-teal-500 rounded-full opacity-50" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanSection;
