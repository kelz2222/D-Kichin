import { supabase } from '../supabaseClient.js'

export async function logEvent(eventType) {
  try {
    await supabase.from('analytics_events').insert({ event_type: eventType })
  } catch (err) {
    // Silently ignore — analytics should never break the customer experience
    console.warn('Analytics log failed:', err)
  }
}
