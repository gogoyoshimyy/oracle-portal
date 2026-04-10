import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '夢占い - あなたの夢を解読',
  description: '見た夢の内容を分析し、深層心理を紐解きます。64タイプの夢診断で、あなたの心が伝えたいメッセージを読み解く無料夢占い。',
  keywords: ['夢占い', '夢占い 無料', '夢診断', '無料占い', '夢の意味'],
};

export default function DreamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
