import React from 'react'

const CATEGORY_STYLE = {
  'Fast Food': { emoji: '🌯', gradient: 'from-orange-500/40 to-red-600/30' },
  'Local Dishes': { emoji: '🍛', gradient: 'from-amber-500/40 to-yellow-600/30' },
  'Sides': { emoji: '🥟', gradient: 'from-yellow-500/40 to-amber-700/30' },
  'Drinks': { emoji: '🥤', gradient: 'from-red-500/40 to-pink-600/30' },
}

const NAME_EMOJI = {
  Shawarma: '🌯',
  Pizza: '🍕',
  Samosa: '🥟',
  'Spring Rolls': '🥢',
  'Jollof Rice': '🍚',
  'Fried Rice': '🍛',
  Salad: '🥗',
  Sobolo: '🧃',
}

export default function FoodImageTile({ dish, className = '' }) {
  if (dish.image_url) {
    return (
      <img
        src={dish.image_url}
        alt={dish.name}
        className={`w-full h-full object-cover ${className}`}
      />
    )
  }

  const style = CATEGORY_STYLE[dish.category] || CATEGORY_STYLE['Fast Food']
  const emoji = NAME_EMOJI[dish.name] || style.emoji

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${style.gradient} ${className}`}
    >
      <span className="text-5xl drop-shadow-lg">{emoji}</span>
    </div>
  )
}
