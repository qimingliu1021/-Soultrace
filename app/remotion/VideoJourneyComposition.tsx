import {
  AbsoluteFill,
  Audio,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { PaintingSlideConfig } from "./generatedPaintings";

export const VIDEO_FPS = 30;
export const SLIDE_DURATION_SECONDS = 6;
export const SLIDE_DURATION_FRAMES = SLIDE_DURATION_SECONDS * VIDEO_FPS;

export interface PaintingSlide extends PaintingSlideConfig {
  html: string;
  meta?: {
    model?: string;
    usedOpenAI?: boolean;
    tokens?: unknown;
    error?: string;
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

const baseBackground =
  "radial-gradient(circle at top left, rgba(24, 69, 139, 0.28), transparent 58%)," +
  "radial-gradient(circle at bottom right, rgba(250, 112, 154, 0.22), transparent 52%)," +
  "linear-gradient(140deg, #050816 0%, #0b1533 48%, #04040d 100%)";

const sanitizeHtml = (html: string) => {
  if (!html.trim()) {
    return '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#fff;font-family:Inter,sans-serif">No content</div>';
  }

  return html
    .replace(/<!DOCTYPE[^>]*>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<head>[\s\S]*?<\/head>/gi, "")
    .replace(/<body[^>]*>/gi, '<div class="html-painting-root">')
    .replace(/<\/body>/gi, "</div>");
};

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
            title: "Awaiting Paintings",
            description: "Paintings will appear once the agent responds.",
            prompt: "Placeholder",
            palette: ["#64748B", "#94A3B8", "#CBD5F5"],
            city: "Loading",
            country: "…",
            aspectRatio: "16:9",
            html: '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f9fbff;background:linear-gradient(120deg,#1f2937,#0f172a);font-family:Inter,sans-serif">Loading…</div>',
          },
        ];

  // Calculate which poem paragraph should be displayed
  const getCurrentPoemParagraph = () => {
    if (!poem?.paragraphs || poem.paragraphs.length === 0) {
      return null;
    }

    const totalFrames = safeSlides.length * SLIDE_DURATION_FRAMES;
    const paragraphDuration = totalFrames / 4; // 4 paragraphs over total duration

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
        fontFamily: 'var(--font-sans, "Inter", "SF Pro Display", system-ui)',
        color: "#f8fbff",
        background: baseBackground,
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

        const zoom = interpolate(frame, [start, end], [1.02, 1.06], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <AbsoluteFill
            key={slide.id}
            style={{
              opacity: slideOpacity,
              pointerEvents: "none",
            }}
          >
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8" /><style>body{margin:0;} .html-painting-root{width:100%;height:100%;}</style></head><body>${sanitizeHtml(
                slide.html
              )}</body></html>`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                display: "block",
                transform: `scale(${zoom})`,
                transformOrigin: "center",
                background: "#020617",
              }}
            />
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
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "60px 80px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              background: "rgba(5, 8, 22, 0.85)",
              backdropFilter: "blur(12px)",
              borderRadius: "24px",
              padding: "32px 48px",
              border: "1px solid rgba(155, 231, 255, 0.2)",
              boxShadow: "0 24px 48px rgba(5, 8, 22, 0.6)",
              maxWidth: "800px",
              textAlign: "center",
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
                fontSize: "clamp(18px, 2.5vw, 24px)",
                lineHeight: 1.6,
                color: "#f8fbff",
                fontWeight: 400,
                letterSpacing: "0.02em",
                whiteSpace: "pre-line",
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
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      i === currentParagraph.index
                        ? "#9be7ff"
                        : "rgba(155, 231, 255, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      )}

      <Audio src={staticFile("/media/dummy-theme.wav")} volume={0.4} loop />
    </AbsoluteFill>
  );
};
