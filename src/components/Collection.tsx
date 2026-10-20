import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS, formatPrice } from '../data/products';

interface CollectionProps {
  onSelectProduct: (product: Product, initialColor?: string) => void;
}

interface ZoomModalData {
  image: string;
  name: string;
  color?: string;
}

export const Collection: React.FC<CollectionProps> = ({
  onSelectProduct,
}) => {
  // Track selected color per product ID
  const [selectedColors, setSelectedColors] = useState<{ [productId: string]: string }>({
    'florero-u': 'Beige',
    'posavasos-pack': 'Beige',
    'dispensador-lena': 'Bambú Natural',
  });

  // Image Zoom Lightbox State
  const [zoomModal, setZoomModal] = useState<ZoomModalData | null>(null);
  const [isMagnified, setIsMagnified] = useState(false);

  useEffect(() => {
    if (zoomModal) {
      setIsMagnified(false);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setZoomModal(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [zoomModal]);

  const handleColorSelect = (productId: string, colorName: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [productId]: colorName,
    }));
  };

  return (
    <section className="closing-section" id="coleccion">
      <div className="container">
        {/* Header del Cierre */}
        <div className="closing-intro reveal-on-scroll">
          <div className="section-kicker">Colección Disponible</div>
          <h2 className="closing-heading">Objetos listos para formar parte de tu espacio</h2>
          <div className="closing-conditions-bar">
            <div className="condition-item">
              <span className="condition-dot"></span>
              <strong>Piezas desde $12.600 con Transferencia</strong>
            </div>
            <div className="condition-divider"></div>
            <div className="condition-item">
              <span className="condition-dot"></span>
              <strong>10% OFF pagando con Transferencia Bancaria</strong>
            </div>
            <div className="condition-divider"></div>
            <div className="condition-item">
              <span className="condition-dot"></span>
              <strong>Envíos a todo el país</strong>
            </div>
          </div>
        </div>

        {/* Grid de Productos Reales */}
        <div className="products-editorial-grid">
          {PRODUCTS.map((product, idx) => {
            const activeColor = selectedColors[product.id] || product.colors[0]?.name || '';
            const activeColorObj = product.colors.find((c) => c.name === activeColor);
            const displayImage = activeColorObj?.image || product.image;

            return (
              <article
                key={product.id}
                className={`product-editorial-card reveal-on-scroll reveal-delay-${(idx % 3) + 1}`}
              >
                <div
                  className="product-image-container"
                  onClick={() =>
                    setZoomModal({
                      image: displayImage,
                      name: product.name,
                      color: activeColor,
                    })
                  }
                  title="Hacé clic para ampliar y ver textura en detalle"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setZoomModal({
                        image: displayImage,
                        name: product.name,
                        color: activeColor,
                      });
                    }
                  }}
                >
                  <img
                    key={displayImage}
                    src={displayImage}
                    alt={`${product.name} · ${activeColor}`}
                    className="product-card-img"
                    referrerPolicy="no-referrer"
                  />
                  <span className="product-badge">{product.badge}</span>
                  <div className="product-zoom-hint" aria-hidden="true">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <span>Zoom</span>
                  </div>
                </div>
                <div className="product-info-wrap">
                  <div className="product-header">
                    <h3 className="product-title">{product.name}</h3>

                    {/* Precios con Transferencia Bancaria */}
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
                        Precio de lista:{' '}
                        <span className="regular-price-amount">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selector de Variaciones de Color */}
                  <div className="product-colors-selector">
                    <span className="colors-label">
                      Color seleccionado:{' '}
                      <span className="colors-active-name">{activeColor}</span>
                    </span>
                    <div className="colors-options-group">
                      {product.colors.map((color) => {
                        const isSelected = activeColor === color.name;
                        return (
                          <button
                            key={color.name}
                            type="button"
                            className={`color-option-btn ${isSelected ? 'is-selected' : ''}`}
                            onClick={() => handleColorSelect(product.id, color.name)}
                            title={`Seleccionar color ${color.name}`}
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

                  <p className="product-desc">{product.description}</p>
                  <ul className="product-specs">
                    {product.specs.map((spec, idx) => (
                      <li key={idx}>
                        <span>{spec.label}:</span> {spec.value}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className="btn btn-primary w-full open-order-btn"
                    onClick={() => onSelectProduct(product, activeColor)}
                  >
                    Adquirir Ahora · {formatPrice(product.transferPrice)}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {zoomModal && (
        <div
          className="image-zoom-overlay"
          onClick={() => setZoomModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${zoomModal.name}`}
        >
          <button
            type="button"
            className="image-zoom-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setZoomModal(null);
            }}
            aria-label="Cerrar vista ampliada"
          >
            ✕
          </button>

          <div
            className="image-zoom-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`image-zoom-img-wrapper ${isMagnified ? 'is-magnified' : ''}`}
              onClick={() => setIsMagnified((prev) => !prev)}
              title={isMagnified ? "Hacé clic para alejar (1x)" : "Hacé clic para acercar (2x)"}
            >
              <img
                src={zoomModal.image}
                alt={`${zoomModal.name} · ${zoomModal.color || ''}`}
                className={`image-zoom-img ${isMagnified ? 'is-magnified' : ''}`}
              />
            </div>

            <div className="image-zoom-footer">
              <div className="image-zoom-title-box">
                <h4 className="image-zoom-title">{zoomModal.name}</h4>
                {zoomModal.color && (
                  <p className="image-zoom-subtitle">Tono: {zoomModal.color}</p>
                )}
              </div>
              <button
                type="button"
                className="image-zoom-toggle-btn"
                onClick={() => setIsMagnified((prev) => !prev)}
              >
                {isMagnified ? '🔍 Reducir (1x)' : '🔍 Acercar detalle (2x)'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
