import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatPrice, createWhatsAppLink } from '../data/products';

interface OrderModalProps {
  product: Product | null;
  initialColor?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  initialColor,
  isOpen,
  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'regular'>('transfer');
  const [buyerName, setBuyerName] = useState('');
  const [buyerLocation, setBuyerLocation] = useState('');

  // Reset fields when product changes or modal opens
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedColor(initialColor || product.colors[0]?.name || '');
      setPaymentMethod('transfer');
      setBuyerName('');
      setBuyerLocation('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, product, initialColor]);

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

  const unitPrice = paymentMethod === 'transfer' ? product.transferPrice : product.price;
  const subtotal = unitPrice * quantity;

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
    const paymentLabel =
      paymentMethod === 'transfer'
        ? `Transferencia Bancaria (${product.transferDiscountPercent}% de descuento)`
        : 'Precio de lista / Otros medios';

    const message =
      `Hola CASA SÉRICA! Quisiera adquirir la siguiente pieza:\n\n` +
      `• Producto: *${product.name}*\n` +
      `• Color seleccionado: *${selectedColor || 'Estándar'}*\n` +
      `• Cantidad: ${quantity}\n` +
      `• Medio de pago: *${paymentLabel}*\n` +
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
          <div className="product-pricing-wrap">
            <div className="product-price-transfer">
              <span className="price-transfer-amount">
                {formatPrice(product.transferPrice)}
              </span>
              <span className="price-transfer-badge">
                10% OFF Transferencia
              </span>
            </div>
            <div className="product-price-regular">
              Precio de lista: {formatPrice(product.price)}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-product-preview">
            <img
              key={product.colors.find((c) => c.name === selectedColor)?.image || product.image}
              src={product.colors.find((c) => c.name === selectedColor)?.image || product.image}
              alt={`${product.name} · ${selectedColor}`}
              id="modalProductImg"
              className="modal-preview-img"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="modal-details-form">
            {/* Color selection */}
            {product.colors.length > 0 && (
              <div className="modal-variant-section">
                <span className="colors-label">
                  Color:{' '}
                  <span className="colors-active-name">{selectedColor}</span>
                </span>
                <div className="colors-options-group">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        className={`color-option-btn ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => setSelectedColor(color.name)}
                      >
                        <span
                          className="color-swatch-circle"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Payment method selector */}
            <div className="modal-variant-section">
              <span className="colors-label">Medio de Pago:</span>
              <div className="payment-method-box">
                <div
                  className={`payment-method-option ${paymentMethod === 'transfer' ? 'is-selected' : ''}`}
                  onClick={() => setPaymentMethod('transfer')}
                >
                  <label className="payment-method-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={() => setPaymentMethod('transfer')}
                    />
                    <span>
                      <strong>Transferencia Bancaria</strong> (10% OFF)
                    </span>
                  </label>
                  <span className="payment-price-tag is-discount">
                    {formatPrice(product.transferPrice)} c/u
                  </span>
                </div>

                <div
                  className={`payment-method-option ${paymentMethod === 'regular' ? 'is-selected' : ''}`}
                  onClick={() => setPaymentMethod('regular')}
                >
                  <label className="payment-method-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="regular"
                      checked={paymentMethod === 'regular'}
                      onChange={() => setPaymentMethod('regular')}
                    />
                    <span>Precio de lista / Tarjetas</span>
                  </label>
                  <span className="payment-price-tag">
                    {formatPrice(product.price)} c/u
                  </span>
                </div>
              </div>
            </div>

            {/* Quantity control */}
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

            {/* Buyer information */}
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

            {/* Order summary */}
            <div className="order-summary-box">
              <div className="summary-line">
                <span>Método:</span>
                <strong>
                  {paymentMethod === 'transfer'
                    ? 'Transferencia (10% OFF aplicado)'
                    : 'Precio de lista'}
                </strong>
              </div>
              <div className="summary-line">
                <span>Color:</span>
                <strong>{selectedColor}</strong>
              </div>
              <div className="summary-line">
                <span>Subtotal ({quantity} un.):</span>
                <strong id="modalSubtotal" style={{ color: 'var(--color-terracotta)', fontSize: '1.05rem' }}>
                  {formatPrice(subtotal)}
                </strong>
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
              Finalizar pedido vía WhatsApp · {formatPrice(subtotal)}
            </button>
            <p className="modal-secure-note">
              🔒 Serás dirigido al WhatsApp oficial con la vendedora para coordinar datos bancarios, stock y envío protegido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
