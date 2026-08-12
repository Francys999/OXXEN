import { Link } from 'react-router-dom'
import { X, Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, updateQty, removeFromCart, subtotal, whatsAppOrderLink } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-[90] flex h-full w-full max-w-md flex-col bg-oxxen-surface transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-oxxen-border px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-oxxen-accent" />
            <h2 className="text-lg font-bold text-oxxen-text">Tu carrito</h2>
            <span className="badge bg-oxxen-surface2 text-oxxen-muted">{items.length}</span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-text"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="h-12 w-12 text-oxxen-muted" />
              <p className="font-semibold text-oxxen-text">Tu carrito está vacío</p>
              <p className="text-sm text-oxxen-muted">Agrega productos para continuar</p>
              <Link to="/productos" onClick={() => setCartOpen(false)} className="btn-primary mt-2">
                Ver productos
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.cartId} className="flex gap-3 border-b border-oxxen-border pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-xl bg-oxxen-surface2 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-2 text-sm font-semibold text-oxxen-text">{item.name}</p>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="shrink-0 text-oxxen-muted transition-colors hover:text-red-400"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-sm font-bold text-oxxen-accent">{formatPrice(item.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.cartId, item.qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-text hover:border-oxxen-accent/50"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-oxxen-text">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.cartId, item.qty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-oxxen-border text-oxxen-text hover:border-oxxen-accent/50"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-oxxen-border p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-oxxen-muted">Subtotal</span>
              <span className="text-xl font-extrabold text-oxxen-text">{formatPrice(subtotal)}</span>
            </div>
            <a href={whatsAppOrderLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <MessageCircle className="h-4 w-4" />
              Realizar pedido por WhatsApp
            </a>
            <p className="mt-3 text-center text-xs text-oxxen-muted">
              El pago y envío se coordinan directamente con un asesor.
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
