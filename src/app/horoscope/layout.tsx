import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '星座占い - 今月の運勢を鑑定',
  description: '12星座の今月の運勢を詳しく鑑定。総合運・恋愛運・仕事運・健康運をスコア付きでお届けする無料星座占い。',
  keywords: ['星座占い', '今日の運勢', '今月の運勢', '星座占い 無料', '12星座'],
};

export default function HoroscopeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
