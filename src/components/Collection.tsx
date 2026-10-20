import React, { useState } from 'react';
import { Product } from '../types';
import { PRODUCTS, formatPrice } from '../data/products';

interface CollectionProps {
  onSelectProduct: (product: Product, initialColor?: string) => void;
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
                <div className="product-image-container">
                  <img
                    key={displayImage}
                    src={displayImage}
                    alt={`${product.name} · ${activeColor}`}
                    className="product-card-img"
                    referrerPolicy="no-referrer"
                  />
                  <span className="product-badge">{product.badge}</span>
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
    </section>
  );
};
