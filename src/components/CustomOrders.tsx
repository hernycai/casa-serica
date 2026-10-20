import React, { useState } from 'react';
import { createWhatsAppLink } from '../data/products';

export const CustomOrders: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Florero Escultural en U',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const interest = formData.interest;
    const messageDetail = formData.message.trim();

    if (!name || !phone) return;

    const message =
      `Hola CASA SÉRICA! Me gustaría consultar por un pedido personalizado / encargo a medida:\n\n` +
      `• Nombre: ${name}\n` +
      `• WhatsApp de contacto: ${phone}\n` +
      `• Interés: *${interest}*\n` +
      (messageDetail ? `• Detalle: ${messageDetail}\n\n` : `\n`) +
      `¿Podrían asesorarme con este proyecto? ¡Gracias!`;

    const waUrl = createWhatsAppLink(message);
    window.open(waUrl, '_blank');

    setFormData({
      name: '',
      phone: '',
      interest: 'Florero Escultural en U',
      message: '',
    });
  };

  return (
    <section className="custom-orders-section" id="personalizados">
      <div className="container">
        <div className="custom-orders-grid">
          <div className="custom-orders-text">
            <div className="section-kicker">Creaciones Especiales</div>
            <h2 className="custom-heading">¿Buscas una dimensión, color o forma a medida?</h2>
            <p className="custom-lead">
              Nuestra tecnología de impresión 3D nos permite adaptar escalas, desarrollar series limitadas para interioristas o diseñar adornos únicos pensados para tu espacio específico.
            </p>
            <div className="custom-perks">
              <div className="perk-item">
                <span className="perk-bullet">•</span>
                <div>
                  <strong>Asesoramiento estético:</strong> Conversamos sobre la paleta de materiales y dimensiones ideales de tu mueble o espacio.
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-bullet">•</span>
                <div>
                  <strong>Prototipado rápido:</strong> Visualización previa antes de la impresión final.
                </div>
              </div>
              <div className="perk-item">
                <span className="perk-bullet">•</span>
                <div>
                  <strong>Atención directa:</strong> Comunicación fluida por WhatsApp con la vendedora y creadora.
                </div>
              </div>
            </div>
          </div>

          <div className="custom-form-card">
            <h3 className="form-title">Solicitar Consulta o Pedido a Medida</h3>
            <p className="form-subtitle">Completa el formulario y te responderemos a la brevedad vía WhatsApp.</p>

            <form onSubmit={handleSubmit} className="editorial-form">
              <div className="form-group">
                <label htmlFor="clientName">Nombre y Apellido</label>
                <input
                  type="text"
                  id="clientName"
                  name="name"
                  required
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="clientPhone">Número de WhatsApp (con código de área)</label>
                <input
                  type="tel"
                  id="clientPhone"
                  name="phone"
                  required
                  placeholder="Ej: +54 9 11 1234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="interestType">Pieza de interés</label>
                <select
                  id="interestType"
                  name="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                >
                  <option value="Florero Escultural en U">Florero Escultural en U</option>
                  <option value="Posavasos Orgánicos Pack x4">Posavasos Orgánicos Pack x4</option>
                  <option value="Dispensador Lena">Dispensador Lena</option>
                  <option value="Diseño personalizado nuevo">Diseño personalizado desde cero</option>
                  <option value="Proyecto para interiorismo o regalo corporativo">Proyecto de interiorismo / Gran volumen</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="clientMessage">Detalles del pedido o consulta</label>
                <textarea
                  id="clientMessage"
                  name="message"
                  rows={3}
                  placeholder="Indícanos colores preferidos, medidas o cualquier consulta..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Enviar Consulta por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
