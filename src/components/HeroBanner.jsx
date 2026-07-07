import React from 'react'
import { motion } from 'framer-motion'
import FoodImageTile from './FoodImageTile.jsx'

const COLLAGE_DISHES = ['Jollof Rice', 'Shawarma', 'Spring Rolls', 'Samosa']

function findDish(dishes, name) {
  return dishes.find((d) => d.name === name) || { name, category: 'Fast Food' }
}

export default function HeroBanner({ dishes = [], onOrderNow }) {
  const collage = COLLAGE_DISHES.map((name) => findDish(dishes, name))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative mx-4 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-5 min-h-[260px]"
    >
      {/* Collage background, top-right */}
      <div className="absolute top-0 right-0 w-40 h-40 md:w-48 md:h-48">
        <div className="grid grid-cols-2 gap-1.5 w-full h-full p-2 opacity-90">
          {collage.map((dish, i) => (
            <div
              key={dish.name}
              className={`rounded-xl overflow-hidden shadow-lg ${
                i === 0 ? 'rotate-2' : i === 1 ? '-rotate-2' : i === 2 ? '-rotate-1' : 'rotate-1'
              }`}
            >
              <FoodImageTile dish={dish} />
            </div>
          ))}
        </div>
      </div>

      {/* Fade so text stays readable under the collage */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />

      <div className="relative z-10 max-w-[65%]">
        <p className="text-white/70 italic text-sm mb-1">Craving Something</p>
        <h1 className="text-white text-3xl font-black leading-tight">
          Delicious?
        </h1>
        <h1 className="text-gold text-3xl font-black leading-tight mb-3">
          We Deliver!
        </h1>
        <p className="text-white/50 text-sm mb-5">
          Order your favorite meals and enjoy fast delivery.
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onOrderNow}
          className="bg-gold text-charcoal font-bold px-5 py-2.5 rounded-2xl text-sm inline-flex items-center gap-2"
        >
          Order Now →
        </motion.button>
      </div>
    </motion.div>
  )
}
