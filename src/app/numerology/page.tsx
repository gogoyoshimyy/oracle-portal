'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';
import { callFortuneAPI } from '@/lib/fortune-api';

export default function NumerologyPage() {
  const [birthday, setBirthday] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!birthday) return;
    setLoading(true);
    setError(null);
    try {
      const data = await callFortuneAPI('numerology', { birthday, name });
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message="運命の数字を計算しています..." />;

  if (result) {
    return (
      <FortuneResult
        title={`ライフパスナンバー: ${result.lifePathNumber}`}
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          { label: '計算過程', content: result.calculation },
          { label: 'あなたの本質', content: result.personality },
          { label: '人生の使命', content: result.mission },
          { label: '今のあなたへのアドバイス', content: result.advice },
        ]}
        shareText={`数秘術の結果: ライフパスナンバー${result.lifePathNumber}\n${result.headline}\n\nOracle Portal`}
        onReset={() => { setResult(null); setBirthday(''); setName(''); }}
        currentServiceId="numerology"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">🔢 数秘術</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            生年月日から導かれる運命の数字
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <label className="font-medium text-sm">生年月日 *</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />

          <label className="font-medium text-sm">お名前（任意）</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: 山田太郎"
          />

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}

          <div className="flex justify-center mt-4">
            <button className="primary-btn" onClick={handleSubmit} disabled={!birthday}>
              運命の数字を見る
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
