'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { getSupabaseClient } from '@/lib/supabase';
import type { AppUser } from '@/lib/supabase';

interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const u = await getCurrentUser();
      setUser(u);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();

    // Supabase Authの状態変化を監視
    const supabase = getSupabaseClient();
    if (!supabase) return;

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      refresh();
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading, refresh }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
