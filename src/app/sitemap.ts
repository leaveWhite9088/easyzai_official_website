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

// zh-only routes (e.g. series not yet translated) — no hreflang alternates.
const ZH_ONLY_ROUTES = [
  '/thinking/fde-client-alignment',
  '/thinking/fde-survival',
  '/thinking/fde-project-execution',
  '/thinking/fde-docs-and-code',
  '/thinking/fde-ai-collaboration',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const bilingual = LOCALES.flatMap((locale) =>
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
  const zhOnly = ZH_ONLY_ROUTES.map((route) => ({ url: `${BASE}/zh${route}` }))
  return [...bilingual, ...zhOnly]
}
