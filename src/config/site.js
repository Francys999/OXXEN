// Número de prueba — reemplazar por el número real de OXXEN antes de producción (formato: código país + número, sin +).
export const WHATSAPP_NUMBER = '51999999999'

export const SITE = {
  name: 'OXXEN',
  tagline: 'Tecnología a tu alcance',
  email: 'contacto@oxxen.pe',
  phone: '+51 999 999 999',
  address: 'Av. Tecnología 123, Lima, Perú',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  },
}

export const buildWhatsAppLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
