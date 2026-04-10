'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Check } from 'lucide-react';
import { signUpWithEmail, signInWithGoogle } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

const FREE_BENEFITS = [
  '占い履歴をクラウドに保存',
  '複数デバイスで同期',
  'お気に入り無制限',
  '毎朝の運勢メール（任意）',
];

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') || '/';
  const { refresh } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('利用規約とプライバシーポリシーへの同意が必要です');
      return;
    }
    setLoading(true);
    setError(null);

    const result = await signUpWithEmail(email, password);
    if (result.success) {
      if (result.needsEmailVerification) {
        setSuccess('登録メールをお送りしました。受信箱をご確認ください。');
      } else {
        await refresh();
        router.push(next);
      }
    } else {
      setError(result.error || '登録に失敗しました');
    }
    setLoading(false);
  };

  const handleGoogleSignUp = async () => {
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
        <h1 className="text-2xl font-bold gradient-text mb-2">無料会員登録</h1>
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          完全無料・30秒で完了
        </p>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel mb-4"
        style={{ background: 'linear-gradient(135deg, rgba(202,255,191,0.2), rgba(160,196,255,0.2))' }}
      >
        <p className="text-xs font-bold mb-2 text-center" style={{ color: 'var(--text-main)' }}>
          ✨ 無料会員特典
        </p>
        <div className="flex flex-col gap-2">
          {FREE_BENEFITS.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-main)' }}>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(120deg, #caffbf, #a0c4ff)' }}
              >
                <Check size={12} color="white" />
              </div>
              {benefit}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel"
      >
        <button
          onClick={handleGoogleSignUp}
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
          Googleで登録（ワンタップ）
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px" style={{ background: '#ddd' }}></div>
          <span className="text-xs" style={{ color: 'var(--text-light)' }}>または</span>
          <div className="flex-1 h-px" style={{ background: '#ddd' }}></div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

          <label className="flex items-start gap-2 text-xs cursor-pointer" style={{ color: 'var(--text-main)' }}>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              style={{ width: 'auto', marginTop: 3 }}
            />
            <span>
              <Link href="/terms" target="_blank" style={{ color: '#b5a4d6' }}>利用規約</Link> および
              <Link href="/privacy" target="_blank" style={{ color: '#b5a4d6', marginLeft: 4 }}>プライバシーポリシー</Link> に同意する
            </span>
          </label>

          {error && <p className="text-xs text-center" style={{ color: '#ffadad' }}>{error}</p>}
          {success && <p className="text-xs text-center p-3 rounded-2xl" style={{ background: 'rgba(202,255,191,0.3)', color: '#5a5560' }}>{success}</p>}

          <button type="submit" disabled={loading || !agreed} className="primary-btn mt-2">
            {loading ? '登録中...' : '無料会員登録'}
          </button>
        </form>

        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-light)' }}>
          すでにアカウントをお持ちの方は
          <Link href={`/auth/signin${next !== '/' ? `?next=${next}` : ''}`} style={{ color: '#b5a4d6', marginLeft: 4 }}>
            ログイン
          </Link>
        </p>
      </motion.div>

      {!isSupabaseConfigured && (
        <p className="text-xs text-center mt-4" style={{ color: 'var(--text-light)' }}>
          ※ 現在、簡易モードで動作中です（メールアドレスのみ保存）
        </p>
      )}
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-sm">読み込み中...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
