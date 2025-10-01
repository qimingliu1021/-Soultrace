import "dotenv/config";
import OpenAI from "openai";

// Use GPT-4 as the primary model for image generation
const DEFAULT_IMAGE_MODEL = "gpt-4";

const FALLBACK_MODELS = Array.from(
  new Set(["gpt-4", "dall-e-3", "dall-e-2"].filter(Boolean))
);

const ASPECT_RATIO_TO_SIZE = new Map([
  ["16:9", "1792x1024"],
  ["9:16", "1024x1792"],
  ["1:1", "1024x1024"],
  ["4:3", "1536x1152"],
  ["3:4", "1152x1536"],
]);

const DEFAULT_SIZE = "1792x1024";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function resolveDimensions(aspectRatio) {
  const size = resolveSize(aspectRatio);
  const [widthStr, heightStr] = size.split("x");
  const width = Number(widthStr) || 1792;
  const height = Number(heightStr) || 1024;
  return { width, height };
}

function pickPalette(palette) {
  if (!Array.isArray(palette) || palette.length === 0) {
    return ["#0f172a", "#1e293b", "#334155"];
  }
  if (palette.length >= 3) return palette.slice(0, 3);
  if (palette.length === 2) return [...palette, palette[0]];
  return [palette[0], palette[0], palette[0]];
}

function buildFallbackImage({ prompt, palette, aspectRatio }) {
  const { width, height } = resolveDimensions(aspectRatio);
  const [primary, secondary, accent] = pickPalette(palette);
  const promptSnippet = (prompt ?? "").slice(0, 120).replace(/\s+/g, " ");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${primary}" />
      <stop offset="70%" stop-color="${secondary}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="70%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.45" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect width="${width}" height="${height}" fill="url(#glow)" />
  <g fill="none" stroke="rgba(255,255,255,0.16)" stroke-width="2">
    <path d="M0 ${height * 0.7} Q ${width * 0.25} ${height * 0.6}, ${width * 0.45} ${height * 0.72} T ${width} ${height * 0.62}" />
    <path d="M0 ${height * 0.84} Q ${width * 0.35} ${height * 0.78}, ${width * 0.58} ${height * 0.88} T ${width} ${height * 0.82}" />
  </g>
  <text x="5%" y="90%" fill="rgba(255,255,255,0.35)" font-family="'Inter', sans-serif" font-size="${Math.max(
    Math.round(height * 0.035),
    20
  )}" letter-spacing="2" text-transform="uppercase">
    Soultrace Fallback • ${promptSnippet}
  </text>
</svg>`;

  return Buffer.from(svg).toString("base64");
}

function buildImagePrompt({ prompt, palette, aspectRatio }) {
  const paletteHint =
    Array.isArray(palette) && palette.length > 0
      ? `\nColor palette emphasis: ${palette.join(", ")}.`
      : "";

  const aspectHint = aspectRatio
    ? `\nAspect ratio target: ${aspectRatio}.`
    : "";

  return `${prompt?.trim() ?? ""}
Render a richly detailed, cinematic digital painting with painterly lighting, depth, and atmosphere.${paletteHint}${aspectHint}
Exclude any text or typography.`.trim();
}

function resolveSize(aspectRatio) {
  if (!aspectRatio) return DEFAULT_SIZE;
  const size = ASPECT_RATIO_TO_SIZE.get(aspectRatio);
  return size ?? DEFAULT_SIZE;
}

async function tryGenerateWithModel({ model, prompt, size }) {
  // Use DALL-E models for actual image generation since GPT-4 doesn't generate images directly
  const imageModel = model === "gpt-4" ? "dall-e-3" : model;

  const response = await client.images.generate({
    model: imageModel,
    prompt,
    size,
    n: 1,
    quality: "hd",
    response_format: "b64_json",
  });

  const first = response?.data?.[0];
  if (!first || (!first.b64_json && !first.url)) {
    throw new Error(`Model ${imageModel} returned no image data`);
  }

  return {
    imageB64: first.b64_json ?? null,
    imageUrl: first.url ?? null,
    model: imageModel,
    mimeType: first.mimeType ?? "image/png",
    response,
  };
}

export async function generateImagePainting({ prompt, palette, aspectRatio }) {
  if (!process.env.OPENAI_API_KEY) {
    const fallback = buildFallbackImage({ prompt, palette, aspectRatio });
    return {
      imageB64: fallback,
      imageUrl: null,
      prompt: prompt ?? "",
      mimeType: "image/svg+xml",
      meta: {
        usedOpenAI: false,
        error: "Missing OPENAI_API_KEY",
        fallback: true,
        size: resolveSize(aspectRatio),
      },
    };
  }

  const finalPrompt = buildImagePrompt({ prompt, palette, aspectRatio });
  const size = resolveSize(aspectRatio);

  const attemptErrors = [];

  for (const model of FALLBACK_MODELS) {
    try {
      const result = await tryGenerateWithModel({
        model,
        prompt: finalPrompt,
        size,
      });
      return {
        imageB64: result.imageB64,
        imageUrl: result.imageUrl,
        prompt: finalPrompt,
        mimeType: result.mimeType,
        meta: {
          usedOpenAI: true,
          model: result.model,
          size,
        },
      };
    } catch (error) {
      attemptErrors.push(
        `${model}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  const fallback = buildFallbackImage({ prompt: finalPrompt, palette, aspectRatio });
  return {
    imageB64: fallback,
    imageUrl: null,
    prompt: finalPrompt,
    mimeType: "image/svg+xml",
    meta: {
      usedOpenAI: false,
      model: DEFAULT_IMAGE_MODEL,
      error: `All image models failed. Attempts: ${attemptErrors.join("; ")}`,
      fallback: true,
      size,
    },
  };
}

export default generateImagePainting;
