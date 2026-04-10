import { isPremium } from './premium';

export async function callFortuneAPI(type: string, input: any) {
  const premium = typeof window !== 'undefined' ? isPremium() : false;

  const res = await fetch('/api/fortune', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, input, premium }),
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data;
}
