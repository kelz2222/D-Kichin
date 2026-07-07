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
    const key = dish.id
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [
        ...prev,
        { key, id: dish.id, name: dish.name, price: Number(dish.price), qty: 1 },
      ]
    })
  }

  function addCombo(comboLabel, items) {
    setCart((prev) => {
      let next = [...prev]
      items.forEach((item) => {
        const key = `${item.id}::combo::${comboLabel}`
        const existingIndex = next.findIndex((c) => c.key === key)
        if (existingIndex >= 0) {
          next[existingIndex] = {
            ...next[existingIndex],
            qty: next[existingIndex].qty + 1,
          }
        } else {
          next.push({
            key,
            id: item.id,
            name: item.name,
            price: item.price,
            qty: 1,
            comboLabel,
          })
        }
      })
      return next
    })
  }

  function removeFromCart(key) {
    setCart((prev) => prev.filter((item) => item.key !== key))
  }

  function updateQty(key, qty) {
    if (qty <= 0) {
      removeFromCart(key)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.key === key ? { ...item, qty } : item))
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
    addCombo,
    removeFromCart,
    updateQty,
    clearCart,
    itemCount,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
