const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export interface SafeAdmin {
  id: string;
  email: string;
  username: string;
  fullName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'SUPPORT';
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

export interface AdminAuthResponse {
  accessToken: string;
  admin: SafeAdmin;
}

export interface DashboardStats {
  users: {
    total: number;
    newToday: number;
    blocked: number;
    active: number;
  };
  planTasks: {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
    byType: { type: string; count: number }[];
  };
  healthMetrics: { total: number };
  admins: { total: number };
  recentUsers: AdminUser[];
}

export interface AdminUser {
  id: string;
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  isBlocked: boolean;
  createdAt: string;
  _count?: { planTasks: number; healthMetrics: number };
}

export interface Paginated<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: T[];
}

export interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  entity: string;
  entityId: string | null;
  oldValues: Record<string, unknown> | null;
  newValues: Record<string, unknown> | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
  admin?: { id: string; fullName: string; email: string; role: string };
}

async function request<T>(
  path: string,
  options: RequestInit,
  token?: string,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Server bilan bog\'lanib bo\'lmadi');
  }

  const contentType = res.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    if (isJson && data) {
      const msg = Array.isArray(data.message) ? data.message[0] : data.message;
      throw new Error(msg ?? 'Xatolik yuz berdi');
    }
    throw new Error(`Server xatosi: ${res.status}`);
  }

  return data as T;
}

export async function apiAdminLogin(payload: {
  identifier: string;
  password: string;
}): Promise<AdminAuthResponse> {
  return request<AdminAuthResponse>('/admin/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function apiAdminMe(token: string): Promise<SafeAdmin> {
  return request<SafeAdmin>('/admin/auth/me', {}, token);
}

export async function apiGetDashboardStats(token: string): Promise<DashboardStats> {
  return request<DashboardStats>('/admin/dashboard/stats', {}, token);
}

export async function apiGetUsers(
  token: string,
  params: { page?: number; limit?: number; search?: string; isBlocked?: boolean },
): Promise<Paginated<AdminUser>> {
  const q = new URLSearchParams();
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  if (params.search) q.set('search', params.search);
  if (params.isBlocked !== undefined) q.set('isBlocked', String(params.isBlocked));
  return request<Paginated<AdminUser>>(`/admin/users?${q}`, {}, token);
}

export async function apiToggleBlockUser(
  token: string,
  userId: string,
): Promise<AdminUser> {
  return request<AdminUser>(`/admin/users/${userId}/block`, { method: 'PATCH' }, token);
}

export async function apiDeleteUser(
  token: string,
  userId: string,
): Promise<{ message: string }> {
  return request<{ message: string }>(`/admin/users/${userId}`, { method: 'DELETE' }, token);
}

export async function apiGetAuditLogs(
  token: string,
  params: { page?: number; limit?: number },
): Promise<Paginated<AuditLog>> {
  const q = new URLSearchParams();
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  return request<Paginated<AuditLog>>(`/admin/audit-logs?${q}`, {}, token);
}
