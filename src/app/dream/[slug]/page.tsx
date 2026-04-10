import { notFound } from 'next/navigation';
import Link from 'next/link';
import { dreamKeywords } from '@/lib/dream-keywords';
import type { Metadata } from 'next';
import PhoneFortuneAffiliate from '@/components/PhoneFortuneAffiliate';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dreamKeywords.map((kw) => ({ slug: kw.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kw = dreamKeywords.find((k) => k.slug === slug);
  if (!kw) return {};

  return {
    title: `${kw.title}の意味 - 夢占い`,
    description: kw.description,
    keywords: [kw.title, '夢占い', `夢占い ${kw.title}`, ...kw.variations.slice(0, 3).map((v) => v.title)],
    openGraph: {
      title: `${kw.title}の意味 | Oracle Portal 夢占い`,
      description: kw.description,
      type: 'article',
    },
  };
}

export default async function DreamKeywordPage({ params }: Props) {
  const { slug } = await params;
  const kw = dreamKeywords.find((k) => k.slug === slug);
  if (!kw) notFound();

  const relatedKeywords = dreamKeywords
    .filter((k) => k.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <article className="w-full max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex gap-2" style={{ color: 'var(--text-light)' }}>
        <Link href="/" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Oracle Portal</Link>
        <span>/</span>
        <Link href="/dream" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>夢占い</Link>
        <span>/</span>
        <span style={{ color: 'var(--text-main)' }}>{kw.title}</span>
      </nav>

      {/* Hero */}
      <div className="glass-panel mb-6">
        <div className="text-center mb-6">
          <span className="text-5xl block mb-4">{kw.emoji}</span>
          <h1 className="text-2xl font-bold gradient-text mb-3">{kw.title}の意味</h1>
          <div className="inline-block px-4 py-1 rounded-full mb-3" style={{
            background: kw.luck === '大吉' ? 'linear-gradient(120deg, #e8d5b5, #d4a5b6)' :
                        kw.luck === '吉' ? 'linear-gradient(120deg, #caffbf, #a0c4ff)' :
                        kw.luck === '中吉' ? 'linear-gradient(120deg, #ffd6a5, #e8d5b5)' :
                        kw.luck === '注意' ? 'linear-gradient(120deg, #ffadad, #b5a4d6)' :
                        'linear-gradient(120deg, #b5a4d6, #d4a5b6)',
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            letterSpacing: '0.1em',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            {kw.luck === '大吉' ? '🌟 大吉' :
             kw.luck === '吉' ? '✨ 吉' :
             kw.luck === '中吉' ? '⭐ 中吉' :
             kw.luck === '注意' ? '⚠️ 注意' :
             '✨ 末吉'}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-light)' }}>
            {kw.description}
          </p>
        </div>

        {/* CTA */}
        <div
          className="text-center p-4 rounded-2xl mb-6"
          style={{ background: 'linear-gradient(135deg, rgba(181,164,214,0.1), rgba(212,165,182,0.1))' }}
        >
          <p className="text-sm mb-3" style={{ color: 'var(--text-main)' }}>
            あなたの夢をAIがパーソナルに解読します
          </p>
          <Link href="/dream" className="primary-btn" style={{ textDecoration: 'none' }}>
            無料で夢占いを試す →
          </Link>
        </div>
      </div>

      {/* Content sections */}
      <div className="glass-panel mb-6">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)', borderBottom: '2px solid rgba(212,165,182,0.3)', paddingBottom: '0.5rem' }}>
          {kw.title}が暗示するもの
        </h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)', lineHeight: '2' }}>
          {kw.meaning}
        </p>

        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)', borderBottom: '2px solid rgba(181,164,214,0.3)', paddingBottom: '0.5rem' }}>
          心理学的な解釈
        </h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)', lineHeight: '2' }}>
          {kw.psychology}
        </p>

        {/* Variations */}
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-main)', borderBottom: '2px solid rgba(232,213,181,0.5)', paddingBottom: '0.5rem' }}>
          パターン別の詳しい意味
        </h2>
        <div className="flex flex-col gap-3 mb-6">
          {kw.variations.map((v, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(181,164,214,0.2)',
              }}
            >
              <h4 className="text-sm font-bold mb-2" style={{ color: '#b5a4d6' }}>
                {v.title}
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-main)', lineHeight: '1.9' }}>
                {v.meaning}
              </p>
            </div>
          ))}
        </div>

        {/* Advice */}
        <div
          className="p-5 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, rgba(181,164,214,0.08), rgba(212,165,182,0.08))' }}
        >
          <h3 className="text-sm font-bold mb-2" style={{ color: '#b5a4d6' }}>
            💡 夢からのアドバイス
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-main)', lineHeight: '1.9' }}>
            {kw.advice}
          </p>
        </div>
      </div>

      {/* AI Dream CTA */}
      <div className="glass-panel mb-6 text-center">
        <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-main)' }}>
          あなたの{kw.title}をもっと詳しく読み解く
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-light)' }}>
          AIがあなたの夢の内容に合わせた、パーソナルな鑑定を無料でお届けします
        </p>
        <Link href="/dream" className="primary-btn" style={{ textDecoration: 'none' }}>
          AIで夢占い →
        </Link>
      </div>

      {/* Phone fortune affiliate */}
      <div className="mb-6">
        <PhoneFortuneAffiliate context="keyword" category="夢" />
      </div>

      {/* Ad slot */}
      <div className="ad-slot mb-6">
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>AD</span>
      </div>

      {/* Related keywords */}
      <div className="glass-panel mb-6">
        <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-main)' }}>
          関連する夢占い
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {relatedKeywords.map((rk) => (
            <Link
              key={rk.slug}
              href={`/dream/${rk.slug}`}
              className="text-center py-3 rounded-xl text-sm no-underline transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.5)',
                color: 'var(--text-main)',
                textDecoration: 'none',
                border: '1px solid rgba(212,165,182,0.15)',
              }}
            >
              <span className="text-xl block mb-1">{rk.emoji}</span>
              {rk.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Other fortune services */}
      <div className="glass-panel">
        <h3 className="text-sm font-bold mb-4" style={{ color: 'var(--text-main)' }}>
          他の占いも試してみませんか？
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <Link href="/tarot" className="text-center py-3 rounded-xl text-sm no-underline hover:scale-105 transition-all" style={{ background: 'rgba(212,165,182,0.1)', color: 'var(--text-main)', textDecoration: 'none' }}>
            <span className="text-xl block mb-1">🃏</span>タロット
          </Link>
          <Link href="/numerology" className="text-center py-3 rounded-xl text-sm no-underline hover:scale-105 transition-all" style={{ background: 'rgba(232,213,181,0.1)', color: 'var(--text-main)', textDecoration: 'none' }}>
            <span className="text-xl block mb-1">🔢</span>数秘術
          </Link>
          <Link href="/horoscope" className="text-center py-3 rounded-xl text-sm no-underline hover:scale-105 transition-all" style={{ background: 'rgba(255,214,165,0.1)', color: 'var(--text-main)', textDecoration: 'none' }}>
            <span className="text-xl block mb-1">⭐</span>星座占い
          </Link>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${kw.title}の意味 - 夢占い`,
            description: kw.description,
            author: { '@type': 'Organization', name: 'Oracle Portal' },
            publisher: { '@type': 'Organization', name: 'Oracle Portal' },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://oracle-portal.vercel.app/dream/${kw.slug}`,
            },
          }),
        }}
      />
    </article>
  );
}
