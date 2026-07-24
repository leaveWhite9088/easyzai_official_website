'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

// Temporary stub — replaced in step 9 (feat(footer): 蓝色 Footer + 纹理 + 邮箱 + 微信二维码)
export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-bg-base border-t border-border-subtle">
      <div className="max-w-page mx-auto px-5 sm:px-6 lg:px-10 py-12">
        <p className="text-text-tertiary text-[12px]">
          &copy; {currentYear} EasyZ · {t('companyCn')}
        </p>
        <p className="text-text-tertiary text-[12px] mt-2">
          <Link href={`/${locale}/about`} className="hover:text-text-secondary transition-colors">{t('contactTitle')}</Link>
        </p>
      </div>
    </footer>
  )
}
