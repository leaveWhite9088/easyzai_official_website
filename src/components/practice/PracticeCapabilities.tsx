// 01 / 能力图谱 — 4 capabilities on a marble background. Sans h1 (the one
// serif on the Practice page is reserved for PracticeNext below).
'use client'

import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

interface Capability {
  num: string
  title: string
  desc: string
}

export default function PracticeCapabilities() {
  const t = useTranslations('practice.capabilities')
  const items = t.raw('items') as Capability[]

  return (
    <section
      id="01"
      className="relative border-t border-rule py-[clamp(72px,9vw,128px)]"
      style={{
        backgroundColor: 'rgb(var(--c-bg-base))',
        backgroundImage: 'url(/assets/marble-texture.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'rgb(var(--c-bg-elevated) / 0.86)' }}
      />
      <div className="relative mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="01" name="capabilities" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0">
            <h1
              className="max-w-[840px] text-ink leading-[1.1] tracking-[-0.005em] font-medium"
              style={{ fontSize: 'clamp(30px, 4.4vw, 54px)' }}
            >
              {t('title1')}
              <br className="hidden sm:block" />
              <span className="text-ink-2">{t('title2')}</span>
            </h1>

            <div className="mt-14 grid max-w-[920px] grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {items.map((c) => (
                <div key={c.num}>
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                    {c.num}
                  </div>
                  <h3 className="mt-3 text-[18px] sm:text-[19px] font-medium leading-[1.4] text-ink">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-ink-2 text-[14px] leading-[1.6]">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
