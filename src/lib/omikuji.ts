// AIおみくじ - 1日1回、決定論的に生成
// 同じ日には何度引いても同じ結果（リテンション効果）

export interface OmikujiResult {
  level: '大吉' | '吉' | '中吉' | '小吉' | '末吉' | '凶';
  emoji: string;
  color: string;
  message: string;
  luckyColor: string;
  luckyItem: string;
  luckyNumber: number;
  luckyDirection: string;
  rarity: number; // 出現率（%）
}

const LEVELS: { level: OmikujiResult['level']; emoji: string; color: string; rarity: number }[] = [
  { level: '大吉', emoji: '🌟', color: '#e8d5b5', rarity: 10 },
  { level: '吉', emoji: '✨', color: '#caffbf', rarity: 25 },
  { level: '中吉', emoji: '⭐', color: '#a0c4ff', rarity: 25 },
  { level: '小吉', emoji: '🌙', color: '#bdb2ff', rarity: 20 },
  { level: '末吉', emoji: '🍀', color: '#ffd6a5', rarity: 15 },
  { level: '凶', emoji: '🌊', color: '#b5a4d6', rarity: 5 },
];

const MESSAGES: Record<OmikujiResult['level'], string[]> = {
  '大吉': [
    '今日は何をしても上手くいく特別な一日。新しい挑戦に最適の時です。',
    '幸運の女神があなたに微笑んでいます。素直な気持ちで動くことが幸せを呼びます。',
    '長年の願いが叶う予感。直感を信じて大胆に行動してみましょう。',
  ],
  '吉': [
    '穏やかで充実した一日になりそう。周囲への感謝が幸運を呼びます。',
    '計画通りに物事が進む日。小さな喜びを大切にしましょう。',
    '良い出会いが期待できます。心を開いて新しい関係を築いて。',
  ],
  '中吉': [
    'バランスの取れた一日。焦らず自分のペースで進みましょう。',
    '小さな幸せが積み重なる日。日常の中の喜びに目を向けて。',
    '人とのつながりが運気を上げます。連絡を取りたい人に連絡を。',
  ],
  '小吉': [
    '少し控えめに過ごすと良い日。じっくり考えて行動しましょう。',
    '内省の時間が幸運を呼びます。一人の時間を大切に。',
    '小さな前進が大きな結果につながる日。一歩一歩着実に。',
  ],
  '末吉': [
    '今日は準備の日。将来のために今できることを始めましょう。',
    '焦らず待つことが大切。時が来れば道は自ずと開けます。',
    '基本に立ち返ると道が見えてきます。初心を思い出して。',
  ],
  '凶': [
    '慎重に行動すべき日。大きな決断は避けて穏やかに過ごしましょう。',
    '困難の中にこそ学びがあります。立ち止まって自分を見つめ直す機会に。',
    '一見不運に見えても、それは新しい扉を開くきっかけかもしれません。',
  ],
};

const COLORS = ['赤', 'オレンジ', '黄色', '緑', '青', '紫', '桜色', '白', '金色', '銀色', '黒', 'ターコイズ', 'ピンク', 'エメラルド'];
const ITEMS = ['手鏡', 'お守り', '緑茶', '本', '万年筆', '時計', 'チョコレート', 'ハンカチ', '香水', '指輪', 'リップ', '日記帳', 'コーヒー', 'お香'];
const DIRECTIONS = ['東', '西', '南', '北', '東北', '東南', '西北', '西南'];

function dateSeed(date: Date = new Date()): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

function seededRandom(seed: number, offset: number = 0): number {
  const x = Math.sin(seed * 9999 + offset * 7) * 10000;
  return x - Math.floor(x);
}

export function getDailyOmikuji(date: Date = new Date()): OmikujiResult {
  const seed = dateSeed(date);

  // 出現率に基づいてレベルを決定
  const rand = seededRandom(seed, 1) * 100;
  let cumulative = 0;
  let selectedLevel = LEVELS[0];
  for (const lv of LEVELS) {
    cumulative += lv.rarity;
    if (rand < cumulative) {
      selectedLevel = lv;
      break;
    }
  }

  const messageIdx = Math.floor(seededRandom(seed, 2) * MESSAGES[selectedLevel.level].length);
  const colorIdx = Math.floor(seededRandom(seed, 3) * COLORS.length);
  const itemIdx = Math.floor(seededRandom(seed, 4) * ITEMS.length);
  const numberIdx = Math.floor(seededRandom(seed, 5) * 100) + 1;
  const directionIdx = Math.floor(seededRandom(seed, 6) * DIRECTIONS.length);

  return {
    level: selectedLevel.level,
    emoji: selectedLevel.emoji,
    color: selectedLevel.color,
    message: MESSAGES[selectedLevel.level][messageIdx],
    luckyColor: COLORS[colorIdx],
    luckyItem: ITEMS[itemIdx],
    luckyNumber: numberIdx,
    luckyDirection: DIRECTIONS[directionIdx],
    rarity: selectedLevel.rarity,
  };
}
