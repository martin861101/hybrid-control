import type { ReactNode } from 'react'
import { motion } from 'motion/react'

export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}
