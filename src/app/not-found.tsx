import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 · EasyZ AI',
  robots: { index: false },
}

// Root fallback — only hit if [locale] segment is bypassed (rare, e.g. raw
// "/non-existent-path" without a locale prefix). The locale-aware editorial
// 404 lives at app/[locale]/not-found.tsx and is the one users actually see.
export default function NotFound() {
  return (
    <html lang="zh">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#FAF9F5',
          color: '#16161A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:
            "'Source Han Serif SC', 'Noto Serif CJK SC', 'Songti SC', SimSun, '宋体', Georgia, serif",
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: 560 }}>
          <div
            style={{
              fontFamily:
                "'Source Serif 4', 'Source Han Serif SC', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 96,
              fontWeight: 300,
              letterSpacing: '-0.02em',
              color: '#16161A',
              lineHeight: 1,
            }}
          >
            404
          </div>
          <p
            style={{
              fontFamily:
                "'Source Serif 4', 'Source Han Serif SC', Georgia, serif",
              fontSize: 22,
              color: '#16161A',
              margin: '24px 0 6px',
            }}
          >
            这页没找到。
          </p>
          <p
            style={{
              fontSize: 15,
              color: '#52525A',
              margin: '0 0 32px',
              lineHeight: 1.7,
            }}
          >
            The page you're looking for doesn't exist — or moved.
          </p>
          <a
            href="/zh"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              fontFamily:
                "ui-monospace, 'JetBrains Mono', monospace",
              fontSize: 12,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#16161A',
              textDecoration: 'none',
              border: '1px solid #16161A',
              background: 'transparent',
            }}
          >
            返回首页 · Home
          </a>
        </div>
      </body>
    </html>
  )
}
