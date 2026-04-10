import type { MetadataRoute } from 'next';
import { fortuneServices } from '@/lib/fortunes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oracle-portal.vercel.app';

  const servicePages = fortuneServices.map((service) => ({
    url: `${baseUrl}${service.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...servicePages,
  ];
}
