import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '相性占い - 二人の相性をAIが鑑定',
  description: '二人の生年月日から数秘術と星座を組み合わせ、相性スコアと詳しい鑑定結果をお届けする無料相性占い。',
  keywords: ['相性占い', '相性占い 無料', '相性占い 生年月日', '相性診断'],
};

export default function CompatibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
