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
    transferPrice: 19800,
    transferDiscountPercent: 10,
    image: '/assets/images/florero-u.webp',
    badge: 'Pieza Escultórica',
    description:
      'Silueta curva con doble abertura y acabado de estrías arquitectónicas. Diseñado para sostener ramas secas o presentarse como una escultura autónoma sobre consolas y mesas de centro.',
    colors: [
      { name: 'Beige', hex: '#D8CAB8', sku: 'SER-ESC-BEI-001' },
      { name: 'Blanco', hex: '#F5F4F0', sku: 'SER-ESC-BLA-001' },
      { name: 'Marrón', hex: '#5A3E2B', sku: 'SER-ESC-MAR-001' },
      { name: 'Negro', hex: '#1F2120', sku: 'SER-ESC-NEG-001' },
    ],
    specs: [
      { label: 'Acabado', value: 'Mate sedoso mineral' },
      { label: 'Técnica', value: 'Impresión 3D capa ultra fina' },
      { label: 'Uso', value: 'Arreglos botánicos secos / Pieza de acento' },
    ],
  },
  {
    id: 'posavasos-pack',
    name: 'Posavasos Minimalistas Orgánicos (Pack x4)',
    price: 14000,
    transferPrice: 12600,
    transferDiscountPercent: 10,
    image: '/assets/images/posavasos-pack.webp',
    badge: 'Set de 4 Unidades',
    description:
      'Curvas asimétricas inspiradas en guijarros de río, con acanalado central que recoge la condensación y protege tus mesas de madera o piedra.',
    colors: [
      { name: 'Beige', hex: '#D8CAB8', sku: 'SER-ORG-BEI-001' },
      { name: 'Blanco', hex: '#F5F4F0', sku: 'SER-ORG-BLA-001' },
      { name: 'Marrón', hex: '#5A3E2B', sku: 'SER-ORG-MAR-001' },
      { name: 'Negro', hex: '#1F2120', sku: 'SER-ORG-NEG-001' },
    ],
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
    transferPrice: 34200,
    transferDiscountPercent: 10,
    image: '/assets/images/dispensador-lena.webp',
    badge: 'Cocina Funcional',
    description:
      'Solución de almacenamiento fabricada en bambú natural de alta calidad con cuchilla de corte bidireccional integrada. Elimina el desorden visual de los empaques comerciales manteniendo líneas limpias.',
    colors: [
      { name: 'Bambú Natural', hex: '#C4A474', sku: 'SER-LEN-FIL-01' },
    ],
    specs: [
      { label: 'Material', value: 'Bambú natural ecológico de alta resistencia' },
      { label: 'Función', value: 'Dispensador doble con corte deslizante limpio' },
      { label: 'Montaje', value: 'Apoyo sobre mesada o interior de cajón' },
    ],
  },
];
