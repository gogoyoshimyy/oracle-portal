'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Stars, Sparkles } from 'lucide-react';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';
import FortuneIcon from '@/components/FortuneIcon';
import { callFortuneAPI } from '@/lib/fortune-api';

const emotions = [
  { id: 'alert', label: 'ハラハラ・焦り', color: '#ffadad' },
  { id: 'deep', label: 'どんより・悲しい', color: '#a0c4ff' },
  { id: 'spark', label: 'ワクワク・興奮', color: '#ffd6a5' },
  { id: 'soft', label: 'ほっこり・安心', color: '#caffbf' },
];

export default function DreamPage() {
  const [dreamText, setDreamText] = useState('');
  const [emotion, setEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (dreamText.length < 20 || !emotion) return;
    setLoading(true);
    setError(null);
    try {
      const data = await callFortuneAPI('dream', { text: dreamText, emotion });
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message="あなたの夢を紐解いています..." />;

  if (result) {
    return (
      <FortuneResult
        title=""
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          { label: 'あなたの夢が語ること', content: result.dreamReading },
          { label: 'この夢が示すもの', content: result.typeReveal },
          { label: 'オラクルからのメッセージ', content: result.oracleMessage },
        ]}
        shareText={`夢占いの結果: ${result.headline}\n\nOracle Portal で無料AI占い`}
        onReset={() => { setResult(null); setDreamText(''); setEmotion(null); }}
        currentServiceId="dream"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <div className="flex justify-center mb-3">
            <FortuneIcon iconKey="moon" size={40} color="var(--accent)" strokeWidth={1.3} />
          </div>
          <h1 className="text-3xl font-bold gradient-text font-mincho" style={{ letterSpacing: '0.1em' }}>
            夢占い
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-sub)', fontFamily: "'Shippori Mincho', serif" }}>
            あなたの深層心理を紐解きます
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-2 font-medium text-sm">
            <Sparkles size={16} color="#d4a5b6" /> どんな夢を見ましたか？
          </label>
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="どんな場所にいた？ 誰がいた？ 何が起きた？&#10;思い出せる限り自由に書いてみてください"
            rows={6}
          />
          <p className="text-xs" style={{ color: 'var(--text-light)' }}>
            場所・人物・出来事など、細かいほど深い鑑定ができます（20文字以上）
          </p>

          <label className="font-medium text-sm mt-2">起きた時の気分は？</label>
          <div className="grid grid-cols-2 gap-3">
            {emotions.map((e) => (
              <button
                key={e.id}
                onClick={() => setEmotion(e.id)}
                className="py-3 rounded-2xl text-sm cursor-pointer transition-all"
                style={{
                  border: emotion === e.id ? `2px solid ${e.color}` : '1px solid #ddd',
                  background: emotion === e.id ? `${e.color}33` : 'rgba(255,255,255,0.5)',
                  fontWeight: emotion === e.id ? 'bold' : 'normal',
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                {e.label}
              </button>
            ))}
          </div>

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}

          <div className="flex justify-center mt-4">
            <button
              className="primary-btn"
              onClick={handleSubmit}
              disabled={dreamText.length < 20 || !emotion}
            >
              夢を占う
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
