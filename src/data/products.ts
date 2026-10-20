import { Product } from '../types';

export const WHATSAPP_PHONE = '5491123456789';

export const formatPrice = (amount: number): string => {
  return '$' + amount.toLocaleString('es-AR') + ' ARS';
};

export const createWhatsAppLink = (message: string): string => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

export const PRODUCTS: Product[] = [
  {
    id: 'florero-u',
    name: 'Florero Escultural en U Acanalado',
    price: 22000,
    image: '/assets/images/florero-u.webp',
    badge: 'Pieza Escultórica',
    description:
      'Silueta curva con doble abertura y acabado de estrías arquitectónicas. Diseñado para sostener ramas secas o presentarse como una escultura autónoma sobre consolas y mesas de centro.',
    specs: [
      { label: 'Acabado', value: 'Mate sedoso tonalidad arena' },
      { label: 'Técnica', value: 'Impresión 3D capa ultra fina' },
      { label: 'Uso', value: 'Arreglos botánicos secos / Pieza de acento' },
    ],
  },
  {
    id: 'posavasos-pack',
    name: 'Posavasos Minimalistas Orgánicos (Pack x4)',
    price: 14000,
    image: '/assets/images/posavasos-pack.webp',
    badge: 'Set de 4 Unidades',
    description:
      'Curvas asimétricas inspiradas en guijarros de río, con acanalado central que recoge la condensación y protege tus mesas de madera o piedra.',
    specs: [
      { label: 'Contenido', value: 'Pack de 4 posavasos' },
      { label: 'Tacto', value: 'Relieve estriado antideslizante' },
      { label: 'Cuidado', value: 'Lavable con agua tibia y paño suave' },
    ],
  },
  {
    id: 'dispensador-lena',
    name: 'Dispensador de Film y Aluminio · LENA',
    price: 38000,
    image: '/assets/images/dispensador-lena.webp',
    badge: 'Cocina Funcional',
    description:
      'Solución de almacenamiento con cuchilla de corte bidireccional integrada. Elimina el desorden visual de los empaques comerciales manteniendo líneas limpias en tu cocina.',
    specs: [
      { label: 'Función', value: 'Dispensador doble con cortador limpio' },
      { label: 'Montaje', value: 'Apoyo sobre mesada o interior de cajón' },
      { label: 'Compatibilidad', value: 'Rollos universales estándar' },
    ],
  },
];
