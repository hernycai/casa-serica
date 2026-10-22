import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatPrice, createWhatsAppLink } from '../data/products';

export interface ShippingData {
  fullName: string;      // Nombre y apellido (obligatorio)
  province: string;      // Provincia (obligatorio)
  city: string;          // Ciudad (obligatorio)
  street: string;        // Calle (obligatorio)
  streetNumber: string;  // Número (obligatorio)
  floor: string;         // Piso (opcional)
  apartment: string;     // Depto (opcional)
  postalCode: string;    // Código Postal (obligatorio)
}

const INITIAL_SHIPPING: ShippingData = {
  fullName: '',
  province: '',
  city: '',
  street: '',
  streetNumber: '',
  floor: '',
  apartment: '',
  postalCode: '',
};

const ARGENTINE_PROVINCES = [
  'Ciudad Autónoma de Buenos Aires (CABA)',
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
];

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
  const [paymentMethod, setPaymentMethod] = useState<'transfer' | 'mercadopago'>('transfer');
  const [shipping, setShipping] = useState<ShippingData>(INITIAL_SHIPPING);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [isLoadingMp, setIsLoadingMp] = useState(false);
  const [mpError, setMpError] = useState<string | null>(null);

  // Reset fields when product changes or modal opens
  useEffect(() => {
    if (isOpen && product) {
      setQuantity(1);
      setSelectedColor(initialColor || product.colors[0]?.name || '');
      setPaymentMethod('transfer');
      setShipping(INITIAL_SHIPPING);
      setFieldErrors({});
      setValidationMsg(null);
      setIsLoadingMp(false);
      setMpError(null);
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

  // Precios: Transferencia cuenta con 10% OFF; Mercado Pago se cobra estrictamente a PRECIO DE LISTA
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

  const handleShippingChange = (field: keyof ShippingData, value: string) => {
    setShipping((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }

    if (validationMsg) {
      setValidationMsg(null);
    }
  };

  // Validación estricta: ningún campo puede dejarse en blanco, salvo piso y depto
  const validateShippingForm = (): boolean => {
    const errors: Partial<Record<keyof ShippingData, string>> = {};

    if (!shipping.fullName.trim()) {
      errors.fullName = 'Ingresá tu nombre y apellido';
    }
    if (!shipping.province.trim()) {
      errors.province = 'Seleccioná la provincia';
    }
    if (!shipping.city.trim()) {
      errors.city = 'Ingresá tu ciudad o localidad';
    }
    if (!shipping.street.trim()) {
      errors.street = 'Ingresá la calle o avenida';
    }
    if (!shipping.streetNumber.trim()) {
      errors.streetNumber = 'Ingresá el número / altura';
    }
    if (!shipping.postalCode.trim()) {
      errors.postalCode = 'Ingresá el código postal';
    }

    // floor y apartment son explícitamente OPCIONALES ("salvo piso y depto")

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setValidationMsg('Por favor completá todos los campos obligatorios (*) de envío para continuar.');
      return false;
    }

    setValidationMsg(null);
    return true;
  };

  // Flujo 1: Transferencia Bancaria (10% OFF) -> Coordinación y pago por WhatsApp
  const handleConfirmWhatsApp = () => {
    if (!validateShippingForm()) {
      return;
    }

    const aptInfo = [
      shipping.floor.trim() ? `Piso ${shipping.floor.trim()}` : '',
      shipping.apartment.trim() ? `Depto ${shipping.apartment.trim()}` : '',
    ]
      .filter(Boolean)
      .join(' - ');

    const fullStreetAddress = `${shipping.street.trim()} ${shipping.streetNumber.trim()}${
      aptInfo ? ` (${aptInfo})` : ''
    }`;

    const message =
      `Hola CASA SÉRICA! Quisiera adquirir la siguiente pieza abonando con *Transferencia Bancaria* (10% OFF exclusivo):\n\n` +
      `• Pieza: *${product.name}*\n` +
      `• Color: *${selectedColor || 'Estándar'}*\n` +
      `• Cantidad: ${quantity}\n` +
      `• Precio unitario: ${formatPrice(product.transferPrice)} (10% OFF aplicado)\n` +
      `• Subtotal a transferir: *${formatPrice(subtotal)}*\n\n` +
      `📦 *Datos completos de envío:*\n` +
      `• Destinatario: ${shipping.fullName.trim()}\n` +
      `• Dirección: ${fullStreetAddress}\n` +
      `• Localidad: ${shipping.city.trim()}\n` +
      `• Provincia: ${shipping.province.trim()}\n` +
      `• Código Postal: ${shipping.postalCode.trim()}\n\n` +
      `¿Me facilitan el CBU / Alias para realizar la transferencia bancaria? Muchas gracias.`;

    const waUrl = createWhatsAppLink(message);
    window.open(waUrl, '_blank');
    onClose();
  };

  // Flujo 2: Mercado Pago Checkout Pro -> Cobro directo a PRECIO DE LISTA
  const handleMercadoPagoPay = async () => {
    if (!validateShippingForm()) {
      return;
    }

    setIsLoadingMp(true);
    setMpError(null);

    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          color: selectedColor,
          shipping: {
            fullName: shipping.fullName.trim(),
            province: shipping.province.trim(),
            city: shipping.city.trim(),
            street: shipping.street.trim(),
            streetNumber: shipping.streetNumber.trim(),
            floor: shipping.floor.trim(),
            apartment: shipping.apartment.trim(),
            postalCode: shipping.postalCode.trim(),
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.needsToken) {
          throw new Error('Falta ingresar el Access Token de Mercado Pago en la configuración.');
        }
        throw new Error(data.error || 'Error al conectar con Mercado Pago Checkout Pro');
      }

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('No se recibió la URL de pago de Mercado Pago');
      }
    } catch (err: any) {
      setMpError(err?.message || 'No se pudo iniciar el proceso de Mercado Pago');
      setIsLoadingMp(false);
    }
  };

  const selectedColorObj = product.colors.find((c) => c.name === selectedColor);
  const activeImage = selectedColorObj?.image || product.image;

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
          onClick={onClose}
          aria-label="Cerrar modal"
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
          {/* Vista previa de la fotografía real del producto */}
          <div className="modal-product-preview">
            <img
              key={activeImage}
              src={activeImage}
              alt={`${product.name} · ${selectedColor}`}
              id="modalProductImg"
              className="modal-preview-img"
              referrerPolicy="no-referrer"
            />
            {product.badge && <span className="modal-badge-tag">{product.badge}</span>}
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
                          style={{
                            backgroundColor: color.hex,
                            border: color.name === 'Blanco' ? '1px solid #d5cebf' : undefined,
                          }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Cantidad */}
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

            {/* Selector de medio de pago */}
            <div className="modal-variant-section">
              <span className="colors-label">Elegí tu medio de pago:</span>
              <div className="payment-method-box">
                {/* Opción 1: Transferencia Bancaria (10% OFF) */}
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
                    <div>
                      <strong style={{ display: 'block' }}>Transferencia Bancaria</strong>
                      <small style={{ color: 'var(--color-green-primary)', fontWeight: 600 }}>
                        10% OFF Exclusivo · Finaliza por WhatsApp
                      </small>
                    </div>
                  </label>
                  <span className="payment-price-tag is-discount">
                    {formatPrice(product.transferPrice)} c/u
                  </span>
                </div>

                {/* Opción 2: Mercado Pago Checkout Pro (Precio de Lista) */}
                <div
                  className={`payment-method-option ${paymentMethod === 'mercadopago' ? 'is-selected' : ''}`}
                  onClick={() => setPaymentMethod('mercadopago')}
                >
                  <label className="payment-method-radio">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mercadopago"
                      checked={paymentMethod === 'mercadopago'}
                      onChange={() => setPaymentMethod('mercadopago')}
                    />
                    <div>
                      <strong style={{ display: 'block' }}>Mercado Pago (Checkout Pro)</strong>
                      <small style={{ color: 'var(--color-text-muted)' }}>
                        Precio de Lista · Tarjetas, Cuotas y Dinero en cuenta
                      </small>
                    </div>
                  </label>
                  <span className="payment-price-tag">
                    {formatPrice(product.price)} c/u
                  </span>
                </div>
              </div>
            </div>

            {/* SECCIÓN DATOS COMPLETOS DE ENVÍO */}
            <div className="modal-shipping-section">
              <div className="shipping-section-header">
                <span className="shipping-section-title">
                  Datos Completos de Envío
                </span>
                <span className="shipping-required-notice">
                  * Campos obligatorios (Piso y Depto son opcionales)
                </span>
              </div>

              {/* Fila 1: Nombre y Apellido */}
              <div className="form-group">
                <label htmlFor="shippingFullName">
                  Nombre y Apellido <span className="req-star">*</span>
                </label>
                <input
                  type="text"
                  id="shippingFullName"
                  placeholder="Ej: Sofía Gómez"
                  value={shipping.fullName}
                  onChange={(e) => handleShippingChange('fullName', e.target.value)}
                  className={fieldErrors.fullName ? 'has-error' : ''}
                  autoComplete="name"
                />
                {fieldErrors.fullName && (
                  <span className="form-field-error">{fieldErrors.fullName}</span>
                )}
              </div>

              {/* Fila 2: Provincia y Ciudad */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="shippingProvince">
                    Provincia <span className="req-star">*</span>
                  </label>
                  <select
                    id="shippingProvince"
                    value={shipping.province}
                    onChange={(e) => handleShippingChange('province', e.target.value)}
                    className={fieldErrors.province ? 'has-error' : ''}
                  >
                    <option value="">Seleccionar provincia...</option>
                    {ARGENTINE_PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                  {fieldErrors.province && (
                    <span className="form-field-error">{fieldErrors.province}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="shippingCity">
                    Ciudad / Localidad <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="shippingCity"
                    placeholder="Ej: San Isidro, Rosario, CABA"
                    value={shipping.city}
                    onChange={(e) => handleShippingChange('city', e.target.value)}
                    className={fieldErrors.city ? 'has-error' : ''}
                    autoComplete="address-level2"
                  />
                  {fieldErrors.city && (
                    <span className="form-field-error">{fieldErrors.city}</span>
                  )}
                </div>
              </div>

              {/* Fila 3: Calle y Número */}
              <div className="form-row-2">
                <div className="form-group" style={{ flex: 2 }}>
                  <label htmlFor="shippingStreet">
                    Calle / Avenida <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="shippingStreet"
                    placeholder="Ej: Av. Santa Fe"
                    value={shipping.street}
                    onChange={(e) => handleShippingChange('street', e.target.value)}
                    className={fieldErrors.street ? 'has-error' : ''}
                    autoComplete="address-line1"
                  />
                  {fieldErrors.street && (
                    <span className="form-field-error">{fieldErrors.street}</span>
                  )}
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label htmlFor="shippingNumber">
                    Número / Altura <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="shippingNumber"
                    placeholder="Ej: 1420"
                    value={shipping.streetNumber}
                    onChange={(e) => handleShippingChange('streetNumber', e.target.value)}
                    className={fieldErrors.streetNumber ? 'has-error' : ''}
                  />
                  {fieldErrors.streetNumber && (
                    <span className="form-field-error">{fieldErrors.streetNumber}</span>
                  )}
                </div>
              </div>

              {/* Fila 4: Piso (opcional), Depto (opcional), Código Postal (obligatorio) */}
              <div className="form-row-3">
                <div className="form-group">
                  <label htmlFor="shippingFloor">
                    Piso <span className="optional-tag">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="shippingFloor"
                    placeholder="Ej: 4"
                    value={shipping.floor}
                    onChange={(e) => handleShippingChange('floor', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shippingApartment">
                    Depto <span className="optional-tag">(opcional)</span>
                  </label>
                  <input
                    type="text"
                    id="shippingApartment"
                    placeholder="Ej: B"
                    value={shipping.apartment}
                    onChange={(e) => handleShippingChange('apartment', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="shippingPostalCode">
                    Código Postal <span className="req-star">*</span>
                  </label>
                  <input
                    type="text"
                    id="shippingPostalCode"
                    placeholder="Ej: 1425"
                    value={shipping.postalCode}
                    onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                    className={fieldErrors.postalCode ? 'has-error' : ''}
                    autoComplete="postal-code"
                  />
                  {fieldErrors.postalCode && (
                    <span className="form-field-error">{fieldErrors.postalCode}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Resumen del pedido */}
            <div className="order-summary-box">
              <div className="summary-line">
                <span>Medio de pago:</span>
                <strong>
                  {paymentMethod === 'transfer'
                    ? 'Transferencia Bancaria (10% OFF aplicado)'
                    : 'Mercado Pago (Precio de lista oficial)'}
                </strong>
              </div>
              <div className="summary-line">
                <span>Color:</span>
                <strong>{selectedColor}</strong>
              </div>
              <div className="summary-line">
                <span>Subtotal ({quantity} {quantity === 1 ? 'unidad' : 'unidades'}):</span>
                <strong id="modalSubtotal" style={{ color: 'var(--color-green-primary)', fontSize: '1.08rem' }}>
                  {formatPrice(subtotal)}
                </strong>
              </div>
              {shipping.street && shipping.city ? (
                <div className="summary-line text-muted" style={{ fontSize: '0.8rem' }}>
                  <span>Envío a:</span>
                  <span>
                    {shipping.street} {shipping.streetNumber}, {shipping.city} ({shipping.province})
                  </span>
                </div>
              ) : (
                <div className="summary-line text-muted">
                  <span>Envío:</span>
                  <span>A coordinar con embalaje protegido</span>
                </div>
              )}
            </div>

            {validationMsg && (
              <div
                style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #ef4444',
                  color: '#b91c1c',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem',
                  marginBottom: '1rem',
                  lineHeight: 1.4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>⚠️</span>
                <span>{validationMsg}</span>
              </div>
            )}

            {mpError && (
              <div
                style={{
                  backgroundColor: '#fee2e2',
                  border: '1px solid #ef4444',
                  color: '#991b1b',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.84rem',
                  marginBottom: '1rem',
                  lineHeight: 1.4,
                }}
              >
                ⚠️ {mpError}
              </div>
            )}

            {/* Botones de acción */}
            {paymentMethod === 'mercadopago' ? (
              <>
                <button
                  type="button"
                  className="btn btn-mercadopago w-full"
                  id="confirmOrderMercadoPago"
                  onClick={handleMercadoPagoPay}
                  disabled={isLoadingMp}
                >
                  {isLoadingMp ? (
                    'Conectando con Mercado Pago...'
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '6px' }}>
                        <path d="M19.5 3H4.5A2.5 2.5 0 0 0 2 5.5v13A2.5 2.5 0 0 0 4.5 21h15a2.5 2.5 0 0 0 2.5-2.5v-13A2.5 2.5 0 0 0 19.5 3zm1 15.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-8.5h17zm0-11h-17v-2a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1z" />
                      </svg>
                      Pagar con Mercado Pago · {formatPrice(subtotal)}
                    </>
                  )}
                </button>
                <p className="modal-secure-note">
                  🔒 Checkout Pro oficial: Tarjeta de crédito (cuotas), débito o saldo en cuenta de Mercado Pago.
                </p>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  id="confirmOrderWhatsApp"
                  onClick={handleConfirmWhatsApp}
                >
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" style={{ marginRight: '6px' }}>
                    <path d="M16.002 0C7.164 0 0 7.164 0 16.003c0 2.825.736 5.58 2.138 8.012L.073 31.927l8.118-2.13c2.35 1.282 5.01 1.956 7.81 1.956 8.837 0 16.002-7.164 16.002-16.003S24.839 0 16.002 0zm0 29.243c-2.45 0-4.85-.644-6.953-1.86l-.497-.29-5.166 1.355 1.378-5.038-.323-.514C3.125 20.69 2.51 18.39 2.51 16.003c0-7.44 6.053-13.493 13.492-13.493 7.44 0 13.493 6.053 13.493 13.493 0 7.44-6.053 13.493-13.493 13.493z" />
                  </svg>
                  Coordinar Transferencia por WhatsApp · {formatPrice(subtotal)}
                </button>
                <p className="modal-secure-note">
                  🔒 Serás dirigido al WhatsApp oficial con tus datos de envío para coordinar CBU/Alias y comprobante con 10% OFF.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
