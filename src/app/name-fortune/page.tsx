'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FortuneResult from '@/components/FortuneResult';
import LoadingOracle from '@/components/LoadingOracle';
import { callFortuneAPI } from '@/lib/fortune-api';

export default function NameFortunePage() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!lastName || !firstName) return;
    setLoading(true);
    setError(null);
    try {
      const data = await callFortuneAPI('name-fortune', { lastName, firstName });
      setResult(data);
    } catch (e: any) {
      setError(e.message || '鑑定に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingOracle message="画数を数え、運勢を読み解いています..." />;

  if (result) {
    const kakuList = ['tenKaku', 'jinKaku', 'chiKaku', 'gaiKaku', 'souKaku'];
    const kakuNames: Record<string, string> = {
      tenKaku: '天格（祖運）',
      jinKaku: '人格（主運）',
      chiKaku: '地格（初運）',
      gaiKaku: '外格（援運）',
      souKaku: '総格（総運）',
    };
    const kakuSection = kakuList
      .map((k) => {
        const d = result[k];
        return d ? `${kakuNames[k]}: ${d.value}画 【${d.luck}】\n${d.meaning}` : '';
      })
      .filter(Boolean)
      .join('\n\n');

    return (
      <FortuneResult
        title={`${lastName} ${firstName}`}
        headline={result.headline}
        keywords={result.keywords}
        sections={[
          { label: '五格の結果', content: kakuSection },
          { label: '総合鑑定', content: result.overall },
          { label: 'あなたへのアドバイス', content: result.advice },
        ]}
        shareText={`姓名判断: ${lastName}${firstName}\n${result.headline}\n\nOracle Portal`}
        onReset={() => { setResult(null); setLastName(''); setFirstName(''); }}
        currentServiceId="name-fortune"
      />
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="text-center mb-2">
          <h1 className="text-3xl font-bold gradient-text">✍️ 姓名判断</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-light)' }}>
            お名前の画数からAIが運勢を鑑定
          </p>
        </div>
      </motion.div>

      <motion.div className="glass-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex flex-col gap-4">
          <label className="font-medium text-sm">姓（漢字）</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="例: 山田" />

          <label className="font-medium text-sm">名（漢字）</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="例: 太郎" />

          {error && <p className="text-sm text-center" style={{ color: '#ffadad' }}>{error}</p>}

          <div className="flex justify-center mt-4">
            <button className="primary-btn" onClick={handleSubmit} disabled={!lastName || !firstName}>
              姓名を占う
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
