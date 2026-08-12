import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar({ className = '', placeholder = 'Buscar productos, marcas y más...' }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/productos${query.trim() ? `?buscar=${encodeURIComponent(query.trim())}` : ''}`)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-oxxen-muted" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input-oxxen pl-10"
        aria-label="Buscar productos"
      />
    </form>
  )
}
