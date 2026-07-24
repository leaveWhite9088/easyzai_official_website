// 03 / SPECIMEN — the cyanotype concept image, framed top + bottom by hairlines.
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function HomeSpecimen() {
  const t = useTranslations('home.specimen')

  return (
    <section id="03" className="bg-canvas border-t border-rule py-[clamp(64px,8vw,120px)]">
      <div className="mx-auto max-w-wide px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="03" name="specimen" zh={t('eyebrowZh')} />
          </div>

          <div className="col-span-12 md:col-span-9 mt-10 md:mt-0">
            {/* Specimen frame — top + bottom hairlines */}
            <div className="relative py-6 before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-rule after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-rule">
              <figure>
                <Image
                  src="/assets/concept-cyanotype-3.png"
                  alt={t('imageAlt')}
                  width={1120}
                  height={800}
                  className="mx-auto block h-auto w-full max-w-[560px]"
                  sizes="(max-width: 768px) 90vw, 560px"
                />
                <figcaption className="mt-6 flex items-center justify-between text-ink-3 font-mono text-[10px] tracking-[0.12em] uppercase">
                  <span>{t('caption1')}</span>
                  <span>{t('caption2')}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
