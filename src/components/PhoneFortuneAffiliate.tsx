'use client';

import { motion } from 'framer-motion';

interface PhoneFortuneAffiliateProps {
  context?: 'result' | 'keyword' | 'sidebar';
}

export default function PhoneFortuneAffiliate({ context = 'result' }: PhoneFortuneAffiliateProps) {
  const messages = {
    result: {
      heading: 'もっと深く知りたい方へ',
      subheading: 'AIの鑑定結果をもとに、本物の占い師に相談してみませんか？',
      cta: '初回無料で相談する',
    },
    keyword: {
      heading: 'プロの占い師に相談する',
      subheading: 'この夢の意味をもっと詳しく、あなただけの鑑定で紐解きます',
      cta: '初回無料で占い師に相談',
    },
    sidebar: {
      heading: '占い師に相談',
      subheading: 'AIだけでは分からない深い鑑定を',
      cta: '無料で試す',
    },
  };

  const msg = messages[context];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2c1654 0%, #4a1942 50%, #1a1a3e 100%)',
        border: '1px solid rgba(181,164,214,0.3)',
      }}
    >
      <div className="p-6 text-center">
        <div className="flex justify-center gap-2 mb-3">
          <span className="text-2xl">🔮</span>
          <span className="text-2xl">📞</span>
        </div>
        <h3 className="text-base font-bold text-white mb-2">
          {msg.heading}
        </h3>
        <p className="text-xs text-purple-200 mb-4 leading-relaxed">
          {msg.subheading}
        </p>

        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-purple-200">
            <span className="text-green-400">✓</span> 初回最大10分間無料
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-200">
            <span className="text-green-400">✓</span> 24時間いつでも相談OK
          </div>
          <div className="flex items-center gap-2 text-xs text-purple-200">
            <span className="text-green-400">✓</span> 厳選された実力派占い師が在籍
          </div>
        </div>

        {/* TODO: Replace href with actual affiliate link */}
        <a
          href="#affiliate-link"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block w-full py-3 rounded-full text-center font-bold text-sm no-underline transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(120deg, #e8d5b5, #d4a5b6)',
            color: '#2c1654',
            textDecoration: 'none',
            boxShadow: '0 4px 15px rgba(232,213,181,0.4)',
          }}
        >
          {msg.cta}
        </a>

        <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>
          PR | 提携先の電話占いサービスへ遷移します
        </p>
      </div>
    </motion.div>
  );
}
