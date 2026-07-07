import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    kicker: 'Craving something',
    title: 'DELICIOUS?',
    highlight: 'WE DELIVER!',
    subtitle: 'Order your favorite meals and enjoy fast delivery.',
    emoji: '🍛',
  },
  {
    kicker: 'Fresh from the',
    title: 'HOME KITCHEN,',
    highlight: 'TO YOUR DOOR',
    subtitle: 'Made fresh, delivered hot, every single time.',
    emoji: '🔥',
  },
  {
    kicker: 'Hungry right',
    title: 'NOW?',
    highlight: 'ORDER ON WHATSAPP',
    subtitle: 'Simple checkout — no app download needed.',
    useWhatsAppBadge: true,
  },
]

function WhatsAppBadge() {
  return (
    <div className="absolute right-4 top-4 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
      <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
        <path d="M12.04 2c-5.46 0-9.89 4.43-9.89 9.89 0 1.74.46 3.43 1.32 4.93L2 22l5.31-1.39a9.87 9.87 0 0 0 4.73 1.2h.005c5.46 0 9.89-4.43 9.89-9.89 0-2.64-1.03-5.12-2.9-6.99A9.82 9.82 0 0 0 12.04 2zm5.78 14.02c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.15-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.11.32.02.51-.09.2-.14.32-.27.49-.14.17-.29.38-.41.51-.14.14-.28.3-.12.58.16.28.72 1.19 1.55 1.93 1.06.95 1.96 1.24 2.24 1.38.27.14.44.11.6-.07.16-.18.7-.82.89-1.1.18-.28.37-.23.62-.14.25.09 1.6.76 1.87.9.27.14.45.21.52.32.07.12.07.65-.17 1.33z" />
      </svg>
    </div>
  )
}

export default function HeroBanner({ onOrderNow }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[index]

  return (
    <div className="relative mx-4 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-5 min-h-[220px] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-white/70 italic text-sm mb-1">{slide.kicker}</p>
          <h2 className="text-white text-3xl font-black leading-tight">
            {slide.title}
          </h2>
          <h2 className="text-gold text-3xl font-black leading-tight mb-2">
            {slide.highlight}
          </h2>
          <p className="text-white/50 text-sm mb-4">{slide.subtitle}</p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOrderNow}
            className="bg-gold text-charcoal font-bold px-5 py-2.5 rounded-2xl text-sm inline-flex items-center gap-2"
          >
            Order Now →
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {slide.useWhatsAppBadge ? (
        <WhatsAppBadge />
      ) : (
        <span className="absolute right-4 top-4 text-6xl opacity-20 select-none">
          {slide.emoji}
        </span>
      )}

      <div className="flex gap-1.5 mt-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-gold' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
