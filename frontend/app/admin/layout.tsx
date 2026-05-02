import type { ReactNode } from 'react';
import { AdminAuthProvider } from '@/lib/contexts/admin-auth-context';
import AdminShell from './AdminShell';

export const metadata = {
  title: 'Admin Panel — Avimed',
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
