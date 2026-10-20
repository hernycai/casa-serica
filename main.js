/**
 * CASA SÉRICA · Editorial Landing Page Interactions
 * Manejo de modal de compra, pedidos a medida y conexión directa por WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configuración WhatsApp oficial de la vendedora
  // Se puede personalizar con el número telefónico que disponga la marca
  const WHATSAPP_PHONE = '5491123456789'; // Formato internacional estándar Argentina

  // Helper para generar enlace wa.me
  const createWhatsAppLink = (message) => {
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  };

  /* ---------------------------------------------------------
     1. Header scroll effect
     --------------------------------------------------------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  /* ---------------------------------------------------------
     2. Mobile menu toggle
     --------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('is-active');
    });

    // Cerrar al clickear cualquier link del drawer
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-active');
      });
    });
  }

  /* ---------------------------------------------------------
     3. Modal de Compra / "Adquirir Ahora"
     --------------------------------------------------------- */
  const orderModal = document.getElementById('orderModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const modalProductImg = document.getElementById('modalProductImg');
  const modalSubtotal = document.getElementById('modalSubtotal');
  const orderQuantityInput = document.getElementById('orderQuantity');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const buyerNameInput = document.getElementById('buyerName');
  const buyerLocationInput = document.getElementById('buyerLocation');
  const confirmOrderBtn = document.getElementById('confirmOrderWhatsApp');

  let currentProduct = {
    name: 'Florero Escultural en U Acanalado',
    price: 22000,
    image: 'assets/images/florero-u.webp',
    qty: 1
  };

  const formatPrice = (amount) => {
    return '$' + amount.toLocaleString('es-AR') + ' ARS';
  };

  const updateSubtotal = () => {
    const total = currentProduct.price * currentProduct.qty;
    modalSubtotal.textContent = formatPrice(total);
  };

  const openModal = (productName, price, imageSrc) => {
    currentProduct.name = productName;
    currentProduct.price = parseInt(price, 10);
    currentProduct.image = imageSrc;
    currentProduct.qty = 1;

    modalProductTitle.textContent = productName;
    modalProductPrice.textContent = formatPrice(currentProduct.price);
    modalProductImg.src = imageSrc;
    modalProductImg.alt = productName;
    orderQuantityInput.value = 1;
    updateSubtotal();

    orderModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    orderModal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  // Botones "Adquirir Ahora" en el catálogo
  document.querySelectorAll('.open-order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const product = btn.getAttribute('data-product');
      const price = btn.getAttribute('data-price');
      const image = btn.getAttribute('data-image');
      openModal(product, price, image);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Cerrar al clickear backdrop
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        closeModal();
      }
    });
  }

  // Controles de cantidad
  if (qtyMinus && qtyPlus && orderQuantityInput) {
    qtyMinus.addEventListener('click', () => {
      if (currentProduct.qty > 1) {
        currentProduct.qty--;
        orderQuantityInput.value = currentProduct.qty;
        updateSubtotal();
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (currentProduct.qty < 20) {
        currentProduct.qty++;
        orderQuantityInput.value = currentProduct.qty;
        updateSubtotal();
      }
    });
  }

  // Confirmar pedido por WhatsApp
  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', () => {
      const name = buyerNameInput.value.trim() || 'Cliente';
      const location = buyerLocationInput.value.trim() || 'A coordinar';
      const subtotal = currentProduct.price * currentProduct.qty;

      const message = `Hola CASA SÉRICA! Quisiera adquirir la siguiente pieza:\n\n` +
                      `• Producto: *${currentProduct.name}*\n` +
                      `• Cantidad: ${currentProduct.qty}\n` +
                      `• Total estimado: ${formatPrice(subtotal)}\n\n` +
                      `Datos de contacto:\n` +
                      `• Nombre: ${name}\n` +
                      `• Localidad de envío: ${location}\n\n` +
                      `¿Tienen disponibilidad para coordinar el pago y envío? Muchas gracias.`;

      const waUrl = createWhatsAppLink(message);
      window.open(waUrl, '_blank');
      closeModal();
    });
  }

  /* ---------------------------------------------------------
     4. Formulario de Pedidos a Medida / Personalizados
     --------------------------------------------------------- */
  const customForm = document.getElementById('customOrderForm');
  if (customForm) {
    customForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const interest = document.getElementById('interestType').value;
      const messageDetail = document.getElementById('clientMessage').value.trim();

      const message = `Hola CASA SÉRICA! Me gustaría consultar por un pedido personalizado / encargo a medida:\n\n` +
                      `• Nombre: ${name}\n` +
                      `• WhatsApp de contacto: ${phone}\n` +
                      `• Interés: *${interest}*\n` +
                      (messageDetail ? `• Detalle: ${messageDetail}\n\n` : `\n`) +
                      `¿Podrían asesorarme con este proyecto? ¡Gracias!`;

      const waUrl = createWhatsAppLink(message);
      window.open(waUrl, '_blank');
      customForm.reset();
    });
  }

  /* ---------------------------------------------------------
     5. Floating WhatsApp Widget & Generic Triggers
     --------------------------------------------------------- */
  const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
  const whatsappTooltip = document.getElementById('whatsappTooltip');
  const tooltipClose = document.getElementById('tooltipClose');

  if (tooltipClose && whatsappTooltip) {
    tooltipClose.addEventListener('click', (e) => {
      e.stopPropagation();
      whatsappTooltip.style.display = 'none';
    });
  }

  const openGeneralWhatsApp = () => {
    const generalMsg = `Hola CASA SÉRICA! Estuve viendo su colección de objetos para habitar y quisiera hacer una consulta.`;
    window.open(createWhatsAppLink(generalMsg), '_blank');
  };

  if (whatsappFloatBtn) {
    whatsappFloatBtn.addEventListener('click', openGeneralWhatsApp);
  }

  // Enlaces que activan WhatsApp en el sitio
  document.querySelectorAll('.trigger-whatsapp').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openGeneralWhatsApp();
    });
  });

  // Tecla Escape cierra modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal.classList.contains('is-active')) {
      closeModal();
    }
  });
});
