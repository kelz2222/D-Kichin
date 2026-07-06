import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../CartContext.jsx'

export default function CartBar({ onOpen }) {
  const { itemCount, totalPrice } = useCart()

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          onClick={onOpen}
          className="fixed bottom-4 left-4 right-4 bg-gold text-charcoal rounded-2xl shadow-2xl px-5 py-4 flex items-center justify-between font-bold z-40"
        >
          <span>{itemCount} item{itemCount > 1 ? 's' : ''} in cart</span>
          <span>₵{totalPrice.toFixed(2)} · View Cart →</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
