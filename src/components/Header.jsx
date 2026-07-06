import React from 'react'

export default function Header({ isOpen }) {
  return (
    <header className="px-4 pt-6 pb-4 bg-charcoal">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="D&quot; Kichin"
          className="w-14 h-14 object-contain"
        />
        <div>
          <h1 className="text-white text-xl font-bold">D" Kichin</h1>
          <p className="text-gold text-sm">Delicious Foods!</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 bg-white/5 border border-gold/30 text-white text-xs px-3 py-1.5 rounded-2xl">
          📍 Delivery Available (Bremang, Kumasi)
        </span>
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-2xl ${
            isOpen
              ? 'bg-green-500/20 text-green-400 border border-green-500/40'
              : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}
        >
          {isOpen ? '🟢 Open' : '🔴 Closed'}
        </span>
      </div>
    </header>
  )
}
