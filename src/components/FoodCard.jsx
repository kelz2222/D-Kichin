import React from 'react'
import { motion } from 'framer-motion'
import { useCart } from '../CartContext.jsx'
import { useFavorites } from '../FavoritesContext.jsx'
import FoodImageTile from './FoodImageTile.jsx'

export default function FoodCard({ dish, kitchenOpen }) {
  const { addToCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(dish.id)

  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="relative overflow-hidden h-32">
        <FoodImageTile dish={dish} />
        <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
          {dish.category}
        </span>
        <button
          onClick={() => toggleFavorite(dish.id)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
        >
          <span className={favorited ? 'text-red-500' : 'text-white/70'}>
            {favorited ? '♥' : '♡'}
          </span>
        </button>
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
