'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';

const THEMES = [
  '総合運', '恋愛運', '仕事運', '金運', '人間関係', '健康運', '今日の運勢',
];

const MAJOR_ARCANA = [
  '愚者', '魔術師', '女教皇', '女帝', '皇帝', '教皇', '恋人', '戦車',
  '力', '隠者', '運命の輪', '正義', '吊るされた男', '死神', '節制',
  '悪魔', '塔', '星', '月', '太陽', '審判', '世界',
];

export default function TarotPage() {
  const [question, setQuestion] = useState('');
  const [theme, setTheme] = useState('総合運');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCards = () => {
    setIsDrawing(true);
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const cards = shuffled.slice(0, 3).map((c) =>
      Math.random() > 0.5 ? `${c}（正位置）` : `${c}（逆位置）`
    );
    setTimeout(() => {
      setDrawnCards(cards);
      setIsDrawing(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tarot',
          input: { question: question || theme, cards: drawnCards },
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message="カードが語りかけています..." />;

  if (result) {
    const cardSection = result.cards
      ? result.cards.map((c: any) => `【${c.name}】\n${c.meaning}`).join('\n\n')
      : '';
    return (
      <FortuneResult
        title=""
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          ...(cardSection ? [{ label: 'カードの意味', content: cardSection }] : []),
          { label: 'タロットリーディング', content: result.reading },
          { label: 'カードからのアドバイス', content: result.advice },
        ]}
        shareText={`タロット占いの結果: ${result.headline}\n\nOracle Portal で無料AI占い`}
        onReset={() => { setResult(null); setDrawnCards([]); setQuestion(''); }}
        currentServiceId="tarot"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">🃏 タロット占い</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            AIがタロットカードを読み解きます
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <label className="font-medium text-sm">占いたいテーマ</label>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className="px-4 py-2 rounded-full text-sm cursor-pointer transition-all"
                style={{
                  border: theme === t ? '2px solid #d4a5b6' : '1px solid #ddd',
                  background: theme === t ? 'rgba(212,165,182,0.15)' : 'rgba(255,255,255,0.5)',
                  fontWeight: theme === t ? 'bold' : 'normal',
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <label className="font-medium text-sm mt-2">具体的な質問（任意）</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="例: 転職すべきか迷っています"
          />

          {drawnCards.length === 0 ? (
            <div className="flex justify-center mt-4">
              <button className="primary-btn" onClick={drawCards} disabled={isDrawing}>
                {isDrawing ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Sparkles size={18} />
                  </motion.span>
                ) : (
                  <>
                    <Sparkles size={18} /> カードを引く
                  </>
                )}
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-3 mt-4">
                {['過去', '現在', '未来'].map((label, i) => (
                  <motion.div
                    key={i}
                    initial={{ rotateY: 180, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    transition={{ delay: i * 0.3 }}
                    className="text-center p-4 rounded-2xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(181,164,214,0.15), rgba(212,165,182,0.15))',
                      border: '1px solid rgba(212,165,182,0.3)',
                    }}
                  >
                    <p className="text-xs mb-1" style={{ color: 'var(--text-light)' }}>{label}</p>
                    <p className="text-sm font-bold">{drawnCards[i]}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button className="primary-btn" onClick={handleSubmit}>
                  リーディングを見る
                </button>
              </div>
            </>
          )}

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}
        </div>
      </motion.div>
    </div>
  );
}
