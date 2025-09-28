import express from "express";
import "dotenv/config";
import { generateHtmlPainting } from "./paintingAgent.js";
import { generateVideoJourneyPoem } from "./poemAgent.js";

const app = express();
const port = process.env.MCP_PORT ?? 8787;

app.use(express.json({ limit: "2mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/mcp", async (req, res) => {
  const body = req.body ?? {};
  const { type, tool_name: toolName } = body;
  const args = body.arguments ?? {};

  if (type !== "call_tool" || !toolName) {
    return res.status(400).json({
      type: "tool_error",
      error:
        'Unsupported request. Expecting {type:"call_tool", tool_name:"generate_html_painting" or "generate_video_journey_poem"}',
    });
  }

  try {
    let result;

    if (toolName === "generate_html_painting") {
      result = await generateHtmlPainting({
        prompt: args.prompt,
        palette: args.palette,
        aspectRatio: args.aspectRatio,
      });
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

    return res.json({
      type: "tool_response",
      tool_name: toolName,
      content: result,
    });
  } catch (error) {
    console.error("[mcp-server] unhandled error:", error);
    return res.status(500).json({
      type: "tool_error",
      error: String(error),
    });
  }
});

app.listen(port, () => {
  console.log(`Soultrace MCP server listening on port ${port}`);
});
