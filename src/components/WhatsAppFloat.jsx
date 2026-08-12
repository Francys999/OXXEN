import { MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '../config/site'

export default function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppLink('Hola OXXEN, quisiera más información sobre sus productos.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-4px_rgba(37,211,102,0.6)] transition-transform duration-200 hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" fill="white" strokeWidth={0} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  )
}
