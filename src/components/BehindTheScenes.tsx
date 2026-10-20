import React, { useState, useRef } from 'react';

interface BTSVideoItem {
  id: string;
  step: string;
  badge: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
}

const BTS_VIDEOS: BTSVideoItem[] = [
  {
    id: 'bts-1',
    step: '01',
    badge: 'Taller SÉRICA',
    title: 'Primera Capa & Grabado de Base',
    description:
      'Calibración sobre la impresora Bambu Lab en nuestro taller, trazando el sello tipográfico SÉRICA y la base con filamento mineral mate.',
    videoSrc: '/assets/videos/bts-serica-layering.mp4',
    posterSrc: '/assets/videos/poster-1.jpg',
  },
  {
    id: 'bts-2',
    step: '02',
    badge: 'Time-lapse de Construcción',
    title: 'Elevación de Formas Orgánicas',
    description:
      'Avance capa por capa donde las paredes acanaladas y las curvas continuas toman altura con precisión micrométrica, sin uniones visibles.',
    videoSrc: '/assets/videos/bts-bambulab-timelapse.mp4',
    posterSrc: '/assets/videos/poster-2.jpg',
  },
  {
    id: 'bts-3',
    step: '03',
    badge: 'Detalle & Calidad',
    title: 'Extrusión y Textura Sedosa',
    description:
      'Control térmico estricto en el cabezal de impresión que confiere a cada pieza su textura mate serena, libre del brillo plástico convencional.',
    videoSrc: '/assets/videos/bts-precision-crafting.mp4',
    posterSrc: '/assets/videos/poster-3.jpg',
  },
];

export const BehindTheScenes: React.FC = () => {
  const [playingState, setPlayingState] = useState<{ [id: string]: boolean }>({
    'bts-1': true,
    'bts-2': true,
    'bts-3': true,
  });

  const [mutedState, setMutedState] = useState<{ [id: string]: boolean }>({
    'bts-1': true,
    'bts-2': true,
    'bts-3': true,
  });

  const videoRefs = useRef<{ [id: string]: HTMLVideoElement | null }>({});

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setPlayingState((prev) => ({ ...prev, [id]: true }));
      }).catch(() => {
        // Autoplay policy fallback
      });
    } else {
      video.pause();
      setPlayingState((prev) => ({ ...prev, [id]: false }));
    }
  };

  const toggleMute = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[id];
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setMutedState((prev) => ({ ...prev, [id]: nextMuted }));
  };

  return (
    <section className="bts-section" id="taller-proceso">
      <div className="container">
        <div className="bts-header reveal-on-scroll">
          <span className="section-kicker">Behind the Scenes</span>
          <h2 className="section-heading">El arte de la fabricación aditiva</h2>
          <p className="bts-lead">
            Observá cómo cobra vida cada objeto en nuestro taller. Capa por capa, el modelado digital de precisión se transforma en piezas tangibles con alma mineral.
          </p>
        </div>

        <div className="bts-grid">
          {BTS_VIDEOS.map((item, idx) => {
            const isPlaying = playingState[item.id] ?? false;
            const isMuted = mutedState[item.id] ?? true;

            return (
              <article
                key={item.id}
                className={`bts-card reveal-on-scroll reveal-delay-${idx + 1}`}
              >
                <div
                  className="bts-media-container"
                  onClick={() => togglePlay(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      togglePlay(item.id);
                    }
                  }}
                  aria-label={`Reproducir o pausar video de ${item.title}`}
                >
                  <video
                    ref={(el) => (videoRefs.current[item.id] = el)}
                    src={item.videoSrc}
                    poster={item.posterSrc}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    className="bts-video-element"
                    onPlay={() => setPlayingState((prev) => ({ ...prev, [item.id]: true }))}
                    onPause={() => setPlayingState((prev) => ({ ...prev, [item.id]: false }))}
                  />

                  <div className="bts-video-overlay-gradient"></div>

                  <span className="bts-badge">{item.badge}</span>

                  <div className="bts-controls-bar">
                    <button
                      type="button"
                      className="bts-ctrl-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay(item.id);
                      }}
                      title={isPlaying ? 'Pausar video' : 'Reproducir video'}
                      aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                    >
                      {isPlaying ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      className="bts-ctrl-btn"
                      onClick={(e) => toggleMute(item.id, e)}
                      title={isMuted ? 'Activar audio' : 'Silenciar'}
                      aria-label={isMuted ? 'Activar audio' : 'Silenciar'}
                    >
                      {isMuted ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bts-content">
                  <div className="bts-meta">
                    <span className="bts-step-number">{item.step}</span>
                    <h3 className="bts-title">{item.title}</h3>
                  </div>
                  <p className="bts-desc">{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
