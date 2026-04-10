import Link from 'next/link';
import { fortuneServices } from '@/lib/fortunes';
import { allDreamKeywords as dreamKeywords } from '@/lib/dream-keywords-all';
import DailyHoroscope from '@/components/DailyHoroscope';
import DailyOmikuji from '@/components/DailyOmikuji';
import TrustBadges from '@/components/TrustBadges';
import FortuneIcon from '@/components/FortuneIcon';

const POPULAR_IDS = ['dream', 'tarot', 'horoscope'];

export default function Home() {
  const popularDreamKeywords = dreamKeywords.slice(0, 12);

  return (
    <div className="flex flex-col items-center gap-10 py-6">
      {/* Hero - シンプルで力強いタイポグラフィ重視 */}
      <section className="text-center max-w-2xl py-12">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(176,138,62,0.3)',
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: 'var(--text-sub)', letterSpacing: '0.15em' }}
          >
            ORACLE PORTAL — 完全無料・登録不要
          </span>
        </div>

        <h1
          className="font-bold mb-6 hero-title"
          style={{
            fontFamily: "'Shippori Mincho', 'Noto Serif JP', serif",
            lineHeight: '1.4',
            letterSpacing: '0.08em',
            color: 'var(--text-main)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          }}
        >
          静かに、深く、<br />
          あなたの内側を読み解く
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed mb-8"
          style={{ color: 'var(--text-sub)', fontFamily: "'Shippori Mincho', serif" }}
        >
          9つの占術が、あなただけの物語を紡ぎます
        </p>

        <Link
          href="/dream"
          className="primary-btn inline-flex"
          style={{ textDecoration: 'none' }}
        >
          いますぐ占う
        </Link>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Daily omikuji - retention driver */}
      <DailyOmikuji />

      {/* Daily horoscope - retention driver */}
      <DailyHoroscope />

      {/* Fortune services grid */}
      <section className="w-full max-w-3xl">
        <div className="text-center mb-8">
          <p className="text-xs mb-2" style={{ color: 'var(--text-light)', letterSpacing: '0.2em' }}>
            DIVINATION
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold font-mincho"
            style={{ color: 'var(--text-main)', letterSpacing: '0.1em' }}
          >
            九つの占術
          </h2>
          <div className="w-12 h-px mx-auto my-4" style={{ background: 'var(--accent)' }}></div>
          <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
            あなたを導く、九つの異なる視点
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fortuneServices.map((service) => {
            const isPopular = POPULAR_IDS.includes(service.id);
            return (
              <Link
                key={service.id}
                href={service.path}
                className="glass-panel relative no-underline flex flex-col items-center gap-3 p-6 hover:scale-105 transition-transform"
                style={{ textDecoration: 'none', color: 'var(--text-main)', minHeight: '220px' }}
              >
                {isPopular && (
                  <span
                    className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: 'linear-gradient(120deg, #8b6f8e, #a08756)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(139,111,142,0.4)',
                      letterSpacing: '0.08em',
                    }}
                  >
                    人気
                  </span>
                )}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${service.color}25, ${service.color}10)`,
                    border: `1px solid ${service.color}40`,
                  }}
                >
                  <FortuneIcon iconKey={service.iconKey} size={32} color={service.color} strokeWidth={1.2} />
                </div>
                <div className="text-center">
                  <h3 className="text-base font-bold m-0 font-mincho" style={{ color: 'var(--text-main)', letterSpacing: '0.08em' }}>
                    {service.name}
                  </h3>
                  <p
                    className="text-xs mt-1 m-0"
                    style={{ color: 'var(--text-light)', letterSpacing: '0.15em' }}
                  >
                    {service.subtitle}
                  </p>
                </div>
                <p
                  className="text-xs leading-relaxed m-0 text-center flex-1"
                  style={{ color: 'var(--text-sub)', lineHeight: '1.7' }}
                >
                  {service.description}
                </p>
                <span
                  className="text-xs font-bold mt-1"
                  style={{ color: 'var(--accent)', letterSpacing: '0.1em' }}
                >
                  占う →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Ad slot */}
      <div className="ad-slot w-full max-w-3xl">
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>AD</span>
      </div>

      {/* Popular dream keywords - SEO internal linking */}
      <section className="w-full max-w-3xl">
        <div className="text-center mb-6">
          <p className="text-xs mb-2" style={{ color: 'var(--text-light)', letterSpacing: '0.2em' }}>
            DREAM DICTIONARY
          </p>
          <h2
            className="text-2xl md:text-3xl font-bold font-mincho"
            style={{ color: 'var(--text-main)', letterSpacing: '0.1em' }}
          >
            夢の意味を読み解く
          </h2>
          <div className="w-12 h-px mx-auto my-4" style={{ background: 'var(--accent)' }}></div>
          <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
            150以上の夢占いキーワードから探せます
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {popularDreamKeywords.map((kw) => (
            <Link
              key={kw.slug}
              href={`/dream/${kw.slug}`}
              className="text-center py-4 px-2 rounded-xl text-sm no-underline transition-all hover:scale-105"
              style={{
                background: 'rgba(255,252,246,0.7)',
                color: 'var(--text-main)',
                textDecoration: 'none',
                border: '1px solid rgba(160,135,86,0.2)',
                fontFamily: "'Shippori Mincho', serif",
                letterSpacing: '0.08em',
              }}
            >
              {kw.title}
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            href="/dream/keywords"
            className="text-sm inline-flex items-center gap-1 font-bold"
            style={{ color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.1em' }}
          >
            夢占い辞典を見る →
          </Link>
        </div>
      </section>

      {/* Trust section */}
      <section className="w-full max-w-3xl">
        <div className="glass-panel" style={{ padding: '2.5rem 2rem' }}>
          <div className="text-center mb-6">
            <p className="text-xs mb-2" style={{ color: 'var(--text-light)', letterSpacing: '0.2em' }}>
              FEATURES
            </p>
            <h2
              className="text-2xl md:text-3xl font-bold font-mincho"
              style={{ color: 'var(--text-main)', letterSpacing: '0.1em' }}
            >
              Oracle Portal の特徴
            </h2>
            <div className="w-12 h-px mx-auto my-4" style={{ background: 'var(--accent)' }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-sm font-bold mb-3 font-mincho" style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}>
                — 完全無料 —
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-sub)', lineHeight: '1.8' }}>
                登録もメール入力も不要。すべての占いが無料でご利用いただけます。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-3 font-mincho" style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}>
                — 深い鑑定 —
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-sub)', lineHeight: '1.8' }}>
                古来の占術と最新の知性が交わり、あなただけの物語を紡ぎます。
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-3 font-mincho" style={{ color: 'var(--accent)', letterSpacing: '0.15em' }}>
                — 即時鑑定 —
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-sub)', lineHeight: '1.8' }}>
                数十秒で詳しい鑑定結果をお届け。いつでもどこでもご利用可能。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="text-center mt-2 max-w-2xl">
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          ※ Oracle Portalは最新の知性を用いた占いサービスです。エンターテインメントとしてお楽しみください。
          詳しくは<a href="/about" style={{ color: 'var(--text-light)', textDecoration: 'underline' }}>運営情報</a>をご覧ください。
        </p>
      </div>
    </div>
  );
}
