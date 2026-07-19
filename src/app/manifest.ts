import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EasyZ 易智',
    short_name: 'EasyZ',
    description: '复杂场景 AI 落地 · 来自顶尖院校的研究型团队',
    start_url: '/zh',
    display: 'standalone',
    background_color: '#0C0C0F',
    theme_color: '#0C0C0F',
    icons: [
      { src: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
