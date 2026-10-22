import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'mercadopago-api-middleware',
        configureServer(server) {
          server.middlewares.use('/api/create-preference', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const { productId, quantity = 1, color = '', buyerName = '', buyerLocation = '' } = parsed;

                const products: Record<string, { name: string; price: number }> = {
                  'florero-u': { name: 'Florero Escultural en U Acanalado', price: 22000 },
                  'posavasos-pack': { name: 'Posavasos Minimalistas Orgánicos (Pack x4)', price: 14000 },
                  'dispensador-lena': { name: 'Dispensador de Film y Aluminio · LENA', price: 38000 },
                };

                const product = products[productId];
                if (!product) {
                  res.statusCode = 404;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Producto no encontrado' }));
                  return;
                }

                const accessToken =
                  process.env.MERCADOPAGO_ACCESS_TOKEN ||
                  env.MERCADOPAGO_ACCESS_TOKEN ||
                  env.VITE_MERCADOPAGO_ACCESS_TOKEN;

                if (!accessToken) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error: 'Falta configurar el MERCADOPAGO_ACCESS_TOKEN en las variables de entorno.',
                      needsToken: true,
                    })
                  );
                  return;
                }

                const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken.trim()}`,
                  },
                  body: JSON.stringify({
                    items: [
                      {
                        id: productId,
                        title: `${product.name}${color ? ` (${color})` : ''} · CASA SÉRICA`,
                        description: `Pieza de diseño CASA SÉRICA · Tono: ${color || 'Estándar'} · Destino: ${buyerLocation || 'A coordinar'}`,
                        quantity: Number(quantity) || 1,
                        currency_id: 'ARS',
                        unit_price: product.price, // PRECIO DE LISTA
                      },
                    ],
                    payer: {
                      name: buyerName || 'Cliente CASA SÉRICA',
                    },
                    back_urls: {
                      success: `https://casa-serica.vercel.app/?status=approved&product=${productId}`,
                      failure: `https://casa-serica.vercel.app/?status=failure`,
                      pending: `https://casa-serica.vercel.app/?status=pending`,
                    },
                    auto_return: 'approved',
                    statement_descriptor: 'CASA SERICA',
                    payment_methods: {
                      installments: 12,
                    },
                  }),
                });

                const data = await mpResponse.json();
                res.statusCode = mpResponse.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err?.message || 'Error del servidor' }));
              }
            });
          });
        },
      },
    ],
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  };
});
