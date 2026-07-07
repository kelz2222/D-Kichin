import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient.js'

export default function AnalyticsSummary() {
  const [totalViews, setTotalViews] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [last7Days, setLast7Days] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  async function fetchAnalytics() {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { count: viewCount } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'page_view')

    const { count: orderCount } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .eq('event_type', 'order_placed')

    const { data: recentEvents } = await supabase
      .from('analytics_events')
      .select('event_type, created_at')
      .gte('created_at', sevenDaysAgo.toISOString())

    setTotalViews(viewCount || 0)
    setTotalOrders(orderCount || 0)
    setLast7Days(buildDailyBreakdown(recentEvents || []))
    setLoading(false)
  }

  function buildDailyBreakdown(events) {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateKey = d.toISOString().slice(0, 10)
      const label = d.toLocaleDateString('en-GB', { weekday: 'short' })
      days.push({ dateKey, label, views: 0, orders: 0 })
    }

    events.forEach((event) => {
      const dateKey = event.created_at.slice(0, 10)
      const day = days.find((d) => d.dateKey === dateKey)
      if (!day) return
      if (event.event_type === 'page_view') day.views++
      if (event.event_type === 'order_placed') day.orders++
    })

    return days
  }

  const conversionRate =
    totalViews > 0 ? ((totalOrders / totalViews) * 100).toFixed(1) : '0.0'

  const maxValue = Math.max(1, ...last7Days.map((d) => Math.max(d.views, d.orders)))

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
        <div className="h-16 bg-white/10 rounded" />
      </div>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
      <h2 className="text-white font-bold mb-3">📊 Analytics</h2>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white/5 rounded-2xl p-3 text-center">
          <p className="text-gold text-xl font-bold">{totalViews}</p>
          <p className="text-white/40 text-[10px]">Total Visits</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 text-center">
          <p className="text-gold text-xl font-bold">{totalOrders}</p>
          <p className="text-white/40 text-[10px]">Orders Placed</p>
        </div>
        <div className="bg-white/5 rounded-2xl p-3 text-center">
          <p className="text-gold text-xl font-bold">{conversionRate}%</p>
          <p className="text-white/40 text-[10px]">Conversion</p>
        </div>
      </div>

      <p className="text-white/40 text-xs mb-2">Last 7 days</p>
      <div className="flex items-end justify-between gap-1.5 h-20">
        {last7Days.map((day) => (
          <div key={day.dateKey} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col justify-end h-14 gap-0.5">
              <div
                className="w-full bg-gold/30 rounded-sm"
                style={{ height: `${(day.views / maxValue) * 100}%` }}
              />
              <div
                className="w-full bg-green-500/50 rounded-sm"
                style={{ height: `${(day.orders / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-white/30 text-[9px]">{day.label}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-2 justify-center">
        <span className="flex items-center gap-1 text-[10px] text-white/50">
          <span className="w-2 h-2 bg-gold/30 rounded-sm" /> Visits
        </span>
        <span className="flex items-center gap-1 text-[10px] text-white/50">
          <span className="w-2 h-2 bg-green-500/50 rounded-sm" /> Orders
        </span>
      </div>
    </div>
  )
}
