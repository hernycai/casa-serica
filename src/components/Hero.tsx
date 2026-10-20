import React from 'react';

interface HeroProps {
  onAcquireClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAcquireClick }) => {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-bg-container">
        <img
          src="/assets/images/florero-u.webp"
          alt="Florero Escultural en U Acanalado CASA SÉRICA"
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-brand">CASA SÉRICA</h1>
        <p className="hero-slogan">Objetos para habitar.</p>
        <div className="hero-divider"></div>
        <p className="hero-promise">
          Nacemos desde la búsqueda de la calma, la atemporalidad y el valor de lo cotidiano. Curamos y creamos objetos pensados para acompañar tus días con materiales nobles, formas orgánicas y texturas que transmiten serenidad.
        </p>
        <div className="hero-cta-group">
          <button
            type="button"
            onClick={onAcquireClick}
            className="btn btn-primary"
          >
            Adquirir Ahora
          </button>
          <a href="#lo-primero" className="btn btn-secondary">
            Conocer la Colección
          </a>
        </div>
      </div>
      <a href="#lo-primero" className="scroll-indicator" aria-label="Desplazar hacia abajo">
        <span className="scroll-text">Descubrir</span>
        <span className="scroll-line"></span>
      </a>
    </section>
  );
};
