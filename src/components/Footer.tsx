// Blue Footer — cyan-d base + AI-generated blueprint texture overlay at low
// opacity, white text, email + WeChat QR. The brand's only full-bleed blue
// surface; everything else on the site is paper + ink.
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative overflow-hidden text-canvas"
      style={{ backgroundColor: 'rgb(var(--c-cyan-d))' }}
    >
      {/* AI-generated blueprint texture (low opacity). The base is solid
          cyan-d, so even if the texture fails to load the brand color is
          preserved. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.14] mix-blend-screen"
        style={{ backgroundImage: 'url(/assets/footer-bg.png)' }}
      />
      {/* A second micro-texture: the marble grain, even fainter, to add
          tactile depth without competing with the foreground content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(112deg, rgba(250,249,245,0.5) 0 1px, transparent 1px 7px)',
        }}
      />

      <div className="relative mx-auto max-w-page px-6 py-16 sm:px-10 sm:py-20">
        {/* Top row: brand + tagline */}
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 sm:gap-x-10">
          <div className="col-span-12 md:col-span-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[12px] tracking-[0.22em] uppercase text-canvas">
                EASYZ
              </span>
              <span className="h-px w-6 bg-canvas/40" />
              <span className="font-serif italic text-[13px] text-canvas/70">
                {t('companyEn').split(' ').slice(0, 1).join(' ')} {t('companyEn').split(' ')[1]}
              </span>
            </div>
            <p className="max-w-sm font-serif italic text-[20px] leading-[1.4] text-canvas/90 sm:text-[22px]">
              {t('quote')}
            </p>
          </div>

          {/* Cases column */}
          <div className="col-span-6 md:col-span-3">
            <h4 className="mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-canvas/60">
              {t('casesTitle')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/cases/programming-language-migration`}
                  className="inline-flex min-h-[44px] items-center text-[14px] text-canvas/85 transition-colors hover:text-canvas"
                >
                  {t('caseMigration')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/cases/securities-ai-platform`}
                  className="inline-flex min-h-[44px] items-center text-[14px] text-canvas/85 transition-colors hover:text-canvas"
                >
                  {t('caseSecurities')}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/practice`}
                  className="inline-flex min-h-[44px] items-center text-[14px] text-canvas/85 transition-colors hover:text-canvas"
                >
                  {t('contactTitle')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column — email + WeChat QR */}
          <div className="col-span-6 md:col-span-4">
            <h4 className="mb-4 font-mono text-[11px] tracking-[0.18em] uppercase text-canvas/60">
              {t('contactTitle')}
            </h4>
            <a
              href="mailto:18781630574@163.com"
              className="mb-5 inline-flex min-h-[44px] max-w-full items-center break-all font-mono text-[13px] text-canvas transition-opacity hover:opacity-80"
            >
              18781630574@163.com
            </a>
            <p className="mb-3 font-mono text-[10px] tracking-[0.18em] uppercase text-canvas/60">
              {t('wechatHint')}
            </p>
            <div className="relative inline-block h-[120px] w-[120px] rounded-md border border-canvas/15 bg-canvas/[0.04] p-2 backdrop-blur-sm">
              <Image
                src="/assets/个人二维码.png"
                alt={t('wechatAria')}
                width={104}
                height={104}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom: address + 备案 */}
        <div className="mt-14 border-t border-canvas/15 pt-8 sm:mt-20">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <div className="mb-1 font-mono text-[10px] tracking-[0.18em] uppercase text-canvas/60">
                {t('addressLabel')}
              </div>
              <p className="font-mono text-[12px] leading-[1.6] text-canvas/85">
                {t('address')}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:items-end">
              <p className="font-mono text-[12px] text-canvas/60">
                &copy; {currentYear} {t('companyCn')}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[12px] text-canvas/60">
                <a
                  href="https://beian.miit.gov.cn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-canvas"
                >
                  {t('beian')}
                </a>
                <a
                  href="https://beian.mps.gov.cn/#/query/webSearch?code=21010602001352"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[44px] items-center transition-colors hover:text-canvas"
                >
                  辽公网安备21010602001352号
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
