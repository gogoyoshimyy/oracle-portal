'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Download, X, Share2 } from 'lucide-react';

// X (Twitter) icon SVG
const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShareImageProps {
  serviceId: string;
  serviceName: string;
  title: string;
  headline: string;
}

type Format = 'card' | 'square' | 'story';

const FORMATS: { id: Format; label: string; size: string; platform: string }[] = [
  { id: 'card', label: 'カード型', size: '1200×630', platform: 'X / Facebook / LINE' },
  { id: 'square', label: '正方形', size: '1080×1080', platform: 'Instagram フィード' },
  { id: 'story', label: 'ストーリー', size: '1080×1920', platform: 'Instagram Story / TikTok' },
];

export default function ShareImage({ serviceId, serviceName, title, headline }: ShareImageProps) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<Format>('card');

  const buildImageUrl = (fmt: Format) => {
    const params = new URLSearchParams({
      service: serviceId,
      headline,
      title,
      format: fmt,
    });
    return `/api/og?${params.toString()}`;
  };

  const handleDownload = async () => {
    try {
      const res = await fetch(buildImageUrl(format));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `oracle-${serviceId}-${format}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('画像のダウンロードに失敗しました');
    }
  };

  const handleShareToX = () => {
    const text = `${headline}\n\n#OraclePortal #${serviceName.replace(/\s/g, '')} #無料占い`;
    const url = 'https://oracle-portal.vercel.app';
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareToLine = () => {
    const text = `${headline}\n\nOracle Portalで無料占い`;
    const url = 'https://oracle-portal.vercel.app';
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(lineUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    try {
      const res = await fetch(buildImageUrl(format));
      const blob = await res.blob();
      const file = new File([blob], `oracle-${serviceId}.png`, { type: 'image/png' });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          text: `${headline}\n\nOracle Portal で無料AI占い`,
        });
      } else {
        // フォールバック: ダウンロード
        handleDownload();
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        handleDownload();
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all"
        style={{
          background: 'linear-gradient(120deg, #b5a4d6, #d4a5b6)',
          color: 'white',
          border: 'none',
          fontFamily: "'Zen Maru Gothic', sans-serif",
          boxShadow: '0 4px 12px rgba(181,164,214,0.4)',
        }}
      >
        <ImageIcon size={14} className="inline mr-1" />
        画像で保存・シェア
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(28, 22, 84, 0.7)', backdropFilter: 'blur(8px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, #fdfbf7 0%, #fceef5 100%)',
                boxShadow: '0 20px 60px rgba(28, 22, 84, 0.3)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-main)' }}>
                  📸 シェア用画像
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

              {/* フォーマット選択 */}
              <div className="flex gap-2 mb-4">
                {FORMATS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id)}
                    className="flex-1 p-3 rounded-2xl text-xs cursor-pointer transition-all"
                    style={{
                      background: format === f.id ? 'linear-gradient(120deg, #b5a4d6, #d4a5b6)' : 'rgba(255,255,255,0.6)',
                      color: format === f.id ? 'white' : 'var(--text-main)',
                      border: format === f.id ? 'none' : '1px solid #ddd',
                      fontFamily: "'Zen Maru Gothic', sans-serif",
                    }}
                  >
                    <div className="font-bold mb-1">{f.label}</div>
                    <div className="text-xs opacity-80">{f.size}</div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-center mb-3" style={{ color: 'var(--text-light)' }}>
                {FORMATS.find((f) => f.id === format)?.platform}
              </p>

              {/* プレビュー */}
              <div
                className="rounded-2xl overflow-hidden mb-4 bg-gray-100"
                style={{
                  aspectRatio: format === 'card' ? '1200/630' : format === 'square' ? '1/1' : '1080/1920',
                  maxHeight: '50vh',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={format}
                  src={buildImageUrl(format)}
                  alt="シェア画像プレビュー"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              {/* アクションボタン */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleNativeShare}
                  className="primary-btn w-full"
                >
                  <Share2 size={16} /> 画像をシェア
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="secondary-btn flex-1"
                  >
                    <Download size={16} /> 保存
                  </button>
                  <button
                    onClick={handleShareToLine}
                    className="secondary-btn flex-1"
                    style={{
                      background: '#06C755',
                      color: 'white',
                      border: 'none',
                    }}
                  >
                    💬 LINE
                  </button>
                  <button
                    onClick={handleShareToX}
                    className="secondary-btn flex-1"
                    style={{
                      background: '#000',
                      color: 'white',
                      border: 'none',
                    }}
                  >
                    <XIcon size={14} /> X
                  </button>
                </div>
              </div>

              <p className="text-xs text-center mt-4" style={{ color: 'var(--text-light)' }}>
                ※ 「画像をシェア」がご利用できない端末では自動で保存されます
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
