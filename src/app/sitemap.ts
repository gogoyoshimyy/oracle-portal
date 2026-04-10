import type { MetadataRoute } from 'next';
import { fortuneServices } from '@/lib/fortunes';
import { allDreamKeywords as dreamKeywords } from '@/lib/dream-keywords-all';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oracle-portal.vercel.app';

  const servicePages = fortuneServices.map((service) => ({
    url: `${baseUrl}${service.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const dreamKeywordPages = dreamKeywords.map((kw) => ({
    url: `${baseUrl}/dream/${kw.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...servicePages,
    ...dreamKeywordPages,
  ];
}
