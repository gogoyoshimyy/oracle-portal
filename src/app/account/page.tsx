'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, BookOpen, Crown, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from '@/lib/auth';
import { getHistoryStats } from '@/lib/history';
import { isPremium } from '@/lib/premium';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading, refresh } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin?next=/account');
    }
  }, [user, loading, router]);

  useEffect(() => {
    setStats(getHistoryStats());
    setPremium(isPremium());
  }, []);

  const handleSignOut = async () => {
    if (!confirm('ログアウトしますか？')) return;
    await signOut();
    await refresh();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="w-full max-w-md mx-auto py-12 text-center">
        <Sparkles size={32} color="#d4a5b6" className="mx-auto mb-2 animate-pulse" />
        <p className="text-sm" style={{ color: 'var(--text-light)' }}>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto py-6 flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold gradient-text mb-2">マイページ</h1>
      </motion.div>

      {/* User info */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #b5a4d6, #d4a5b6)',
              color: 'white',
            }}
          >
            <User size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs" style={{ color: 'var(--text-light)' }}>
              {premium ? '👑 プレミアム会員' : '無料会員'}
            </p>
            <p className="text-sm font-bold truncate" style={{ color: 'var(--text-main)' }}>
              {user.displayName || user.email}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-xs" style={{ color: 'var(--text-main)' }}>
          <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.5)' }}>
            <Mail size={12} color="#8e8a94" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.5)' }}>
            <Calendar size={12} color="#8e8a94" />
            <span>登録日: {new Date(user.createdAt).toLocaleDateString('ja-JP')}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      {stats && stats.total > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel"
        >
          <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text-main)' }}>
            📊 占い統計
          </h2>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold gradient-text">{stats.total}</p>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>総鑑定数</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{stats.favorites}</p>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>お気に入り</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text">{Object.keys(stats.byService).length}</p>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>占い種類</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col gap-2"
      >
        <Link
          href="/history"
          className="glass-panel flex items-center gap-3 no-underline"
          style={{ textDecoration: 'none', color: 'var(--text-main)' }}
        >
          <BookOpen size={20} color="#b5a4d6" />
          <div className="flex-1">
            <p className="text-sm font-bold m-0">占いの記録を見る</p>
            <p className="text-xs m-0" style={{ color: 'var(--text-light)' }}>
              過去の鑑定結果
            </p>
          </div>
          <span style={{ color: 'var(--text-light)' }}>→</span>
        </Link>

        {!premium && (
          <Link
            href="/premium"
            className="glass-panel flex items-center gap-3 no-underline"
            style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, rgba(232,213,181,0.3), rgba(212,165,182,0.3))',
              color: 'var(--text-main)',
            }}
          >
            <Crown size={20} color="#d4a5b6" />
            <div className="flex-1">
              <p className="text-sm font-bold m-0">プレミアムにアップグレード</p>
              <p className="text-xs m-0" style={{ color: 'var(--text-light)' }}>
                月¥500 で詳細鑑定・広告非表示
              </p>
            </div>
            <span style={{ color: 'var(--text-light)' }}>→</span>
          </Link>
        )}
      </motion.div>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="text-sm cursor-pointer flex items-center justify-center gap-2 py-3 mt-4"
        style={{
          background: 'none',
          border: '1px solid #ddd',
          borderRadius: 999,
          color: 'var(--text-light)',
          fontFamily: "'Zen Maru Gothic', sans-serif",
        }}
      >
        <LogOut size={14} /> ログアウト
      </button>
    </div>
  );
}
