import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '姓名判断 - 画数から運勢を鑑定',
  description: 'お名前の画数から天格・人格・地格・外格・総格を算出し、運勢を詳しく鑑定する無料姓名判断。',
  keywords: ['姓名判断', '姓名判断 無料', '名前 画数', '姓名判断 赤ちゃん'],
};

export default function NameFortuneLayout({ children }: { children: React.ReactNode }) {
  return children;
}
