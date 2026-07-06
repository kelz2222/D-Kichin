import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dkichin_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('dkichin_cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(dish) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === dish.id)
      if (existing) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...dish, qty: 1 }]
    })
  }

  function removeFromCart(dishId) {
    setCart((prev) => prev.filter((item) => item.id !== dishId))
  }

  function updateQty(dishId, qty) {
    if (qty <= 0) {
      removeFromCart(dishId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === dishId ? { ...item, qty } : item))
    )
  }

  function clearCart() {
    setCart([])
  }

  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0)

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    itemCount,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
