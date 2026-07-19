'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import SectionLabel from './ui/SectionLabel'

const PARTNERS = [
  { name: '云汉孵化中心', href: 'https://www.linkincubator.com/', logo: '/assets/云汉孵化中心LOGO.png' },
  { name: '连尚集团', href: 'https://www.ilinksure.com/', logo: '/assets/连尚集团LOGO.png' },
  { name: '智猩猩', href: 'https://www.aiorang.com/', logo: '/assets/智猩猩LOGO.png' },
]

export default function Partners() {
  const t = useTranslations('partners')

  return (
    <section id="partners" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="site-section-header"
        >
          <SectionLabel>Partners</SectionLabel>
          <h2 className="text-h1 text-text-primary mb-3">{t('title')}</h2>
          <p className="text-[15px] text-text-tertiary max-w-2xl">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PARTNERS.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: 0.08 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative flex min-h-[120px] items-center justify-center p-5 sm:p-6 lg:p-8"
            >
              <div className="relative h-16 w-full max-w-[200px]">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain transition-all duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <span className="sr-only">{partner.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
