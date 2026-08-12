import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, ChevronDown } from 'lucide-react'
import { categories } from '../data/categories'

export default function CategoriesMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-oxxen-border bg-oxxen-surface2 px-4 py-2.5 text-sm font-semibold text-oxxen-text transition-colors hover:border-oxxen-accent/50 hover:text-oxxen-accent"
      >
        <LayoutGrid className="h-4 w-4" />
        Categorías
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-2 w-72 animate-fadeIn overflow-hidden rounded-2xl border border-oxxen-border bg-oxxen-surface shadow-card">
          <ul className="grid grid-cols-1 gap-0.5 p-2">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <li key={cat.id}>
                  <Link
                    to={`/productos?categoria=${cat.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-oxxen-text transition-colors hover:bg-oxxen-surface2 hover:text-oxxen-accent"
                  >
                    <Icon className="h-4 w-4 text-oxxen-accent" />
                    {cat.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
