import {AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export const VIDEO_FPS = 30;
export const VIDEO_DURATION_SECONDS = 12;
export const VIDEO_DURATION_IN_FRAMES = VIDEO_FPS * VIDEO_DURATION_SECONDS;

const svgMarkup = `
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6a5af9" />
        <stop offset="50%" stop-color="#b86bff" />
        <stop offset="100%" stop-color="#9be7ff" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#grad)" rx="48" ry="48" />
    <circle cx="1040" cy="160" r="220" fill="url(#glow)" />
    <circle cx="360" cy="580" r="180" fill="rgba(255, 255, 255, 0.45)" />
    <g fill="#0c0633" fill-opacity="0.08">
      <circle cx="220" cy="200" r="60" />
      <circle cx="520" cy="180" r="44" />
      <circle cx="820" cy="320" r="70" />
      <circle cx="980" cy="500" r="56" />
    </g>
    <text x="110" y="360" font-family="'Inter', sans-serif" font-size="72" font-weight="700" fill="#120739">
      Soultrace Journey
    </text>
    <text x="110" y="432" font-family="'Inter', sans-serif" font-size="36" fill="#120739" opacity="0.8">
      Where stories come alive
    </text>
  </svg>
`;

const dummyImage = `data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`;

export const VideoJourneyComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();

  const fadeInDuration = fps * 0.8;
  const fadeOutStart = VIDEO_DURATION_IN_FRAMES - fps;

  const overallOpacity = interpolate(frame, [0, fadeInDuration, fadeOutStart, VIDEO_DURATION_IN_FRAMES], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const zoom = interpolate(frame, [0, VIDEO_DURATION_IN_FRAMES], [1, 1.05], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const subtitleOffset = interpolate(frame, [fps * 1.2, fps * 2.2], [24, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: '#050816',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f9fbff',
        fontFamily: 'var(--font-sans, "Inter", "SF Pro Display", system-ui)',
        opacity: overallOpacity,
      }}
    >
      <AbsoluteFill style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 48,
        padding: 48,
      }}>
        <Img
          src={dummyImage}
          style={{
            width: Math.min(width * 0.75, 960),
            borderRadius: 36,
            boxShadow: '0 40px 80px rgba(16, 15, 60, 0.45)',
            transform: `scale(${zoom})`,
            transformOrigin: 'center',
          }}
        />
        <div
          style={{
            maxWidth: Math.min(width * 0.75, 960),
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: width < 720 ? 48 : 64,
              marginBottom: 16,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            Your Video Journey
          </h1>
          <p
            style={{
              fontSize: width < 720 ? 20 : 24,
              lineHeight: 1.5,
              opacity: 0.85,
              transform: `translateY(${subtitleOffset}px)`,
            }}
          >
            This motion preview blends imagery and audio to showcase how Soultrace spins stories, memories, and emotions into immersive narratives.
          </p>
        </div>
      </AbsoluteFill>
      <Audio src={staticFile('/media/dummy-theme.wav')} volume={0.4} />
    </AbsoluteFill>
  );
};
