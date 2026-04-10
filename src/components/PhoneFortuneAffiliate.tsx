'use client';

import { motion } from 'framer-motion';
import { Phone, Star, Clock, Shield } from 'lucide-react';

interface PhoneFortuneAffiliateProps {
  context?: 'result' | 'keyword' | 'sidebar';
  category?: '恋愛' | '仕事' | '人生' | '夢' | '相性' | '前世' | '総合';
}

// 電話占いの推奨サービス（リサーチ結果より）
const SERVICES = [
  {
    name: '電話占いヴェルニ',
    feature: '創業20年・実力派占い師多数在籍',
    bonus: '初回最大2,500円分無料',
    rating: 4.8,
    // TODO: 実際のアフィリエイトリンクに置き換え
    link: '#affiliate-verny',
  },
  {
    name: '電話占いウィル',
    feature: '芸能人も利用する有名鑑定師が多数',
    bonus: '初回6,000円分無料鑑定',
    rating: 4.7,
    link: '#affiliate-will',
  },
  {
    name: '電話占いカリス',
    feature: '在籍占い師の合格率3%の厳選サービス',
    bonus: '初回最大4,000円無料',
    rating: 4.7,
    link: '#affiliate-caris',
  },
];

const CATEGORY_MESSAGES: Record<string, { headline: string; desc: string }> = {
  '恋愛': {
    headline: '恋愛の悩み、もっと深く相談したい方へ',
    desc: 'AIの結果だけでは見えない、二人だけの未来を経験豊富な占い師がじっくり読み解きます。',
  },
  '仕事': {
    headline: '仕事の岐路、本当にこの道で良いか確かめたい方へ',
    desc: 'キャリアの転機をプロの占い師が具体的にアドバイス。あなただけの最善の選択が見えてきます。',
  },
  '人生': {
    headline: '人生の分岐点、信頼できる占い師に相談しませんか',
    desc: '長年の経験を持つ占い師が、あなたの人生に寄り添った深い鑑定をお届けします。',
  },
  '夢': {
    headline: 'この夢の本当の意味、もっと詳しく知りたい方へ',
    desc: 'AI鑑定では伝えきれない、あなただけのメッセージを夢解きのプロが直接お伝えします。',
  },
  '相性': {
    headline: 'お相手との未来、もっと詳しく知りたい方へ',
    desc: '二人の本当の相性、これからの関係性を、相性占いのプロがじっくり読み解きます。',
  },
  '前世': {
    headline: '前世の物語、もっと詳しく聞いてみませんか',
    desc: '霊視能力に長けた占い師が、あなたの魂の歴史と今世の使命を深く読み解きます。',
  },
  '総合': {
    headline: 'AIの鑑定では伝えきれない深い真実を',
    desc: '経験豊富なプロの占い師に、あなただけのパーソナル鑑定を受けてみませんか？',
  },
};

export default function PhoneFortuneAffiliate({ context = 'result', category = '総合' }: PhoneFortuneAffiliateProps) {
  const msg = CATEGORY_MESSAGES[category] || CATEGORY_MESSAGES['総合'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a1437 0%, #2c1654 50%, #1a1a3e 100%)',
        border: '1px solid rgba(232,213,181,0.3)',
        boxShadow: '0 8px 32px rgba(28, 22, 84, 0.25)',
      }}
    >
      {/* PR表記 - リサーチ結果より、ファーストビューに必須 */}
      <div className="px-4 py-2" style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(232,213,181,0.15)' }}>
        <p className="text-xs text-center" style={{ color: 'rgba(232,213,181,0.7)', letterSpacing: '0.05em' }}>
          【PR】本セクションには電話占いサービスの広告が含まれます
        </p>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: 'rgba(232,213,181,0.15)', border: '1px solid rgba(232,213,181,0.3)' }}>
            <Phone size={12} color="#e8d5b5" />
            <span className="text-xs" style={{ color: '#e8d5b5', letterSpacing: '0.1em' }}>
              プロの占い師に相談
            </span>
          </div>
          <h3 className="text-base md:text-lg font-bold text-white mb-2 leading-relaxed">
            {msg.headline}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {msg.desc}
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          <div className="text-center p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Clock size={18} className="mx-auto mb-1" color="#e8d5b5" />
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
              初回<br />無料登録
            </p>
          </div>
          <div className="text-center p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Star size={18} className="mx-auto mb-1" color="#e8d5b5" />
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
              実力派<br />占い師多数
            </p>
          </div>
          <div className="text-center p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <Shield size={18} className="mx-auto mb-1" color="#e8d5b5" />
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.4' }}>
              24時間<br />相談OK
            </p>
          </div>
        </div>

        {/* Services list */}
        <div className="flex flex-col gap-3">
          {SERVICES.map((service, i) => (
            <a
              key={i}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block rounded-2xl p-4 no-underline transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(120deg, rgba(232,213,181,0.1), rgba(212,165,182,0.1))',
                border: '1px solid rgba(232,213,181,0.2)',
                textDecoration: 'none',
              }}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold" style={{ color: '#e8d5b5' }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                  </span>
                  <h4 className="text-sm font-bold text-white m-0">
                    {service.name}
                  </h4>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} fill="#e8d5b5" color="#e8d5b5" />
                  <span className="text-xs font-bold" style={{ color: '#e8d5b5' }}>
                    {service.rating}
                  </span>
                </div>
              </div>
              <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {service.feature}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="inline-block px-2 py-1 rounded-full text-xs font-bold"
                  style={{ background: '#e8d5b5', color: '#1a1437' }}
                >
                  {service.bonus}
                </span>
                <span className="text-xs font-bold" style={{ color: '#e8d5b5' }}>
                  詳しく見る →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
