import React from 'react';

export const EditorialStatement: React.FC = () => {
  return (
    <section className="editorial-statement-section" id="lo-primero">
      <div className="container">
        <div className="reveal-on-scroll">
          <div className="section-kicker">Lo esencial</div>
          <h2 className="section-heading">Tres principios para comprender cada pieza</h2>
        </div>

        <div className="three-blocks-grid">
          <article className="statement-card reveal-on-scroll reveal-delay-1">
            <span className="card-number">01</span>
            <h3 className="card-title">Fabricación aditiva de precisión</h3>
            <p className="card-text">
              Cada objeto se materializa capa a capa mediante modelado digital y tecnología 3D de alta definición, dando vida a geometrías acanaladas imposibles de replicar en moldes tradicionales.
            </p>
          </article>

          <article className="statement-card reveal-on-scroll reveal-delay-2">
            <span className="card-number">02</span>
            <h3 className="card-title">Texturas que transmiten serenidad</h3>
            <p className="card-text">
              Líneas onduladas, relieves táctiles y tonalidades arena concebidos para dialogar suavemente con la luz natural de tu hogar y suscitar una atmósfera de pausa.
            </p>
          </article>

          <article className="statement-card reveal-on-scroll reveal-delay-3">
            <span className="card-number">03</span>
            <h3 className="card-title">Objetos pensados para habitar</h3>
            <p className="card-text">
              Piezas escultóricas y utilitarias que van más allá del ornamento: nacen para enriquecer el ritual del café, el arreglo botánico y el sosiego en tus espacios cotidianos.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};
