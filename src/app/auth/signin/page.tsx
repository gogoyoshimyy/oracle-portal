'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock } from 'lucide-react';
import { signInWithEmail, signInWithGoogle, signInWithMagicLink } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') || '/';
  const { refresh } = useAuth();

  const [mode, setMode] = useState<'email' | 'magic'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signInWithEmail(email, password);
    if (result.success) {
      await refresh();
      router.push(next);
    } else {
      setError(result.error || 'ログインに失敗しました');
    }
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signInWithMagicLink(email);
    if (result.success) {
      if (isSupabaseConfigured) {
        setSuccess('メールをご確認ください。ログイン用リンクをお送りしました。');
      } else {
        await refresh();
        router.push(next);
      }
    } else {
      setError(result.error || 'メール送信に失敗しました');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const result = await signInWithGoogle();
    if (!result.success) {
      setError(result.error || 'Googleログインに失敗しました');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <Sparkles size={32} color="#d4a5b6" className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold gradient-text mb-2">ログイン</h1>
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          Oracle Portalへようこそ
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel"
      >
        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold cursor-pointer transition-all hover:scale-[1.02] mb-4"
          style={{
            background: 'white',
            color: '#5a5560',
            border: '1px solid #ddd',
            fontFamily: "'Zen Maru Gothic', sans-serif",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
          </svg>
          Googleでログイン
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px" style={{ background: '#ddd' }}></div>
          <span className="text-xs" style={{ color: 'var(--text-light)' }}>または</span>
          <div className="flex-1 h-px" style={{ background: '#ddd' }}></div>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('email')}
            className="flex-1 py-2 rounded-full text-xs cursor-pointer"
            style={{
              background: mode === 'email' ? 'linear-gradient(120deg, #b5a4d6, #d4a5b6)' : 'white',
              color: mode === 'email' ? 'white' : 'var(--text-main)',
              border: mode === 'email' ? 'none' : '1px solid #ddd',
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            メール+パスワード
          </button>
          <button
            onClick={() => setMode('magic')}
            className="flex-1 py-2 rounded-full text-xs cursor-pointer"
            style={{
              background: mode === 'magic' ? 'linear-gradient(120deg, #b5a4d6, #d4a5b6)' : 'white',
              color: mode === 'magic' ? 'white' : 'var(--text-main)',
              border: mode === 'magic' ? 'none' : '1px solid #ddd',
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            メール認証リンク
          </button>
        </div>

        {/* Form */}
        <form onSubmit={mode === 'email' ? handleEmailSignIn : handleMagicLink} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
              <Mail size={12} /> メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>

          {mode === 'email' && (
            <div>
              <label className="text-xs font-bold mb-1 flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
                <Lock size={12} /> パスワード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="6文字以上"
              />
            </div>
          )}

          {error && <p className="text-xs text-center" style={{ color: '#ffadad' }}>{error}</p>}
          {success && <p className="text-xs text-center p-3 rounded-2xl" style={{ background: 'rgba(202,255,191,0.3)', color: '#5a5560' }}>{success}</p>}

          <button type="submit" disabled={loading} className="primary-btn mt-2">
            {loading ? '処理中...' : mode === 'email' ? 'ログイン' : '認証リンクを送信'}
          </button>
        </form>

        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-light)' }}>
          アカウントをお持ちでない方は
          <Link href={`/auth/signup${next !== '/' ? `?next=${next}` : ''}`} style={{ color: '#b5a4d6', marginLeft: 4 }}>
            新規登録
          </Link>
        </p>
      </motion.div>

      {!isSupabaseConfigured && (
        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-light)' }}>
          ※ 現在、簡易モードで動作中です
        </p>
      )}
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-sm">読み込み中...</div>}>
      <SignInContent />
    </Suspense>
  );
}
