import { PackageSearch } from 'lucide-react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-oxxen-border py-20 text-center">
        <PackageSearch className="h-10 w-10 text-oxxen-muted" />
        <p className="text-base font-semibold text-oxxen-text">No encontramos productos</p>
        <p className="text-sm text-oxxen-muted">Prueba con otra búsqueda o categoría.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
