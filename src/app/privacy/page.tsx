import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'Oracle Portalのプライバシーポリシー。個人情報の取り扱いについて。',
};

export default function PrivacyPage() {
  return (
    <div className="w-full max-w-2xl mx-auto py-6">
      <div className="glass-panel">
        <h1 className="text-2xl font-bold gradient-text mb-6">プライバシーポリシー</h1>

        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          Oracle Portal（以下「当サイト」）は、利用者の個人情報を尊重し、適切に取り扱うことに努めます。
          本プライバシーポリシーでは、当サイトにおける個人情報の収集、利用、管理について説明します。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>1. 収集する情報</h2>
        <p className="text-sm leading-loose mb-4" style={{ color: 'var(--text-main)' }}>
          当サイトは、占い機能の提供にあたり、以下の情報を一時的に収集する場合があります。
        </p>
        <ul className="text-sm leading-loose mb-6 pl-6" style={{ color: 'var(--text-main)' }}>
          <li>占いの入力情報（生年月日、夢の内容、選択した色など）</li>
          <li>Cookie情報（セッション管理、広告表示の最適化のため）</li>
          <li>アクセスログ（IPアドレス、ブラウザ情報など）</li>
        </ul>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          占いの入力情報は、AI（Google Gemini API）に送信され、鑑定結果の生成に使用されます。
          当サイトのサーバーには保存されません。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>2. 第三者サービスの利用</h2>
        <p className="text-sm leading-loose mb-4" style={{ color: 'var(--text-main)' }}>
          当サイトでは、以下の第三者サービスを利用しています。
        </p>
        <ul className="text-sm leading-loose mb-6 pl-6" style={{ color: 'var(--text-main)' }}>
          <li>Google Gemini API（AI鑑定の生成）</li>
          <li>Google AdSense（広告配信）</li>
          <li>Google Analytics（アクセス解析）</li>
          <li>各種アフィリエイトサービス</li>
        </ul>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>3. Cookieの利用</h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          当サイトはCookieを使用し、ユーザー体験の向上、広告の最適化、アクセス解析を行っています。
          ブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。
        </p>

        <h2 className="text-base font-bold mb-3" style={{ color: 'var(--text-main)' }}>4. 改定について</h2>
        <p className="text-sm leading-loose mb-6" style={{ color: 'var(--text-main)' }}>
          本プライバシーポリシーは、必要に応じて改定する場合があります。
          重要な変更がある場合は、当サイト上でお知らせします。
        </p>

        <p className="text-xs text-right mt-8" style={{ color: 'var(--text-light)' }}>
          最終更新日: 2026年4月10日
        </p>
      </div>
    </div>
  );
}
