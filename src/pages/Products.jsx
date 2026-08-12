import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductGrid from '../components/ProductGrid'
import { products } from '../data/products'
import { categories } from '../data/categories'

const sortOptions = [
  { id: 'relevance', label: 'Relevancia' },
  { id: 'price-asc', label: 'Precio: menor a mayor' },
  { id: 'price-desc', label: 'Precio: mayor a menor' },
  { id: 'name', label: 'Nombre A-Z' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('categoria') || ''
  const activeQuery = searchParams.get('buscar') || ''
  const [query, setQuery] = useState(activeQuery)
  const [sort, setSort] = useState('relevance')
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => setQuery(activeQuery), [activeQuery])

  const setCategory = (id) => {
    const next = new URLSearchParams(searchParams)
    if (id) next.set('categoria', id)
    else next.delete('categoria')
    setSearchParams(next)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (query.trim()) next.set('buscar', query.trim())
    else next.delete('buscar')
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory) list = list.filter((p) => p.category === activeCategory)
    if (activeQuery) {
      const q = activeQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [activeCategory, activeQuery, sort])

  const activeCategoryName = categories.find((c) => c.id === activeCategory)?.name

  return (
    <div className="container-oxxen py-8 sm:py-12">
      <div className="mb-6">
        <h1 className="section-title">Catálogo de productos</h1>
        <p className="section-subtitle">
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
          {activeCategoryName ? ` en ${activeCategoryName}` : ''}
          {activeQuery ? ` para "${activeQuery}"` : ''}
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <aside className={`shrink-0 lg:w-64 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
          <div className="card-surface sticky top-24 p-5">
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-oxxen-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Buscar..."
                className="input-oxxen pl-10"
              />
            </form>

            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-oxxen-muted">Categorías</p>
            <ul className="flex flex-col gap-1">
              <li>
                <button
                  onClick={() => setCategory('')}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    !activeCategory ? 'bg-oxxen-accent/15 text-oxxen-accent' : 'text-oxxen-muted hover:bg-oxxen-surface2'
                  }`}
                >
                  Todas
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategory(cat.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeCategory === cat.id
                        ? 'bg-oxxen-accent/15 text-oxxen-accent'
                        : 'text-oxxen-muted hover:bg-oxxen-surface2'
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-5 flex items-center justify-between gap-3">
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="btn-secondary !px-4 !py-2 text-xs lg:hidden"
            >
              {filtersOpen ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
              Filtros
            </button>

            {(activeCategory || activeQuery) && (
              <div className="hidden flex-wrap items-center gap-2 sm:flex">
                {activeCategoryName && (
                  <span className="badge flex items-center gap-1.5 bg-oxxen-surface2 text-oxxen-text">
                    {activeCategoryName}
                    <button onClick={() => setCategory('')} aria-label="Quitar filtro de categoría">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeQuery && (
                  <span className="badge flex items-center gap-1.5 bg-oxxen-surface2 text-oxxen-text">
                    "{activeQuery}"
                    <button
                      onClick={() => {
                        const next = new URLSearchParams(searchParams)
                        next.delete('buscar')
                        setSearchParams(next)
                      }}
                      aria-label="Quitar búsqueda"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-oxxen ml-auto w-auto !py-2 text-xs sm:text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <ProductGrid products={filtered} />
        </div>
      </div>
    </div>
  )
}
