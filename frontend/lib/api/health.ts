const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

// ── Types ──────────────────────────────────────────────────────────────────

export type MetricType = 'HEART_RATE' | 'STEPS' | 'SLEEP';

export interface HeartRateSummary {
  value: number;
  status: 'low' | 'normal' | 'high';
  weeklyAvg: number | null;
  recordedAt: string;
}

export interface StepsSummary {
  value: number;
  goal: number;
  progress: number;
  calories: number;
  distanceKm: number;
  status: 'behind' | 'on_track' | 'exceeded';
  recordedAt: string;
}

export interface SleepSummary {
  value: number;
  status: 'short' | 'good' | 'long';
  qualityScore: number;
  sleepDebt: number;
  recordedAt: string;
}

export interface HealthSummary {
  heartRate: HeartRateSummary | null;
  steps: StepsSummary | null;
  sleep: SleepSummary | null;
}

export interface HistoryPoint {
  value: number;
  recordedAt: string;
}

export interface LogMetricPayload {
  type: MetricType;
  value: number;
  recordedAt?: string;
  metadata?: Record<string, unknown>;
}

// ── Request helper ─────────────────────────────────────────────────────────

async function request<T>(path: string, token: string, options: RequestInit = {}): Promise<T> {
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

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.message;
    throw new Error(Array.isArray(msg) ? msg[0] : (msg ?? `Server xatosi: ${res.status}`));
  }

  return data as T;
}

// ── API functions ──────────────────────────────────────────────────────────

export function apiGetHealthSummary(token: string): Promise<HealthSummary> {
  return request<HealthSummary>('/health/metrics/summary', token);
}

export function apiLogMetric(token: string, payload: LogMetricPayload): Promise<unknown> {
  return request('/health/metrics/log', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function apiGetMetricHistory(
  token: string,
  type: MetricType,
  days = 7,
): Promise<HistoryPoint[]> {
  return request<HistoryPoint[]>(`/health/metrics/${type}/history?days=${days}`, token);
}
