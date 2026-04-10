'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';
import { callFortuneAPI } from '@/lib/fortune-api';

export default function BirthdayPage() {
  const [birthday, setBirthday] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!birthday) return;
    setLoading(true);
    setError(null);
    try {
      const data = await callFortuneAPI('birthday', { birthday });
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message="あなたの誕生日の星を読んでいます..." />;

  if (result) {
    const infoSection = [
      `星座: ${result.sign || '-'}`,
      `エレメント: ${result.element || '-'}`,
      `誕生花: ${result.birthFlower || '-'}`,
      `誕生石: ${result.birthStone || '-'}`,
    ].join('\n');

    return (
      <FortuneResult
        title={`${birthday.replace(/-/g, '/')} 生まれ`}
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          { label: '誕生日情報', content: infoSection },
          { label: 'あなたの基本性格', content: result.personality },
          { label: '長所・才能', content: result.strengths },
          { label: '成長のポイント', content: result.challenges },
          { label: '今年の運勢', content: result.yearForecast },
          { label: 'あなたへのメッセージ', content: result.advice },
        ]}
        shareText={`${birthday}生まれの占い: ${result.headline}\n\nOracle Portal`}
        onReset={() => { setResult(null); setBirthday(''); }}
        currentServiceId="birthday"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">🎂 誕生日占い</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            生まれた日に隠された性格と運命
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <label className="font-medium text-sm">生年月日</label>
          <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}

          <div className="flex justify-center mt-4">
            <button className="primary-btn" onClick={handleSubmit} disabled={!birthday}>
              誕生日を占う
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
