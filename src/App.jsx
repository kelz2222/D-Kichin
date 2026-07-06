import React, { useState, useEffect } from 'react'
import { CartProvider } from './CartContext.jsx'
import Home from './pages/Home.jsx'
import Admin from './pages/Admin.jsx'

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    function onPopState() {
      setPath(window.location.pathname)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const isAdmin = path.startsWith('/admin')

  return (
    <CartProvider>
      {isAdmin ? <Admin /> : <Home />}
    </CartProvider>
  )
}
