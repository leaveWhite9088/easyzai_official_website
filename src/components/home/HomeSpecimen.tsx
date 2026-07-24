// 03 / SPECIMEN — one cyanotype, twice. A washed-out, scaled-up bleed of
// the same asset sits behind the section so the willow silhouette reads
// as the section's tonal mass, not as a poster pasted on it. The small,
// framed card sits over it as the actual "specimen". Shorter section
// (vs. previous pass) because the image is now framed smaller and the
// bleed carries the visual weight.
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const SPECIMEN = '/assets/concept-cyanotype-3.png'

export default function HomeSpecimen() {
  const t = useTranslations('home.specimen')

  return (
    <section
      id="03"
      className="relative overflow-hidden border-t border-rule py-[clamp(48px,6vw,88px)]"
    >
      {/* Background bleed — same cyanotype scaled past viewport, washed with
          multiply so the willow branches feel absorbed into the paper. The
          right-edge fade keeps it from feeling like a pasted image.
          Hidden on mobile: a full-bleed willow image behind the figure
          reads as visual noise on narrow screens — the figure itself is
          enough. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        <Image
          src={SPECIMEN}
          alt=""
          fill
          sizes="100vw"
          priority={false}
          className="select-none object-cover object-[18%_center] opacity-[0.22] mix-blend-multiply [mask-image:linear-gradient(to_right,black_55%,transparent_96%)] [-webkit-mask-image:linear-gradient(to_right,black_55%,transparent_96%)]"
        />
        {/* Soft right-edge white wash — keeps text column readable. */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-canvas" />
      </div>

      <div className="relative mx-auto max-w-wide px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-x-6 sm:gap-x-10">
          {/* Left: section eyebrow */}
          <div className="col-span-12 md:col-span-3">
            <SectionEyebrow number="03" name="specimen" zh={t('eyebrowZh')} />
          </div>

          {/* Right: small framed specimen over the bleed */}
          <div className="col-span-12 md:col-span-9 mt-8 md:mt-0">
            <div className="relative py-5 before:absolute before:left-0 before:right-0 before:top-0 before:h-px before:bg-rule after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-rule">
              <figure className="mx-auto flex max-w-[320px] flex-col items-center md:max-w-[340px]">
                <Image
                  src={SPECIMEN}
                  alt={t('imageAlt')}
                  width={1120}
                  height={800}
                  className="block h-auto w-full"
                  sizes="(max-width: 768px) 60vw, 340px"
                />
                <figcaption className="mt-4 flex w-full items-center justify-between text-ink-3 font-mono text-[10px] tracking-[0.12em] uppercase">
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
