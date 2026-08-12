import { Link } from 'react-router-dom'

export default function CategoryCard({ category }) {
  const Icon = category.icon
  return (
    <Link
      to={`/productos?categoria=${category.id}`}
      className="card-surface group flex flex-col items-center gap-3 px-4 py-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-oxxen-accent/50"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-oxxen-surface2 text-oxxen-accent transition-colors group-hover:bg-oxxen-accent group-hover:text-oxxen-bg">
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-sm font-semibold text-oxxen-text">{category.name}</span>
    </Link>
  )
}
