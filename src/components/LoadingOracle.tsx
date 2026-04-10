'use client';

import { motion } from 'framer-motion';
import { Stars } from 'lucide-react';
import { useMemo } from 'react';
import AdBanner from './AdBanner';

const TIPS = [
  '夢の中の「水」は、感情の流れを象徴すると言われています',
  '空を飛ぶ夢は、自由への渇望や自信の表れです',
  'タロットの大アルカナは22枚。人生の大きな転機を示します',
  '数秘術のルーツは古代ギリシャの数学者ピタゴラスに遡ります',
  '星座占いの起源は約5,000年前のメソポタミアに遡ります',
  '姓名判断は、漢字の画数に宿る「気」を読み取る占術です',
  '色は無意識の心理状態を映し出す鏡です',
  '前世の記憶は、今世での使命につながっています',
];

interface LoadingOracleProps {
  message?: string;
}

export default function LoadingOracle({ message }: LoadingOracleProps) {
  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="glass-panel text-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Stars size={48} color="#d4a5b6" className="mx-auto" />
        </motion.div>
        <p className="mt-4" style={{ color: 'var(--text-main)' }}>
          {message || 'あなたのために星々が物語を紡いでいます...'}
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-6 text-sm"
          style={{ color: 'var(--text-light)' }}
        >
          {tip}
        </motion.p>
        <AdBanner />
      </div>
    </div>
  );
}
