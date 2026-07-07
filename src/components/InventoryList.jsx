import React, { useState } from 'react'
import { supabase } from '../supabaseClient.js'

export default function InventoryList({ dishes, onUpdated, onEdit }) {
  const [busyId, setBusyId] = useState(null)

  async function toggleAvailability(dish) {
    setBusyId(dish.id)
    const { error } = await supabase
      .from('dishes')
      .update({ is_available: !dish.is_available })
      .eq('id', dish.id)

    if (!error) onUpdated()
    setBusyId(null)
  }

  async function deleteDish(dish) {
    if (!window.confirm(`Delete "${dish.name}" permanently?`)) return
    setBusyId(dish.id)
    const { error } = await supabase.from('dishes').delete().eq('id', dish.id)
    if (!error) onUpdated()
    setBusyId(null)
  }

  if (dishes.length === 0) {
    return (
      <p className="text-white/40 text-sm text-center py-6">
        No dishes uploaded yet.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <h2 className="text-white font-bold mb-2">Inventory</h2>
      {dishes.map((dish) => (
        <div
          key={dish.id}
          className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-3 ${
            !dish.is_available ? 'opacity-40' : ''
          }`}
        >
          {dish.image_url ? (
            <img
              src={dish.image_url}
              alt={dish.name}
              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-xl">
              🍽️
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{dish.name}</p>
            <p className="text-gold text-xs">
              ₵{Number(dish.price).toFixed(2)} · {dish.category}
            </p>
            {!dish.image_url && (
              <p className="text-white/30 text-[10px]">No photo yet</p>
            )}
          </div>
          <button
            onClick={() => onEdit(dish)}
            className="text-xs font-bold px-2.5 py-1.5 rounded-2xl bg-white/10 text-white border border-white/10"
          >
            Edit
          </button>
          <button
            onClick={() => toggleAvailability(dish)}
            disabled={busyId === dish.id}
            className={`text-xs font-bold px-2.5 py-1.5 rounded-2xl ${
              dish.is_available
                ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                : 'bg-white/10 text-white/40 border border-white/10'
            }`}
          >
            {dish.is_available ? 'Active' : 'Out'}
          </button>
          <button
            onClick={() => deleteDish(dish)}
            disabled={busyId === dish.id}
            className="text-red-400 text-xs"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
