'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Trash2, Calendar, Sparkles } from 'lucide-react';
import { getHistory, deleteHistoryEntry, toggleFavorite, getHistoryStats, type HistoryEntry } from '@/lib/history';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [stats, setStats] = useState<any>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getHistory());
    setStats(getHistoryStats());
  };

  const handleDelete = (id: string) => {
    if (!confirm('この鑑定結果を削除しますか？')) return;
    deleteHistoryEntry(id);
    loadHistory();
  };

  const handleToggleFavorite = (id: string) => {
    toggleFavorite(id);
    loadHistory();
  };

  const filtered = filter === 'favorites' ? history.filter((h) => h.favorite) : history;

  return (
    <div className="w-full max-w-2xl mx-auto py-6 flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center justify-center gap-2">
          <BookOpen size={28} color="#b5a4d6" />
          占いの記録
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-light)' }}>
          あなたの過去の鑑定結果を振り返れます
        </p>
      </div>

      {/* Stats */}
      {stats && stats.total > 0 && (
        <div className="glass-panel">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Sparkles size={20} color="#d4a5b6" className="mx-auto mb-1" />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>{stats.total}</p>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>総鑑定数</p>
            </div>
            <div>
              <Heart size={20} color="#ffadad" fill="#ffadad" className="mx-auto mb-1" />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>{stats.favorites}</p>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>お気に入り</p>
            </div>
            <div>
              <Calendar size={20} color="#b5a4d6" className="mx-auto mb-1" />
              <p className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>
                {Object.keys(stats.byService).length}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>占い種類</p>
            </div>
          </div>
        </div>
      )}

      {/* Filter */}
      {history.length > 0 && (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setFilter('all')}
            className="px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all"
            style={{
              background: filter === 'all' ? 'linear-gradient(120deg, #b5a4d6, #d4a5b6)' : 'white',
              color: filter === 'all' ? 'white' : 'var(--text-main)',
              border: filter === 'all' ? 'none' : '1px solid #ddd',
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            すべて ({history.length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className="px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all"
            style={{
              background: filter === 'favorites' ? 'linear-gradient(120deg, #ffadad, #d4a5b6)' : 'white',
              color: filter === 'favorites' ? 'white' : 'var(--text-main)',
              border: filter === 'favorites' ? 'none' : '1px solid #ddd',
              fontFamily: "'Zen Maru Gothic', sans-serif",
            }}
          >
            <Heart size={14} className="inline mr-1" />
            お気に入り ({history.filter((h) => h.favorite).length})
          </button>
        </div>
      )}

      {/* Empty state */}
      {history.length === 0 && (
        <div className="glass-panel text-center py-12">
          <BookOpen size={48} color="#b5a4d6" className="mx-auto mb-4 opacity-50" />
          <p className="text-sm mb-4" style={{ color: 'var(--text-light)' }}>
            まだ占いの記録がありません
          </p>
          <Link href="/" className="primary-btn" style={{ textDecoration: 'none' }}>
            占いを始める
          </Link>
        </div>
      )}

      {/* History list */}
      <div className="flex flex-col gap-3">
        {filtered.map((entry) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl">{entry.serviceIcon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold m-0" style={{ color: 'var(--text-main)' }}>
                    {entry.serviceName}
                  </h3>
                  <span className="text-xs" style={{ color: 'var(--text-light)' }}>
                    {new Date(entry.createdAt).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                {entry.title && (
                  <p className="text-xs mb-1 font-bold" style={{ color: '#b5a4d6' }}>{entry.title}</p>
                )}
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-main)' }}>
                  {entry.headline}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleToggleFavorite(entry.id)}
                  className="p-2 rounded-full cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid #ddd' }}
                  aria-label="お気に入り"
                >
                  <Heart size={14} fill={entry.favorite ? '#ffadad' : 'none'} color={entry.favorite ? '#ffadad' : '#8e8a94'} />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 rounded-full cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid #ddd' }}
                  aria-label="削除"
                >
                  <Trash2 size={14} color="#8e8a94" />
                </button>
              </div>
            </div>

            <button
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
              className="text-xs mt-3 cursor-pointer"
              style={{ background: 'none', border: 'none', color: 'var(--text-light)' }}
            >
              {expanded === entry.id ? '閉じる' : '詳細を見る →'}
            </button>

            {expanded === entry.id && entry.result?.sections && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 pt-3 border-t border-gray-200"
              >
                {entry.result.sections.map((s: any, i: number) => (
                  <div key={i} className="mb-3">
                    <h4 className="text-xs font-bold mb-1" style={{ color: '#b5a4d6' }}>{s.label}</h4>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--text-main)' }}
                      dangerouslySetInnerHTML={{
                        __html: s.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\n/g, '<br />'),
                      }}
                    />
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
