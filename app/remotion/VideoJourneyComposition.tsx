import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import type { PaintingSlideConfig } from "./generatedPaintings";

export const VIDEO_FPS = 30;
export const SLIDE_DURATION_SECONDS = 6;
export const SLIDE_DURATION_FRAMES = SLIDE_DURATION_SECONDS * VIDEO_FPS;

export interface PaintingSlide extends PaintingSlideConfig {
  imageSrc: string | null;
  prompt?: string;
  meta?: {
    model?: string;
    usedOpenAI?: boolean;
    tokens?: unknown;
    error?: string;
    size?: string;
    fallback?: boolean;
  };
}

export interface PoemData {
  poem: string;
  paragraphs: string[];
  meta?: {
    model?: string;
    usedOpenAI?: boolean;
    selectedGenre?: string;
    paragraphCount?: number;
  };
}

export interface VideoJourneyCompositionProps {
  slides: readonly PaintingSlide[];
  poem?: PoemData;
}

export const VideoJourneyComposition: React.FC<
  VideoJourneyCompositionProps
> = ({ slides, poem }) => {
  const frame = useCurrentFrame();
  const safeSlides =
    slides.length > 0
      ? slides
      : [
          {
            id: "placeholder",
            prompt: "Awaiting generated artwork",
            palette: ["#64748B", "#94A3B8", "#CBD5F5"],
            city: "Loading",
            country: "…",
            aspectRatio: "16:9",
            imageSrc: null,
            meta: {
              usedOpenAI: false,
            },
          },
        ];

  // Calculate which poem paragraph should be displayed
  const getCurrentPoemParagraph = () => {
    if (!poem?.paragraphs || poem.paragraphs.length === 0) {
      return null;
    }

    const totalFrames = safeSlides.length * SLIDE_DURATION_FRAMES;
    const paragraphDuration = totalFrames / poem.paragraphs.length;

    const paragraphIndex = Math.floor(frame / paragraphDuration);

    if (paragraphIndex >= 0 && paragraphIndex < poem.paragraphs.length) {
      return {
        text: poem.paragraphs[paragraphIndex],
        index: paragraphIndex,
        progress: (frame % paragraphDuration) / paragraphDuration,
      };
    }

    return null;
  };

  const currentParagraph = getCurrentPoemParagraph();

  return (
    <AbsoluteFill
      style={{
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {safeSlides.map((slide, index) => {
        const start = index * SLIDE_DURATION_FRAMES;
        const end = start + SLIDE_DURATION_FRAMES;
        const slideOpacity = interpolate(
          frame,
          [start, start + 18, end - 18, end],
          [0, 1, 1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }
        );

        const zoom = interpolate(frame, [start, end], [1.0, 1.05], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <AbsoluteFill
            key={slide.id}
            style={{
              opacity: slideOpacity,
            }}
          >
            {slide.imageSrc ? (
              <img
                src={slide.imageSrc}
                alt={`Generated artwork for ${slide.city}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transform: `scale(${zoom})`,
                  transformOrigin: "center",
                  background: "#000000",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#000000",
                  color: "#ffffff",
                  fontSize: 24,
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Generating Image...
              </div>
            )}
          </AbsoluteFill>
        );
      })}

      {/* Poem Overlay */}
      {currentParagraph && (
        <AbsoluteFill
          style={{
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 80px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(10px)",
              padding: "32px 48px",
              borderRadius: "24px",
              maxWidth: "800px",
              textAlign: "center",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              opacity: interpolate(
                currentParagraph.progress,
                [0, 0.1, 0.9, 1],
                [0, 1, 1, 0.8],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              ),
              transform: `translateY(${interpolate(
                currentParagraph.progress,
                [0, 0.1],
                [20, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              )}px)`,
            }}
          >
            <div
              style={{
                fontSize: "clamp(18px, 2.5vw, 28px)",
                lineHeight: 1.6,
                color: "#ffffff",
                fontWeight: 400,
                letterSpacing: "0.02em",
                whiteSpace: "pre-line",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)",
                fontFamily: "Georgia, serif",
              }}
            >
              {currentParagraph.text}
            </div>

            {/* Progress indicator */}
            <div
              style={{
                marginTop: "24px",
                display: "flex",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {Array.from({ length: poem?.paragraphs?.length || 4 }).map(
                (_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background:
                        i === currentParagraph.index
                          ? "#ffffff"
                          : "rgba(255, 255, 255, 0.3)",
                      transition: "all 0.3s ease",
                    }}
                  />
                )
              )}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Background Music */}
      <Audio src={staticFile("/tianxingjiuge.mp3")} volume={0.4} loop />
    </AbsoluteFill>
  );
};
