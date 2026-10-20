import React from 'react';

export const FullscreenCaption: React.FC = () => {
  return (
    <section className="fullscreen-image-section section-image-3">
      <div className="fullscreen-img-wrap">
        <img
          src="/assets/images/dispensador-lena.webp"
          alt="Dispensador Lena en ambiente cocina contemporánea"
          className="fullscreen-img"
        />
        <div className="fullscreen-overlay"></div>
      </div>
      <div className="fullscreen-caption-box">
        <span className="caption-tag">Diseño Funcional</span>
        <p className="caption-title">Equilibrio entre materia, proporción y utilidad diaria.</p>
      </div>
    </section>
  );
};
