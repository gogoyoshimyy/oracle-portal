import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: {
    default: 'Oracle Portal - AI占いの館',
    template: '%s | Oracle Portal',
  },
  description: '9つのAI占いであなたの運命を読み解く。夢占い、タロット、数秘術、星座占い、相性占い、姓名判断、前世占い、誕生日占い、カラー占い。全て無料。',
  keywords: ['占い', '無料占い', 'AI占い', '夢占い', 'タロット', '数秘術', '星座占い', '相性占い', '姓名判断'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: 'Oracle Portal - AI占いの館',
    title: 'Oracle Portal - AI占いの館',
    description: '9つのAI占いであなたの運命を読み解く。全て無料。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oracle Portal - AI占いの館',
    description: '9つのAI占いであなたの運命を読み解く。全て無料。',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="text-center py-6 text-sm" style={{ color: 'var(--text-light)' }}>
          <p>&copy; 2026 Oracle Portal - AI占いの館</p>
        </footer>
      </body>
    </html>
  );
}
