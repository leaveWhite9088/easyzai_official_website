import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 · EasyZ 易智',
  robots: { index: false },
}

// Root not-found renders outside the [locale] segment, so the root layout
// (which only passes children through) doesn't provide html/body — this page
// supplies its own. Kept bilingual and self-contained (no i18n/font deps).
export default function NotFound() {
  return (
    <html lang="zh">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#0C0C0F',
          backgroundImage:
            'radial-gradient(circle at 50% 12%, rgba(190,154,99,0.14), transparent 38%), linear-gradient(rgba(247,243,235,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(247,243,235,0.022) 1px, transparent 1px)',
          backgroundSize: 'auto, 52px 52px, 52px 52px',
          color: '#F0F0F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:
            "'Source Han Sans', 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif",
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 24px' }}>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 64,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              color: '#BE9A63',
            }}
          >
            404
          </div>
          <p style={{ fontSize: 17, color: '#F0F0F5', margin: '20px 0 6px' }}>
            页面未找到
          </p>
          <p style={{ fontSize: 14, color: '#9A9AAA', margin: '0 0 32px' }}>
            The page you’re looking for doesn’t exist.
          </p>
          <a
            href="/zh"
            style={{
              display: 'inline-block',
              padding: '12px 28px',
              fontSize: 14,
              fontWeight: 500,
              color: '#F0F0F5',
              textDecoration: 'none',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.07)',
            }}
          >
            返回首页 · Back to home
          </a>
        </div>
      </body>
    </html>
  )
}
