import type { Metadata, Viewport } from 'next'

// Site-wide defaults. Localized title/description/OG come from
// [locale]/layout.tsx via generateMetadata. metadataBase lets relative
// OG/canonical URLs resolve to the production origin.
export const metadata: Metadata = {
  metadataBase: new URL('https://easyzai.top'),
  icons: {
    icon: '/assets/标签页logo.svg',
    apple: '/assets/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

// Match the mobile browser chrome to the paper background (建筑白).
// Manifest `background_color` / `theme_color` are kept in sync.
export const viewport: Viewport = {
  themeColor: '#F2F1ED',
  width: 'device-width',
  initialScale: 1,
}

// html/body live in [locale]/layout.tsx so lang matches the active locale.
// Root layout only passes children through to avoid nested <html> hydration mismatch.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
