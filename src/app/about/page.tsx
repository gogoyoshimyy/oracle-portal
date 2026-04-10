import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '運営情報',
  description: 'Oracle Portal（AI占いの館）の運営情報。サイト運営者、お問い合わせ先など。',
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-2xl mx-auto py-6">
      <div className="glass-panel">
        <h1 className="text-2xl font-bold gradient-text mb-6">運営情報</h1>

        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          Oracle Portal（オラクルポータル）は、AIを活用した9つの無料占いサービスを提供するポータルサイトです。
          夢占い、タロット占い、数秘術、星座占い、相性占い、姓名判断、前世占い、誕生日占い、カラー占いの各サービスを通じて、
          お客様の人生に寄り添うエンターテインメントをお届けしています。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)', borderBottom: '2px solid rgba(212,165,182,0.3)', paddingBottom: '0.5rem' }}>
          サイト概要
        </h2>
        <table className="w-full text-sm mb-6">
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.5)' }}>
              <td className="py-3 font-bold" style={{ width: '30%', color: 'var(--text-main)' }}>サイト名</td>
              <td className="py-3" style={{ color: 'var(--text-light)' }}>Oracle Portal - AI占いの館</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.5)' }}>
              <td className="py-3 font-bold" style={{ color: 'var(--text-main)' }}>URL</td>
              <td className="py-3" style={{ color: 'var(--text-light)' }}>https://oracle-portal.vercel.app</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.5)' }}>
              <td className="py-3 font-bold" style={{ color: 'var(--text-main)' }}>提供サービス</td>
              <td className="py-3" style={{ color: 'var(--text-light)' }}>AI占い9種（無料）</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.5)' }}>
              <td className="py-3 font-bold" style={{ color: 'var(--text-main)' }}>使用技術</td>
              <td className="py-3" style={{ color: 'var(--text-light)' }}>Next.js / Google Gemini API</td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)', borderBottom: '2px solid rgba(212,165,182,0.3)', paddingBottom: '0.5rem' }}>
          広告表示について
        </h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトは、Google AdSenseなどの広告サービス、ならびに電話占いサービス等のアフィリエイト広告を掲載しています。
          これらの広告はサイト運営費用に充てられており、お客様により良いサービスを無料で提供するために活用しております。
          広告は2023年10月施行のステルスマーケティング規制に従い、明示的に表示しております。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)', borderBottom: '2px solid rgba(212,165,182,0.3)', paddingBottom: '0.5rem' }}>
          免責事項
        </h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトで提供される占い結果は、AIによって生成されたエンターテインメントコンテンツです。
          科学的・医学的・法的なアドバイスではなく、人生の重要な決定にあたっては専門家にご相談ください。
          鑑定結果に基づいて行われた一切の行動について、当サイトは責任を負いかねます。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)', borderBottom: '2px solid rgba(212,165,182,0.3)', paddingBottom: '0.5rem' }}>
          お問い合わせ
        </h2>
        <p className="text-sm leading-loose" style={{ color: 'var(--text-main)' }}>
          サイトに関するご質問・ご要望は、下記までお問い合わせください。<br />
          お問い合わせフォームは現在準備中です。
        </p>
      </div>
    </div>
  );
}
