import { Shield, Sparkles, Lock, Award } from 'lucide-react';

export default function TrustBadges() {
  return (
    <section className="w-full max-w-3xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          className="text-center p-4 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(212,165,182,0.2)',
          }}
        >
          <Sparkles size={24} color="#c47795" className="mx-auto mb-2" />
          <p className="text-xs font-bold m-0" style={{ color: 'var(--text-main)' }}>
            最新技術搭載
          </p>
          <p className="text-xs m-0 mt-1" style={{ color: 'var(--text-light)' }}>
            高精度な鑑定
          </p>
        </div>
        <div
          className="text-center p-4 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(181,164,214,0.2)',
          }}
        >
          <Shield size={24} color="#8b78b8" className="mx-auto mb-2" />
          <p className="text-xs font-bold m-0" style={{ color: 'var(--text-main)' }}>
            完全無料・登録不要
          </p>
          <p className="text-xs m-0 mt-1" style={{ color: 'var(--text-light)' }}>
            隠し料金なし
          </p>
        </div>
        <div
          className="text-center p-4 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(232,213,181,0.3)',
          }}
        >
          <Lock size={24} color="#b08a3e" className="mx-auto mb-2" />
          <p className="text-xs font-bold m-0" style={{ color: 'var(--text-main)' }}>
            データを保存しない
          </p>
          <p className="text-xs m-0 mt-1" style={{ color: 'var(--text-light)' }}>
            プライバシー保護
          </p>
        </div>
        <div
          className="text-center p-4 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.65)',
            border: '1px solid rgba(232,213,181,0.3)',
          }}
        >
          <Award size={24} color="#c47795" className="mx-auto mb-2" />
          <p className="text-xs font-bold m-0" style={{ color: 'var(--text-main)' }}>
            150以上のキーワード
          </p>
          <p className="text-xs m-0 mt-1" style={{ color: 'var(--text-light)' }}>
            業界最大級の辞典
          </p>
        </div>
      </div>
    </section>
  );
}
