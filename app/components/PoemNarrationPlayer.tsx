"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CallbackListener, PlayerRef } from "@remotion/player";
import type { PoemData } from "../remotion/VideoJourneyComposition";

interface ParagraphAudioState {
  audio: HTMLAudioElement | null;
  status: "idle" | "loading" | "ready" | "error";
  playOnReady: boolean;
  controller?: AbortController;
  objectUrl?: string;
  error?: string;
}

const AUDIO_MIME_TYPE = "audio/mpeg";
const DEFAULT_VOICE = "alloy";

const getParagraphKey = (poem: PoemData | null) =>
  poem?.paragraphs?.map((paragraph) => paragraph.trim()).join("\n\n") ?? "";

const getParagraphIndexForFrame = (
  frame: number,
  totalFrames: number,
  paragraphCount: number
) => {
  if (paragraphCount === 0 || totalFrames === 0) {
    return 0;
  }

  const framesPerParagraph = totalFrames / paragraphCount;
  const index = Math.floor(frame / framesPerParagraph);
  return Math.min(Math.max(index, 0), paragraphCount - 1);
};

const ensureAudioStops = (state: ParagraphAudioState | undefined) => {
  if (!state?.audio) {
    return;
  }

  state.audio.pause();
  state.audio.currentTime = 0;
  state.playOnReady = false;
};

const revokeStateUrl = (state: ParagraphAudioState | undefined) => {
  if (state?.objectUrl) {
    URL.revokeObjectURL(state.objectUrl);
    state.objectUrl = undefined;
  }
};

const attemptPlay = async (state: ParagraphAudioState | undefined) => {
  if (!state?.audio) {
    return;
  }

  try {
    await state.audio.play();
  } catch (error) {
    console.warn("[PoemNarrationPlayer] Autoplay failed", error);
    state.playOnReady = true;
  }
};

interface PoemNarrationPlayerProps {
  poem: PoemData | null;
  playerRef: React.RefObject<PlayerRef | null>;
  durationInFrames: number;
  voice?: string;
  instructions?: string;
}

export const PoemNarrationPlayer = ({
  poem,
  playerRef,
  durationInFrames,
  voice = DEFAULT_VOICE,
  instructions,
}: PoemNarrationPlayerProps) => {
  const paragraphKey = useMemo(() => getParagraphKey(poem), [poem]);
  const paragraphCount = poem?.paragraphs?.length ?? 0;

  const paragraphStatesRef = useRef<ParagraphAudioState[]>([]);
  const currentParagraphRef = useRef<number>(0);
  const isVideoPlayingRef = useRef(false);
  const totalFramesRef = useRef(durationInFrames);

  const setActiveParagraph = (
    index: number,
    shouldAutoplay: boolean
  ): void => {
    const previousIndex = currentParagraphRef.current;

    if (index === previousIndex) {
      const currentState = paragraphStatesRef.current[index];
      if (shouldAutoplay && currentState) {
        currentState.playOnReady = true;
        if (currentState.status === "ready") {
          void attemptPlay(currentState);
        }
      }
      return;
    }

    const previousState = paragraphStatesRef.current[previousIndex];
    ensureAudioStops(previousState);

    currentParagraphRef.current = index;

    const targetState = paragraphStatesRef.current[index];
    if (!targetState) {
      return;
    }

    targetState.playOnReady = shouldAutoplay;

    if (shouldAutoplay && targetState.status === "ready") {
      void attemptPlay(targetState);
    }
  };

  useEffect(() => {
    totalFramesRef.current = durationInFrames;
  }, [durationInFrames]);

  useEffect(() => {
    paragraphStatesRef.current.forEach((state) => {
      state.controller?.abort();
      ensureAudioStops(state);
      revokeStateUrl(state);
    });

    paragraphStatesRef.current = [];
    currentParagraphRef.current = 0;

    if (!poem?.paragraphs?.length) {
      return undefined;
    }

    const paragraphs = poem.paragraphs;
    const cancelledRef = { cancelled: false };

    const fetchSequentially = async () => {
      for (let index = 0; index < paragraphs.length; index += 1) {
        if (cancelledRef.cancelled) {
          return;
        }

        const text = paragraphs[index];
        const controller = new AbortController();
        const state: ParagraphAudioState = {
          audio: null,
          status: "loading",
          playOnReady: false,
          controller,
        };

        paragraphStatesRef.current[index] = state;

        try {
          const response = await fetch("/api/poem-tts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              voice,
              instructions,
            }),
            signal: controller.signal,
          });

          if (!response.ok) {
            throw new Error(`TTS request failed with status ${response.status}`);
          }

          const arrayBuffer = await response.arrayBuffer();
          if (cancelledRef.cancelled) {
            return;
          }

          const blob = new Blob([arrayBuffer], { type: AUDIO_MIME_TYPE });
          const objectUrl = URL.createObjectURL(blob);
          const audio = new Audio(objectUrl);
          audio.preload = "auto";
          audio.onended = () => {
            if (currentParagraphRef.current !== index) {
              return;
            }

            const nextIndex = Math.min(index + 1, paragraphStatesRef.current.length - 1);

            if (nextIndex === index) {
              return;
            }

            setActiveParagraph(nextIndex, isVideoPlayingRef.current);

            const player = playerRef.current;
            if (!player) {
              return;
            }

            const framesPerParagraph =
              paragraphStatesRef.current.length === 0
                ? 0
                : totalFramesRef.current / paragraphStatesRef.current.length;
            const nextFrame = Math.floor(nextIndex * framesPerParagraph);
            const currentFrame = player.getCurrentFrame();

            if (currentFrame < nextFrame) {
              player.seekTo(nextFrame);
            }
          };

          state.audio = audio;
          state.status = "ready";
          state.objectUrl = objectUrl;

          if (state.playOnReady && isVideoPlayingRef.current) {
            await attemptPlay(state);
          }
        } catch (error) {
          if ((error as Error).name === "AbortError" || cancelledRef.cancelled) {
            return;
          }

          state.status = "error";
          state.error = error instanceof Error ? error.message : "Unknown error";
          console.error("[PoemNarrationPlayer] Failed to fetch paragraph audio", error);
        }
      }
    };

    void fetchSequentially();

    return () => {
      cancelledRef.cancelled = true;
      paragraphStatesRef.current.forEach((state) => {
        state.controller?.abort();
        ensureAudioStops(state);
        revokeStateUrl(state);
      });
      paragraphStatesRef.current = [];
    };
  }, [paragraphKey, voice, instructions, poem, playerRef]);

  useEffect(() => {
    const player = playerRef.current;

    if (!player || paragraphCount === 0) {
      return undefined;
    }

    const handlePlay: CallbackListener<"play"> = () => {
      isVideoPlayingRef.current = true;
      const currentState = paragraphStatesRef.current[currentParagraphRef.current];

      if (currentState?.status === "ready") {
        currentState.playOnReady = true;
        void attemptPlay(currentState);
      } else if (currentState) {
        currentState.playOnReady = true;
      }
    };

    const handlePause: CallbackListener<"pause"> = () => {
      isVideoPlayingRef.current = false;
      const currentState = paragraphStatesRef.current[currentParagraphRef.current];
      currentState?.audio?.pause();
    };

    const handleSeek: CallbackListener<"seeked"> = ({ detail }) => {
      const index = getParagraphIndexForFrame(
        detail.frame,
        totalFramesRef.current,
        paragraphCount
      );

      setActiveParagraph(index, isVideoPlayingRef.current);
    };

    const handleFrameUpdate: CallbackListener<"frameupdate"> = ({ detail }) => {
      const index = getParagraphIndexForFrame(
        detail.frame,
        totalFramesRef.current,
        paragraphCount
      );

      setActiveParagraph(index, isVideoPlayingRef.current);
    };

    const handleEnded: CallbackListener<"ended"> = () => {
      isVideoPlayingRef.current = false;
      const currentState = paragraphStatesRef.current[currentParagraphRef.current];
      currentState?.audio?.pause();
    };

    player.addEventListener("play", handlePlay);
    player.addEventListener("pause", handlePause);
    player.addEventListener("seeked", handleSeek);
    player.addEventListener("frameupdate", handleFrameUpdate);
    player.addEventListener("ended", handleEnded);

    return () => {
      player.removeEventListener("play", handlePlay);
      player.removeEventListener("pause", handlePause);
      player.removeEventListener("seeked", handleSeek);
      player.removeEventListener("frameupdate", handleFrameUpdate);
      player.removeEventListener("ended", handleEnded);
    };
  }, [paragraphCount, playerRef]);

  return null;
};
