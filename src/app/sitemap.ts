import type { MetadataRoute } from 'next'

const BASE = 'https://easyzai.top'
const LOCALES = ['zh', 'en']
const ROUTES = [
  '',
  '/thinking',
  '/thinking/ai-project-screening',
  '/thinking/securities-ai-case-study',
  '/thinking/why-not-dify-langchain',
  '/cases/programming-language-migration',
  '/cases/securities-ai-platform',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${BASE}/${locale}${route}`,
      alternates: {
        languages: {
          zh: `${BASE}/zh${route}`,
          en: `${BASE}/en${route}`,
          'x-default': `${BASE}/zh${route}`,
        },
      },
    }))
  )
}
