'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

// Temporary stub — replaced in step 5 (new CTA section) + step 9 (new Footer)
export default function CTA() {
  const t = useTranslations('cta')
  return (
    <section id="contact" className="site-section site-mobile-static bg-bg-base">
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-h1 text-text-primary mb-4">{t('title')}</h2>
          <p className="text-[17px] text-text-secondary leading-relaxed max-w-xl mx-auto">{t('subtitle')}</p>
        </motion.div>
      </div>
    </section>
  )
}
