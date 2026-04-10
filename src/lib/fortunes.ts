export interface FortuneService {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  path: string;
}

export const fortuneServices: FortuneService[] = [
  {
    id: 'dream',
    name: '夢占い',
    subtitle: 'Dream Oracle',
    description: 'あなたの夢を解読し、深層心理を紐解きます',
    icon: '🌙',
    color: '#b5a4d6',
    path: '/dream',
  },
  {
    id: 'tarot',
    name: 'タロット占い',
    subtitle: 'Tarot',
    description: '神秘のカードがあなたの運命を読み解きます',
    icon: '🃏',
    color: '#d4a5b6',
    path: '/tarot',
  },
  {
    id: 'numerology',
    name: '数秘術',
    subtitle: 'Numerology',
    description: '生年月日から導き出される運命の数字を解読',
    icon: '🔢',
    color: '#e8d5b5',
    path: '/numerology',
  },
  {
    id: 'horoscope',
    name: '星座占い',
    subtitle: 'Horoscope',
    description: '今月の星の動きからあなたの運勢を占います',
    icon: '⭐',
    color: '#ffd6a5',
    path: '/horoscope',
  },
  {
    id: 'compatibility',
    name: '相性占い',
    subtitle: 'Compatibility',
    description: '二人の生年月日から相性を鑑定します',
    icon: '💕',
    color: '#ffadad',
    path: '/compatibility',
  },
  {
    id: 'name-fortune',
    name: '姓名判断',
    subtitle: 'Name Fortune',
    description: 'お名前の画数から運勢を読み解きます',
    icon: '✍️',
    color: '#a0c4ff',
    path: '/name-fortune',
  },
  {
    id: 'past-life',
    name: '前世占い',
    subtitle: 'Past Life',
    description: '魂の記憶からあなたの前世を読み解きます',
    icon: '🔮',
    color: '#bdb2ff',
    path: '/past-life',
  },
  {
    id: 'birthday',
    name: '誕生日占い',
    subtitle: 'Birthday Fortune',
    description: '生まれた日に隠された性格と運命を解読',
    icon: '🎂',
    color: '#ffc6ff',
    path: '/birthday',
  },
  {
    id: 'color',
    name: 'カラー占い',
    subtitle: 'Color Oracle',
    description: '直感で選んだ色があなたの今を映し出す',
    icon: '🎨',
    color: '#caffbf',
    path: '/color',
  },
];
