// Editorial 404 — paper background, site-style typography. Renders inside
// [locale]/layout so the Navbar / Footer stay above/below the body. Use
// `useLocale()` (client hook) instead of params since not-found is reached
// via Next.js error boundary and we don't want to read params here.
'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function LocaleNotFound() {
  const locale = useLocale()

  return (
    <section className="bg-canvas border-t border-rule py-[clamp(96px,14vw,200px)]">
      <div className="mx-auto max-w-wide px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          {/* Left: section eyebrow — same shape as the redesigned pages */}
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-3.5">
              <span
                aria-hidden
                className="font-mono text-ink-2 leading-none -translate-y-px"
                style={{ fontSize: '14px' }}
              >
                —
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
                <span className="text-ink">404</span>
                <span className="mx-1.5 text-ink-3">/</span>
                not found
              </span>
            </div>
            <div className="mt-6 font-mono text-[11px] tracking-[0.12em] uppercase text-ink-3">
              这页走丢了
            </div>
          </div>

          {/* Right: editorial display */}
          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0">
            <h1
              className="font-serif italic font-light text-ink leading-[0.95] tracking-[-0.025em]"
              style={{ fontSize: 'clamp(96px, 16vw, 220px)' }}
            >
              404
            </h1>

            <div className="mt-10 max-w-read">
              <p className="font-serif text-ink text-[22px] sm:text-[28px] leading-[1.35]">
                这页没找到。
              </p>
              <p className="mt-3 text-ink-2 text-[15px] sm:text-[16px] leading-[1.7]">
                The page you're looking for doesn't exist — or moved.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <Link
                href={`/${locale}`}
                className="inline-flex items-center justify-center border border-ink px-9 py-[18px] font-mono text-[12px] tracking-[0.22em] uppercase text-ink transition-colors duration-200 hover:bg-ink hover:text-canvas min-h-[48px]"
              >
                返回首页 · Home
              </Link>
              <Link
                href={`/${locale}/practice`}
                className="group inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.18em] text-ink-2 transition-colors hover:text-ink"
              >
                代表案例 · Practice
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href={`/${locale}/thinking`}
                className="group inline-flex items-center gap-2 font-mono text-[13px] tracking-[0.18em] text-ink-2 transition-colors hover:text-ink"
              >
                思考 · Thinking
                <span className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
