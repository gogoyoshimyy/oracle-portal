'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';

export default function CompatibilityPage() {
  const [p1Name, setP1Name] = useState('');
  const [p1Birthday, setP1Birthday] = useState('');
  const [p2Name, setP2Name] = useState('');
  const [p2Birthday, setP2Birthday] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!p1Birthday || !p2Birthday) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/fortune', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'compatibility',
          input: {
            person1: { name: p1Name || 'Aさん', birthday: p1Birthday },
            person2: { name: p2Name || 'Bさん', birthday: p2Birthday },
          },
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

  if (loading) return <LoadingOracle message="二人の星を読み合わせています..." />;

  if (result) {
    return (
      <FortuneResult
        title={`相性スコア: ${result.score}点`}
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          { label: '総合相性', content: result.overall },
          { label: '相性の良いポイント', content: result.strengths },
          { label: '気をつけたいポイント', content: result.challenges },
          { label: 'より良い関係のために', content: result.advice },
        ]}
        shareText={`相性占いの結果: ${result.score}点！\n${result.headline}\n\nOracle Portal`}
        onReset={() => { setResult(null); setP1Name(''); setP1Birthday(''); setP2Name(''); setP2Birthday(''); }}
        currentServiceId="compatibility"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">💕 相性占い</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            二人の生年月日からAIが相性を鑑定
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,173,173,0.1)' }}>
            <p className="text-sm font-bold mb-2" style={{ color: '#d4a5b6' }}>あなた</p>
            <input type="text" value={p1Name} onChange={(e) => setP1Name(e.target.value)} placeholder="お名前（任意）" className="mb-3" />
            <input type="date" value={p1Birthday} onChange={(e) => setP1Birthday(e.target.value)} />
          </div>

          <div className="text-center text-2xl">💕</div>

          <div className="p-4 rounded-2xl" style={{ background: 'rgba(160,196,255,0.1)' }}>
            <p className="text-sm font-bold mb-2" style={{ color: '#b5a4d6' }}>お相手</p>
            <input type="text" value={p2Name} onChange={(e) => setP2Name(e.target.value)} placeholder="お名前（任意）" className="mb-3" />
            <input type="date" value={p2Birthday} onChange={(e) => setP2Birthday(e.target.value)} />
          </div>

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}

          <div className="flex justify-center mt-4">
            <button className="primary-btn" onClick={handleSubmit} disabled={!p1Birthday || !p2Birthday}>
              相性を占う
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
