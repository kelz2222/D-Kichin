import React from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../CartContext.jsx'

export default function FoodCard({ dish, kitchenOpen }) {
  const { addToCart } = useCart()

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="relative overflow-hidden h-32">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.3 }}
          src={dish.image_url}
          alt={dish.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm">{dish.name}</h3>
        <p className="text-white/50 text-xs mt-1 line-clamp-2">
          {dish.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-gold font-bold text-sm">
            ₵{Number(dish.price).toFixed(2)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            disabled={!kitchenOpen}
            onClick={() => addToCart(dish)}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ${
              kitchenOpen
                ? 'bg-gold text-charcoal'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            +
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
