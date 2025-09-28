import { NextRequest, NextResponse } from "next/server";

const MCP_ENDPOINT = process.env.MCP_SERVER_URL ?? "http://localhost:8787/mcp";

interface PoemRequestBody {
  topic?: string;
  emotion?: string;
  situation?: string;
  intensity?: string;
  mood?: string;
  purpose?: string;
  tone?: string;
  genre?: string;
  cities?: string[];
}

export async function POST(request: NextRequest) {
  // console.log("[poem-api] Starting poem generation request");

  let body: PoemRequestBody;

  try {
    body = await request.json();
    // console.log("[poem-api] Request body:", body);
  } catch {
    console.error("[poem-api] Invalid JSON body");
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    // console.log("[poem-api] Calling MCP server at:", MCP_ENDPOINT);

    const requestPayload = {
      type: "call_tool",
      tool_name: "generate_video_journey_poem",
      arguments: {
        topic: body.topic || "a journey through cities and souls",
        emotion: body.emotion || "contemplative",
        situation: body.situation || "cultural exploration",
        intensity: body.intensity || "moderate",
        mood: body.mood || "reflective",
        purpose: body.purpose || "visual storytelling",
        tone: body.tone || "poetic",
        genre: body.genre,
        cities: body.cities || ["Chongqing", "New York", "Lincoln", "Shanghai"],
      },
    };

    const response = await fetch(MCP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    // console.log("[poem-api] MCP server response status:", response.status);

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      const errorText = await response.text().catch(() => "Unknown error");

      console.error("[poem-api] MCP server error:", {
        status: response.status,
        payload: errorPayload,
        text: errorText,
      });

      return NextResponse.json(
        {
          error: "Poem agent failed",
          details: errorPayload ?? errorText,
          status: response.status,
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    // console.log("[poem-api] MCP server response data:", data);

    if (
      data?.type !== "tool_response" ||
      data?.tool_name !== "generate_video_journey_poem"
    ) {
      console.error("[poem-api] Unexpected response format:", data);
      return NextResponse.json(
        { error: "Unexpected response from MCP server", data },
        { status: 502 }
      );
    }

    // console.log("[poem-api] Success! Returning poem data");
    return NextResponse.json(data.content, { status: 200 });
  } catch (error) {
    console.error("[poem-api] Network error:", error);
    return NextResponse.json(
      { error: "Unable to reach MCP server", details: String(error) },
      { status: 504 }
    );
  }
}
