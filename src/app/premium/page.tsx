'use client';

import { motion } from 'framer-motion';
import { Crown, Check, Sparkles } from 'lucide-react';
import { PREMIUM_FEATURES, PREMIUM_PRICE, PREMIUM_PRICE_YEAR } from '@/lib/premium';

export default function PremiumPage() {
  const handleSubscribe = async (plan: 'monthly' | 'yearly') => {
    // TODO: Stripe Checkout統合
    // 現状はAPIエンドポイントのスタブ
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert(data.error);
      }
    } catch (e) {
      alert('申し訳ありません、現在準備中です。\n近日中にプレミアム機能をお使いいただけます。');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-6 flex flex-col gap-6">
      {/* Hero */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center"
      >
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
          style={{
            background: 'linear-gradient(135deg, #e8d5b5, #d4a5b6, #b5a4d6)',
            boxShadow: '0 8px 24px rgba(212,165,182,0.4)',
          }}
        >
          <Crown size={40} color="white" />
        </div>
        <h1
          className="text-3xl md:text-4xl font-bold gradient-text mb-3"
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif" }}
        >
          Oracle Portal Premium
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-light)' }}>
          より深い鑑定と、特別な体験を
        </p>
      </motion.div>

      {/* Features */}
      <div className="glass-panel">
        <h2 className="text-base font-bold mb-4 text-center" style={{ color: 'var(--text-main)' }}>
          ✨ プレミアム特典
        </h2>
        <div className="flex flex-col gap-3">
          {Object.entries(PREMIUM_FEATURES).map(([key, label]) => (
            <div key={key} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.5)' }}>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(120deg, #e8d5b5, #d4a5b6)' }}
              >
                <Check size={16} color="white" />
              </div>
              <span className="text-sm" style={{ color: 'var(--text-main)' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="glass-panel">
        <h2 className="text-base font-bold mb-4 text-center" style={{ color: 'var(--text-main)' }}>
          無料版とプレミアム版の違い
        </h2>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(212,165,182,0.3)' }}>
              <th className="text-left py-2" style={{ color: 'var(--text-main)' }}>機能</th>
              <th className="text-center py-2" style={{ color: 'var(--text-light)' }}>無料</th>
              <th className="text-center py-2" style={{ color: '#d4a5b6' }}>
                <Crown size={12} className="inline mr-1" />プレミアム
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['9つのAI占い', '○', '○'],
              ['広告表示', 'あり', 'なし'],
              ['鑑定の文字数', '通常', '3倍詳細'],
              ['履歴保存', '100件まで', '無制限'],
              ['PDF出力', '×', '○'],
              ['お気に入り', '○', '○'],
              ['毎日のおみくじ詳細版', '×', '○'],
              ['複数デバイス同期', '×', '○'],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.5)' }}>
                <td className="py-3" style={{ color: 'var(--text-main)' }}>{row[0]}</td>
                <td className="text-center py-3" style={{ color: 'var(--text-light)' }}>{row[1]}</td>
                <td className="text-center py-3 font-bold" style={{ color: '#d4a5b6' }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Monthly */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-panel text-center"
        >
          <p className="text-xs font-bold mb-2" style={{ color: 'var(--text-light)', letterSpacing: '0.1em' }}>
            月額プラン
          </p>
          <div className="mb-3">
            <span className="text-4xl font-bold gradient-text">¥{PREMIUM_PRICE}</span>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}> / 月</span>
          </div>
          <p className="text-xs mb-4" style={{ color: 'var(--text-light)' }}>
            いつでも解約可能
          </p>
          <button
            onClick={() => handleSubscribe('monthly')}
            className="primary-btn w-full"
          >
            月額プランを始める
          </button>
        </motion.div>

        {/* Yearly */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="glass-panel text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(232,213,181,0.3), rgba(212,165,182,0.3))',
            border: '2px solid rgba(212,165,182,0.5)',
          }}
        >
          <span
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold"
            style={{ background: 'linear-gradient(120deg, #d4a5b6, #b5a4d6)', color: 'white' }}
          >
            2ヶ月分お得
          </span>
          <p className="text-xs font-bold mb-2" style={{ color: 'var(--text-light)', letterSpacing: '0.1em' }}>
            年額プラン
          </p>
          <div className="mb-3">
            <span className="text-4xl font-bold gradient-text">¥{PREMIUM_PRICE_YEAR}</span>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}> / 年</span>
          </div>
          <p className="text-xs mb-4" style={{ color: 'var(--text-light)' }}>
            月あたり ¥{Math.round(PREMIUM_PRICE_YEAR / 12)}
          </p>
          <button
            onClick={() => handleSubscribe('yearly')}
            className="primary-btn w-full"
          >
            年額プランを始める
          </button>
        </motion.div>
      </div>

      {/* FAQ */}
      <div className="glass-panel">
        <h2 className="text-base font-bold mb-4" style={{ color: 'var(--text-main)' }}>
          よくあるご質問
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: '#b5a4d6' }}>Q. いつでも解約できますか？</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
              はい、いつでも解約可能です。解約後も次回更新日まではプレミアム機能をご利用いただけます。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: '#b5a4d6' }}>Q. 支払い方法は？</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
              クレジットカード（Visa/Mastercard/JCB/American Express）に対応しています。決済はStripeにより安全に処理されます。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: '#b5a4d6' }}>Q. 無料版でも十分使えますか？</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
              はい。9つのAI占いはすべて無料でご利用いただけます。プレミアム版は「もっと詳しく知りたい」「広告なしで楽しみたい」方向けの追加機能です。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold mb-1" style={{ color: '#b5a4d6' }}>Q. 返金は可能ですか？</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
              月額プランは原則返金不可となっております。年額プランの場合はお問い合わせください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
