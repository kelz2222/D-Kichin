import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../CartContext.jsx'
import { COMBOS } from '../data/combos.js'

function resolveCombo(combo, dishes) {
  const items = combo.dishNames.map((name) =>
    dishes.find((d) => d.name === name && d.is_available)
  )
  if (items.some((d) => !d)) return null

  const fullTotal = items.reduce((sum, d) => sum + Number(d.price), 0)
  const discountedTotal = fullTotal * (1 - combo.discountPercent / 100)
  const factor = discountedTotal / fullTotal

  const discountedItems = items.map((d) => ({
    id: d.id,
    name: d.name,
    price: Number((Number(d.price) * factor).toFixed(2)),
  }))

  return { ...combo, items: discountedItems, fullTotal, discountedTotal }
}

export default function SurpriseMeCombo({ dishes, kitchenOpen }) {
  const { addCombo } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [displayCombo, setDisplayCombo] = useState(null)
  const [added, setAdded] = useState(false)
  const timeoutRef = useRef(null)

  const availableCombos = COMBOS.map((c) => resolveCombo(c, dishes)).filter(Boolean)

  function openModal() {
    setIsOpen(true)
    startSpin()
  }

  function closeModal() {
    setIsOpen(false)
    clearTimeout(timeoutRef.current)
  }

  function startSpin() {
    if (availableCombos.length === 0) return
    setSpinning(true)
    setResult(null)
    setAdded(false)

    let ticks = 0
    const totalTicks = 14

    function tick() {
      const random =
        availableCombos[Math.floor(Math.random() * availableCombos.length)]
      setDisplayCombo(random)
      ticks++
      if (ticks < totalTicks) {
        const delay = 80 + ticks * 18
        timeoutRef.current = setTimeout(tick, delay)
      } else {
        const finalCombo =
          availableCombos[Math.floor(Math.random() * availableCombos.length)]
        setDisplayCombo(finalCombo)
        setResult(finalCombo)
        setSpinning(false)
      }
    }
    tick()
  }

  function handleAddCombo() {
    if (!result) return
    addCombo(result.label, result.items)
    setAdded(true)
  }

  if (availableCombos.length === 0) return null

  return (
    <>
      <button
        onClick={openModal}
        disabled={!kitchenOpen}
        className={`mx-4 mb-6 w-[calc(100%-2rem)] rounded-2xl border border-gold/40 bg-gradient-to-r from-gold/15 to-transparent p-4 flex items-center justify-between ${
          !kitchenOpen ? 'opacity-40' : ''
        }`}
      >
        <div className="text-left">
          <p className="text-white font-bold text-sm">🎰 Can't Decide?</p>
          <p className="text-gold text-xs">Surprise Me with a combo!</p>
        </div>
        <span className="text-2xl">🎲</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/70 z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-x-6 top-1/3 -translate-y-1/2 bg-charcoal border border-gold/30 rounded-2xl p-6 z-50 text-center"
            >
              <p className="text-white/50 text-xs mb-2">
                {spinning ? 'Finding your combo...' : 'Your combo is ready!'}
              </p>

              {displayCombo && (
                <motion.div
                  key={spinning ? displayCombo.id + Math.random() : displayCombo.id}
                  initial={{ opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <div className="text-5xl mb-2">{displayCombo.emoji}</div>
                  <h3 className="text-gold font-black text-lg">{displayCombo.label}</h3>
                  <p className="text-white/60 text-xs mt-1">
                    {displayCombo.items.map((i) => i.name).join(' + ')}
                  </p>
                </motion.div>
              )}

              {result && !spinning && (
                <>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-white/40 text-xs line-through">
                      ₵{result.fullTotal.toFixed(2)}
                    </span>
                    <span className="text-gold font-bold">
                      ₵{result.discountedTotal.toFixed(2)}
                    </span>
                    <span className="text-green-400 text-[10px] bg-green-500/10 px-2 py-0.5 rounded-full">
                      {result.discountPercent}% OFF
                    </span>
                  </div>

                  {added ? (
                    <p className="text-green-400 text-sm font-semibold">
                      ✓ Added to cart!
                    </p>
                  ) : (
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={handleAddCombo}
                      className="w-full bg-gold text-charcoal font-bold py-3 rounded-2xl mb-2"
                    >
                      Add Combo to Cart
                    </motion.button>
                  )}

                  <button
                    onClick={startSpin}
                    className="text-white/50 text-xs underline mt-1"
                  >
                    Spin again
                  </button>
                </>
              )}

              <button
                onClick={closeModal}
                className="block mx-auto mt-4 text-white/40 text-xs"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
