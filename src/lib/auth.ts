// 認証ヘルパー
// Supabase Authの薄いラッパー + フォールバック実装

import { getSupabaseClient, isSupabaseConfigured, type AppUser } from './supabase';

const FALLBACK_KEY = 'oracle_portal_fallback_user';

export interface SignupResult {
  success: boolean;
  user?: AppUser;
  error?: string;
  needsEmailVerification?: boolean;
}

// メール+パスワードでサインアップ
export async function signUpWithEmail(email: string, password: string): Promise<SignupResult> {
  const supabase = getSupabaseClient();

  // Supabase未設定 → フォールバックモード（メールだけ保存）
  if (!supabase) {
    const fallbackUser: AppUser = {
      id: crypto.randomUUID(),
      email,
      isPremium: false,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(fallbackUser));
    return { success: true, user: fallbackUser };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) return { success: false, error: error.message };

  return {
    success: true,
    needsEmailVerification: !data.session,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email!,
          isPremium: false,
          createdAt: data.user.created_at,
        }
      : undefined,
  };
}

export async function signInWithEmail(email: string, password: string): Promise<SignupResult> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const stored = localStorage.getItem(FALLBACK_KEY);
    if (stored) {
      const user = JSON.parse(stored);
      if (user.email === email) {
        return { success: true, user };
      }
    }
    return { success: false, error: 'メールアドレスが見つかりません' };
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };

  return {
    success: true,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email!,
          isPremium: false,
          createdAt: data.user.created_at,
        }
      : undefined,
  };
}

export async function signInWithGoogle(): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      success: false,
      error: 'Googleログインは現在準備中です。メールアドレスでご登録ください。',
    };
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function signInWithMagicLink(email: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    // フォールバック: メールだけ保存
    const fallbackUser: AppUser = {
      id: crypto.randomUUID(),
      email,
      isPremium: false,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(fallbackUser));
    return { success: true };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function signOut(): Promise<void> {
  const supabase = getSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(FALLBACK_KEY);
}

export async function getCurrentUser(): Promise<AppUser | null> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(FALLBACK_KEY) : null;
    return stored ? JSON.parse(stored) : null;
  }

  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;

  return {
    id: data.user.id,
    email: data.user.email!,
    displayName: data.user.user_metadata?.full_name,
    avatarUrl: data.user.user_metadata?.avatar_url,
    isPremium: false, // TODO: Stripe連携後に実装
    createdAt: data.user.created_at,
  };
}
