// プレミアム会員管理
// MVP段階ではLocalStorageでフラグ管理。将来Supabaseに移行。

const PREMIUM_KEY = 'oracle_portal_premium';

export interface PremiumStatus {
  isPremium: boolean;
  plan: 'free' | 'premium' | 'lifetime';
  expiresAt?: string;
  startedAt?: string;
}

export function getPremiumStatus(): PremiumStatus {
  if (typeof window === 'undefined') return { isPremium: false, plan: 'free' };

  try {
    const data = localStorage.getItem(PREMIUM_KEY);
    if (!data) return { isPremium: false, plan: 'free' };

    const status = JSON.parse(data) as PremiumStatus;

    // 有効期限チェック
    if (status.expiresAt) {
      const exp = new Date(status.expiresAt);
      if (exp < new Date()) {
        return { isPremium: false, plan: 'free' };
      }
    }

    return status;
  } catch {
    return { isPremium: false, plan: 'free' };
  }
}

export function setPremiumStatus(status: PremiumStatus): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PREMIUM_KEY, JSON.stringify(status));
}

export function isPremium(): boolean {
  return getPremiumStatus().isPremium;
}

// プレミアム機能の定義
export const PREMIUM_FEATURES = {
  noAds: '広告完全非表示',
  detailedReading: '詳細鑑定（通常の3倍の文字数）',
  pdfExport: 'PDF鑑定書ダウンロード',
  unlimitedHistory: '履歴無制限保存',
  cloudSync: '複数デバイス間同期',
  dailyEmail: '毎朝の運勢メール配信',
  prioritySupport: '優先サポート',
} as const;

export const PREMIUM_PRICE = 500; // 月額¥500
export const PREMIUM_PRICE_YEAR = 4980; // 年額¥4,980（2ヶ月分お得）
