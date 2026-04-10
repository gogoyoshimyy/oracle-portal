// 夢占いキーワードのカテゴリ分類
export interface DreamCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  slugs: string[];
}

export const dreamCategories: DreamCategory[] = [
  {
    id: 'animals',
    name: '動物の夢',
    emoji: '🐾',
    description: '動物が出てくる夢の意味',
    slugs: ['snake', 'cat', 'dog', 'spider', 'insect', 'bird', 'fish', 'horse', 'lion', 'rabbit', 'tiger', 'butterfly', 'wolf', 'cow', 'mouse'],
  },
  {
    id: 'people',
    name: '人物の夢',
    emoji: '👥',
    description: '誰かが現れる夢の意味',
    slugs: ['ex-partner', 'crush', 'celebrity', 'dead-person', 'baby', 'child', 'friend', 'mother', 'father', 'sibling', 'teacher', 'doctor', 'stranger'],
  },
  {
    id: 'situations',
    name: '状況・行動の夢',
    emoji: '🏃',
    description: 'ある行動や状況に置かれる夢',
    slugs: ['chased', 'falling', 'flying', 'running', 'swimming', 'fight', 'late', 'lost', 'naked', 'kiss', 'climbing', 'walking', 'crying', 'laughing', 'sleeping', 'cooking', 'shopping', 'studying', 'travel', 'singing', 'dancing', 'success', 'failure', 'exam', 'job'],
  },
  {
    id: 'places',
    name: '場所の夢',
    emoji: '🏛️',
    description: '特定の場所が出てくる夢',
    slugs: ['house', 'school', 'hospital', 'mountain', 'ocean', 'elevator', 'forest', 'church', 'library', 'restaurant', 'park', 'jail', 'court', 'tunnel', 'bridge'],
  },
  {
    id: 'nature',
    name: '自然・天気の夢',
    emoji: '🌊',
    description: '自然現象や天気の夢',
    slugs: ['water', 'fire', 'rain', 'snow', 'earthquake', 'sun', 'moon-dream', 'star', 'cloud', 'rainbow', 'thunder', 'wind', 'tree', 'cliff', 'wave', 'mist', 'sky', 'snow-mountain', 'island'],
  },
  {
    id: 'objects',
    name: '物・乗り物の夢',
    emoji: '📦',
    description: '物や乗り物が出てくる夢',
    slugs: ['car', 'train', 'airplane', 'money', 'mirror', 'food', 'flower', 'hair', 'bicycle', 'phone', 'letter', 'key', 'gift', 'glasses', 'shoes', 'umbrella', 'jewelry', 'watch', 'bag', 'book', 'window', 'door', 'bed', 'kitchen', 'bathroom', 'wallet', 'jewel', 'cake', 'meal', 'milk'],
  },
  {
    id: 'emotions',
    name: '体・感情の夢',
    emoji: '💔',
    description: '身体や強い感情の夢',
    slugs: ['teeth', 'blood', 'death', 'pregnancy', 'wedding', 'toilet', 'ghost', 'war', 'eye', 'wound', 'sick', 'voice', 'hand', 'foot', 'face', 'voice-no', 'birth', 'meeting', 'goodbye'],
  },
  {
    id: 'fantasy',
    name: 'ファンタジー・特殊な夢',
    emoji: '✨',
    description: '不思議な存在や特別な夢',
    slugs: ['magic', 'monster', 'angel', 'devil', 'dragon', 'numbers', 'rainbow-color', 'lost-item', 'gift-given', 'gold', 'silver', 'crystal', 'shadow'],
  },
];
