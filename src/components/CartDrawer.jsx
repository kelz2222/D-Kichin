import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../CartContext.jsx'

const WHATSAPP_NUMBER = '233243763138'

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQty, removeFromCart, totalPrice, clearCart } = useCart()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')

  function buildWhatsAppMessage() {
    const itemLines = cart
      .map((item) => `- ${item.qty}x ${item.name} (₵${(item.price * item.qty).toFixed(0)})`)
      .join('\n')

    return `*🚨 NEW ORDER PLACED!*
-------------------------
👤 *Name:* ${name}
📍 *Location:* ${location}
-------------------------
🛒 *Items:*
${itemLines}
-------------------------
💰 *Total Amount:* ₵${totalPrice.toFixed(0)}
*Please confirm my order and delivery time!*`
  }

  function handlePlaceOrder() {
    if (!name.trim() || !location.trim()) {
      setError('Please fill in your name and delivery location.')
      return
    }
    setError('')

    const message = buildWhatsAppMessage()
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    clearCart()
    setName('')
    setLocation('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 bg-charcoal border-t border-white/10 rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto"
          >
            <div className="p-5">
              <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4" />
              <h2 className="text-white text-lg font-bold mb-4">Your Cart</h2>

              {cart.length === 0 ? (
                <p className="text-white/40 text-sm text-center py-8">
                  Your cart is empty.
                </p>
              ) : (
                <div className="space-y-3 mb-5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white/5 rounded-2xl p-3"
                    >
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        <p className="text-gold text-xs">₵{item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-white text-sm w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 text-xs ml-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <>
                  <div className="flex justify-between text-white font-bold mb-4 border-t border-white/10 pt-3">
                    <span>Total</span>
                    <span className="text-gold">₵{totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold"
                    />
                    <input
                      type="text"
                      placeholder="Delivery Location / Landmark"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-gold"
                    />
                    {error && <p className="text-red-400 text-xs">{error}</p>}

                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handlePlaceOrder}
                      className="w-full bg-green-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 mt-2"
                    >
                      📲 Place Order via WhatsApp
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
