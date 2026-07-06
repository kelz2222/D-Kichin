import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'

export default function KitchenToggle({ isOpen, onToggled }) {
  const [saving, setSaving] = useState(false)

  async function handleToggle() {
    setSaving(true)
    const newStatus = !isOpen
    const { error } = await supabase
      .from('kitchen_settings')
      .update({ is_open: newStatus, updated_at: new Date().toISOString() })
      .eq('id', 1)

    if (!error) onToggled(newStatus)
    setSaving(false)
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
      <div>
        <p className="text-white font-semibold text-sm">Kitchen Status</p>
        <p className="text-white/40 text-xs">
          {isOpen ? 'Currently accepting orders' : 'Ordering paused'}
        </p>
      </div>
      <button
        onClick={handleToggle}
        disabled={saving}
        className={`px-4 py-2 rounded-2xl text-sm font-bold ${
          isOpen
            ? 'bg-green-500/20 text-green-400 border border-green-500/40'
            : 'bg-red-500/20 text-red-400 border border-red-500/40'
        }`}
      >
        {saving ? '...' : isOpen ? '🟢 Open' : '🔴 Closed'}
      </button>
    </div>
  )
}
