import React, { useState } from 'react';
import { Product } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EditorialStatement } from './components/EditorialStatement';
import { FullscreenQuote } from './components/FullscreenQuote';
import { Distinction } from './components/Distinction';
import { FullscreenCaption } from './components/FullscreenCaption';
import { Collection } from './components/Collection';
import { CustomOrders } from './components/CustomOrders';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { createWhatsAppLink } from './data/products';

export const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAcquireClick = () => {
    const el = document.getElementById('coleccion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGeneralWhatsApp = () => {
    const generalMsg =
      'Hola CASA SÉRICA! Estuve viendo su colección de objetos para habitar y quisiera hacer una consulta.';
    window.open(createWhatsAppLink(generalMsg), '_blank');
  };

  return (
    <div className="app-root">
      <AnnouncementBar />
      <Header onAcquireClick={handleAcquireClick} />
      <main>
        <Hero onAcquireClick={handleAcquireClick} />
        <EditorialStatement />
        <FullscreenQuote />
        <Distinction />
        <FullscreenCaption />
        <Collection
          onSelectProduct={(product) => setSelectedProduct(product)}
          onGeneralWhatsApp={handleGeneralWhatsApp}
        />
        <CustomOrders />
      </main>
      <Footer onGeneralWhatsApp={handleGeneralWhatsApp} />

      <OrderModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />

      <WhatsAppWidget onOpenWhatsApp={handleGeneralWhatsApp} />
    </div>
  );
};

export default App;
