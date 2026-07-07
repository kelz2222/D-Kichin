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
    highlight: "ORDER ON WHATSAPP",
    subtitle: 'Simple checkout — no app download needed.',
    emoji: '📲',
  },
]

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

      <span className="absolute right-4 top-4 text-6xl opacity-20 select-none">
        {slide.emoji}
      </span>

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
