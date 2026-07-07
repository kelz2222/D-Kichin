import React from 'react'
import Logo from './Logo.jsx'

export default function Header({ isOpen }) {
  return (
    <header className="px-4 pt-6 pb-4 bg-charcoal">
      <div className="flex items-center justify-center">
        <Logo size={64} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 flex-wrap">
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

      <div className="mt-2 flex justify-center">
        <span className="text-white/40 text-[11px] italic">
          🍳 Fresh from the Home Kitchen, to your door
        </span>
      </div>
    </header>
  )
}
