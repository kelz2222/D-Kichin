import React from 'react'
import { motion } from 'framer-motion'

export default function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-4 mb-6 rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/10 to-transparent p-4 flex items-center justify-between overflow-hidden relative"
    >
      <div>
        <p className="text-gold font-black text-lg leading-tight">
          FREE DELIVERY
        </p>
        <p className="text-white/60 text-xs mt-0.5">On all orders above ₵60</p>
        <span className="inline-block mt-2 text-[10px] font-bold text-charcoal bg-gold px-2.5 py-1 rounded-full">
          USE CODE: DKFREE
        </span>
      </div>
      <span className="text-4xl opacity-70">🛵</span>
    </motion.div>
  )
}
