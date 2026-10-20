import React from 'react';

export const FullscreenQuote: React.FC = () => {
  return (
    <section className="fullscreen-image-section section-image-2">
      <div className="fullscreen-img-wrap">
        <img
          src="/assets/images/posavasos-pack.webp"
          alt="Detalle posavasos orgánicos acanalados CASA SÉRICA"
          className="fullscreen-img"
        />
        <div className="fullscreen-overlay"></div>
      </div>
      <div className="fullscreen-quote-box">
        <blockquote className="editorial-quote">
          «Superficies táctiles donde la geometría orgánica se encuentra con la pausa cotidiana.»
        </blockquote>
      </div>
    </section>
  );
};
