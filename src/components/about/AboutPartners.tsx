// 04 / 同路人 — 3 partner logos in their original colors (no grayscale). The
// partners are real organizations we've worked with; keeping their brand
// colors honors the relationship.
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const PARTNERS = [
  { name: '云汉孵化中心', logo: '/assets/partner-1.png' },
  { name: '智猩猩',       logo: '/assets/partner-2.png' },
  { name: '连尚集团',     logo: '/assets/partner-3.png' },
]

export default function AboutPartners() {
  const t = useTranslations('about.partners')

  return (
    <section id="04" className="bg-canvas border-t border-rule py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="04" name="co-explorers" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0">
            <p className="max-w-read text-ink text-[15px] sm:text-[16px] leading-[1.7]">
              {t('body')}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-12 gap-y-8">
              {PARTNERS.map((p) => (
                <Image
                  key={p.name}
                  src={p.logo}
                  alt={p.name}
                  width={180}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              ))}
            </div>

            <div className="mt-12 max-w-read font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
              {t('count')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
