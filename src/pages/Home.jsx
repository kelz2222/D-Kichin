import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient.js'
import Header from '../components/Header.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import FoodGrid from '../components/FoodGrid.jsx'
import CartBar from '../components/CartBar.jsx'
import CartDrawer from '../components/CartDrawer.jsx'

export default function Home() {
  const [dishes, setDishes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [kitchenOpen, setKitchenOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    fetchDishes()
    fetchKitchenStatus()
  }, [])

  async function fetchDishes() {
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    if (!error) setDishes(data)
    setLoading(false)
  }

  async function fetchKitchenStatus() {
    const { data, error } = await supabase
      .from('kitchen_settings')
      .select('is_open')
      .eq('id', 1)
      .single()

    if (!error && data) setKitchenOpen(data.is_open)
  }

  const filteredDishes =
    selectedCategory === 'All'
      ? dishes
      : dishes.filter((d) => d.category === selectedCategory)

  return (
    <div className="min-h-screen bg-charcoal">
      <Header isOpen={kitchenOpen} />

      {!kitchenOpen && (
        <div className="mx-4 mb-3 bg-red-500/10 border border-red-500/40 text-red-300 text-sm rounded-2xl p-3 text-center">
          🔴 We're currently closed. Please check back soon — ordering is
          paused for now.
        </div>
      )}

      <CategoryFilter
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {loading ? (
        <p className="text-white/40 text-center mt-10 text-sm">Loading menu...</p>
      ) : (
        <FoodGrid dishes={filteredDishes} kitchenOpen={kitchenOpen} />
      )}

      <CartBar onOpen={() => setDrawerOpen(true)} />
      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
