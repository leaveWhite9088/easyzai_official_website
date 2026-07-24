'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Temporary stub — replaced in step 4 (feat(nav): 4 页顶导 + 去主题切换 + 去 scroll-spy)
export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const otherLocale = locale === 'zh' ? 'en' : 'zh'
  const switchLocaleHref = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${otherLocale}`) || `/${otherLocale}`

  const items = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/practice`, label: t('cases') },
    { href: `/${locale}/thinking`, label: t('thinking') },
    { href: `/${locale}/about`, label: t('about') },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-base/85 backdrop-blur-md border-b border-border-subtle/60">
      <div className="max-w-page mx-auto px-5 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} aria-label="EasyZ" className="group flex min-h-[44px] items-center gap-2.5">
            <span className="relative block h-8 w-[122px] sm:h-9 sm:w-[140px]">
              <Image
                src="/assets/导航栏logo（黑色）.svg"
                alt="EasyZ"
                fill
                priority
                className="object-contain opacity-85 transition-opacity duration-300 group-hover:opacity-100"
                sizes="140px"
              />
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive = pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md hover:bg-ink/5 transition-all duration-200 ${
                    isActive
                      ? 'text-[14px] font-medium text-text-primary'
                      : 'text-[13px] text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link
              href={switchLocaleHref}
              aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
              className="text-[13px] font-mono text-text-tertiary hover:text-text-secondary transition-colors px-2 py-2.5 min-h-[44px] flex items-center"
            >
              {locale === 'zh' ? 'EN' : '中'}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="px-4 py-2.5 min-h-[44px] flex items-center text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              {t('cta')}
            </Link>
          </div>
          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center text-text-secondary p-2"
            aria-label={mobileOpen ? (locale === 'zh' ? '关闭导航' : 'Close menu') : (locale === 'zh' ? '打开导航' : 'Open menu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden max-h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain bg-bg-base/95 backdrop-blur-md border-b border-border-subtle">
          <div className="max-w-page mx-auto px-5 sm:px-6 py-4 flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[15px] text-text-secondary hover:text-text-primary transition-colors border-b border-border-subtle/40"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <Link
                href={`/${locale}#contact`}
                onClick={() => setMobileOpen(false)}
                className="inline-flex min-h-[44px] items-center text-[15px] font-medium text-text-primary"
              >
                {t('cta')}
              </Link>
              <Link
                href={switchLocaleHref}
                aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
                className="text-[14px] font-mono text-text-tertiary hover:text-text-secondary transition-colors min-h-[44px] flex items-center"
              >
                {locale === 'zh' ? 'EN' : '中'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
