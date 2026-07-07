import React from 'react'
import FoodCard from './FoodCard.jsx'

const CATEGORY_EMOJI = {
  'Fast Food': '🌯',
  'Local Dishes': '🍛',
  'Sides': '🥟',
  'Drinks': '🥤',
}

export default function CategorySection({ category, dishes, kitchenOpen }) {
  if (dishes.length === 0) return null

  return (
    <div className="mb-6">
      <h2 className="text-white font-bold px-4 mb-3">
        {CATEGORY_EMOJI[category] || ''} {category}
      </h2>
      <div className="grid grid-cols-2 gap-3 px-4">
        {dishes.map((dish) => (
          <FoodCard key={dish.id} dish={dish} kitchenOpen={kitchenOpen} />
        ))}
      </div>
    </div>
  )
}
