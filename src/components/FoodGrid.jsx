import React from 'react'
import FoodCard from './FoodCard.jsx'

export default function FoodGrid({ dishes, kitchenOpen }) {
  if (dishes.length === 0) {
    return (
      <p className="text-white/40 text-center mt-10 text-sm">
        No dishes in this category yet.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 pb-32">
      {dishes.map((dish) => (
        <FoodCard key={dish.id} dish={dish} kitchenOpen={kitchenOpen} />
      ))}
    </div>
  )
}
