import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'タロット占い - AIがカードを読み解く',
  description: 'AIがタロットカードを引き、過去・現在・未来の流れを読み解きます。恋愛・仕事・金運など、気になるテーマで無料タロット占い。',
  keywords: ['タロット占い', 'タロット占い 無料', 'タロット', 'AI占い', '今日の運勢 タロット'],
};

export default function TarotLayout({ children }: { children: React.ReactNode }) {
  return children;
}
