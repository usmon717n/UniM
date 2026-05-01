const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export type PlanTaskType = 'MEDICINE' | 'SPORT' | 'WATER' | 'VITAMIN' | 'CUSTOM';
export type RepeatType = 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface PlanTask {
  id: string;
  title: string;
  description?: string | null;
  type: PlanTaskType;
  icon?: string | null;
  color?: string | null;
  scheduledTime: string;
  isCompleted: boolean;
  completedAt?: string | null;
}

export interface TodayPlanResponse {
  progress: number;
  tasks: PlanTask[];
}

export interface PlanTasksListResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  items: PlanTask[];
}

interface ApiError {
  message: string | string[];
}

async function authedRequest<T>(path: string, token: string, options: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
      const err = data as ApiError;
      const message = Array.isArray(err.message) ? err.message[0] : err.message;
      throw new Error(message ?? `Server xatosi: ${res.status}`);
    }
    throw new Error(`Server xatosi: ${res.status}`);
  }

  return data as T;
}

export async function apiGetTodayPlan(token: string): Promise<TodayPlanResponse> {
  return authedRequest<TodayPlanResponse>('/plan-tasks/today', token, {
    method: 'GET',
    cache: 'no-store',
  });
}

export async function apiCompletePlanTask(token: string, id: string): Promise<void> {
  await authedRequest(`/plan-tasks/${id}/complete`, token, { method: 'PATCH' });
}

export async function apiUncompletePlanTask(token: string, id: string): Promise<void> {
  await authedRequest(`/plan-tasks/${id}/uncomplete`, token, { method: 'PATCH' });
}

export async function apiCreatePlanTask(
  token: string,
  payload: {
    title: string;
    type: PlanTaskType;
    scheduledTime: string;
    date: string;
    repeatType?: RepeatType;
    description?: string;
    icon?: string;
    color?: string;
    reminderEnabled?: boolean;
    reminderTime?: string;
  },
): Promise<void> {
  await authedRequest('/plan-tasks', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function apiGetPlanTasks(token: string): Promise<PlanTasksListResponse> {
  return authedRequest<PlanTasksListResponse>('/plan-tasks?page=1&limit=100', token, {
    method: 'GET',
    cache: 'no-store',
  });
}

export async function apiUpdatePlanTask(
  token: string,
  id: string,
  payload: {
    title?: string;
    scheduledTime?: string;
    type?: PlanTaskType;
    description?: string;
    icon?: string;
    color?: string;
  },
): Promise<void> {
  await authedRequest(`/plan-tasks/${id}`, token, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function apiDeletePlanTask(token: string, id: string): Promise<void> {
  await authedRequest(`/plan-tasks/${id}`, token, {
    method: 'DELETE',
  });
}
