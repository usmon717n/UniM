'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { type SafeAdmin } from '../api/admin';

interface AdminAuthState {
  admin: SafeAdmin | null;
  token: string | null;
  isLoading: boolean;
}

interface AdminAuthContextValue extends AdminAuthState {
  setAdminAuth: (token: string, admin: SafeAdmin) => void;
  clearAdminAuth: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const TOKEN_KEY = 'avimed_admin_token';
const ADMIN_KEY = 'avimed_admin';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminAuthState>({
    admin: null,
    token: null,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const adminJson = localStorage.getItem(ADMIN_KEY);
      if (token && adminJson) {
        setState({ token, admin: JSON.parse(adminJson), isLoading: false });
        document.cookie = `avimed_admin_token=${token}; path=/; max-age=${8 * 60 * 60}; SameSite=Lax`;
        return;
      }
    } catch {
      // corrupted storage — ignore
    }
    setState((s) => ({ ...s, isLoading: false }));
  }, []);

  const setAdminAuth = useCallback((token: string, admin: SafeAdmin) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
    document.cookie = `avimed_admin_token=${token}; path=/; max-age=${8 * 60 * 60}; SameSite=Lax`;
    setState({ token, admin, isLoading: false });
  }, []);

  const clearAdminAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    document.cookie = 'avimed_admin_token=; path=/; max-age=0';
    setState({ token: null, admin: null, isLoading: false });
  }, []);

  return (
    <AdminAuthContext.Provider value={{ ...state, setAdminAuth, clearAdminAuth }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside AdminAuthProvider');
  return ctx;
}
