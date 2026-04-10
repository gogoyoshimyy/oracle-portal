import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '数秘術 - 生年月日から運命の数字を解読',
  description: '生年月日からライフパスナンバーを計算し、あなたの本質・使命・運勢を読み解く無料数秘術占い。',
  keywords: ['数秘術', '数秘術 無料', 'ライフパスナンバー', 'ソウルナンバー', '運命数'],
};

export default function NumerologyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
