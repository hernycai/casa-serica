import React from 'react';

interface FooterProps {
  onGeneralWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGeneralWhatsApp }) => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <img
              src="/assets/images/logo-serica.png"
              alt="SÉRICA"
              className="footer-logo"
            />
            <span className="footer-slogan">SÉRICA · Objetos para habitar.</span>
            <p className="footer-bio">
              Nacemos desde la búsqueda de la calma, la atemporalidad y el valor de lo cotidiano. Formas orgánicas y texturas serenas para transformar tus espacios.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-group-title">Navegación</h4>
            <a href="#hero">Inicio</a>
            <a href="#lo-primero">Filosofía</a>
            <a href="#distincion">Proceso 3D</a>
            <a href="#coleccion">Colección</a>
            <a href="#personalizados">Personalizados</a>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-group-title">Contacto</h4>
            <a
              href="https://www.instagram.com/casa.serica/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram: @casa.serica
            </a>
            <button
              type="button"
              className="trigger-whatsapp"
              onClick={onGeneralWhatsApp}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'inherit',
                font: 'inherit',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              WhatsApp directo
            </button>
            <span>Buenos Aires, Argentina</span>
            <span>Envíos a todo el país</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CASA SÉRICA · Todos los derechos reservados. Objetos para habitar.</p>
          <p className="footer-footnote">Diseño editorial web de autor · Fotografías reales de piezas SÉRICA.</p>
        </div>
      </div>
    </footer>
  );
};
