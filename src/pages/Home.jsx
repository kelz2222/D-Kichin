import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabaseClient.js'
import Header from '../components/Header.jsx'
import HeroBanner from '../components/HeroBanner.jsx'
import CategoryIcons from '../components/CategoryIcons.jsx'
import SurpriseMeCombo from '../components/SurpriseMeCombo.jsx'
import CategorySection from '../components/CategorySection.jsx'
import FoodGrid from '../components/FoodGrid.jsx'
import PromoBanner from '../components/PromoBanner.jsx'
import FooterFeatures from '../components/FooterFeatures.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import CartBar from '../components/CartBar.jsx'
import CartDrawer from '../components/CartDrawer.jsx'

const CATEGORY_ORDER = ['Fast Food', 'Local Dishes', 'Sides', 'Drinks']

export default function Home() {
  const [dishes, setDishes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [kitchenOpen, setKitchenOpen] = useState(true)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuRef = useRef(null)

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

  function scrollToMenu() {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-charcoal">
      <Header isOpen={kitchenOpen} />

      <HeroBanner dishes={dishes} onOrderNow={scrollToMenu} />

      {!kitchenOpen && (
        <div className="mx-4 mb-3 bg-red-500/10 border border-red-500/40 text-red-300 text-sm rounded-2xl p-3 text-center">
          🔴 We're currently closed. Please check back soon — ordering is
          paused for now.
        </div>
      )}

      <CategoryIcons selected={selectedCategory} onSelect={setSelectedCategory} />

      {!loading && (
        <SurpriseMeCombo dishes={dishes} kitchenOpen={kitchenOpen} />
      )}

      <div ref={menuRef}>
        {loading ? (
          <div className="grid grid-cols-2 gap-3 px-4 pb-6">
            {[...Array(4)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : selectedCategory === 'All' ? (
          dishes.length === 0 ? (
            <p className="text-white/40 text-center py-10 text-sm">
              No dishes on the menu yet — check back soon!
            </p>
          ) : (
            CATEGORY_ORDER.map((cat) => (
              <CategorySection
                key={cat}
                category={cat}
                dishes={dishes.filter((d) => d.category === cat)}
                kitchenOpen={kitchenOpen}
              />
            ))
          )
        ) : (
          <div className="mb-6">
            <FoodGrid dishes={filteredDishes} kitchenOpen={kitchenOpen} />
          </div>
        )}
      </div>

      <PromoBanner />
      <FooterFeatures />

      <CartBar onOpen={() => setDrawerOpen(true)} />
      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  )
}
