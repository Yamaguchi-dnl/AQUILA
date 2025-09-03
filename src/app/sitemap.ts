import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = 'https://aquila-vantage-app.com'; // Replace with actual domain
  
  const staticRoutes = [
    '',
    '/sobre',
    '/fundos',
    '/equipa',
    '/golden-visa',
    '/trabalhe-conosco',
    '/contato',
  ].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutes];
}
