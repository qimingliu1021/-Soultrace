'use client';

import {Player} from '@remotion/player';
import Link from 'next/link';
import {useMemo} from 'react';
import {
  VIDEO_DURATION_IN_FRAMES,
  VIDEO_FPS,
  VideoJourneyComposition,
} from '../../../remotion/VideoJourneyComposition';

const COMPOSITION_WIDTH = 1280;
const COMPOSITION_HEIGHT = 720;

const heroBackground =
  'radial-gradient(circle at top left, rgba(155, 231, 255, 0.35), transparent 55%),' +
  'radial-gradient(circle at bottom right, rgba(186, 107, 255, 0.25), transparent 50%),' +
  'linear-gradient(145deg, #050816 0%, #0e1633 38%, #04040d 100%)';

const VideoJourneyPage = () => {
  const playerStyle = useMemo(() => ({
    width: 'min(960px, 100%)',
    aspectRatio: `${COMPOSITION_WIDTH} / ${COMPOSITION_HEIGHT}`,
    borderRadius: '28px',
    overflow: 'hidden',
    boxShadow: '0 32px 64px rgba(7, 6, 35, 0.48)',
    backgroundColor: '#050816',
  }), []);

  return (
    <main
      style={{
        minHeight: '100vh',
        background: heroBackground,
        color: '#f9fbff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          padding: '48px clamp(24px, 6vw, 96px) 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <p style={{letterSpacing: 6, textTransform: 'uppercase', opacity: 0.7, fontSize: 12}}>
            Experience
          </p>
          <h1 style={{fontSize: 'clamp(36px, 4vw, 48px)', marginTop: 8, marginBottom: 0}}>
            Soultrace Video Journey
          </h1>
        </div>
        <Link
          href="/"
          style={{
            border: '1px solid rgba(249, 251, 255, 0.24)',
            borderRadius: 999,
            padding: '10px 18px',
            fontSize: 14,
            letterSpacing: 0.6,
            textTransform: 'uppercase',
            color: '#f9fbff',
            textDecoration: 'none',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.borderColor = '#9be7ff';
            event.currentTarget.style.color = '#9be7ff';
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.borderColor = 'rgba(249, 251, 255, 0.24)';
            event.currentTarget.style.color = '#f9fbff';
          }}
        >
          Back home
        </Link>
      </header>

      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          padding: '0 clamp(24px, 6vw, 96px) 64px',
        }}
      >
        <p
          style={{
            maxWidth: 760,
            textAlign: 'center',
            fontSize: 'clamp(18px, 2.2vw, 22px)',
            lineHeight: 1.6,
            opacity: 0.84,
            margin: 0,
          }}
        >
          This curated motion piece previews how Soultrace can stitch together visuals, narration, and tone into a seamless narrative thread.
          It runs entirely with Remotion, so we can iterate visually while keeping code as the creative source of truth.
        </p>

        <Player
          component={VideoJourneyComposition}
          durationInFrames={VIDEO_DURATION_IN_FRAMES}
          compositionWidth={COMPOSITION_WIDTH}
          compositionHeight={COMPOSITION_HEIGHT}
          fps={VIDEO_FPS}
          autoPlay
          controls
          loop
          style={playerStyle}
          className="video-journey-player"
          showPosterWhenUnplayed
        />
      </section>

      <section
        style={{
          padding: '32px clamp(24px, 6vw, 96px) 96px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 28,
        }}
      >
        <FeatureCard
          title="Storyboard in Code"
          description="Blend timelines, typography, and imagery with full control over timing, easing, and synchronisation."
        />
        <FeatureCard
          title="Audio-first Direction"
          description="Keep rhythm and pacing tight thanks to Remotion's audio timeline utilities and precise frame management."
        />
        <FeatureCard
          title="Production Ready"
          description="Render out MP4 or WEBM deliverables on demand, with server-side rendering support and automated pipelines."
        />
      </section>
    </main>
  );
};

export default VideoJourneyPage;

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({title, description}: FeatureCardProps) => (
  <article
    style={{
      padding: '28px 32px',
      borderRadius: 24,
      border: '1px solid rgba(155, 231, 255, 0.2)',
      background:
        'linear-gradient(165deg, rgba(10, 16, 42, 0.8) 0%, rgba(6, 10, 28, 0.95) 65%, rgba(5, 8, 22, 0.98) 100%)',
      boxShadow: '0 24px 48px rgba(5, 8, 22, 0.35)',
      backdropFilter: 'blur(12px)',
    }}
  >
    <h3 style={{fontSize: 20, marginBottom: 12}}>{title}</h3>
    <p style={{fontSize: 16, lineHeight: 1.5, opacity: 0.78}}>{description}</p>
  </article>
);
