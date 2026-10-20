import React from 'react';

interface Testimonial {
  id: string;
  author: string;
  location: string;
  role?: string;
  quote: string;
  product: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Valentina Rossi',
    location: 'Palermo, CABA',
    role: 'Interiorismo residencial',
    quote:
      'El florero en U superó mis expectativas. El acabado estriado mate tiene una textura mineral suave, casi como piedra travertino. Es la pieza protagónica indiscutida de mi consola de entrada.',
    product: 'Florero Escultural en U · Beige',
    rating: 5,
  },
  {
    id: '2',
    author: 'Matías & Sofía G.',
    location: 'Nueva Córdoba',
    role: 'Hogar contemporáneo',
    quote:
      'Los posavasos SÉRICA ORGANIC tienen una presencia escultural increíble. Su forma irregular y relieve protegen la mesa de mármol aportando esa pausa visual que tanto buscábamos.',
    product: 'Posavasos Minimalistas · Pack x4 Blanco',
    rating: 5,
  },
  {
    id: '3',
    author: 'Camila Duhau',
    location: 'San Isidro, Buenos Aires',
    role: 'Cocina & Diseño',
    quote:
      'La calidad del bambú del dispensador Lena y el corte limpio deslizante resolvieron el caos de los rollos de cocina. Combina practicidad total con una estética sobria y natural.',
    product: 'Dispensador LENA · Bambú Natural',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section" id="testimonios">
      <div className="container">
        {/* Section Header */}
        <div className="testimonials-header reveal-on-scroll">
          <span className="section-kicker">Experiencias SÉRICA</span>
          <h2 className="section-heading">Objetos que ya habitan hogares reales</h2>
          <p className="testimonials-subtitle">
            Voces de quienes eligieron sumar calma, materia noble y geometría consciente a sus espacios cotidianos.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, index) => (
            <article
              key={item.id}
              className={`testimonial-card reveal-on-scroll reveal-delay-${index + 1}`}
            >
              {/* Star Rating & Verified Badge */}
              <div className="testimonial-top">
                <div className="testimonial-stars" aria-label="5 de 5 estrellas">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <span key={i} className="star-icon">
                      ★
                    </span>
                  ))}
                </div>
                <span className="testimonial-verified">
                  <span className="verified-check">✓</span> Compra verificada
                </span>
              </div>

              {/* Quote */}
              <blockquote className="testimonial-quote">
                «{item.quote}»
              </blockquote>

              {/* Footer with Author and Acquired Product */}
              <div className="testimonial-footer">
                <div className="author-meta">
                  <strong className="author-name">{item.author}</strong>
                  <span className="author-location">
                    {item.location} {item.role ? `· ${item.role}` : ''}
                  </span>
                </div>
                <div className="testimonial-product-pill">
                  <span className="pill-dot"></span>
                  <span className="pill-label">{item.product}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
