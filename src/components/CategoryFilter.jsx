import React from 'react'

const CATEGORIES = ['All', 'Fast Food', 'Local Dishes', 'Sides', 'Drinks']

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-3 no-scrollbar">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
            selected === cat
              ? 'bg-gold text-charcoal font-bold'
              : 'bg-white/5 text-white border border-white/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
