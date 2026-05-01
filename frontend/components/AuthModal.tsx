'use client';

import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Loader2, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { apiLogin, apiRegister, type AuthUser } from '@/lib/api/auth';
import { useAuth } from '@/lib/contexts/auth-context';
import { useAuthModal } from '@/lib/contexts/auth-modal-context';
import BrandLogo from '@/components/BrandLogo';

const PHONE_RE = /^\+998\d{9}$/;

function normalizePhone(raw: string): string {
  const c = raw.replace(/[\s\-\(\)]/g, '');
  if (PHONE_RE.test(c)) return c;
  if (/^998\d{9}$/.test(c)) return '+' + c;
  if (/^0\d{9}$/.test(c)) return '+998' + c.slice(1);
  if (/^\d{9}$/.test(c)) return '+998' + c;
  return c;
}

function looksLikePhone(v: string): boolean {
  return PHONE_RE.test(normalizePhone(v.replace(/[\s\-\(\)]/g, '')));
}

// ── Schemas ────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email yoki telefon raqam kiritilishi shart'),
  password: z.string().min(1, 'Parol kiritilishi shart'),
});

const registerEmailSchema = z.object({
  method: z.literal('email'),
  name: z.string().min(2, 'Ism kamida 2 ta belgi').optional(),
  email: z.string().email('Email noto\'g\'ri'),
  password: z
    .string()
    .min(8, 'Kamida 8 ta belgi')
    .regex(/[a-zA-Z]/, 'Harf bo\'lishi shart')
    .regex(/\d/, 'Raqam bo\'lishi shart'),
});

const registerPhoneSchema = z.object({
  method: z.literal('phone'),
  name: z.string().min(2, 'Ism kamida 2 ta belgi').optional(),
  phoneNumber: z
    .string()
    .min(1, 'Telefon raqam kiritilishi shart')
    .transform((v) => normalizePhone(v))
    .refine((v) => PHONE_RE.test(v), 'Telefon: +998901234567 formatida kiriting'),
  password: z
    .string()
    .min(8, 'Kamida 8 ta belgi')
    .regex(/[a-zA-Z]/, 'Harf bo\'lishi shart')
    .regex(/\d/, 'Raqam bo\'lishi shart'),
});

type FieldErrors = Record<string, string | undefined>;
type RegMethod = 'email' | 'phone';

// ── Component ──────────────────────────────────────────────────────────────

export function AuthModal() {
  const { isOpen, from, initialTab, closeModal } = useAuthModal();
  const { setAuth } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [regMethod, setRegMethod] = useState<RegMethod>('email');

  useEffect(() => {
    if (isOpen) setTab(initialTab);
  }, [isOpen, initialTab]);

  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [loginValues, setLoginValues] = useState({ identifier: '', password: '' });
  const [registerValues, setRegisterValues] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  if (!isOpen) return null;

  function switchTab(t: 'login' | 'register') {
    setTab(t);
    setFieldErrors({});
    setServerError('');
  }

  function onSuccess(token: string, user: AuthUser) {
    setAuth(token, user);
    closeModal();
    router.push(from);
  }

  // ── Login submit ─────────────────────────────────────────────────────────

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = loginSchema.safeParse(loginValues);
    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((i) => {
        if (!errs[String(i.path[0])]) errs[String(i.path[0])] = i.message;
      });
      setFieldErrors(errs);
      return;
    }
    const { identifier, password } = result.data;
    const normalizedIdentifier = looksLikePhone(identifier)
      ? normalizePhone(identifier)
      : identifier;

    startTransition(async () => {
      try {
        const data = await apiLogin({ identifier: normalizedIdentifier, password });
        onSuccess(data.accessToken, data.user);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      }
    });
  }

  // ── Register submit ──────────────────────────────────────────────────────

  function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault();
    const raw = { method: regMethod, ...registerValues };

    const schema = regMethod === 'email' ? registerEmailSchema : registerPhoneSchema;
    const result = schema.safeParse(raw);

    if (!result.success) {
      const errs: FieldErrors = {};
      result.error.issues.forEach((i) => {
        if (!errs[String(i.path[0])]) errs[String(i.path[0])] = i.message;
      });
      setFieldErrors(errs);
      return;
    }

    const { name, password } = result.data;
    const payload =
      regMethod === 'email'
        ? {
            name: name || undefined,
            email: (result.data as { email: string }).email,
            password,
          }
        : {
            name: name || undefined,
            phoneNumber: (result.data as { phoneNumber: string }).phoneNumber,
            password,
          };

    startTransition(async () => {
      try {
        const data = await apiRegister(payload);
        onSuccess(data.accessToken, data.user);
      } catch (err) {
        setServerError(err instanceof Error ? err.message : 'Xatolik yuz berdi');
      }
    });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────

  const inputCls = (field: string) =>
    `w-full h-12 pl-11 pr-4 rounded-2xl border text-sm font-medium text-[#1A1A1A] placeholder-gray-400 outline-none transition-all duration-300 ${
      fieldErrors[field]
        ? 'border-red-200 bg-red-50/30 focus:border-red-400 focus:ring-4 focus:ring-red-500/10'
        : 'border-gray-100 bg-gray-50/50 focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 focus:bg-white'
    }`;

  const clearError = (field: string) =>
    setFieldErrors((x) => ({ ...x, [field]: undefined }));

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1C1E]/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={closeModal}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-sm bg-white rounded-[32px] shadow-[0_24px_48px_rgba(0,0,0,0.15)] border border-white overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-teal-500 to-emerald-500 rounded-2xl blur-sm opacity-20" />
                <BrandLogo className="relative w-10 h-10 rounded-2xl p-1 shadow-lg border border-white/20" />
              </div>
              <div>
                <span className="block font-black text-[#1A1A1A] text-xl leading-none">Avimed</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Shu yerda va Hozir
                </span>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-300 active:scale-90"
            >
              <X size={18} />
            </button>
          </div>

          {/* Login / Register tabs */}
          <div className="flex bg-gray-50/80 rounded-2xl p-1 gap-1 border border-gray-100/50 relative">
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm border border-gray-100/50 transition-all duration-500 ease-out ${
                tab === 'register' ? 'translate-x-full' : 'translate-x-0'
              }`}
            />
            {(['login', 'register'] as const).map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`relative flex-1 py-2.5 text-[13px] font-bold transition-all duration-300 z-10 ${
                  tab === t ? 'text-teal-600' : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                {t === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"}
              </button>
            ))}
          </div>
        </div>

        {/* Form body */}
        <div className="px-8 pb-8 pt-2">
          {serverError && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold rounded-2xl px-4 py-3 mb-4 border border-red-100 animate-in shake duration-500">
              {serverError}
            </div>
          )}

          {/* ── LOGIN ── */}
          {tab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Identifier (email or phone) */}
              <div className="group">
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Email yoki telefon raqam"
                    autoComplete="username"
                    value={loginValues.identifier}
                    onChange={(e) => {
                      setLoginValues((v) => ({ ...v, identifier: e.target.value }));
                      clearError('identifier');
                      setServerError('');
                    }}
                    className={inputCls('identifier')}
                  />
                </div>
                {fieldErrors.identifier && (
                  <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">
                    {fieldErrors.identifier}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="group">
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Parol"
                    autoComplete="current-password"
                    value={loginValues.password}
                    onChange={(e) => {
                      setLoginValues((v) => ({ ...v, password: e.target.value }));
                      clearError('password');
                      setServerError('');
                    }}
                    className={`${inputCls('password')} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-teal-500 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  className="text-[12px] font-bold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  Parolni unutdingizmi?
                </button>
              </div>

              <SubmitButton isPending={isPending} label="Kirish" />
            </form>
          ) : (
            /* ── REGISTER ── */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Email / Phone toggle */}
              <div className="flex bg-gray-50/80 rounded-2xl p-1 gap-1 border border-gray-100/50 relative">
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm border border-gray-100/50 transition-all duration-500 ease-out ${
                    regMethod === 'phone' ? 'translate-x-full' : 'translate-x-0'
                  }`}
                />
                {(['email', 'phone'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setRegMethod(m);
                      setFieldErrors({});
                      setServerError('');
                    }}
                    className={`relative flex-1 py-2 text-[12px] font-bold transition-all duration-300 z-10 flex items-center justify-center gap-1.5 ${
                      regMethod === m ? 'text-teal-600' : 'text-gray-400 hover:text-gray-500'
                    }`}
                  >
                    {m === 'email' ? (
                      <>
                        <Mail size={13} /> Email
                      </>
                    ) : (
                      <>
                        <Phone size={13} /> Telefon
                      </>
                    )}
                  </button>
                ))}
              </div>

              {/* Name (optional) */}
              <div className="group">
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="To'liq ismingiz (ixtiyoriy)"
                    value={registerValues.name}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, name: e.target.value }));
                      clearError('name');
                      setServerError('');
                    }}
                    className={inputCls('name')}
                  />
                </div>
                {fieldErrors.name && (
                  <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email OR Phone input */}
              {regMethod === 'email' ? (
                <div className="group">
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email manzilingiz"
                      autoComplete="email"
                      value={registerValues.email}
                      onChange={(e) => {
                        setRegisterValues((v) => ({ ...v, email: e.target.value }));
                        clearError('email');
                        setServerError('');
                      }}
                      className={inputCls('email')}
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>
              ) : (
                <div className="group">
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors"
                    />
                    {/* +998 prefix badge */}
                    <span className="absolute left-10 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 pointer-events-none select-none">
                      +998
                    </span>
                    <input
                      type="tel"
                      placeholder="90 123 45 67"
                      autoComplete="tel"
                      value={registerValues.phoneNumber.replace(/^\+998/, '')}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                        setRegisterValues((v) => ({ ...v, phoneNumber: digits }));
                        clearError('phoneNumber');
                        setServerError('');
                      }}
                      className={`${inputCls('phoneNumber')} pl-[4.5rem]`}
                    />
                  </div>
                  {fieldErrors.phoneNumber && (
                    <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">
                      {fieldErrors.phoneNumber}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div className="group">
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-teal-500 transition-colors"
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Parol yarating"
                    autoComplete="new-password"
                    value={registerValues.password}
                    onChange={(e) => {
                      setRegisterValues((v) => ({ ...v, password: e.target.value }));
                      clearError('password');
                      setServerError('');
                    }}
                    className={`${inputCls('password')} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-teal-500 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p className="text-[11px] font-bold text-red-500 mt-1.5 ml-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <SubmitButton isPending={isPending} label="Ro'yxatdan o'tish" />
            </form>
          )}

          <p className="text-center text-[12px] text-gray-400 mt-6 font-medium">
            Tizimdan foydalanib, siz{' '}
            <button className="text-teal-600 hover:underline">Shartlarimizga</button> rozilik
            bildirasiz.
          </p>
        </div>
      </div>
    </div>
  );
}

function SubmitButton({ isPending, label }: { isPending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="group relative w-full h-12 rounded-[20px] bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-[14px] font-bold hover:shadow-lg hover:shadow-teal-500/25 active:scale-[0.97] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2 mt-2 overflow-hidden"
    >
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      {isPending ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <>
          <span>{label}</span>
          <Sparkles size={14} className="opacity-70" />
        </>
      )}
    </button>
  );
}
