import React from 'react'

const CATEGORIES = [
  { name: 'All', emoji: '🍽️', gradient: 'from-gold/40 to-yellow-700/30' },
  { name: 'Fast Food', emoji: '🌯', gradient: 'from-orange-500/40 to-red-600/30' },
  { name: 'Local Dishes', emoji: '🍛', gradient: 'from-amber-500/40 to-yellow-600/30' },
  { name: 'Sides', emoji: '🥟', gradient: 'from-yellow-500/40 to-amber-700/30' },
  { name: 'Drinks', emoji: '🥤', gradient: 'from-red-500/40 to-pink-600/30' },
]

export default function CategoryIcons({ selected, onSelect }) {
  return (
    <div className="flex gap-3 overflow-x-auto px-4 pb-4 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(cat.name)}
          className="flex flex-col items-center gap-1.5 flex-shrink-0"
        >
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${cat.gradient} border ${
              selected === cat.name ? 'border-gold' : 'border-white/10'
            }`}
          >
            <span className="text-2xl">{cat.emoji}</span>
          </div>
          <span
            className={`text-xs ${
              selected === cat.name ? 'text-gold font-semibold' : 'text-white/60'
            }`}
          >
            {cat.name}
          </span>
        </button>
      ))}
    </div>
  )
}
