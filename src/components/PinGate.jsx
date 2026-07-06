import React, { useState } from 'react'

const ADMIN_PIN = 'dkichin2026' // change this anytime — just edit this line

export default function PinGate({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem('dkichin_admin_unlocked', 'true')
      onUnlock()
    } else {
      setError('Incorrect PIN. Try again.')
      setPin('')
    }
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h1 className="text-white text-lg font-bold mb-1 text-center">
          D" Kichin Admin
        </h1>
        <p className="text-white/40 text-xs text-center mb-5">
          Enter PIN to access dashboard
        </p>
        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          autoFocus
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-center text-lg tracking-widest placeholder-white/30 focus:outline-none focus:border-gold mb-3"
        />
        {error && (
          <p className="text-red-400 text-xs text-center mb-3">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-gold text-charcoal font-bold py-3 rounded-2xl"
        >
          Unlock
        </button>
      </form>
    </div>
  )
}
