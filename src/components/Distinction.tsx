import React from 'react';

export const Distinction: React.FC = () => {
  return (
    <section className="distinction-section" id="distincion">
      <div className="container distinction-container">
        <div className="reveal-on-scroll">
          <div className="distinction-kicker">Diferencial & Técnica</div>
          <h2 className="distinction-heading">Materia contemporánea, espíritu artesanal</h2>
        </div>

        <div className="distinction-content">
          <p className="distinction-sentence reveal-on-scroll reveal-delay-1">
            Fusionamos la vanguardia del modelado 3D con una sensibilidad editorial sobria, logrando acabados táctiles mate que prescinden de todo brillo sintético para evocar la nobleza mineral de la piedra travertino y la arcilla.
          </p>
          <div className="distinction-separator reveal-on-scroll reveal-delay-2"></div>
          <p className="distinction-sentence reveal-on-scroll reveal-delay-3">
            Cada objeto se produce bajo demanda en nuestro taller con residuo mínimo de materia prima, garantizando una pieza única, consciente y destinada a trascender cualquier tendencia pasajera.
          </p>
        </div>
      </div>
    </section>
  );
};
