import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatPrice, createWhatsAppLink } from '../data/products';

interface OrderModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerLocation, setBuyerLocation] = useState('');

  // Reset fields when product changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setBuyerName('');
      setBuyerLocation('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const subtotal = product.price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 20) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleConfirmOrder = () => {
    const name = buyerName.trim() || 'Cliente';
    const location = buyerLocation.trim() || 'A coordinar';

    const message =
      `Hola CASA SÉRICA! Quisiera adquirir la siguiente pieza:\n\n` +
      `• Producto: *${product.name}*\n` +
      `• Cantidad: ${quantity}\n` +
      `• Total estimado: ${formatPrice(subtotal)}\n\n` +
      `Datos de contacto:\n` +
      `• Nombre: ${name}\n` +
      `• Localidad de envío: ${location}\n\n` +
      `¿Tienen disponibilidad para coordinar el pago y envío? Muchas gracias.`;

    const waUrl = createWhatsAppLink(message);
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div
      className={`modal-backdrop ${isOpen ? 'is-active' : ''}`}
      id="orderModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-close-btn"
          id="modalCloseBtn"
          aria-label="Cerrar modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="modal-header">
          <span className="section-kicker">Confirmar Pedido</span>
          <h3 className="modal-title" id="modalProductTitle">
            {product.name}
          </h3>
          <p className="modal-price" id="modalProductPrice">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="modal-body">
          <div className="modal-product-preview">
            <img
              src={product.image}
              alt={product.name}
              id="modalProductImg"
              className="modal-preview-img"
            />
          </div>

          <div className="modal-details-form">
            <div className="form-group">
              <label htmlFor="orderQuantity">Cantidad:</label>
              <div className="quantity-control">
                <button
                  type="button"
                  className="qty-btn"
                  id="qtyMinus"
                  onClick={handleDecrease}
                  aria-label="Reducir cantidad"
                >
                  -
                </button>
                <input
                  type="number"
                  id="orderQuantity"
                  value={quantity}
                  min={1}
                  max={20}
                  readOnly
                />
                <button
                  type="button"
                  className="qty-btn"
                  id="qtyPlus"
                  onClick={handleIncrease}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="buyerName">Tu nombre:</label>
              <input
                type="text"
                id="buyerName"
                placeholder="Nombre completo"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="buyerLocation">Ciudad / Localidad de envío:</label>
              <input
                type="text"
                id="buyerLocation"
                placeholder="Ej: CABA, Rosario, Córdoba..."
                value={buyerLocation}
                onChange={(e) => setBuyerLocation(e.target.value)}
                required
              />
            </div>

            <div className="order-summary-box">
              <div className="summary-line">
                <span>Subtotal:</span>
                <strong id="modalSubtotal">{formatPrice(subtotal)}</strong>
              </div>
              <div className="summary-line text-muted">
                <span>Envío:</span>
                <span>A coordinar según localidad</span>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary w-full"
              id="confirmOrderWhatsApp"
              onClick={handleConfirmOrder}
            >
              Finalizar pedido vía WhatsApp
            </button>
            <p className="modal-secure-note">
              🔒 Serás dirigido al WhatsApp oficial con la vendedora para confirmar stock y método de pago seguro.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
