import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onAcquireClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAcquireClick }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="site-header"
      id="header"
      style={{
        boxShadow: hasScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
      }}
    >
      <div className="header-container">
        <a href="#hero" className="brand-logo" aria-label="CASA SÉRICA">
          <img
            src="/assets/images/logo-serica.png"
            alt="SÉRICA Logo"
            className="brand-logo-img"
          />
          <div className="brand-logo-text">
            <span className="brand-title">SÉRICA</span>
            <span className="brand-tagline">Objetos para habitar</span>
          </div>
        </a>

        <nav className="desktop-nav">
          <a href="#lo-primero" className="nav-link">
            Filosofía
          </a>
          <a href="#distincion" className="nav-link">
            Por qué es distinto
          </a>
          <a href="#coleccion" className="nav-link">
            Colección
          </a>
          <a href="#personalizados" className="nav-link">
            Personalizados
          </a>
          <a href="#taller-proceso" className="nav-link">
            Behind the Scenes
          </a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            onClick={onAcquireClick}
            className="btn btn-header"
          >
            Adquirir Ahora
          </button>
          <button
            className="mobile-menu-btn"
            id="mobileMenuBtn"
            aria-label="Abrir menú"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'is-active' : ''}`} id="mobileDrawer">
        <nav className="mobile-nav">
          <a href="#hero" className="mobile-nav-link" onClick={closeMobileMenu}>
            Inicio
          </a>
          <a href="#lo-primero" className="mobile-nav-link" onClick={closeMobileMenu}>
            Filosofía
          </a>
          <a href="#distincion" className="mobile-nav-link" onClick={closeMobileMenu}>
            Por qué es distinto
          </a>
          <a href="#coleccion" className="mobile-nav-link" onClick={closeMobileMenu}>
            Colección de Objetos
          </a>
          <a href="#personalizados" className="mobile-nav-link" onClick={closeMobileMenu}>
            Pedidos a Medida
          </a>
          <a href="#taller-proceso" className="mobile-nav-link" onClick={closeMobileMenu}>
            Behind the Scenes
          </a>
          <button
            type="button"
            className="btn btn-primary w-full mt-4"
            onClick={() => {
              closeMobileMenu();
              onAcquireClick();
            }}
          >
            Adquirir Ahora
          </button>
        </nav>
      </div>
    </header>
  );
};
