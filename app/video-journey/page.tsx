"use client";

import { Player } from "@remotion/player";
import type { PlayerRef } from "@remotion/player";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  SLIDE_DURATION_FRAMES,
  VIDEO_FPS,
  VideoJourneyComposition,
  type PaintingSlide,
  type PoemData,
} from "../remotion/VideoJourneyComposition";
import { paintingSlides } from "../remotion/generatedPaintings";

const COMPOSITION_WIDTH = 1280;
const COMPOSITION_HEIGHT = 720;

interface AgentResponse {
  imageB64?: string | null;
  imageUrl?: string | null;
  prompt?: string;
  mimeType?: string;
  meta?: {
    model?: string;
    usedOpenAI?: boolean;
    tokens?: unknown;
    error?: string;
    size?: string;
  };
}

// Interface for storing slide data without large base64 images
interface StoredSlideData {
  id: string;
  prompt: string;
  palette: readonly string[];
  city: string;
  country: string;
  aspectRatio: string;
  hasImage: boolean;
  imageUrl?: string; // Only store if it's a URL, not base64
  meta?: {
    model?: string;
    usedOpenAI?: boolean;
    tokens?: unknown;
    error?: string;
    size?: string;
  };
}

const heroBackground =
  "radial-gradient(circle at top left, rgba(155, 231, 255, 0.35), transparent 55%)," +
  "radial-gradient(circle at bottom right, rgba(186, 107, 255, 0.25), transparent 50%)," +
  "linear-gradient(145deg, #050816 0%, #0e1633 38%, #04040d 100%)";

const VideoJourneyPage = () => {
  const [slides, setSlides] = useState<PaintingSlide[]>([]);
  const [poem, setPoem] = useState<PoemData | null>(null);
  const [isLoadingPaintings, setIsLoadingPaintings] = useState(true);
  const [isLoadingPoem, setIsLoadingPoem] = useState(true);
  const [paintingError, setPaintingError] = useState<string | null>(null);
  const [poemError, setPoemError] = useState<string | null>(null);
  const [contentInitialized, setContentInitialized] = useState(false);
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map());
  const playerRef = useRef<PlayerRef | null>(null);

  // Check function to determine if all five images are ready
  const areAllImagesReady = useCallback(() => {
    return (
      slides.length === paintingSlides.length &&
      slides.every((slide) => slide.imageSrc && slide.imageSrc.trim() !== "")
    );
  }, [slides]);

  // Check if poem is ready
  const isPoemReady = useCallback(() => {
    return poem && poem.paragraphs && poem.paragraphs.length === 4;
  }, [poem]);

  // Check if everything is ready for video display
  const isEverythingReady = useCallback(() => {
    return areAllImagesReady() && isPoemReady();
  }, [areAllImagesReady, isPoemReady]);

  const durationInFrames = slides.length
    ? slides.length * SLIDE_DURATION_FRAMES
    : paintingSlides.length * SLIDE_DURATION_FRAMES;

  const playerStyle = useMemo(
    () => ({
      width: "min(960px, 100%)",
      aspectRatio: `${COMPOSITION_WIDTH} / ${COMPOSITION_HEIGHT}`,
      borderRadius: "28px",
      overflow: "hidden",
      boxShadow: "0 32px 64px rgba(7, 6, 35, 0.48)",
      backgroundColor: "#050816",
    }),
    []
  );

  // Store slide metadata without large image data
  const storeSlideMetadata = useCallback((slides: PaintingSlide[]) => {
    try {
      const storedData: StoredSlideData[] = slides.map((slide) => ({
        id: slide.id,
        prompt: slide.prompt,
        palette: slide.palette,
        city: slide.city,
        country: slide.country,
        aspectRatio: slide.aspectRatio,
        hasImage: !!slide.imageSrc,
        // Only store URL if it's not a base64 data URL
        imageUrl:
          slide.imageSrc && !slide.imageSrc.startsWith("data:")
            ? slide.imageSrc
            : undefined,
        meta: slide.meta,
      }));

      sessionStorage.setItem(
        "videoJourneySlideMetadata",
        JSON.stringify(storedData)
      );
      console.log("Stored slide metadata successfully");
    } catch (error) {
      console.warn("Failed to store slide metadata:", error);
    }
  }, []);

  // Load content from sessionStorage or generate new content
  const loadOrGenerateContent = useCallback(async () => {
    // First, try to load existing content from sessionStorage
    try {
      const storedSlideMetadata = sessionStorage.getItem(
        "videoJourneySlideMetadata"
      );
      const storedPoem = sessionStorage.getItem("videoJourneyPoem");

      if (storedSlideMetadata && storedPoem) {
        console.log("Found stored video content metadata");
        const parsedMetadata: StoredSlideData[] =
          JSON.parse(storedSlideMetadata);
        const parsedPoem = JSON.parse(storedPoem);

        // Validate the stored content
        if (
          parsedMetadata.length === paintingSlides.length &&
          parsedMetadata.every((slide) => slide.hasImage) &&
          parsedPoem.paragraphs &&
          parsedPoem.paragraphs.length === 4
        ) {
          // Check if we have URLs (not base64) that we can reuse
          const hasValidUrls = parsedMetadata.every((slide) => slide.imageUrl);

          if (hasValidUrls) {
            console.log("Loading existing video content from stored URLs");
            const restoredSlides: PaintingSlide[] = parsedMetadata.map(
              (metadata) => ({
                ...metadata,
                imageSrc: metadata.imageUrl!,
              })
            );

            setSlides(restoredSlides);
            setPoem(parsedPoem);
            setIsLoadingPaintings(false);
            setIsLoadingPoem(false);
            setContentInitialized(true);
            return;
          }
        }
      }
    } catch (error) {
      console.warn("Failed to load stored content:", error);
    }

    // If no valid stored content, generate new content
    console.log("Generating new video content");
    await Promise.all([fetchPaintings(), fetchPoem()]);
    setContentInitialized(true);
  }, []);

  const fetchPaintings = useCallback(async () => {
    setIsLoadingPaintings(true);
    setPaintingError(null);
    setSlides([]); // Clear existing slides when starting new generation

    try {
      const responses = await Promise.all(
        paintingSlides.map(async (config) => {
          const response = await fetch("/api/paint", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: config.prompt,
              palette: config.palette,
              aspectRatio: config.aspectRatio,
            }),
          });

          if (!response.ok) {
            const payload = await response.json().catch(() => ({}));
            throw new Error(payload?.error ?? "Painting agent failed");
          }

          const data: AgentResponse = await response.json();
          const imageSrc = data.imageUrl
            ? data.imageUrl
            : data.imageB64
            ? `data:${data.mimeType ?? "image/png"};base64,${data.imageB64}`
            : null;

          if (!imageSrc) {
            throw new Error("Painting agent returned no image data");
          }

          return {
            ...config,
            imageSrc,
            meta: data.meta,
            prompt: data.prompt ?? config.prompt,
          } satisfies PaintingSlide;
        })
      );

      setSlides(responses);
      // Store slide metadata (without large image data)
      storeSlideMetadata(responses);
    } catch (agentError) {
      setPaintingError(
        agentError instanceof Error ? agentError.message : String(agentError)
      );
    } finally {
      setIsLoadingPaintings(false);
    }
  }, [storeSlideMetadata]);

  const fetchPoem = useCallback(async () => {
    setIsLoadingPoem(true);
    setPoemError(null);

    try {
      const response = await fetch("/api/poem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: "a journey through global cities and cultures",
          emotion: "wonder",
          situation: "cultural exploration",
          mood: "contemplative",
          purpose: "visual storytelling",
          cities: ["Chongqing", "New York", "Lincoln", "Shanghai", "Chicago"],
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error ?? "Poem agent failed");
      }

      const data: PoemData = await response.json();
      setPoem(data);
      // Store the generated poem in sessionStorage
      try {
        sessionStorage.setItem("videoJourneyPoem", JSON.stringify(data));
      } catch (storageError) {
        console.warn("Failed to store poem in sessionStorage:", storageError);
      }
    } catch (agentError) {
      setPoemError(
        agentError instanceof Error ? agentError.message : String(agentError)
      );
    } finally {
      setIsLoadingPoem(false);
    }
  }, []);

  // Initialize content only once when component mounts
  useEffect(() => {
    if (!contentInitialized) {
      loadOrGenerateContent();
    }
  }, [loadOrGenerateContent, contentInitialized]);

  const renderVideoOrLoading = () => {
    if (paintingError || poemError) {
      return (
        <div
          style={{
            ...playerStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 75, 75, 0.12)",
            border: "1px solid rgba(255, 118, 118, 0.4)",
            color: "#fecdd3",
            fontSize: 18,
            textAlign: "center",
            padding: "32px",
          }}
        >
          <div>
            <div style={{ fontSize: 24, marginBottom: 16 }}>⚠️</div>
            <div>Failed to generate content</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>
              {paintingError && `Paintings: ${paintingError}`}
              {paintingError && poemError && <br />}
              {poemError && `Poem: ${poemError}`}
            </div>
          </div>
        </div>
      );
    }

    if (isLoadingPaintings || isLoadingPoem || !isEverythingReady()) {
      const paintingsReady = areAllImagesReady();
      const poemReady = isPoemReady();

      return (
        <div
          style={{
            ...playerStyle,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(6, 11, 32, 0.6)",
            border: "1px solid rgba(155, 231, 255, 0.2)",
            color: "#e0f2fe",
            fontSize: 18,
            textAlign: "center",
            padding: "32px",
          }}
        >
          <div>
            <div
              style={{
                width: 48,
                height: 48,
                border: "3px solid rgba(155, 231, 255, 0.3)",
                borderTop: "3px solid #9be7ff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <div>Generating AI Content</div>
            <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>
              <div>
                🎨 Paintings: {slides.length}/{paintingSlides.length}{" "}
                {paintingsReady ? "✅" : "⏳"}
              </div>
              <div>
                📝 Poem: {poem?.paragraphs?.length || 0}/4 paragraphs{" "}
                {poemReady ? "✅" : "⏳"}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // All content is ready, show the video player
    return (
      <Player
        component={VideoJourneyComposition}
        durationInFrames={durationInFrames}
        compositionWidth={COMPOSITION_WIDTH}
        compositionHeight={COMPOSITION_HEIGHT}
        fps={VIDEO_FPS}
        controls
        loop
        style={playerStyle}
        className="video-journey-player"
        showPosterWhenUnplayed
        ref={playerRef}
        inputProps={{ slides: slides, poem: poem ?? undefined }}
      />
    );
  };

  const renderAgentStatus = () => {
    if (paintingError || poemError) {
      return (
        <div
          style={{
            maxWidth: 720,
            padding: "16px 24px",
            borderRadius: 18,
            border: "1px solid rgba(255, 118, 118, 0.4)",
            background: "rgba(255, 75, 75, 0.12)",
            color: "#fecdd3",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          Content generation failed. You can retry below.
          {paintingError && <div>Paintings: {paintingError}</div>}
          {poemError && <div>Poem: {poemError}</div>}
        </div>
      );
    }

    if (isLoadingPaintings || isLoadingPoem || !isEverythingReady()) {
      const paintingsReady = areAllImagesReady();
      const poemReady = isPoemReady();

      return (
        <div
          style={{
            maxWidth: 720,
            padding: "16px 24px",
            borderRadius: 18,
            border: "1px solid rgba(155, 231, 255, 0.2)",
            background: "rgba(6, 11, 32, 0.6)",
            color: "#e0f2fe",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <div>Generating Soultrace content via AI agents…</div>
          <div style={{ marginTop: 8, display: "flex", gap: "16px" }}>
            <span>
              🎨 Paintings: {slides.length}/{paintingSlides.length}{" "}
              {paintingsReady ? "✅" : "⏳"}
            </span>
            <span>
              📝 Poem: {poem?.paragraphs?.length || 0}/4{" "}
              {poemReady ? "✅" : "⏳"}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          maxWidth: 720,
          padding: "16px 24px",
          borderRadius: 18,
          border: "1px solid rgba(34, 197, 94, 0.4)",
          background: "rgba(34, 197, 94, 0.12)",
          color: "#bbf7d0",
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        ✅ All content generated successfully! Enjoy your Soultrace video
        journey.
      </div>
    );
  };

  const handleRegenerate = () => {
    // Clear stored content and regenerate
    sessionStorage.removeItem("videoJourneySlideMetadata");
    sessionStorage.removeItem("videoJourneyPoem");
    setContentInitialized(false);
    fetchPaintings();
    fetchPoem();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: heroBackground,
        color: "#f9fbff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Add CSS for loading spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <header
        style={{
          padding: "48px clamp(24px, 6vw, 96px) 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        <div>
          <p
            style={{
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.7,
              fontSize: 12,
            }}
          >
            Experience
          </p>
          <h1
            style={{
              fontSize: "clamp(36px, 4vw, 48px)",
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            Soultrace Video Journey
          </h1>
        </div>
        <Link
          href="/hexagram_analysis"
          style={{
            border: "1px solid rgba(249, 251, 255, 0.24)",
            borderRadius: 999,
            padding: "10px 18px",
            fontSize: 14,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            color: "#f9fbff",
            textDecoration: "none",
            transition: "border-color 0.2s ease, color 0.2s ease",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.borderColor = "#9be7ff";
            event.currentTarget.style.color = "#9be7ff";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.borderColor = "rgba(249, 251, 255, 0.24)";
            event.currentTarget.style.color = "#f9fbff";
          }}
        >
          Back to hexagram analysis
        </Link>
      </header>

      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
          padding: "0 clamp(24px, 6vw, 96px) 64px",
        }}
      >
        {renderAgentStatus()}

        {renderVideoOrLoading()}

        <button
          type="button"
          onClick={handleRegenerate}
          style={{
            marginTop: 8,
            border: "1px solid rgba(155, 231, 255, 0.32)",
            borderRadius: 999,
            padding: "10px 18px",
            fontSize: 12,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#f9fbff",
            background: "transparent",
            cursor: "pointer",
          }}
          disabled={isLoadingPaintings || isLoadingPoem}
        >
          {isLoadingPaintings || isLoadingPoem
            ? "Generating…"
            : "Regenerate Content"}
        </button>
      </section>
    </main>
  );
};

export default VideoJourneyPage;

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <article
    style={{
      padding: "28px 32px",
      borderRadius: 24,
      border: "1px solid rgba(155, 231, 255, 0.2)",
      background:
        "linear-gradient(165deg, rgba(10, 16, 42, 0.8) 0%, rgba(6, 10, 28, 0.95) 65%, rgba(5, 8, 22, 0.98) 100%)",
      boxShadow: "0 24px 48px rgba(5, 8, 22, 0.35)",
      backdropFilter: "blur(12px)",
    }}
  >
    <h3 style={{ fontSize: 20, marginBottom: 12 }}>{title}</h3>
    <p style={{ fontSize: 16, lineHeight: 1.5, opacity: 0.78 }}>
      {description}
    </p>
  </article>
);
