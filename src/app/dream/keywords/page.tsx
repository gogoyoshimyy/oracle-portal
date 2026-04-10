import type { Metadata } from 'next';
import Link from 'next/link';
import { allDreamKeywords as dreamKeywords } from '@/lib/dream-keywords-all';
import { dreamCategories } from '@/lib/dream-categories';
import { Sparkles, Search } from 'lucide-react';
import DreamKeywordSearch from '@/components/DreamKeywordSearch';

export const metadata: Metadata = {
  title: '夢占い辞典 - 全キーワード一覧',
  description: 'よく見る夢の意味を網羅した夢占い辞典。蛇の夢、追いかけられる夢、歯が抜ける夢など、あらゆる夢の意味をカテゴリ別に解説。無料鑑定もご利用いただけます。',
  keywords: ['夢占い 一覧', '夢占い 辞典', '夢占い キーワード', '夢の意味', '夢占い 無料'],
  openGraph: {
    title: '夢占い辞典 - 全キーワード一覧 | Oracle Portal',
    description: 'よく見る夢の意味を網羅した夢占い辞典。',
    type: 'website',
    images: [{
      url: '/api/og?service=dream&title=夢占い辞典&headline=あらゆる夢の意味を読み解く',
      width: 1200,
      height: 630,
    }],
  },
};

export default function DreamKeywordsListPage() {
  return (
    <div className="w-full max-w-3xl mx-auto py-6 flex flex-col gap-6">
      {/* Hero */}
      <div className="text-center">
        <Sparkles size={28} color="#b5a4d6" className="mx-auto mb-2" />
        <h1 className="text-3xl font-bold gradient-text mb-2">
          夢占い辞典
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-light)' }}>
          {dreamKeywords.length}種類の夢の意味を網羅。気になる夢を探してみてください
        </p>
      </div>

      {/* Personal Oracle CTA */}
      <div
        className="rounded-3xl p-5 text-center"
        style={{
          background: 'linear-gradient(135deg, rgba(181,164,214,0.15), rgba(212,165,182,0.15))',
          border: '1px solid rgba(212,165,182,0.3)',
        }}
      >
        <p className="text-sm mb-3" style={{ color: 'var(--text-main)' }}>
          見た夢の内容を入力するだけで、あなただけのパーソナル鑑定をお届けします
        </p>
        <Link
          href="/dream"
          className="primary-btn inline-flex"
          style={{ textDecoration: 'none' }}
        >
          🌙 夢占いを試す
        </Link>
      </div>

      {/* Search */}
      <DreamKeywordSearch />

      {/* Categories */}
      {dreamCategories.map((cat) => {
        const items = cat.slugs
          .map((slug) => dreamKeywords.find((k) => k.slug === slug))
          .filter(Boolean) as typeof dreamKeywords;

        if (items.length === 0) return null;

        return (
          <section key={cat.id} className="glass-panel">
            <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '2px solid rgba(212,165,182,0.2)' }}>
              <span className="text-2xl">{cat.emoji}</span>
              <div>
                <h2 className="text-base font-bold m-0" style={{ color: 'var(--text-main)' }}>
                  {cat.name}
                </h2>
                <p className="text-xs m-0" style={{ color: 'var(--text-light)' }}>
                  {cat.description}・{items.length}件
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.map((kw) => (
                <Link
                  key={kw.slug}
                  href={`/dream/${kw.slug}`}
                  className="text-center p-3 rounded-2xl no-underline transition-all hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.6)',
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    border: '1px solid rgba(212,165,182,0.15)',
                  }}
                >
                  <div className="text-2xl mb-1">{kw.emoji}</div>
                  <div className="text-sm font-bold">{kw.title}</div>
                  <div
                    className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs"
                    style={{
                      background: kw.luck === '大吉' ? 'rgba(232,213,181,0.4)' :
                                  kw.luck === '吉' ? 'rgba(202,255,191,0.4)' :
                                  kw.luck === '中吉' ? 'rgba(255,214,165,0.4)' :
                                  kw.luck === '注意' ? 'rgba(255,173,173,0.4)' :
                                  'rgba(181,164,214,0.4)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {kw.luck}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* All keywords list */}
      <section className="glass-panel">
        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>
          📖 全{dreamKeywords.length}キーワード
        </h2>
        <div className="flex flex-wrap gap-2">
          {dreamKeywords
            .sort((a, b) => a.title.localeCompare(b.title, 'ja'))
            .map((kw) => (
              <Link
                key={kw.slug}
                href={`/dream/${kw.slug}`}
                className="px-3 py-2 rounded-full text-xs no-underline transition-all hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  border: '1px solid rgba(181,164,214,0.2)',
                }}
              >
                {kw.emoji} {kw.title}
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
