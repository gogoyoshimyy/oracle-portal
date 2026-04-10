// 占い履歴のLocalStorage管理
// 将来Supabaseに同期する際もインターフェースは維持

export interface HistoryEntry {
  id: string;
  serviceId: string;
  serviceName: string;
  serviceIcon: string;
  title: string;
  headline: string;
  result: any; // 占い結果のJSON
  input: any; // 入力情報
  createdAt: string;
  favorite?: boolean;
}

const STORAGE_KEY = 'oracle_portal_history';

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveHistoryEntry(entry: Omit<HistoryEntry, 'id' | 'createdAt'>): HistoryEntry {
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const history = getHistory();
  history.unshift(newEntry);

  // 最大100件まで保持（無料プラン）
  const trimmed = history.slice(0, 100);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save history:', e);
  }

  return newEntry;
}

export function deleteHistoryEntry(id: string): void {
  const history = getHistory().filter((h) => h.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function toggleFavorite(id: string): void {
  const history = getHistory();
  const idx = history.findIndex((h) => h.id === id);
  if (idx >= 0) {
    history[idx].favorite = !history[idx].favorite;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
}

export function getFavorites(): HistoryEntry[] {
  return getHistory().filter((h) => h.favorite);
}

export function getHistoryByService(serviceId: string): HistoryEntry[] {
  return getHistory().filter((h) => h.serviceId === serviceId);
}

export function clearHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getHistoryStats() {
  const history = getHistory();
  const byService: Record<string, number> = {};
  history.forEach((h) => {
    byService[h.serviceId] = (byService[h.serviceId] || 0) + 1;
  });

  return {
    total: history.length,
    favorites: history.filter((h) => h.favorite).length,
    byService,
    firstDate: history[history.length - 1]?.createdAt,
    lastDate: history[0]?.createdAt,
  };
}
