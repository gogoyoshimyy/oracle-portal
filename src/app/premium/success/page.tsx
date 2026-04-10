'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';
import { setPremiumStatus } from '@/lib/premium';

export default function PremiumSuccessPage() {
  useEffect(() => {
    // プレミアムステータスを有効化
    setPremiumStatus({
      isPremium: true,
      plan: 'premium',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-12">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring' }}
        className="glass-panel text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          className="inline-block mb-4"
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
            style={{
              background: 'linear-gradient(135deg, #e8d5b5, #d4a5b6, #b5a4d6)',
              boxShadow: '0 8px 24px rgba(212,165,182,0.4)',
            }}
          >
            <Crown size={48} color="white" />
          </div>
        </motion.div>

        <h1 className="text-2xl font-bold gradient-text mb-3">
          ようこそ、Premium会員へ
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-light)' }}>
          ご登録ありがとうございます。<br />
          すべてのプレミアム機能がご利用いただけます。
        </p>

        <div className="flex justify-center gap-2 mb-6">
          <Sparkles size={16} color="#e8d5b5" />
          <Sparkles size={20} color="#d4a5b6" />
          <Sparkles size={16} color="#b5a4d6" />
        </div>

        <Link href="/" className="primary-btn" style={{ textDecoration: 'none' }}>
          占いを始める
        </Link>
      </motion.div>
    </div>
  );
}
