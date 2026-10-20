import React from 'react';
import { Product } from '../types';
import { PRODUCTS, formatPrice } from '../data/products';

interface CollectionProps {
  onSelectProduct: (product: Product) => void;
  onGeneralWhatsApp: () => void;
}

export const Collection: React.FC<CollectionProps> = ({
  onSelectProduct,
  onGeneralWhatsApp,
}) => {
  return (
    <section className="closing-section" id="coleccion">
      <div className="container">
        {/* Header del Cierre */}
        <div className="closing-intro">
          <div className="section-kicker">Colección Disponible</div>
          <h2 className="closing-heading">Objetos listos para formar parte de tu espacio</h2>
          <div className="closing-conditions-bar">
            <div className="condition-item">
              <span className="condition-dot"></span>
              <strong>Piezas desde $14.000 ARS</strong>
            </div>
            <div className="condition-divider"></div>
            <div className="condition-item">
              <span className="condition-dot"></span>
              <strong>Envíos a todo el país</strong>
            </div>
            <div className="condition-divider"></div>
            <div className="condition-item">
              <span className="condition-dot"></span>
              <strong>Embalaje protegido de autor</strong>
            </div>
          </div>
        </div>

        {/* Grid de Productos Reales */}
        <div className="products-editorial-grid">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="product-editorial-card">
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-card-img"
                />
                <span className="product-badge">{product.badge}</span>
              </div>
              <div className="product-info-wrap">
                <div className="product-header">
                  <h3 className="product-title">{product.name}</h3>
                  <span className="product-price">{formatPrice(product.price)}</span>
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
                  onClick={() => onSelectProduct(product)}
                >
                  Adquirir Ahora
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Ambientación Editorial */}
        <div className="editorial-quote-banner">
          <div className="editorial-banner-content">
            <img
              src="/assets/images/editorial-ambiente-consola.jpg"
              alt="Ambientación Casa Sérica"
              className="editorial-banner-img"
              referrerPolicy="no-referrer"
            />
            <div className="editorial-banner-text">
              <span className="section-kicker">La Experiencia SÉRICA</span>
              <h3 className="banner-title">«Curamos y creamos objetos para acompañar tus días.»</h3>
              <p className="banner-p">
                Recibe cada pieza con embalaje seguro, listo para obsequiar o incorporar de inmediato en tu hogar.
              </p>
              <div className="banner-action">
                <button
                  type="button"
                  className="btn btn-secondary trigger-whatsapp"
                  onClick={onGeneralWhatsApp}
                >
                  Consultar Disponibilidad
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
