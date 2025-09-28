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
import { PoemNarrationPlayer } from "../components/PoemNarrationPlayer";

const COMPOSITION_WIDTH = 1280;
const COMPOSITION_HEIGHT = 720;

interface AgentResponse {
  html: string;
  meta?: {
    model?: string;
    usedOpenAI?: boolean;
    tokens?: unknown;
    error?: string;
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
  const playerRef = useRef<PlayerRef | null>(null);

  // Check function to determine if all five images are ready
  const areAllImagesReady = useCallback(() => {
    return (
      slides.length === paintingSlides.length &&
      slides.every((slide) => slide.html && slide.html.trim() !== "")
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

          return {
            ...config,
            html: data.html,
            meta: data.meta,
          } satisfies PaintingSlide;
        })
      );

      setSlides(responses);
    } catch (agentError) {
      setPaintingError(
        agentError instanceof Error ? agentError.message : String(agentError)
      );
    } finally {
      setIsLoadingPaintings(false);
    }
  }, []);

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
    } catch (agentError) {
      setPoemError(
        agentError instanceof Error ? agentError.message : String(agentError)
      );
    } finally {
      setIsLoadingPoem(false);
    }
  }, []);

  useEffect(() => {
    // Fetch both paintings and poem in parallel
    fetchPaintings();
    fetchPoem();
  }, [fetchPaintings, fetchPoem]);

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
          href="/"
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
          Back home
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

        {poem?.paragraphs?.length ? (
          <>
            <PoemNarrationPlayer
              poem={poem}
              playerRef={playerRef}
              durationInFrames={durationInFrames}
            />
            <div
              style={{
                fontSize: 11,
                letterSpacing: 1.2,
                textTransform: "uppercase",
                opacity: 0.7,
              }}
            >
              Audio narration uses an AI-generated voice.
            </div>
          </>
        ) : null}

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
