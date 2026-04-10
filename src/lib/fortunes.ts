export interface FortuneService {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  iconKey: string; // Lucide icon key
  emoji: string; // 後方互換のため残す
  color: string;
  path: string;
}

export const fortuneServices: FortuneService[] = [
  {
    id: 'dream',
    name: '夢占い',
    subtitle: 'Dream Oracle',
    description: 'あなたの夢を解読し、深層心理を紐解きます',
    iconKey: 'moon',
    emoji: '🌙',
    color: '#8b6f8e',
    path: '/dream',
  },
  {
    id: 'tarot',
    name: 'タロット占い',
    subtitle: 'Tarot',
    description: '神秘のカードがあなたの運命を読み解きます',
    iconKey: 'tarot',
    emoji: '🃏',
    color: '#7b6e8b',
    path: '/tarot',
  },
  {
    id: 'numerology',
    name: '数秘術',
    subtitle: 'Numerology',
    description: '生年月日から導き出される運命の数字を解読',
    iconKey: 'numerology',
    emoji: '🔢',
    color: '#a08756',
    path: '/numerology',
  },
  {
    id: 'horoscope',
    name: '星座占い',
    subtitle: 'Horoscope',
    description: '今月の星の動きからあなたの運勢を占います',
    iconKey: 'star',
    emoji: '⭐',
    color: '#a08756',
    path: '/horoscope',
  },
  {
    id: 'compatibility',
    name: '相性占い',
    subtitle: 'Compatibility',
    description: '二人の生年月日から相性を鑑定します',
    iconKey: 'heart',
    emoji: '💕',
    color: '#a87d8e',
    path: '/compatibility',
  },
  {
    id: 'name-fortune',
    name: '姓名判断',
    subtitle: 'Name Fortune',
    description: 'お名前の画数から運勢を読み解きます',
    iconKey: 'feather',
    emoji: '✍️',
    color: '#7b6e8b',
    path: '/name-fortune',
  },
  {
    id: 'past-life',
    name: '前世占い',
    subtitle: 'Past Life',
    description: '魂の記憶からあなたの前世を読み解きます',
    iconKey: 'crystal',
    emoji: '🔮',
    color: '#8b6f8e',
    path: '/past-life',
  },
  {
    id: 'birthday',
    name: '誕生日占い',
    subtitle: 'Birthday Fortune',
    description: '生まれた日に隠された性格と運命を解読',
    iconKey: 'gift',
    emoji: '🎂',
    color: '#a87d8e',
    path: '/birthday',
  },
  {
    id: 'color',
    name: 'カラー占い',
    subtitle: 'Color Oracle',
    description: '直感で選んだ色があなたの今を映し出す',
    iconKey: 'palette',
    emoji: '🎨',
    color: '#7b6e8b',
    path: '/color',
  },
];
