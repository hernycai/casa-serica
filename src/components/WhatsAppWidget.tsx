import React, { useState } from 'react';

interface WhatsAppWidgetProps {
  onOpenWhatsApp: () => void;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ onOpenWhatsApp }) => {
  const [tooltipVisible, setTooltipVisible] = useState(true);

  return (
    <div className="whatsapp-widget-container" id="whatsappWidget">
      {tooltipVisible && (
        <div
          className="whatsapp-tooltip"
          id="whatsappTooltip"
          onClick={onOpenWhatsApp}
          style={{ cursor: 'pointer' }}
        >
          <div className="tooltip-avatar">
            <img src="/assets/images/logo-serica.png" alt="SÉRICA" />
          </div>
          <div className="tooltip-text">
            <strong>Vendedora SÉRICA</strong>
            <span>En línea · ¿Podemos ayudarte con tu elección?</span>
          </div>
          <button
            type="button"
            className="tooltip-close"
            id="tooltipClose"
            aria-label="Cerrar tooltip"
            onClick={(e) => {
              e.stopPropagation();
              setTooltipVisible(false);
            }}
          >
            &times;
          </button>
        </div>
      )}

      <button
        type="button"
        className="whatsapp-float-btn"
        id="whatsappFloatBtn"
        aria-label="Contactar por WhatsApp"
        onClick={onOpenWhatsApp}
      >
        <svg className="whatsapp-icon" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16.002 0C7.164 0 0 7.164 0 16.003c0 2.825.736 5.58 2.138 8.012L.073 31.927l8.118-2.13c2.35 1.282 5.01 1.956 7.81 1.956 8.837 0 16.002-7.164 16.002-16.003S24.839 0 16.002 0zm0 29.243c-2.45 0-4.85-.644-6.953-1.86l-.497-.29-5.166 1.355 1.378-5.038-.323-.514C3.125 20.69 2.51 18.39 2.51 16.003c0-7.44 6.053-13.493 13.492-13.493 7.44 0 13.493 6.053 13.493 13.493 0 7.44-6.053 13.493-13.493 13.493zm7.41-9.92c-.406-.203-2.404-1.187-2.776-1.323-.373-.135-.644-.203-.915.203-.27.406-1.05 1.323-1.288 1.594-.237.27-.474.305-.88.102-.407-.204-1.716-.633-3.268-2.017-1.208-1.077-2.024-2.408-2.261-2.815-.237-.406-.025-.626.178-.828.183-.182.406-.474.61-.71.203-.238.27-.407.406-.678.136-.27.068-.508-.034-.71-.102-.204-.915-2.204-1.254-3.018-.33-.794-.666-.686-.915-.698l-.78-.013c-.27 0-.711.102-1.084.508-.373.407-1.423 1.39-1.423 3.39 0 2 1.457 3.933 1.66 4.204.204.27 2.868 4.38 6.947 6.14 4.08 1.76 4.08 1.173 4.815 1.104.736-.068 2.405-.983 2.744-1.932.339-.95.339-1.763.237-1.933-.101-.17-.373-.271-.78-.475z" />
        </svg>
        <span className="whatsapp-pulse"></span>
      </button>
    </div>
  );
};
