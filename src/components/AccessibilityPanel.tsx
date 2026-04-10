'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Type, Eye } from 'lucide-react';

type FontSize = 'normal' | 'large' | 'xlarge';

const STORAGE_KEY = 'oracle_a11y_settings';

interface Settings {
  fontSize: FontSize;
  reduceMotion: boolean;
  highContrast: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  fontSize: 'normal',
  reduceMotion: false,
  highContrast: false,
};

function applySettings(settings: Settings) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // フォントサイズ
  const sizeMap = { normal: '16px', large: '18px', xlarge: '20px' };
  root.style.fontSize = sizeMap[settings.fontSize];

  // モーション削減
  if (settings.reduceMotion) {
    root.classList.add('reduce-motion');
  } else {
    root.classList.remove('reduce-motion');
  }

  // ハイコントラスト
  if (settings.highContrast) {
    root.classList.add('high-contrast');
  } else {
    root.classList.remove('high-contrast');
  }
}

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch {}
  }, []);

  const update = (partial: Partial<Settings>) => {
    const next = { ...settings, ...partial };
    setSettings(next);
    applySettings(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
        aria-label="表示設定"
        style={{
          background: 'linear-gradient(135deg, #c47795, #8b78b8)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 16px rgba(196,119,149,0.4)',
        }}
      >
        <Settings size={20} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center"
            style={{ background: 'rgba(28, 22, 84, 0.5)', backdropFilter: 'blur(8px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl p-6 max-w-md w-full"
              style={{
                background: 'linear-gradient(135deg, #fdfbf7 0%, #fceef5 100%)',
                boxShadow: '0 20px 60px rgba(28, 22, 84, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold m-0 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <Settings size={18} /> 表示設定
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.5)', border: 'none' }}
                  aria-label="閉じる"
                >
                  <X size={16} />
                </button>
              </div>

              {/* 文字サイズ */}
              <div className="mb-5">
                <label className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <Type size={14} /> 文字サイズ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { id: 'normal', label: '標準', size: '14px' },
                    { id: 'large', label: '大きめ', size: '16px' },
                    { id: 'xlarge', label: '特大', size: '18px' },
                  ] as const).map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => update({ fontSize: opt.id })}
                      className="py-3 rounded-2xl cursor-pointer transition-all"
                      style={{
                        background: settings.fontSize === opt.id ? 'linear-gradient(120deg, #c47795, #8b78b8)' : 'white',
                        color: settings.fontSize === opt.id ? 'white' : 'var(--text-main)',
                        border: settings.fontSize === opt.id ? 'none' : '1px solid #ddd',
                        fontSize: opt.size,
                        fontFamily: "'Zen Maru Gothic', sans-serif",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* アニメーション */}
              <div className="mb-5">
                <label className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <Eye size={14} /> 動きを減らす
                </label>
                <button
                  onClick={() => update({ reduceMotion: !settings.reduceMotion })}
                  className="w-full py-3 rounded-2xl text-sm cursor-pointer transition-all flex items-center justify-between px-4"
                  style={{
                    background: settings.reduceMotion ? 'linear-gradient(120deg, #c47795, #8b78b8)' : 'white',
                    color: settings.reduceMotion ? 'white' : 'var(--text-main)',
                    border: settings.reduceMotion ? 'none' : '1px solid #ddd',
                    fontFamily: "'Zen Maru Gothic', sans-serif",
                  }}
                >
                  <span>背景の星を止める</span>
                  <span>{settings.reduceMotion ? 'ON' : 'OFF'}</span>
                </button>
                <p className="text-xs mt-2" style={{ color: 'var(--text-light)' }}>
                  目の疲れを感じる方におすすめ
                </p>
              </div>

              <p className="text-xs text-center mt-4" style={{ color: 'var(--text-light)' }}>
                設定はこの端末に保存されます
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
