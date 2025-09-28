import express from "express";
import "dotenv/config";
import { generateHtmlPainting } from "./paintingAgent.js";
import { generateVideoJourneyPoem } from "./poemAgent.js";
console.log("🚀 server.js: paintingAgent and poemAgent imported successfully");

console.log("🚀 server.js: Starting server...");

console.log("🚀 server.js: Importing paintingAgent...");
console.log("🚀 server.js: paintingAgent imported successfully");

console.log("🚀 server.js: Importing poemAgent...");
console.log("🚀 server.js: poemAgent imported successfully");

const app = express();
const port = process.env.MCP_PORT ?? 8787;
const baseUrl = process.env.MCP_SERVER_URL ?? `http://localhost:${port}/mcp`;

console.log("🚀 server.js: Environment check:");
console.log("- OPENAI_API_KEY present:", !!process.env.OPENAI_API_KEY);
console.log("- MCP_PORT:", process.env.MCP_PORT);
console.log("- MCP_SERVER_URL:", process.env.MCP_SERVER_URL ?? baseUrl);

app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const TOOL_DEFINITIONS = [
  {
    name: "generate_html_painting",
    description:
      "Create an HTML painting from a prompt, color palette, and optional aspect ratio.",
    input_schema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "Creative prompt describing the desired painting.",
        },
        palette: {
          type: "array",
          items: { type: "string" },
          description: "List of CSS color strings to influence the palette.",
        },
        aspectRatio: {
          type: "string",
          enum: ["16:9", "9:16", "1:1", "4:3"],
          description: "Aspect ratio for the rendered composition.",
        },
        title: {
          type: "string",
          description: "Optional title metadata for the artwork.",
        },
      },
      required: ["prompt"],
      additionalProperties: false,
    },
  },
  {
    name: "generate_video_journey_poem",
    description:
      "Generate a multi-paragraph poem describing a journey across cities and emotions.",
    input_schema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        topic: { type: "string", description: "Primary topic or theme." },
        emotion: { type: "string", description: "Dominant emotional tone." },
        situation: { type: "string", description: "Context of the journey." },
        intensity: { type: "string", description: "Emotional intensity." },
        mood: { type: "string", description: "Overall mood." },
        purpose: { type: "string", description: "Intended purpose of the poem." },
        tone: { type: "string", description: "Preferred narrative tone." },
        genre: { type: "string", description: "Optional genre guidance." },
        cities: {
          type: "array",
          items: { type: "string" },
          description: "Ordered list of cities to include in the poem.",
        },
      },
      additionalProperties: false,
    },
  },
];

app.post("/mcp", async (req, res) => {
  // console.log("[mcp-server] Received request:", req.body);

  const body = req.body ?? {};
  const { type, tool_name: toolName } = body;
  const args = body.arguments ?? {};

  if (type === "list_tools") {
    return res.json({
      type: "tool_list",
      tools: TOOL_DEFINITIONS,
    });
  }

  if (type !== "call_tool" || !toolName) {
    return res.status(400).json({
      type: "tool_error",
      error:
        'Unsupported request. Expecting type:"list_tools" or type:"call_tool" with a known tool_name.',
    });
  }

  try {
    let result;
    // console.log(`[mcp-server] Calling tool: ${toolName}`);

    if (toolName === "generate_html_painting") {
      console.log("[mcp-server] Calling generateHtmlPainting with args:", args);
      result = await generateHtmlPainting({
        prompt: args.prompt,
        palette: args.palette,
        aspectRatio: args.aspectRatio,
      });
      // console.log(
      // "[mcp-server] generateHtmlPainting result keys:",
      // Object.keys(result || {})
      // );
    } else if (toolName === "generate_video_journey_poem") {
      result = await generateVideoJourneyPoem({
        topic: args.topic,
        emotion: args.emotion,
        situation: args.situation,
        intensity: args.intensity,
        mood: args.mood,
        purpose: args.purpose,
        tone: args.tone,
        genre: args.genre,
        cities: args.cities,
      });
    } else {
      return res.status(404).json({
        type: "tool_error",
        error: `Unknown tool: ${toolName}`,
      });
    }

    // console.log("[mcp-server] Sending response");
    return res.json({
      type: "tool_response",
      tool_name: toolName,
      content: result,
    });
  } catch (error) {
    // console.error("[mcp-server] unhandled error:", error);
    return res.status(500).json({
      type: "tool_error",
      error: String(error),
    });
  }
});

app.listen(port, () => {
  console.log(`Soultrace MCP server listening on port ${port}`);
});
