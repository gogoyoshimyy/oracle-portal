import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '前世占い - AIがあなたの前世を霊視',
  description: '生年月日と直感から、AIがあなたの前世を詳しく霊視。前世の時代・場所・役割と、今世へのメッセージをお届けする無料前世占い。',
  keywords: ['前世占い', '前世占い 無料', '前世診断', '前世'],
};

export default function PastLifeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
