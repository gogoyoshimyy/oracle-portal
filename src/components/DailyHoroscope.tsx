import { getDailyHoroscope, formatDate } from '@/lib/daily-horoscope';

function renderStars(score: number): string {
  if (score >= 90) return '★★★★★';
  if (score >= 70) return '★★★★☆';
  if (score >= 50) return '★★★☆☆';
  if (score >= 30) return '★★☆☆☆';
  return '★☆☆☆☆';
}

export default function DailyHoroscope() {
  const horoscopes = getDailyHoroscope();
  const today = formatDate();

  // ランキングTOP3を取得
  const top3 = [...horoscopes].sort((a, b) => a.rank - b.rank).slice(0, 3);

  return (
    <section className="w-full max-w-3xl">
      <div className="text-center mb-4">
        <h2 className="text-base font-bold mb-1" style={{ color: 'var(--text-main)' }}>
          ✨ 今日の運勢ランキング
        </h2>
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          {today}
        </p>
      </div>

      {/* TOP3 ハイライト */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {top3.map((h) => (
          <div
            key={h.sign}
            className="glass-panel text-center p-4"
            style={{
              background: h.rank === 1
                ? 'linear-gradient(135deg, rgba(232,213,181,0.4), rgba(212,165,182,0.4))'
                : 'rgba(255,255,255,0.65)',
              border: h.rank === 1 ? '2px solid #e8d5b5' : '1px solid rgba(255,255,255,0.8)',
            }}
          >
            <div className="text-xs font-bold mb-1" style={{ color: h.rank === 1 ? '#b08d20' : 'var(--text-light)' }}>
              {h.rank === 1 ? '🥇 1位' : h.rank === 2 ? '🥈 2位' : '🥉 3位'}
            </div>
            <span className="text-2xl block">{h.icon}</span>
            <div className="text-xs font-bold mt-1" style={{ color: 'var(--text-main)' }}>
              {h.sign}
            </div>
            <div className="text-xs mt-1" style={{ color: '#e8d5b5' }}>
              {renderStars(h.score)}
            </div>
          </div>
        ))}
      </div>

      {/* 全12星座 */}
      <div className="glass-panel">
        <p className="text-xs text-center mb-3" style={{ color: 'var(--text-light)' }}>
          全12星座の運勢
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {horoscopes.map((h) => (
            <div
              key={h.sign}
              className="flex items-center gap-2 p-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.5)' }}
            >
              <span className="text-lg">{h.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold" style={{ color: 'var(--text-main)' }}>
                  {h.sign}
                </div>
                <div className="text-xs" style={{ color: '#e8d5b5', lineHeight: '1' }}>
                  {renderStars(h.score)}
                </div>
              </div>
              <div className="text-xs font-bold" style={{ color: 'var(--text-light)' }}>
                {h.rank}位
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
