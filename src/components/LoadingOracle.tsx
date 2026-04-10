'use client';

import { motion } from 'framer-motion';
import { Stars, Sparkles, Moon } from 'lucide-react';
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
      <div
        className="rounded-3xl text-center py-16 px-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2c1654 0%, #4a1942 50%, #1a1a3e 100%)',
          border: '1px solid rgba(232,213,181,0.3)',
          boxShadow: '0 8px 32px rgba(28, 22, 84, 0.25)',
          minHeight: '400px',
        }}
      >
        {/* 背景の浮遊する星々 */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              fontSize: i % 2 === 0 ? 16 : 12,
              color: i % 3 === 0 ? '#e8d5b5' : i % 3 === 1 ? '#d4a5b6' : '#b5a4d6',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            ✦
          </motion.div>
        ))}

        {/* 中央の月 */}
        <motion.div
          className="relative inline-block mb-6"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
          }}
        >
          <Moon size={64} color="#e8d5b5" fill="rgba(232,213,181,0.3)" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={32} color="#d4a5b6" />
          </motion.div>
        </motion.div>

        <motion.p
          className="text-base font-bold mb-2"
          style={{ color: '#e8d5b5' }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message || 'あなたのために星々が物語を紡いでいます...'}
        </motion.p>

        {/* プログレスドット */}
        <div className="flex justify-center gap-2 my-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: '#e8d5b5' }}
              animate={{
                scale: [0.8, 1.4, 0.8],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs mt-6 max-w-sm mx-auto"
          style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.7' }}
        >
          💫 {tip}
        </motion.p>
      </div>

      <div className="mt-4">
        <AdBanner />
      </div>
    </div>
  );
}
