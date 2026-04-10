'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';
import { callFortuneAPI } from '@/lib/fortune-api';

const COLORS = [
  { id: 'red', name: '赤', hex: '#e74c3c' },
  { id: 'orange', name: 'オレンジ', hex: '#e67e22' },
  { id: 'yellow', name: '黄色', hex: '#f1c40f' },
  { id: 'green', name: '緑', hex: '#27ae60' },
  { id: 'blue', name: '青', hex: '#3498db' },
  { id: 'indigo', name: '藍', hex: '#2c3e80' },
  { id: 'purple', name: '紫', hex: '#9b59b6' },
  { id: 'pink', name: 'ピンク', hex: '#e91e8c' },
  { id: 'white', name: '白', hex: '#ecf0f1' },
  { id: 'black', name: '黒', hex: '#2c3e50' },
  { id: 'gold', name: 'ゴールド', hex: '#d4ac0d' },
  { id: 'silver', name: 'シルバー', hex: '#95a5a6' },
];

export default function ColorPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const toggleColor = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const handleSubmit = async () => {
    if (selected.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const colorNames = selected.map((id) => COLORS.find((c) => c.id === id)?.name || id);
      const data = await callFortuneAPI('color', { colors: colorNames });
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message="色のエネルギーを読み取っています..." />;

  if (result) {
    const colorMeaningSection = result.colorMeanings
      ? result.colorMeanings.map((c: any) => `【${c.color}】\n${c.meaning}`).join('\n\n')
      : '';

    return (
      <FortuneResult
        title={result.luckyColor ? `ラッキーカラー: ${result.luckyColor}` : ''}
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          ...(colorMeaningSection ? [{ label: '選んだ色の意味', content: colorMeaningSection }] : []),
          { label: '今のあなたの心理', content: result.psychology },
          { label: '今の運勢', content: result.fortune },
          { label: 'カラーセラピーアドバイス', content: result.advice },
        ]}
        shareText={`カラー占いの結果: ${result.headline}\nラッキーカラーは${result.luckyColor}\n\nOracle Portal`}
        onReset={() => { setResult(null); setSelected([]); }}
        currentServiceId="color"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">🎨 カラー占い</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            直感で選んだ色があなたの今を映し出す
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <label className="font-medium text-sm">
            直感で気になる色を1〜3つ選んでください
          </label>
          <div className="grid grid-cols-4 gap-3">
            {COLORS.map((color) => {
              const isSelected = selected.includes(color.id);
              return (
                <button
                  key={color.id}
                  onClick={() => toggleColor(color.id)}
                  className="py-4 rounded-2xl text-center cursor-pointer transition-all"
                  style={{
                    border: isSelected ? '3px solid #d4a5b6' : '2px solid transparent',
                    background: color.hex,
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: isSelected ? '0 4px 15px rgba(0,0,0,0.2)' : 'none',
                  }}
                >
                  <span
                    className="text-xs font-bold block mt-1"
                    style={{
                      color: ['white', 'yellow', 'gold', 'silver'].includes(color.id) ? '#333' : '#fff',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-center" style={{ color: 'var(--text-light)' }}>
            {selected.length}/3 選択中
          </p>

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}

          <div className="flex justify-center mt-4">
            <button className="primary-btn" onClick={handleSubmit} disabled={selected.length === 0}>
              色を読み解く
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
