import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '誕生日占い - 生まれた日の性格と運命',
  description: '生年月日から星座・数秘術・誕生花・誕生石を組み合わせ、あなたの性格と今年の運勢をAIが鑑定する無料誕生日占い。',
  keywords: ['誕生日占い', '誕生日占い 無料', '誕生日 性格', '誕生日 運勢'],
};

export default function BirthdayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
