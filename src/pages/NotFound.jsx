import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-oxxen flex flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-extrabold text-oxxen-accent">404</p>
      <h1 className="mt-4 text-xl font-bold text-oxxen-text">Página no encontrada</h1>
      <p className="mt-2 text-sm text-oxxen-muted">La página que buscas no existe o fue movida.</p>
      <Link to="/" className="btn-primary mt-6">
        <Home className="h-4 w-4" />
        Volver al inicio
      </Link>
    </div>
  )
}
