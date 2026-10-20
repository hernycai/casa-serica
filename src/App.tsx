import React, { useState } from 'react';
import { Product } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EditorialStatement } from './components/EditorialStatement';
import { Distinction } from './components/Distinction';
import { Collection } from './components/Collection';
import { CustomOrders } from './components/CustomOrders';
import { BehindTheScenes } from './components/BehindTheScenes';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { createWhatsAppLink } from './data/products';
import { useScrollReveal } from './hooks/useScrollReveal';

export const App: React.FC = () => {
  useScrollReveal();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleAcquireClick = () => {
    const el = document.getElementById('coleccion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProduct = (product: Product, initialColor?: string) => {
    setSelectedProduct(product);
    setSelectedColor(initialColor || product.colors[0]?.name || '');
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
        <Distinction />
        <Collection
          onSelectProduct={handleSelectProduct}
        />
        <CustomOrders />
        <BehindTheScenes />
      </main>
      <Footer onGeneralWhatsApp={handleGeneralWhatsApp} />

      <OrderModal
        product={selectedProduct}
        initialColor={selectedColor}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />

      <WhatsAppWidget onOpenWhatsApp={handleGeneralWhatsApp} />
    </div>
  );
};

export default App;
