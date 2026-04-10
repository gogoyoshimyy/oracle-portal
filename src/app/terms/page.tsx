import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約',
  description: 'Oracle Portalの利用規約。サービスのご利用前にお読みください。',
};

export default function TermsPage() {
  return (
    <div className="w-full max-w-2xl mx-auto py-6">
      <div className="glass-panel">
        <h1 className="text-2xl font-bold gradient-text mb-6">利用規約</h1>

        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          本利用規約（以下「本規約」）は、Oracle Portal（以下「当サイト」）の利用条件を定めるものです。
          利用者は、本規約に同意した上で当サイトを利用するものとします。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>第1条 サービスの内容</h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトは、AIによる占いコンテンツをエンターテインメントとして提供します。
          占い結果は科学的・医学的・法的アドバイスではありません。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>第2条 利用料金</h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトのすべての占い機能は無料でご利用いただけます。
          会員登録やメールアドレスの入力は必要ありません。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>第3条 禁止事項</h2>
        <p className="text-sm leading-loose mb-4" style={{ color: 'var(--text-main)' }}>
          以下の行為を禁止します。
        </p>
        <ul className="text-sm leading-loose mb-6 pl-6" style={{ color: 'var(--text-main)' }}>
          <li>当サイトの運営を妨害する行為</li>
          <li>他の利用者または第三者に迷惑をかける行為</li>
          <li>当サイトのコンテンツを無断で複製、転載、販売する行為</li>
          <li>不正アクセス、過剰なリクエスト、スクレイピング等の行為</li>
          <li>その他、法令または公序良俗に反する行為</li>
        </ul>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>第4条 免責事項</h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトの占い結果は、AIによって自動生成されたエンターテインメントです。
          結果に基づいて行われた一切の行動について、当サイトは責任を負いません。
          重要な人生の決断にあたっては、専門家にご相談ください。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>第5条 知的財産権</h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトのコンテンツ（テキスト、画像、デザイン等）の知的財産権は、当サイト運営者に帰属します。
          無断での複製・転載・改変は禁止されています。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>第6条 規約の変更</h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトは、必要に応じて本規約を変更することができます。
          変更後の規約は、当サイト上に掲載した時点から効力を生じます。
        </p>

        <p className="text-xs text-right mt-8" style={{ color: 'var(--text-light)' }}>
          最終更新日: 2026年4月10日
        </p>
      </div>
    </div>
  );
}
