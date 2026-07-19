'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Keyed remount on route change — gives each page a fresh entry fade.
// No AnimatePresence: with it, the exiting page snapshot either never
// finishes its exit (blank page) or the whole tree duplicates in the DOM.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
