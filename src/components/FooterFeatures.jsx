import React from 'react'

const FEATURES = [
  { emoji: '🛵', title: 'Fast Delivery', subtitle: 'Quick & reliable' },
  { emoji: '🏅', title: 'Best Quality', subtitle: 'Fresh ingredients' },
  { emoji: '🔒', title: 'Secure Order', subtitle: 'Via WhatsApp' },
  { emoji: '🎧', title: 'Support', subtitle: "We're here to help" },
]

export default function FooterFeatures() {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 pb-8 pt-4 border-t border-white/5">
      {FEATURES.map((f) => (
        <div
          key={f.title}
          className="flex items-center gap-2 bg-white/5 rounded-2xl p-3"
        >
          <span className="text-xl">{f.emoji}</span>
          <div>
            <p className="text-white text-xs font-semibold">{f.title}</p>
            <p className="text-white/40 text-[10px]">{f.subtitle}</p>
          </div>
        </div>
      ))}
      <p className="col-span-2 text-center text-white/30 text-[10px] mt-2">
        © 2026 D&rsquo; Kichin · Bremang, New York Junction, Kumasi
      </p>
    </div>
  )
}
