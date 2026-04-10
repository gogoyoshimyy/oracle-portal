import Link from 'next/link';
import { fortuneServices } from '@/lib/fortunes';
import { dreamKeywords } from '@/lib/dream-keywords';
import { Sparkles, TrendingUp, Star } from 'lucide-react';
import DailyHoroscope from '@/components/DailyHoroscope';
import DailyOmikuji from '@/components/DailyOmikuji';

const POPULAR_IDS = ['dream', 'tarot', 'horoscope'];

export default function Home() {
  const popularDreamKeywords = dreamKeywords.slice(0, 12);

  return (
    <div className="flex flex-col items-center gap-8 py-6">
      {/* Hero */}
      <section className="text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(212,165,182,0.3)' }}>
          <Sparkles size={14} color="#d4a5b6" />
          <span className="text-xs font-bold" style={{ color: 'var(--text-main)', letterSpacing: '0.1em' }}>
            完全無料・登録不要
          </span>
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          style={{ fontFamily: "'Zen Maru Gothic', sans-serif", lineHeight: '1.3' }}
        >
          AIがあなたの<br />運命を読み解く
        </h1>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-light)' }}>
          9つのAI占いで、あなただけのパーソナル鑑定をお届け。<br className="hidden md:block" />
          夢、タロット、星座、相性、姓名判断、前世まで。
        </p>

        {/* Social proof */}
        <div className="flex justify-center gap-6 text-xs" style={{ color: 'var(--text-light)' }}>
          <div className="flex items-center gap-1">
            <Star size={14} color="#e8d5b5" fill="#e8d5b5" />
            <span><strong style={{ color: 'var(--text-main)' }}>4.8</strong> / 5.0</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} color="#b5a4d6" />
            <span><strong style={{ color: 'var(--text-main)' }}>9</strong> つの占い</span>
          </div>
          <div>
            <span><strong style={{ color: 'var(--text-main)' }}>100%</strong> 無料</span>
          </div>
        </div>
      </section>

      {/* Daily omikuji - retention driver */}
      <DailyOmikuji />

      {/* Daily horoscope - retention driver */}
      <DailyHoroscope />

      {/* Fortune services grid */}
      <section className="w-full max-w-3xl">
        <h2 className="text-center text-base font-bold mb-4" style={{ color: 'var(--text-main)' }}>
          ✨ 占いを選んでください
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fortuneServices.map((service) => {
            const isPopular = POPULAR_IDS.includes(service.id);
            return (
              <Link
                key={service.id}
                href={service.path}
                className="glass-panel relative no-underline flex flex-col items-center gap-3 p-5 hover:scale-105 transition-transform"
                style={{ textDecoration: 'none', color: 'var(--text-main)' }}
              >
                {isPopular && (
                  <span
                    className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: 'linear-gradient(120deg, #d4a5b6, #b5a4d6)',
                      color: 'white',
                      boxShadow: '0 2px 8px rgba(212,165,182,0.4)',
                    }}
                  >
                    人気
                  </span>
                )}
                <span className="text-4xl">{service.icon}</span>
                <div className="text-center">
                  <h3 className="text-base font-bold m-0">{service.name}</h3>
                  <p
                    className="text-xs mt-1 m-0"
                    style={{ color: 'var(--text-light)', letterSpacing: '0.08em' }}
                  >
                    {service.subtitle}
                  </p>
                </div>
                <p className="text-xs leading-relaxed m-0 text-center" style={{ color: 'var(--text-light)' }}>
                  {service.description}
                </p>
                <span
                  className="text-xs font-bold mt-2"
                  style={{ color: '#d4a5b6' }}
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
        <h2 className="text-center text-base font-bold mb-2" style={{ color: 'var(--text-main)' }}>
          🌙 よく検索される夢占い
        </h2>
        <p className="text-center text-xs mb-5" style={{ color: 'var(--text-light)' }}>
          気になる夢のキーワードから、意味を読み解けます
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {popularDreamKeywords.map((kw) => (
            <Link
              key={kw.slug}
              href={`/dream/${kw.slug}`}
              className="text-center py-3 rounded-2xl text-xs no-underline transition-all hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.6)',
                color: 'var(--text-main)',
                textDecoration: 'none',
                border: '1px solid rgba(212,165,182,0.15)',
              }}
            >
              <span className="text-2xl block mb-1">{kw.emoji}</span>
              {kw.title}
            </Link>
          ))}
        </div>
        <div className="text-center mt-4">
          <Link
            href="/dream"
            className="text-xs inline-flex items-center gap-1"
            style={{ color: 'var(--text-light)' }}
          >
            すべての夢占いを見る →
          </Link>
        </div>
      </section>

      {/* Trust section */}
      <section className="w-full max-w-3xl">
        <div className="glass-panel">
          <h2 className="text-center text-base font-bold mb-4" style={{ color: 'var(--text-main)' }}>
            Oracle Portalが選ばれる理由
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <span className="text-3xl block mb-2">🆓</span>
              <h3 className="text-sm font-bold mb-1">完全無料</h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                登録もメール入力も不要。すべての占いが無料でご利用いただけます。
              </p>
            </div>
            <div>
              <span className="text-3xl block mb-2">🤖</span>
              <h3 className="text-sm font-bold mb-1">AI×占術</h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                最新のAIが伝統占術を学習。あなただけのパーソナル鑑定をお届け。
              </p>
            </div>
            <div>
              <span className="text-3xl block mb-2">⚡</span>
              <h3 className="text-sm font-bold mb-1">即時鑑定</h3>
              <p className="text-xs" style={{ color: 'var(--text-light)' }}>
                数十秒で詳しい鑑定結果をお届け。いつでもどこでもご利用可能。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="text-center mt-2 max-w-2xl">
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          ※ Oracle PortalはAIによる占いサービスです。エンターテインメントとしてお楽しみください。
        </p>
      </div>
    </div>
  );
}
