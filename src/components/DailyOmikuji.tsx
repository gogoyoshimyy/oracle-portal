'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getDailyOmikuji } from '@/lib/omikuji';

export default function DailyOmikuji() {
  const [drawn, setDrawn] = useState(false);
  const [drawing, setDrawing] = useState(false);
  const result = getDailyOmikuji();

  const handleDraw = () => {
    setDrawing(true);
    setTimeout(() => {
      setDrawn(true);
      setDrawing(false);
    }, 1500);
  };

  return (
    <section className="w-full max-w-3xl">
      <div className="text-center mb-3">
        <h2 className="text-base font-bold mb-1" style={{ color: 'var(--text-main)' }}>
          🎋 今日のAIおみくじ
        </h2>
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          1日1回、その日のあなたの運勢を占います
        </p>
      </div>

      <div
        className="rounded-3xl p-6 text-center"
        style={{
          background: 'linear-gradient(135deg, #2c1654 0%, #4a1942 50%, #1a1a3e 100%)',
          border: '1px solid rgba(232,213,181,0.3)',
          boxShadow: '0 8px 32px rgba(28, 22, 84, 0.25)',
        }}
      >
        <AnimatePresence mode="wait">
          {!drawn && !drawing && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🎋
              </motion.div>
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>
                おみくじを引いて<br />今日の運勢を占いましょう
              </p>
              <button
                onClick={handleDraw}
                className="px-8 py-3 rounded-full font-bold text-sm cursor-pointer transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(120deg, #e8d5b5, #d4a5b6)',
                  color: '#2c1654',
                  border: 'none',
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                  boxShadow: '0 4px 15px rgba(232,213,181,0.4)',
                }}
              >
                おみくじを引く
              </button>
            </motion.div>
          )}

          {drawing && (
            <motion.div
              key="drawing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-6xl mb-4 inline-block"
              >
                <Sparkles size={60} color="#e8d5b5" />
              </motion.div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                運命の糸を紡いでいます...
              </p>
            </motion.div>
          )}

          {drawn && (
            <motion.div
              key="result"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-2"
              >
                {result.emoji}
              </motion.div>
              <h3
                className="text-3xl font-bold mb-2"
                style={{
                  background: `linear-gradient(120deg, ${result.color}, #d4a5b6)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: "'Zen Maru Gothic', sans-serif",
                }}
              >
                {result.level}
              </h3>
              <p
                className="text-xs mb-4 inline-block px-3 py-1 rounded-full"
                style={{
                  background: 'rgba(232,213,181,0.15)',
                  color: '#e8d5b5',
                  border: '1px solid rgba(232,213,181,0.3)',
                }}
              >
                出現率 {result.rarity}%
              </p>

              <p
                className="text-sm leading-relaxed mb-5 mx-auto max-w-md"
                style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.9' }}
              >
                {result.message}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-md mx-auto">
                <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>ラッキーカラー</p>
                  <p className="text-sm font-bold" style={{ color: '#e8d5b5' }}>{result.luckyColor}</p>
                </div>
                <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>ラッキーアイテム</p>
                  <p className="text-sm font-bold" style={{ color: '#e8d5b5' }}>{result.luckyItem}</p>
                </div>
                <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>ラッキーナンバー</p>
                  <p className="text-sm font-bold" style={{ color: '#e8d5b5' }}>{result.luckyNumber}</p>
                </div>
                <div className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>吉方位</p>
                  <p className="text-sm font-bold" style={{ color: '#e8d5b5' }}>{result.luckyDirection}</p>
                </div>
              </div>

              <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                ※ おみくじは1日1回。明日また引きに来てください
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
