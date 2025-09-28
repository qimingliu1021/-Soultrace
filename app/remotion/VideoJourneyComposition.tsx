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

const FALLBACK_HTML_CONTENT =
  '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#fff;font-family:Inter,sans-serif">No content</div>';

interface PreparedPaintingDocument {
  head: string;
  bodyContent: string;
  bodyAttributes: string;
}

const stripScripts = (markup: string) =>
  markup.replace(/<script[\s\S]*?<\/script>/gi, "");

const preparePaintingDocument = (html: string): PreparedPaintingDocument => {
  if (!html.trim()) {
    return {
      head: "",
      bodyContent: FALLBACK_HTML_CONTENT,
      bodyAttributes: "",
    };
  }

  const withoutDocType = html.replace(/<!DOCTYPE[^>]*>/gi, "");
  const withoutHtml = withoutDocType.replace(/<\/?html[^>]*>/gi, "");

  const headMatch = withoutHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? stripScripts(headMatch[1]) : "";

  const bodyMatch = withoutHtml.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);
  const bodyAttributes = bodyMatch?.[1]?.trim() ?? "";

  let bodyContent = bodyMatch
    ? bodyMatch[2]
    : withoutHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/i, "");

  bodyContent = stripScripts(bodyContent).trim();

  if (!bodyContent) {
    bodyContent = FALLBACK_HTML_CONTENT;
  }

  return {
    head,
    bodyContent,
    bodyAttributes,
  };
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

        const preparedDoc = preparePaintingDocument(slide.html);

        const bodyAttributes = preparedDoc.bodyAttributes
          ? ` ${preparedDoc.bodyAttributes}`
          : "";

        return (
          <AbsoluteFill
            key={slide.id}
            style={{
              opacity: slideOpacity,
              pointerEvents: "none",
            }}
          >
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8" /><style>html,body{margin:0;height:100%;width:100%;}</style>${preparedDoc.head}</head><body${bodyAttributes}>${preparedDoc.bodyContent}</body></html>`}
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
              background: "transparent",
              padding: "32px 48px",
              borderRadius: "24px",
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
                textShadow: "0 6px 30px rgba(4, 6, 18, 0.85)",
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
