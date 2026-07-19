import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://easyzai.top/sitemap.xml',
    host: 'https://easyzai.top',
  }
}
