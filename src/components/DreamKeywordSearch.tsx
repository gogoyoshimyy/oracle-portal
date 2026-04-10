'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { allDreamKeywords as dreamKeywords } from '@/lib/dream-keywords-all';

export default function DreamKeywordSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return dreamKeywords
      .filter(
        (kw) =>
          kw.title.toLowerCase().includes(q) ||
          kw.description.toLowerCase().includes(q) ||
          kw.variations.some((v) => v.title.toLowerCase().includes(q))
      )
      .slice(0, 12);
  }, [query]);

  return (
    <div className="glass-panel">
      <div className="relative">
        <Search
          size={16}
          className="absolute"
          style={{ left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="夢のキーワードで検索（例: 蛇、追いかけられる）"
          style={{ paddingLeft: 42 }}
        />
      </div>

      {query && results.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
          {results.map((kw) => (
            <Link
              key={kw.slug}
              href={`/dream/${kw.slug}`}
              className="flex items-center gap-2 p-2 rounded-xl no-underline transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.6)',
                color: 'var(--text-main)',
                textDecoration: 'none',
                border: '1px solid rgba(181,164,214,0.15)',
              }}
            >
              <span className="text-xl">{kw.emoji}</span>
              <span className="text-xs">{kw.title}</span>
            </Link>
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <p className="text-xs text-center mt-3" style={{ color: 'var(--text-light)' }}>
          「{query}」に該当する夢は見つかりませんでした
        </p>
      )}
    </div>
  );
}
