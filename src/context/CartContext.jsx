import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import { formatPrice } from '../utils/format'
import { buildWhatsAppLink, SITE } from '../config/site'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isCartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.cartId === product.id)
      if (existing) {
        return prev.map((i) =>
          i.cartId === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [
        ...prev,
        {
          cartId: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          qty,
          type: product.type || 'product',
        },
      ]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((cartId) => {
    setItems((prev) => prev.filter((i) => i.cartId !== cartId))
  }, [])

  const updateQty = useCallback((cartId, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.cartId === cartId ? { ...i, qty: Math.max(1, qty) } : i))
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.qty * i.price, 0), [items])

  const whatsAppOrderLink = useMemo(() => {
    if (items.length === 0) return buildWhatsAppLink('Hola OXXEN, quisiera hacer una consulta.')
    const lines = [
      `Hola ${SITE.name}, quiero realizar el siguiente pedido:`,
      '',
      ...items.map(
        (i, idx) => `${idx + 1}. ${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`
      ),
      '',
      `Total: ${formatPrice(subtotal)}`,
      '',
      'Quedo atento(a) para coordinar el pago y la entrega. ¡Gracias!',
    ]
    return buildWhatsAppLink(lines.join('\n'))
  }, [items, subtotal])

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    itemCount,
    subtotal,
    isCartOpen,
    setCartOpen,
    whatsAppOrderLink,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
