import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient.js'
import PinGate from '../components/PinGate.jsx'
import KitchenToggle from '../components/KitchenToggle.jsx'

export default function Admin() {
  const [unlocked, setUnlocked] = useState(
    sessionStorage.getItem('dkichin_admin_unlocked') === 'true'
  )
  const [dishes, setDishes] = useState([])
  const [kitchenOpen, setKitchenOpen] = useState(true)

  useEffect(() => {
    if (unlocked) {
      fetchDishes()
      fetchKitchenStatus()
    }
  }, [unlocked])

  async function fetchDishes() {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setDishes(data)
  }

  async function fetchKitchenStatus() {
    const { data, error } = await supabase
      .from('kitchen_settings')
      .select('is_open')
      .eq('id', 1)
      .single()
    if (!error && data) setKitchenOpen(data.is_open)
  }

  if (!unlocked) {
    return <PinGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <div className="min-h-screen bg-charcoal px-4 py-6 pb-16">
      <h1 className="text-white text-xl font-bold mb-4">D" Kichin Admin</h1>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-white/40 text-xs">Total Dishes</p>
          <p className="text-gold text-2xl font-bold">{dishes.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-white/40 text-xs">Active Dishes</p>
          <p className="text-gold text-2xl font-bold">
            {dishes.filter((d) => d.is_available).length}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <KitchenToggle isOpen={kitchenOpen} onToggled={setKitchenOpen} />
      </div>

      {/* Upload form + inventory list go here — Part 7 */}
    </div>
  )
}
