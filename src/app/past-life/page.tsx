'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';
import { callFortuneAPI } from '@/lib/fortune-api';

const INTUITIONS = [
  { id: 'fire', label: '炎', icon: '🔥' },
  { id: 'water', label: '水', icon: '💧' },
  { id: 'wind', label: '風', icon: '🍃' },
  { id: 'earth', label: '大地', icon: '🌍' },
  { id: 'star', label: '星', icon: '⭐' },
  { id: 'moon', label: '月', icon: '🌙' },
];

export default function PastLifePage() {
  const [birthday, setBirthday] = useState('');
  const [intuition, setIntuition] = useState<string | null>(null);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!birthday || !intuition) return;
    setLoading(true);
    setError(null);
    try {
      const data = await callFortuneAPI('past-life', {
        birthday,
        intuition: INTUITIONS.find((i) => i.id === intuition)?.label,
        keyword,
      });
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message="前世の記憶にアクセスしています..." />;

  if (result) {
    return (
      <FortuneResult
        title={`前世: ${result.era} / ${result.location}`}
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          { label: `前世の姿 — ${result.role}`, content: result.story },
          { label: '前世と今世のつながり', content: result.connection },
          { label: '前世のあなたからのメッセージ', content: result.message },
        ]}
        shareText={`前世占い: ${result.era}の${result.location}で${result.role}でした\n${result.headline}\n\nOracle Portal`}
        onReset={() => { setResult(null); setBirthday(''); setIntuition(null); setKeyword(''); }}
        currentServiceId="past-life"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">🔮 前世占い</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            あなたの前世を霊視します
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <label className="font-medium text-sm">生年月日</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

          <label className="font-medium text-sm">直感で惹かれるものは？</label>
          <div className="grid grid-cols-3 gap-3">
            {INTUITIONS.map((item) => (
              <button
                key={item.id}
                onClick={() => setIntuition(item.id)}
                className="py-3 rounded-2xl text-center cursor-pointer transition-all"
                style={{
                  border: intuition === item.id ? '2px solid #b5a4d6' : '1px solid #ddd',
                  background: intuition === item.id ? 'rgba(181,164,214,0.15)' : 'rgba(255,255,255,0.5)',
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                <span className="text-2xl block">{item.icon}</span>
                <span className="text-xs block mt-1">{item.label}</span>
              </button>
            ))}
          </div>

          <label className="font-medium text-sm">気になるワード（任意）</label>
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="例: 海、城、音楽、戦い" />

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}

          <div className="flex justify-center mt-4">
            <button className="primary-btn" onClick={handleSubmit} disabled={!birthday || !intuition}>
              前世を見る
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
