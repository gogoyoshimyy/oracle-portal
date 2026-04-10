// 全夢占いキーワードを統合
import { dreamKeywords as baseKeywords, type DreamKeyword } from './dream-keywords';
import { dreamKeywordsExtra } from './dream-keywords-extra';
import { dreamKeywordsExtra2 } from './dream-keywords-extra2';

export type { DreamKeyword };

export const allDreamKeywords: DreamKeyword[] = [
  ...baseKeywords,
  ...dreamKeywordsExtra,
  ...dreamKeywordsExtra2,
];
