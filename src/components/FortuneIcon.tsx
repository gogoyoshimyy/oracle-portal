import { Moon, Star, Heart, Feather, Sparkles, Gift, Palette, type LucideIcon } from 'lucide-react';

interface FortuneIconProps {
  iconKey: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

// カスタムタロットアイコン（Lucideにないため独自SVG）
function TarotIcon({ size = 24, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="2" width="12" height="20" rx="1.5" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="14" x2="12" y2="18" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

// カスタム数秘術アイコン
function NumerologyIcon({ size = 24, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9 L9 15" />
      <path d="M9 9 L13 9" />
      <path d="M13 9 L13 15" />
      <path d="M9 12 L13 12" />
    </svg>
  );
}

// カスタム水晶玉アイコン
function CrystalIcon({ size = 24, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="11" r="7" />
      <path d="M5 18 L19 18 L17 21 L7 21 Z" />
      <circle cx="9" cy="9" r="1" fill={color} />
      <path d="M14 14 Q15 13 16 14" />
    </svg>
  );
}

// カスタム月アイコン（より神秘的）
function MoonIcon({ size = 24, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      <circle cx="17" cy="6" r="0.5" fill={color} />
      <circle cx="19" cy="9" r="0.4" fill={color} />
    </svg>
  );
}

// カスタム星アイコン（八芒星）
function StarIcon({ size = 24, color = 'currentColor', strokeWidth = 1.5 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10" />
    </svg>
  );
}

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>> = {
  moon: MoonIcon,
  tarot: TarotIcon,
  numerology: NumerologyIcon,
  star: StarIcon,
  heart: ({ size = 24, color = 'currentColor', strokeWidth = 1.5 }) => (
    <Heart size={size} color={color} strokeWidth={strokeWidth} />
  ),
  feather: ({ size = 24, color = 'currentColor', strokeWidth = 1.5 }) => (
    <Feather size={size} color={color} strokeWidth={strokeWidth} />
  ),
  crystal: CrystalIcon,
  gift: ({ size = 24, color = 'currentColor', strokeWidth = 1.5 }) => (
    <Gift size={size} color={color} strokeWidth={strokeWidth} />
  ),
  palette: ({ size = 24, color = 'currentColor', strokeWidth = 1.5 }) => (
    <Palette size={size} color={color} strokeWidth={strokeWidth} />
  ),
};

export default function FortuneIcon({
  iconKey,
  size = 32,
  color = 'currentColor',
  strokeWidth = 1.5,
}: FortuneIconProps) {
  const IconComponent = ICON_MAP[iconKey] || MoonIcon;
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} />;
}
