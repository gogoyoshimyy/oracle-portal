import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カラー占い - 選んだ色が心を映す',
  description: '直感で選んだ色から、今のあなたの心理状態と運勢をAIが読み解く無料カラー占い。ラッキーカラーもお伝えします。',
  keywords: ['カラー占い', 'カラー占い 無料', '色占い', 'ラッキーカラー'],
};

export default function ColorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
