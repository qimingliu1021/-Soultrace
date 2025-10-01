"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IChingHexagram } from "../lib/csvParser";
import { AnalysisDisplay } from "../components/AnalysisDisplay";

function HexagramAnalysisContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<{
    originalHexagram: IChingHexagram;
    allHexagrams: {
      original: IChingHexagram;
      changed: IChingHexagram | null;
      mutual: IChingHexagram | null;
      opposite: IChingHexagram | null;
      inverted: IChingHexagram | null;
    };
    userInput: {
      city: string;
      experience: string;
      difficulty: string;
      number: number;
    };
    analysis?: {
      summary: string;
      insights: string[];
      recommendations: string[];
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [thinkingLog, setThinkingLog] = useState<string>("");
  const [analysisStream, setAnalysisStream] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const esRef = useRef<EventSource | null>(null);
  const [cityImageUrl, setCityImageUrl] = useState<string | null>(null);
  const [cityImagePrompt, setCityImagePrompt] = useState<string | null>(null);
  const [cityImageLoading, setCityImageLoading] = useState<boolean>(false);
  const [cityImageError, setCityImageError] = useState<string | null>(null);

  useEffect(() => {
    const loadResult = async () => {
      try {
        console.log("Loading result data...");

        // Try to get data from sessionStorage first
        const storedData = sessionStorage.getItem("hexagramResult");
        console.log("Stored data:", storedData);

        if (storedData) {
          const resultData = JSON.parse(storedData);
          console.log("Parsed result data:", resultData);
          setResult(resultData);
          // Clear the stored data after using it
          sessionStorage.removeItem("hexagramResult");
        } else {
          // Fallback to URL parameters if sessionStorage is empty
          const hexagramData = searchParams.get("hexagram");
          const userInputData = searchParams.get("userInput");
          const analysisData = searchParams.get("analysis");

          if (hexagramData && userInputData) {
            const originalHexagram = JSON.parse(
              decodeURIComponent(hexagramData)
            );
            const userInput = JSON.parse(decodeURIComponent(userInputData));
            let analysis = null;

            if (analysisData) {
              analysis = JSON.parse(decodeURIComponent(analysisData));
            }

            // For backward compatibility, create allHexagrams with just the original
            const allHexagrams = {
              original: originalHexagram,
              changed: null,
              mutual: null,
              opposite: null,
              inverted: null,
            };

            setResult({ originalHexagram, allHexagrams, userInput, analysis });
          } else {
            // If no data is available, create sample data instead of redirecting
            console.log("No data found, creating sample hexagram data");
            const sampleHexagram: IChingHexagram = {
              id: 1,
              trad_chinese: "乾",
              english: "The Creative",
              wilhelm_symbolic: "Heaven above Heaven",
              wilhelm_judgment: {
                text: "The Creative works sublime success, furthering through perseverance.",
                comments:
                  "The Creative is the principle of the beginning. It represents the primal power of the universe.",
              },
              wilhelm_image: {
                text: "The movement of heaven is full of power. Thus the superior man makes himself strong and untiring.",
                comments:
                  "The image of pure yang energy in motion, representing continuous creative force.",
              },
              wilhelm_lines: {
                "1": {
                  text: "Hidden dragon. Do not act.",
                  comments:
                    "The beginning stage requires patience and preparation.",
                },
                "2": {
                  text: "Dragon appearing in the field. It furthers one to see the great man.",
                  comments: "Emerging potential becomes visible.",
                },
                "3": {
                  text: "All day long the superior man is creatively active. At nightfall his mind is still beset with cares. Danger. No blame.",
                  comments: "Continuous effort with mindful awareness.",
                },
                "4": {
                  text: "Wavering flight over the depths. No blame.",
                  comments: "Testing one's wings, careful progress.",
                },
                "5": {
                  text: "Flying dragon in the heavens. It furthers one to see the great man.",
                  comments: "Full realization of potential and power.",
                },
                "6": {
                  text: "Arrogant dragon will have cause to repent.",
                  comments: "Warning against overextension and pride.",
                },
              },
            };

            const sampleUserInput = {
              city: "Sample City",
              experience:
                "This is a sample experience for demonstration purposes.",
              difficulty:
                "This is a sample difficulty for demonstration purposes.",
              number: 123,
            };

            const allHexagrams = {
              original: sampleHexagram,
              changed: null,
              mutual: null,
              opposite: null,
              inverted: null,
            };

            setResult({
              originalHexagram: sampleHexagram,
              allHexagrams,
              userInput: sampleUserInput,
            });
          }
        }
      } catch (error) {
        console.error("Error loading result:", error);
        // Instead of redirecting, show an error state
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [searchParams]);

  // Generate city image once the user's city is available
  useEffect(() => {
    const generateCityImage = async (city: string) => {
      try {
        setCityImageLoading(true);
        setCityImageError(null);
        setCityImageUrl(null);
        setCityImagePrompt(null);
        const res = await fetch("/api/city-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to fetch city image");
        }
        const data = await res.json();
        const url: string | null = data.imageUrl || null;
        const b64: string | null = data.imageB64 || null;
        const prompt: string | null = data.prompt || null;
        setCityImagePrompt(prompt);
        if (url) {
          setCityImageUrl(url);
        } else if (b64) {
          setCityImageUrl(`data:image/png;base64,${b64}`);
        } else {
          throw new Error("No image returned");
        }
      } catch (e: any) {
        setCityImageError(String(e?.message || e));
      } finally {
        setCityImageLoading(false);
      }
    };

    const city = result?.userInput?.city?.trim();
    if (city && city !== "Sample City") {
      generateCityImage(city);
    }
  }, [result?.userInput?.city]);

  // Streaming handlers
  function startStreaming(modelParam?: string) {
    if (!result) return;
    if (isStreaming) return;
    const { city, experience, difficulty, number } = result.userInput;
    const params = new URLSearchParams({
      city,
      experience,
      difficulty,
      number: String(number),
    });
    const prev = (result as any).userInput?.previousCities;
    if (Array.isArray(prev) && prev.length > 0) {
      try {
        params.set("previousCities", JSON.stringify(prev));
      } catch {}
    }
    if (modelParam) params.set("model", modelParam);

    const es = new EventSource(`/api/hexagrams/stream?${params.toString()}`);
    esRef.current = es;
    setIsStreaming(true);
    setThinkingLog("");
    setAnalysisStream("");

    es.addEventListener("open", () => {
      setThinkingLog((prev) => prev + `Connected to analysis stream.\n`);
    });

    es.addEventListener("step", (evt: MessageEvent) => {
      try {
        const data = JSON.parse(evt.data);
        if (data?.message) {
          setThinkingLog((prev) => prev + `• ${data.message}\n`);
        }
      } catch {
        setThinkingLog((prev) => prev + `• ${evt.data}\n`);
      }
    });

    es.addEventListener("hexagrams", (evt: MessageEvent) => {
      try {
        const data = JSON.parse(evt.data);
        setResult((prev) => (prev ? { ...prev, allHexagrams: data } : prev));
        setThinkingLog((prev) => prev + `• Related hexagrams derived.\n`);
      } catch {
        // ignore
      }
    });

    es.addEventListener("user_situation", (evt: MessageEvent) => {
      try {
        const data = JSON.parse(evt.data);
        setThinkingLog((prev) => prev + `• User situation analyzed.\n`);
      } catch {
        // ignore
      }
    });

    es.addEventListener("analysis_start", (evt: MessageEvent) => {
      setThinkingLog(
        (prev) => prev + `• Starting AI analysis (streaming)...\n`
      );
    });

    es.addEventListener("analysis_delta", (evt: MessageEvent) => {
      try {
        const data = JSON.parse(evt.data);
        if (data?.text) setAnalysisStream((prev) => prev + data.text);
      } catch {
        setAnalysisStream((prev) => prev + evt.data);
      }
    });

    es.addEventListener("analysis_done", () => {
      setThinkingLog((prev) => prev + `• Analysis completed.\n`);
      stopStreaming();
    });

    es.addEventListener("analysis_info", (evt: MessageEvent) => {
      setThinkingLog((prev) => prev + `• Info: ${evt.data}\n`);
    });

    es.addEventListener("error", (evt: MessageEvent) => {
      setThinkingLog((prev) => prev + `• Error: ${evt.data}\n`);
      stopStreaming();
    });
  }

  function stopStreaming() {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setIsStreaming(false);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your divination result...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Result Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Unable to load your divination result.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Divination
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Your I Ching Result
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on the ancient wisdom of the I Ching
          </p>
          {result.userInput.city === "Sample City" && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-yellow-800">
                📝 This is sample data for demonstration. Use the form on the
                home page to generate your personalized reading.
              </p>
            </div>
          )}
        </div>

        {/* 本卦信息 */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
          {/* City-inspired Cinematic Image */}
          {result.userInput.city !== "Sample City" && (
            <div className="mb-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                City-Inspired Image
              </h3>
              <p className="text-center text-gray-600 mb-4">
                A cinematic visual inspired by your city:{" "}
                <span className="font-medium">{result.userInput.city}</span>
              </p>
              {cityImageLoading && (
                <div className="text-center text-gray-500">
                  Generating image...
                </div>
              )}
              {!cityImageLoading && cityImageError && (
                <div className="text-center text-red-600 text-sm">
                  {cityImageError}
                </div>
              )}
              {!cityImageLoading && cityImageUrl && (
                <div className="rounded-lg overflow-hidden shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cityImageUrl}
                    alt={`City artwork of ${result.userInput.city}`}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              )}
              {!cityImageLoading && cityImagePrompt && (
                <details className="mt-3 bg-gray-50 p-3 rounded border border-gray-200">
                  <summary className="cursor-pointer text-sm text-gray-700">
                    View image prompt
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 whitespace-pre-wrap">
                    {cityImagePrompt}
                  </p>
                </details>
              )}
            </div>
          )}

          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              本卦 (Primary Hexagram): {result.originalHexagram.trad_chinese} -{" "}
              {result.originalHexagram.english}
            </h3>
            <p className="text-lg text-gray-600">
              {result.originalHexagram.wilhelm_symbolic}
            </p>
          </div>

          {/* Judgment */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">
              Judgment
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed italic mb-4">
              &ldquo;{result.originalHexagram.wilhelm_judgment.text}&rdquo;
            </p>
            <div className="p-4 bg-white rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">
                Interpretation:
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {result.originalHexagram.wilhelm_judgment.comments}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Image</h4>
            <p className="text-lg text-gray-700 leading-relaxed italic mb-4">
              &ldquo;{result.originalHexagram.wilhelm_image.text}&rdquo;
            </p>
            <div className="p-4 bg-white rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">
                Interpretation:
              </h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {result.originalHexagram.wilhelm_image.comments}
              </p>
            </div>
          </div>

          {/* Lines (六爻) */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-6 text-gray-800 text-center">
              The Six Lines (六爻)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result.originalHexagram.wilhelm_lines).map(
                ([lineNumber, lineData], index) => {
                  const line = lineData as { text: string; comments: string };
                  return (
                    <div
                      key={lineNumber}
                      className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {lineNumber}
                        </div>
                        <h5 className="text-sm font-medium text-amber-800">
                          Line {lineNumber}{" "}
                          {index === 0
                            ? "(Bottom)"
                            : index === 5
                            ? "(Top)"
                            : ""}
                        </h5>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2 italic">
                        "{line.text}"
                      </p>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        {line.comments}
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* 相关卦象 */}
        <div className="max-w-6xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Related Hexagrams (相关卦象)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 变卦 */}
            {result.allHexagrams.changed && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    变
                  </span>
                  变卦 (Changed)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">
                    {result.allHexagrams.changed.trad_chinese} -{" "}
                    {result.allHexagrams.changed.english}
                  </h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Represents development trend or result
                  </p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">
                    &ldquo;{result.allHexagrams.changed.wilhelm_judgment.text}
                    &rdquo;
                  </p>
                  <p className="text-xs text-gray-600">
                    {result.allHexagrams.changed.wilhelm_symbolic.substring(
                      0,
                      100
                    )}
                    ...
                  </p>
                </div>
              </div>
            )}

            {/* 互卦 */}
            {result.allHexagrams.mutual && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    互
                  </span>
                  互卦 (Mutual)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">
                    {result.allHexagrams.mutual.trad_chinese} -{" "}
                    {result.allHexagrams.mutual.english}
                  </h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Represents inner mechanism or process
                  </p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">
                    &ldquo;{result.allHexagrams.mutual.wilhelm_judgment.text}
                    &rdquo;
                  </p>
                  <p className="text-xs text-gray-600">
                    {result.allHexagrams.mutual.wilhelm_symbolic.substring(
                      0,
                      100
                    )}
                    ...
                  </p>
                </div>
              </div>
            )}

            {/* 错卦 */}
            {result.allHexagrams.opposite && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    错
                  </span>
                  错卦 (Opposite)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">
                    {result.allHexagrams.opposite.trad_chinese} -{" "}
                    {result.allHexagrams.opposite.english}
                  </h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Represents opposite perspective
                  </p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">
                    &ldquo;{result.allHexagrams.opposite.wilhelm_judgment.text}
                    &rdquo;
                  </p>
                  <p className="text-xs text-gray-600">
                    {result.allHexagrams.opposite.wilhelm_symbolic.substring(
                      0,
                      100
                    )}
                    ...
                  </p>
                </div>
              </div>
            )}

            {/* 综卦 */}
            {result.allHexagrams.inverted && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    综
                  </span>
                  综卦 (Inverted)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">
                    {result.allHexagrams.inverted.trad_chinese} -{" "}
                    {result.allHexagrams.inverted.english}
                  </h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Represents reverse perspective
                  </p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">
                    &ldquo;{result.allHexagrams.inverted.wilhelm_judgment.text}
                    &rdquo;
                  </p>
                  <p className="text-xs text-gray-600">
                    {result.allHexagrams.inverted.wilhelm_symbolic.substring(
                      0,
                      100
                    )}
                    ...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Input Review */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">
              Your Input
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">City</h5>
                <p className="text-gray-600">{result.userInput.city}</p>
              </div>
              {Array.isArray((result as any).userInput?.previousCities) &&
                (result as any).userInput.previousCities.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-2">
                      Previous Cities
                    </h5>
                    <ul className="text-gray-600 list-disc list-inside space-y-1">
                      {(result as any).userInput.previousCities.map(
                        (c: string) => (
                          <li key={c}>{c}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              <div>
                <h5 className="font-medium text-gray-700 mb-2">
                  Personal Experience
                </h5>
                <p className="text-gray-600">{result.userInput.experience}</p>
              </div>
              <div className="md:col-span-2">
                <h5 className="font-medium text-gray-700 mb-2">
                  Current Difficulty
                </h5>
                <p className="text-gray-600">{result.userInput.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="text-center space-x-4">
            <button
              onClick={() => (window.location.href = "/")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Divinate Again
            </button>
            <button
              onClick={() => (window.location.href = "/video-journey")}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Video Journey
            </button>
          </div>
        </div>

        {/* Live Streaming Analysis (English thinking process) */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Live Analysis (Streaming)
              </h3>
              <div className="space-x-3">
                {!isStreaming ? (
                  <>
                    <button
                      onClick={() => startStreaming("gpt-5")}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Start Stream (gpt-5)
                    </button>
                    <button
                      onClick={() => startStreaming()}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Start Stream (default model)
                    </button>
                  </>
                ) : (
                  <button
                    onClick={stopStreaming}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Stop Stream
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  Thinking Process (English)
                </h4>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border border-gray-200 h-64 overflow-auto">
                  {thinkingLog || "Click Start Stream to begin..."}
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  AI Analysis (Streaming)
                </h4>
                <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded border border-gray-200 h-64 overflow-auto">
                  {analysisStream}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        {result.analysis && <AnalysisDisplay analysis={result.analysis} />}

        {/* 底部信息 */}
        <footer className="text-center mt-16 text-gray-500">
          <p className="mb-2">
            Based on the ancient wisdom of the I Ching, combined with modern AI
            technology
          </p>
        </footer>
      </div>
    </div>
  );
}

export default function HexagramAnalysisPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <HexagramAnalysisContent />
    </Suspense>
  );
}
