// 04 / 同路人 — the statement moves to the left column (sans, per the
// page's one-serif rule, already spent in AboutHeader). The right column
// holds two hairline-separated groups, each with a mono label: the build
// partners we've shipped with, and the community partner where the
// conversation lives. Logos keep their original colors (no grayscale).
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const BUILD_PARTNERS = [
  { name: '云汉孵化中心', logo: '/assets/partner-1.png' },
  { name: '智猩猩',       logo: '/assets/partner-2.png' },
  { name: '连尚集团',     logo: '/assets/partner-3.png' },
]

const COMMUNITY_PARTNERS = [
  { name: 'SHENiCEST',   logo: '/assets/SHENICESTLOGO.jpg', className: 'h-9' },
]

export default function AboutPartners() {
  const t = useTranslations('about.partners')

  const groups = [
    { label: t('buildLabel'), logos: BUILD_PARTNERS },
    { label: t('communityLabel'), logos: COMMUNITY_PARTNERS },
  ]

  return (
    <section id="04" className="bg-canvas border-t border-rule py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto max-w-page px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="04" name="co-explorers" />
            <p className="mt-8 max-w-[16em] font-sans text-ink text-[17px] sm:text-[19px] leading-[1.55] tracking-[0.01em]">
              {t('body')}
            </p>
          </div>

          <div className="col-span-12 md:col-span-9 mt-12 md:mt-0">
            <div>
              {groups.map((g, i) => (
                <div
                  key={g.label}
                  className={`py-8 ${i > 0 ? 'border-t border-rule' : ''}`}
                >
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
                    {g.label}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-x-12 gap-y-6">
                    {g.logos.map((p) => (
                      <Image
                        key={p.name}
                        src={p.logo}
                        alt={p.name}
                        width={180}
                        height={40}
                        className={`${'className' in p ? p.className : 'h-10'} w-auto object-contain`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 max-w-read font-mono text-[11px] tracking-[0.18em] uppercase text-ink-3">
              {t('count')}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
