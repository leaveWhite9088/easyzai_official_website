'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-base border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-14 sm:py-16 lg:py-20">
          {/* Brand Column */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2">
            <div role="img" aria-label="EasyZ" className="relative mb-4 h-9 w-[140px]">
              <Image
                src="/assets/导航栏logo（白色）.svg"
                alt=""
                fill
                className="theme-logo-dark object-contain opacity-60"
                sizes="140px"
              />
              <Image
                src="/assets/导航栏logo（黑色）.svg"
                alt=""
                fill
                className="theme-logo-light object-contain opacity-60"
                sizes="140px"
              />
            </div>
            <p className="text-[13px] text-text-tertiary leading-relaxed max-w-xs mb-2">
              {t('companyCn')}
            </p>
            <p className="text-[11px] text-text-tertiary leading-relaxed max-w-xs">
              {t('companyEn')}
            </p>
          </div>

          {/* Cases Column */}
          <div>
            <h4 className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider mb-4">
              {t('casesTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href={`/${locale}/cases/programming-language-migration`} className="inline-flex min-h-[44px] items-center text-[14px] text-text-secondary hover:text-text-primary transition-colors">
                  {t('caseMigration')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cases/securities-ai-platform`} className="inline-flex min-h-[44px] items-center text-[14px] text-text-secondary hover:text-text-primary transition-colors">
                  {t('caseSecurities')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider mb-4">
              {t('contactTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:18781630574@163.com" className="inline-flex min-h-[44px] max-w-full items-center break-all text-[14px] text-text-secondary hover:text-accent transition-colors">
                  18781630574@163.com
                </a>
              </li>
              <li>
                <span className="text-[14px] text-text-secondary">
                  {t('address')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-subtle py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-text-tertiary text-[12px]">
            &copy; {currentYear} EasyZ. All rights reserved.
          </p>
          <div className="flex max-w-full flex-col sm:flex-row items-center gap-1 sm:gap-4 text-[12px] text-text-tertiary">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center hover:text-text-secondary transition-colors"
            >
              {t('beian')}
            </a>
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=21010602001352"
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[44px] max-w-full items-center gap-1.5 hover:text-text-secondary transition-colors"
            >
              <Image
                src="/assets/备案图标.png"
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
              <span>辽公网安备21010602001352号</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
