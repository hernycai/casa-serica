import React, { useState } from 'react';

interface FooterProps {
  onGeneralWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onGeneralWhatsApp }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setErrorMessage('Por favor ingresá un correo electrónico válido.');
      return;
    }

    try {
      const stored = localStorage.getItem('casa_serica_newsletter') || '[]';
      const list = JSON.parse(stored);
      if (!list.includes(trimmed)) {
        list.push(trimmed);
        localStorage.setItem('casa_serica_newsletter', JSON.stringify(list));
      }
    } catch {
      // Ignore localStorage errors
    }

    setIsSubscribed(true);
    setErrorMessage('');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container footer-container reveal-on-scroll">
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

          <div className="footer-newsletter-col">
            <h4 className="footer-group-title">Nuevos Lanzamientos</h4>
            <p className="footer-newsletter-desc">
              Suscribite para recibir avisos de nuevos objetos, series de edición limitada y novedades exclusivas de CASA SÉRICA.
            </p>

            {isSubscribed ? (
              <div className="footer-newsletter-success">
                <span className="success-icon">✓</span>
                <div>
                  <strong>¡Te has sumado con éxito!</strong>
                  <p>Te avisaremos con prioridad ante cada nuevo lanzamiento.</p>
                </div>
              </div>
            ) : (
              <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
                <div className="footer-newsletter-input-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    placeholder="tu@email.com"
                    aria-label="Correo para suscripción al newsletter"
                    className="footer-newsletter-input"
                    required
                  />
                  <button type="submit" className="footer-newsletter-btn">
                    Suscribirme
                  </button>
                </div>
                {errorMessage && (
                  <p className="footer-newsletter-error">{errorMessage}</p>
                )}
                <span className="footer-newsletter-note">
                  Sin spam. Podés darte de baja cuando quieras.
                </span>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 CASA SÉRICA · Todos los derechos reservados. Objetos para habitar.</p>
          <p className="footer-footnote">
            Web diseñada por{' '}
            <a
              href="https://hlucianodesign.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'underline', color: 'inherit' }}
            >
              HLuciano Design
            </a>{' '}
            · Fotografías reales de piezas SÉRICA.
          </p>
        </div>
      </div>
    </footer>
  );
};
