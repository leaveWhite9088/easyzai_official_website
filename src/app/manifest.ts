import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EasyZ 易智',
    short_name: 'EasyZ',
    description: '复杂场景 AI 落地 · 来自顶尖院校的研究型团队',
    start_url: '/zh',
    display: 'standalone',
    // Paper background (建筑白) — keep in sync with viewport.themeColor.
    background_color: '#F2F1ED',
    theme_color: '#F2F1ED',
    icons: [
      { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
