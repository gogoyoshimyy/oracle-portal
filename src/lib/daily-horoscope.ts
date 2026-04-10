// 12星座の今日の運勢を生成（決定論的・日付ベース）
// 毎日変わるが、同じ日には同じ結果が出る

export interface DailyHoroscope {
  sign: string;
  icon: string;
  rank: number;
  score: number;
  message: string;
  luckyColor: string;
  luckyItem: string;
}

const SIGNS = [
  { name: 'おひつじ座', icon: '♈' },
  { name: 'おうし座', icon: '♉' },
  { name: 'ふたご座', icon: '♊' },
  { name: 'かに座', icon: '♋' },
  { name: 'しし座', icon: '♌' },
  { name: 'おとめ座', icon: '♍' },
  { name: 'てんびん座', icon: '♎' },
  { name: 'さそり座', icon: '♏' },
  { name: 'いて座', icon: '♐' },
  { name: 'やぎ座', icon: '♑' },
  { name: 'みずがめ座', icon: '♒' },
  { name: 'うお座', icon: '♓' },
];

const MESSAGES = [
  '直感を信じて行動すると良い一日。新しい出会いや発見があるかもしれません。',
  '計画を立てる絶好の日。冷静に物事を進めると思わぬ成果が得られます。',
  'コミュニケーション運が好調。大切な人と話す時間を作ってみて。',
  '心が穏やかになる癒しの一日。自分のペースを大切にしましょう。',
  '注目を集める輝きの日。自信を持って前に出ると幸運が訪れます。',
  '細部に気を配ると良い日。丁寧な仕事が評価につながります。',
  'バランス感覚が冴える日。人間関係が円滑に進むでしょう。',
  '深い洞察力が高まる日。物事の本質を見抜けるかもしれません。',
  '冒険心が刺激される日。いつもと違う選択肢を試してみて。',
  '着実な努力が実る日。コツコツとした取り組みが幸運を呼びます。',
  '創造性が開花する日。新しいアイデアを形にする好機です。',
  '感受性が豊かになる日。芸術や音楽に触れると心が満たされます。',
];

const COLORS = ['赤', 'オレンジ', '黄', '緑', '青', '紫', '桜色', '金', '銀', '白', '黒', 'ターコイズ'];
const ITEMS = ['手帳', 'ハンカチ', '時計', 'お守り', '本', '香水', '花', '指輪', 'コーヒー', 'チョコレート', '日記', 'スマホケース'];

// 日付シード
function dateSeed(date: Date = new Date()): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

// シード付き擬似ランダム
function seededRandom(seed: number, offset: number = 0): number {
  const x = Math.sin(seed + offset) * 10000;
  return x - Math.floor(x);
}

export function getDailyHoroscope(date: Date = new Date()): DailyHoroscope[] {
  const seed = dateSeed(date);

  // 12星座にスコアを割り当て、ランキングを決定
  const signsWithScore = SIGNS.map((s, i) => {
    const score = Math.floor(seededRandom(seed, i) * 100) + 1;
    const messageIdx = Math.floor(seededRandom(seed, i + 100) * MESSAGES.length);
    const colorIdx = Math.floor(seededRandom(seed, i + 200) * COLORS.length);
    const itemIdx = Math.floor(seededRandom(seed, i + 300) * ITEMS.length);

    return {
      sign: s.name,
      icon: s.icon,
      score,
      rank: 0, // ランクは後で算出
      message: MESSAGES[messageIdx],
      luckyColor: COLORS[colorIdx],
      luckyItem: ITEMS[itemIdx],
    };
  });

  // スコアでソートしてランクを付与
  const sorted = [...signsWithScore].sort((a, b) => b.score - a.score);
  sorted.forEach((s, i) => {
    s.rank = i + 1;
  });

  // 元の星座順序に戻す
  return SIGNS.map((s) => sorted.find((x) => x.sign === s.name)!);
}

export function formatDate(date: Date = new Date()): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
