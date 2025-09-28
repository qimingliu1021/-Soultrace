import { NextRequest } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MIME_TYPES: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  opus: "audio/ogg",
  aac: "audio/aac",
  flac: "audio/flac",
  pcm: "audio/L16",
};

type SupportedFormats = keyof typeof MIME_TYPES;

interface TtsRequestBody {
  text?: string;
  voice?: string;
  instructions?: string;
  format?: SupportedFormats;
}

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "OPENAI_API_KEY is not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: TtsRequestBody;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const text = body.text?.trim();

  if (!text) {
    return new Response(
      JSON.stringify({ error: "The 'text' field is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const voice = body.voice?.trim() || "alloy";
  const format: SupportedFormats =
    body.format && MIME_TYPES[body.format] ? body.format : "mp3";

  try {
    const speechClient = client.audio.speech as unknown as {
      with_streaming_response: {
        create: (params: {
          model: string;
          voice: string;
          input: string;
          response_format: SupportedFormats;
          instructions?: string;
        }) => Promise<{
          toReadableStream: () => Promise<ReadableStream<Uint8Array>>;
        }>;
      };
    };

    // const streamingResponse = await speechClient.with_streaming_response.create({
    //   model: "gpt-4o-mini-tts",
    //   voice,
    //   input: text,
    //   response_format: format,
    //   instructions: body.instructions,
    // });

    // const readableStream = await streamingResponse.toReadableStream();

    // return new Response(readableStream, {
    //   status: 200,
    //   headers: {
    //     "Content-Type": MIME_TYPES[format] ?? "application/octet-stream",
    //     "Cache-Control": "no-store",
    //     "Transfer-Encoding": "chunked",
    //   },
    // });
    const result = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
      instructions: body.instructions,
      // response_format: format as SupportedFormats,
    });
    const buffer = Buffer.from(await result.arrayBuffer());
    return new Response(buffer, {
      headers: { "Content-Type": MIME_TYPES[format] },
    });
  } catch (error) {
    console.error("[poem-tts] Failed to generate audio", error);

    return new Response(
      JSON.stringify({
        error: "Failed to generate speech",
        details: String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
