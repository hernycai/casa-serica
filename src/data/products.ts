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
      'Sumá una pieza de arquitectura y diseño contemporáneo a tus espacios con nuestro florero escultural en U. Fabricado en plástico resistente, su silueta tubular y su acabado acanalado de relieve táctil combinan el minimalismo con las tendencias clave del estilo nórdico y japandi.\n\nLucilo como objeto decorativo autónomo en repisas, mesas de centro o recibidores. Recomendado únicamente para flores secas y follaje.',
    colors: [
      { name: 'Beige', hex: '#D8CAB8', sku: 'SER-ESC-BEI-001', image: '/assets/images/florero-u-beige.webp' },
      { name: 'Blanco', hex: '#F5F4F0', sku: 'SER-ESC-BLA-001', image: '/assets/images/florero-u-blanco.webp' },
      { name: 'Marrón', hex: '#5A3E2B', sku: 'SER-ESC-MAR-001', image: '/assets/images/florero-u-marron.webp' },
      { name: 'Negro', hex: '#1F2120', sku: 'SER-ESC-NEG-001', image: '/assets/images/florero-u-negro.webp' },
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
    image: '/assets/images/posavasos-pack-beige.webp',
    badge: 'Set de 4 Unidades',
    description:
      'Dale un toque especial a tu mesa con SÉRICA ORGANIC, un set de 4 posavasos de diseño orgánico, pensados para combinar funcionalidad y estética.\n\nSu forma irregular y sus curvas suaves aportan un detalle diferente a cualquier espacio, mientras que su acabado texturado le da personalidad y presencia.\n\nCada pieza es fabricada individualmente, por lo que pueden existir pequeñas variaciones propias del proceso de fabricación. Estas particularidades forman parte del carácter de cada pieza.',
    colors: [
      { name: 'Beige', hex: '#D8CAB8', sku: 'SER-ORG-BEI-001', image: '/assets/images/posavasos-pack-beige.webp' },
      { name: 'Blanco', hex: '#F5F4F0', sku: 'SER-ORG-BLA-001', image: '/assets/images/posavasos-pack-blanco.webp' },
      { name: 'Marrón', hex: '#5A3E2B', sku: 'SER-ORG-MAR-001', image: '/assets/images/posavasos-pack-marron.webp' },
      { name: 'Negro', hex: '#1F2120', sku: 'SER-ORG-NEG-001', image: '/assets/images/posavasos-pack-negro.webp' },
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
      'Organizá tu cocina con estilo y practicidad gracias al Dispensador LENA, la solución ideal para mantener tus rollos de film y papel aluminio siempre al alcance y perfectamente cortados.\n\nEste dispensador está fabricado en bambú natural de alta calidad, un material ecológico, resistente y con una estética cálida que se integra perfectamente tanto en cocinas modernas como rústicas. Su diseño pensado para uso sobre la mesada o colgado permite optimizar el espacio y mantener el orden, evitando el desorden y los rollos mal cortados.\n\nEl sistema de corte deslizante integrado garantiza un corte limpio y parejo, facilitando el uso diario y reduciendo el desperdicio de material. Olvidate de los films que se pegan o se rompen mal: con LENA, cada sección queda perfectamente dividida con un solo movimiento.\n\nIdeal para quienes buscan funcionalidad, durabilidad y un toque natural en su cocina.\n\nLlevá orden y estilo a tu cocina con el dispensador LENA, la combinación perfecta de funcionalidad y diseño natural para el día a día.',
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
