import { useMemo, useState } from 'react'
import { ShoppingCart, MessageCircle, Cpu, Info } from 'lucide-react'
import { pcCategories } from '../data/pcParts'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'
import { buildWhatsAppLink } from '../config/site'

export default function BuildPC() {
  const { addToCart } = useCart()
  const [selections, setSelections] = useState(() =>
    Object.fromEntries(pcCategories.map((cat) => [cat.id, cat.options[0].id]))
  )

  const selectedParts = useMemo(
    () =>
      pcCategories.map((cat) => ({
        category: cat,
        option: cat.options.find((o) => o.id === selections[cat.id]),
      })),
    [selections]
  )

  const total = useMemo(
    () => selectedParts.reduce((sum, p) => sum + (p.option?.price || 0), 0),
    [selectedParts]
  )

  const handleSelect = (categoryId, optionId) => {
    setSelections((prev) => ({ ...prev, [categoryId]: optionId }))
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: `build-${Date.now()}`,
        name: 'Configuración de PC personalizada',
        price: total,
        image: 'https://placehold.co/600x600/11161f/00b8ff?font=montserrat&text=PC+a+medida',
        type: 'build',
      },
      1
    )
  }

  const whatsappBuildLink = buildWhatsAppLink(
    [
      'Hola OXXEN, quisiera asesoría para armar mi PC con esta configuración:',
      '',
      ...selectedParts.map((p) => `• ${p.category.label}: ${p.option.name} — ${formatPrice(p.option.price)}`),
      '',
      `Total estimado: ${formatPrice(total)}`,
    ].join('\n')
  )

  return (
    <div className="container-oxxen py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="section-title">Arma tu PC</h1>
        <p className="section-subtitle">
          Elige cada componente y calcula el precio total al instante.
        </p>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-oxxen-accent2/30 bg-oxxen-accent2/10 p-4 text-sm text-oxxen-text">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-oxxen-accent2" />
        <p>
          Esta es una configuración referencial. La compatibilidad final entre componentes se
          valida junto a un asesor OXXEN antes de confirmar tu pedido.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          {pcCategories.map((cat) => (
            <div key={cat.id} className="card-surface p-5">
              <label className="mb-2 block text-sm font-semibold text-oxxen-text">{cat.label}</label>
              <select
                value={selections[cat.id]}
                onChange={(e) => handleSelect(cat.id, e.target.value)}
                className="input-oxxen"
              >
                {cat.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} — {opt.price === 0 ? 'Incluido' : formatPrice(opt.price)}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-oxxen-accent" />
              <h2 className="text-lg font-bold text-oxxen-text">Tu configuración</h2>
            </div>

            <ul className="flex flex-col gap-3">
              {selectedParts.map(({ category, option }) => (
                <li key={category.id} className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    <p className="text-oxxen-muted">{category.label}</p>
                    <p className="font-medium text-oxxen-text">{option.name}</p>
                  </div>
                  <span className="shrink-0 font-semibold text-oxxen-text">
                    {option.price === 0 ? 'Incluido' : formatPrice(option.price)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-center justify-between border-t border-oxxen-border pt-4">
              <span className="text-sm font-semibold text-oxxen-text">Total estimado</span>
              <span className="text-2xl font-extrabold text-oxxen-accent">{formatPrice(total)}</span>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button onClick={handleAddToCart} className="btn-primary w-full">
                <ShoppingCart className="h-4 w-4" />
                Agregar configuración al carrito
              </button>
              <a href={whatsappBuildLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                <MessageCircle className="h-4 w-4" />
                Solicitar asesoría por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
