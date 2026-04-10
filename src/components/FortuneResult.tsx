'use client';

import { motion } from 'framer-motion';
import { Share2, RefreshCw, Sparkles, MessageCircle, Heart, Download, BookOpen, Crown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fortuneServices } from '@/lib/fortunes';
import AdBanner from './AdBanner';
import PhoneFortuneAffiliate from './PhoneFortuneAffiliate';
import { saveHistoryEntry, toggleFavorite } from '@/lib/history';
import { isPremium, PREMIUM_PRICE } from '@/lib/premium';
import { exportToPDF } from '@/lib/pdf-export';
import ShareImage from './ShareImage';

type AffiliateCategory = '恋愛' | '仕事' | '人生' | '夢' | '相性' | '前世' | '総合';

interface FortuneResultProps {
  title: string;
  headline: string;
  sections: { label: string; content: string }[];
  keywords?: string[];
  shareText: string;
  onReset: () => void;
  currentServiceId: string;
}

const SERVICE_CATEGORY: Record<string, AffiliateCategory> = {
  dream: '夢',
  tarot: '人生',
  numerology: '人生',
  horoscope: '人生',
  compatibility: '相性',
  'name-fortune': '人生',
  'past-life': '前世',
  birthday: '人生',
  color: '人生',
};

function formatText(text: string) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text
          .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#d4a5b6">$1</strong>')
          .replace(/\n/g, '<br />'),
      }}
    />
  );
}

export default function FortuneResult({
  title,
  headline,
  sections,
  keywords,
  shareText,
  onReset,
  currentServiceId,
}: FortuneResultProps) {
  const [savedId, setSavedId] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [premium, setPremium] = useState(false);

  const service = fortuneServices.find((s) => s.id === currentServiceId);

  // 自動的に履歴に保存
  useEffect(() => {
    if (!service) return;
    const entry = saveHistoryEntry({
      serviceId: currentServiceId,
      serviceName: service.name,
      serviceIcon: service.icon,
      title,
      headline,
      result: { sections, keywords },
      input: {},
    });
    setSavedId(entry.id);
    setPremium(isPremium());
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert('結果をコピーしました！');
      } catch {}
    }
  };

  const handleFavorite = () => {
    if (!savedId) return;
    toggleFavorite(savedId);
    setIsFavorited(!isFavorited);
  };

  const handlePDFDownload = () => {
    if (!premium) {
      // プレミアム誘導
      if (confirm('PDFダウンロードはプレミアム機能です。プレミアムプランの詳細を見ますか？')) {
        window.location.href = '/premium';
      }
      return;
    }
    if (!service) return;
    exportToPDF({
      title,
      serviceName: service.name,
      headline,
      sections,
      date: new Date().toLocaleDateString('ja-JP'),
    });
  };

  const otherServices = fortuneServices
    .filter((s) => s.id !== currentServiceId)
    .slice(0, 3);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <motion.div
        className="glass-panel"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {headline && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 p-5 rounded-2xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(181,164,214,0.1), rgba(212,165,182,0.1))',
            }}
          >
            <Sparkles size={20} color="#d4a5b6" className="mx-auto mb-2" />
            <p className="text-lg font-semibold leading-relaxed" style={{ color: '#5a5560' }}>
              {headline}
            </p>
          </motion.div>
        )}

        {title && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold gradient-text">{title}</h2>
          </motion.div>
        )}

        {keywords && keywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 justify-center mb-6 flex-wrap"
          >
            {keywords.map((k, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  background: 'rgba(181,164,214,0.15)',
                  color: '#7a6f8a',
                  border: '1px solid rgba(181,164,214,0.3)',
                }}
              >
                #{k}
              </span>
            ))}
          </motion.div>
        )}

        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.2 }}
            className="mb-6"
          >
            <div className="flex items-center gap-2 mb-2 pb-2" style={{ borderBottom: '1px solid #eee' }}>
              <MessageCircle size={16} color="#d4a5b6" />
              <h3 className="text-sm font-bold m-0" style={{ color: '#5a5560' }}>
                {section.label}
              </h3>
            </div>
            <div className="leading-relaxed text-sm" style={{ lineHeight: '2' }}>
              {formatText(section.content)}
            </div>
          </motion.div>
        ))}

        {/* 自動保存通知 */}
        {savedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs mb-4 flex items-center justify-center gap-1"
            style={{ color: 'var(--text-light)' }}
          >
            <BookOpen size={12} /> 占い履歴に保存しました
          </motion.div>
        )}

        {/* アクションボタン群 */}
        <div className="mt-6 flex gap-2 justify-center flex-wrap">
          {service && (
            <ShareImage
              serviceId={currentServiceId}
              serviceName={service.name}
              title={title}
              headline={headline}
            />
          )}

          <button
            onClick={handleFavorite}
            className="px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all"
            style={{
              background: isFavorited ? 'linear-gradient(120deg, #ffadad, #d4a5b6)' : 'white',
              color: isFavorited ? 'white' : 'var(--text-main)',
              border: '1px solid #ddd',
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            <Heart size={14} fill={isFavorited ? 'white' : 'none'} className="inline mr-1" />
            {isFavorited ? 'お気に入り済み' : 'お気に入り'}
          </button>

          <button
            onClick={handlePDFDownload}
            className="px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all relative"
            style={{
              background: 'white',
              color: 'var(--text-main)',
              border: '1px solid #ddd',
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            <Download size={14} className="inline mr-1" />
            PDF出力
            {!premium && (
              <span
                className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-xs"
                style={{ background: 'linear-gradient(120deg, #e8d5b5, #d4a5b6)', color: 'white' }}
              >
                <Crown size={10} className="inline" />
              </span>
            )}
          </button>
        </div>

        <div className="mt-4 flex gap-3 justify-center flex-wrap">
          <button className="secondary-btn" onClick={onReset}>
            <RefreshCw size={16} /> もう一度占う
          </button>
          <button className="primary-btn" onClick={handleShare}>
            <Share2 size={16} /> シェアする
          </button>
        </div>
      </motion.div>

      {/* プレミアム誘導 */}
      {!premium && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 text-center"
          style={{
            background: 'linear-gradient(135deg, #e8d5b5 0%, #d4a5b6 50%, #b5a4d6 100%)',
            color: 'white',
            boxShadow: '0 8px 24px rgba(212,165,182,0.3)',
          }}
        >
          <Crown size={28} className="mx-auto mb-2" />
          <h3 className="text-base font-bold mb-1">プレミアム会員でもっと深く</h3>
          <p className="text-xs mb-3" style={{ opacity: 0.9 }}>
            詳細鑑定（3倍の文字数）・PDF出力・広告非表示・無制限保存
          </p>
          <Link
            href="/premium"
            className="inline-block px-6 py-2 rounded-full text-sm font-bold no-underline"
            style={{
              background: 'white',
              color: '#b5a4d6',
              textDecoration: 'none',
            }}
          >
            月¥{PREMIUM_PRICE} で始める →
          </Link>
        </motion.div>
      )}

      <PhoneFortuneAffiliate context="result" category={SERVICE_CATEGORY[currentServiceId] || '総合'} />

      <AdBanner />

      <div className="glass-panel">
        <p className="text-center text-sm mb-4" style={{ color: 'var(--text-light)' }}>
          他の占いも試してみませんか？
        </p>
        <div className="grid grid-cols-3 gap-3">
          {otherServices.map((s) => (
            <Link
              key={s.id}
              href={s.path}
              className="text-center py-3 rounded-xl text-sm no-underline transition-all hover:scale-105"
              style={{
                background: `${s.color}15`,
                color: 'var(--text-main)',
                textDecoration: 'none',
              }}
            >
              <span className="text-xl block mb-1">{s.icon}</span>
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
