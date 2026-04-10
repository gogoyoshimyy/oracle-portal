import Link from 'next/link';
import { fortuneServices } from '@/lib/fortunes';
import { allDreamKeywords as dreamKeywords } from '@/lib/dream-keywords-all';
import { Sparkles, Star, Moon } from 'lucide-react';
import DailyHoroscope from '@/components/DailyHoroscope';
import DailyOmikuji from '@/components/DailyOmikuji';
import TrustBadges from '@/components/TrustBadges';

const POPULAR_IDS = ['dream', 'tarot', 'horoscope'];

export default function Home() {
  const popularDreamKeywords = dreamKeywords.slice(0, 12);

  return (
    <div className="flex flex-col items-center gap-10 py-6">
      {/* Hero - 占いの館の入り口風 */}
      <section className="text-center max-w-2xl py-6">
        {/* 装飾 - 上部の星 */}
        <div className="flex justify-center gap-3 mb-4 text-2xl opacity-70">
          <span style={{ color: '#b08a3e' }}>✦</span>
          <Moon size={20} color="#8b78b8" />
          <span style={{ color: '#c47795' }}>✦</span>
          <Star size={20} color="#b08a3e" fill="#b08a3e" />
          <span style={{ color: '#8b78b8' }}>✦</span>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
          style={{
            background: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(196,119,149,0.4)',
          }}
        >
          <Sparkles size={14} color="#c47795" />
          <span
            className="text-xs font-bold"
            style={{ color: 'var(--text-main)', letterSpacing: '0.1em' }}
          >
            完全無料・登録不要・即時鑑定
          </span>
        </div>

        <h1
          className="text-4xl md:text-6xl font-bold gradient-text mb-4"
          style={{
            fontFamily: "'Zen Maru Gothic', sans-serif",
            lineHeight: '1.3',
            letterSpacing: '0.05em',
          }}
        >
          AIがあなたの<br />運命を読み解く
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed mb-2"
          style={{ color: 'var(--text-main)' }}
        >
          9つのAI占いで、あなただけのパーソナル鑑定。
        </p>
        <p
          className="text-sm md:text-base leading-relaxed mb-6"
          style={{ color: 'var(--text-light)' }}
        >
          夢、タロット、星座、相性、姓名判断、前世まで。
        </p>

        {/* Quick CTA */}
        <Link
          href="/dream"
          className="primary-btn inline-flex"
          style={{ textDecoration: 'none' }}
        >
          🌙 今すぐ夢を占う
        </Link>

        {/* 装飾 - 下部の星 */}
        <div className="flex justify-center gap-3 mt-8 text-xl opacity-70">
          <span style={{ color: '#8b78b8' }}>✧</span>
          <span style={{ color: '#c47795' }}>✦</span>
          <span style={{ color: '#b08a3e' }}>✧</span>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Daily omikuji - retention driver */}
      <DailyOmikuji />

      {/* Daily horoscope - retention driver */}
      <DailyHoroscope />

      {/* Fortune services grid */}
      <section className="w-full max-w-3xl">
        <div className="text-center mb-6">
          <h2
            className="text-xl md:text-2xl font-bold mb-2"
            style={{ color: 'var(--text-main)', fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            ✨ 9つの占いの世界へ
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            気になる占いを選んでください
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
                      background: 'linear-gradient(120deg, #c47795, #8b78b8)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(196,119,149,0.5)',
                    }}
                  >
                    ⭐ 人気
                  </span>
                )}
                <span className="text-5xl">{service.icon}</span>
                <div className="text-center">
                  <h3 className="text-base font-bold m-0" style={{ color: 'var(--text-main)' }}>
                    {service.name}
                  </h3>
                  <p
                    className="text-xs mt-1 m-0"
                    style={{ color: 'var(--text-light)', letterSpacing: '0.08em' }}
                  >
                    {service.subtitle}
                  </p>
                </div>
                <p
                  className="text-xs leading-relaxed m-0 text-center flex-1"
                  style={{ color: 'var(--text-sub)' }}
                >
                  {service.description}
                </p>
                <span
                  className="text-sm font-bold mt-1"
                  style={{ color: '#c47795' }}
                >
                  占いを始める →
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
        <div className="text-center mb-5">
          <h2
            className="text-xl md:text-2xl font-bold mb-2"
            style={{ color: 'var(--text-main)', fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            🌙 よく見る夢の意味
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-light)' }}>
            150以上の夢占いキーワードから探せます
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {popularDreamKeywords.map((kw) => (
            <Link
              key={kw.slug}
              href={`/dream/${kw.slug}`}
              className="text-center py-4 rounded-2xl text-sm no-underline transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.7)',
                color: 'var(--text-main)',
                textDecoration: 'none',
                border: '1px solid rgba(196,119,149,0.2)',
              }}
            >
              <span className="text-2xl block mb-1">{kw.emoji}</span>
              {kw.title}
            </Link>
          ))}
        </div>
        <div className="text-center mt-5">
          <Link
            href="/dream/keywords"
            className="text-sm inline-flex items-center gap-1 font-bold"
            style={{ color: '#c47795', textDecoration: 'none' }}
          >
            すべての夢占い辞典を見る →
          </Link>
        </div>
      </section>

      {/* Trust section */}
      <section className="w-full max-w-3xl">
        <div className="glass-panel">
          <h2
            className="text-center text-xl font-bold mb-5"
            style={{ color: 'var(--text-main)', fontFamily: "'Zen Maru Gothic', sans-serif" }}
          >
            Oracle Portalが選ばれる理由
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center">
            <div>
              <span className="text-4xl block mb-3">🆓</span>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                完全無料
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
                登録もメール入力も不要。すべての占いが無料でご利用いただけます。
              </p>
            </div>
            <div>
              <span className="text-4xl block mb-3">🤖</span>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                Google Gemini 2.0搭載
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
                最新のAIが伝統占術を学習。あなただけのパーソナル鑑定をお届け。
              </p>
            </div>
            <div>
              <span className="text-4xl block mb-3">⚡</span>
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-main)' }}>
                即時鑑定
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-sub)' }}>
                数十秒で詳しい鑑定結果をお届け。いつでもどこでもご利用可能。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="text-center mt-2 max-w-2xl">
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          ※ Oracle Portalは Google Gemini 2.0 を活用したAI占いサービスです。エンターテインメントとしてお楽しみください。
        </p>
      </div>
    </div>
  );
}
