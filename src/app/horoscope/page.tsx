'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';
import { callFortuneAPI } from '@/lib/fortune-api';

const SIGNS = [
  { id: 'おひつじ座', period: '3/21-4/19', icon: '♈' },
  { id: 'おうし座', period: '4/20-5/20', icon: '♉' },
  { id: 'ふたご座', period: '5/21-6/21', icon: '♊' },
  { id: 'かに座', period: '6/22-7/22', icon: '♋' },
  { id: 'しし座', period: '7/23-8/22', icon: '♌' },
  { id: 'おとめ座', period: '8/23-9/22', icon: '♍' },
  { id: 'てんびん座', period: '9/23-10/23', icon: '♎' },
  { id: 'さそり座', period: '10/24-11/22', icon: '♏' },
  { id: 'いて座', period: '11/23-12/21', icon: '♐' },
  { id: 'やぎ座', period: '12/22-1/19', icon: '♑' },
  { id: 'みずがめ座', period: '1/20-2/18', icon: '♒' },
  { id: 'うお座', period: '2/19-3/20', icon: '♓' },
];

function renderStars(score: number) {
  return '★'.repeat(score) + '☆'.repeat(5 - score);
}

export default function HoroscopePage() {
  const [sign, setSign] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const monthStr = `${now.getFullYear()}年${now.getMonth() + 1}月`;

  const handleSubmit = async (selectedSign: string) => {
    setSign(selectedSign);
    setLoading(true);
    setError(null);
    try {
      const data = await callFortuneAPI('horoscope', { sign: selectedSign, month: monthStr });
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message={`${sign}の星を読んでいます...`} />;

  if (result) {
    const scoreSection = result.score
      ? `総合運 ${renderStars(result.score.overall)}\n恋愛運 ${renderStars(result.score.love)}\n仕事運 ${renderStars(result.score.work)}\n健康運 ${renderStars(result.score.health)}`
      : '';
    const luckySection = `ラッキーアイテム: ${result.luckyItem || '-'}\nラッキーカラー: ${result.luckyColor || '-'}\nラッキーナンバー: ${result.luckyNumber || '-'}`;

    return (
      <FortuneResult
        title={`${sign} ${monthStr}の運勢`}
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          ...(scoreSection ? [{ label: '運勢スコア', content: scoreSection }] : []),
          { label: '総合運', content: result.overall },
          { label: '恋愛運', content: result.love },
          { label: '仕事運', content: result.work },
          { label: '健康運', content: result.health },
          { label: 'ラッキー情報', content: luckySection },
          { label: '今月のアドバイス', content: result.advice },
        ]}
        shareText={`${sign}の${monthStr}の運勢: ${result.headline}\n\nOracle Portal`}
        onReset={() => { setResult(null); setSign(null); }}
        currentServiceId="horoscope"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">⭐ 星座占い</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            {monthStr}のあなたの運勢
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <label className="font-medium text-sm block mb-3">あなたの星座を選んでください</label>
        <div className="grid grid-cols-3 gap-3">
          {SIGNS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSubmit(s.id)}
              className="py-4 rounded-2xl text-center cursor-pointer transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(212,165,182,0.2)',
                fontFamily: "'Zen Maru Gothic', sans-serif",
              }}
            >
              <span className="text-2xl block">{s.icon}</span>
              <span className="text-sm font-bold block mt-1">{s.id}</span>
              <span className="text-xs block" style={{ color: 'var(--text-light)' }}>{s.period}</span>
            </button>
          ))}
        </div>
        {error && <p className="text-sm text-center mt-4" style={{ color: '#ffadad' }}>{error}</p>}
      </motion.div>
    </div>
  );
}
