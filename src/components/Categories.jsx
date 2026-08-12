import { categories } from '../data/categories'
import CategoryCard from './CategoryCard'

export default function Categories() {
  return (
    <section className="container-oxxen py-12 sm:py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="section-title">Explora por categoría</h2>
          <p className="section-subtitle">Encuentra justo lo que necesitas</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  )
}
