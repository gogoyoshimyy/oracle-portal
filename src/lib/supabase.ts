// Supabaseクライアント
// 環境変数が未設定でもアプリが動くようにフォールバック

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getSupabaseClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}

// ユーザー型定義
export interface AppUser {
  id: string;
  email: string;
  displayName?: string;
  avatarUrl?: string;
  isPremium: boolean;
  createdAt: string;
}
