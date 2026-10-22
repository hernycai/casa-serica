// Vercel Serverless Function para Mercado Pago Checkout Pro
export default async function handler(req: any, res: any) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { productId, quantity = 1, color = '', buyerName = '', buyerLocation = '' } = req.body || {};

    const products: Record<string, { name: string; price: number }> = {
      'florero-u': {
        name: 'Florero Escultural en U Acanalado',
        price: 22000, // PRECIO DE LISTA OFICIAL (Sin descuento de transferencia)
      },
      'posavasos-pack': {
        name: 'Posavasos Minimalistas Orgánicos (Pack x4)',
        price: 14000, // PRECIO DE LISTA OFICIAL (Sin descuento de transferencia)
      },
      'dispensador-lena': {
        name: 'Dispensador de Film y Aluminio · LENA',
        price: 38000, // PRECIO DE LISTA OFICIAL (Sin descuento de transferencia)
      },
    };

    const product = products[productId];
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const defaultToken = 'APP_USR-1474568486042750-102120-1c2121e1974b9feaa92e3fc84d97cf0d-3597191984';
    const candidate = process.env.MERCADOPAGO_ACCESS_TOKEN || process.env.VITE_MERCADOPAGO_ACCESS_TOKEN;
    const accessToken = candidate && candidate.length > 50 ? candidate : defaultToken;

    const host = req.headers['x-forwarded-host'] || req.headers.host || 'casa-serica.vercel.app';
    const proto = req.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
    const siteUrl = `${proto}://${host}`;

    const preferencePayload = {
      items: [
        {
          id: productId,
          title: `${product.name}${color ? ` (${color})` : ''} - CASA SERICA`,
          description: `Pieza de diseño CASA SERICA - Tono: ${color || 'Estándar'}`,
          quantity: Math.max(1, Math.min(20, Number(quantity) || 1)),
          currency_id: 'ARS',
          unit_price: product.price, // COBRO ESTRICTO A PRECIO DE LISTA
        },
      ],
      payer: buyerName?.trim()
        ? {
            name: buyerName.trim(),
          }
        : undefined,
      back_urls: {
        success: `${siteUrl}/?status=approved&product=${productId}`,
        failure: `${siteUrl}/?status=failure`,
        pending: `${siteUrl}/?status=pending`,
      },
      auto_return: 'approved',
      statement_descriptor: 'CASA SERICA',
    };

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.trim()}`,
      },
      body: JSON.stringify(preferencePayload),
    });

    const data = await mpRes.json();

    if (!mpRes.ok) {
      return res.status(mpRes.status).json({
        error: data.message || 'Error al generar checkout en Mercado Pago',
        details: data,
      });
    }

    return res.status(200).json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Error interno del servidor' });
  }
}
