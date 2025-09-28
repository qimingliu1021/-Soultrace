import "dotenv/config";
import OpenAI from "openai";

const DEFAULT_PROMPT = `Paint a cinematic cosmic scene highlighting Soultrace's narrative artistry.`;

const systemPrompt = `You are Soultrace's HTML painting agent. Based on a given prompt, generate a complete standalone HTML document that visually renders an imaginative and beautiful scene using HTML and CSS. The resulting HTML/CSS should create a striking and attractive picture.
Guidelines:
- Respond with valid HTML (including <!DOCTYPE html>, <html>, <head>, <body>).
- Inline all CSS within a <style> tag in <head>.
- Use semantic HTML elements when sensible.
- Avoid external resources unless absolutely necessary; prefer gradients, SVG, or free image URLs supplied in the prompt arguments.
- Keep total HTML under ~10KB.
- Never include <script> tags.
- Celebrate vibrant gradients, subtle animation via CSS keyframes if helpful, and accessible contrast.`;

const defaultModel = "gpt-5";

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const fallbackHtml = ({
  prompt,
  palette = [],
  aspectRatio = "16:9",
}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Soultrace Painted Scene</title>
  </head>
  <body>
    <h1>Error Getting HTML</h1>
  </body>
</html>`;

export async function generateHtmlPainting({
  prompt = DEFAULT_PROMPT,
  palette,
  aspectRatio,
}) {
  const effectivePrompt = prompt?.trim().length ? prompt : DEFAULT_PROMPT;

  if (!process.env.OPENAI_API_KEY) {
    return {
      html: fallbackHtml({ prompt: effectivePrompt, palette, aspectRatio }),
      meta: {
        model: "fallback",
        usedOpenAI: false,
      },
    };
  }

  try {
    // Use the new OpenAI Responses API
    const response = await client.responses.create({
      model: defaultModel,
      instructions: systemPrompt,
      input: `Prompt: ${effectivePrompt}\nSuggested palette: ${
        (palette ?? []).join(", ") || "N/A"
      }\nDesired aspect ratio: ${aspectRatio ?? "16:9"}\nReturn HTML now.`,
      max_output_tokens: 10000, // Increased from 3600
    });

    // Check if response is incomplete due to token limit
    if (
      response.status === "incomplete" &&
      response.incomplete_details?.reason === "max_output_tokens"
    ) {
      console.warn("[paintingAgent] Response was truncated due to token limit");
    }

    // Try to extract HTML content from the response
    let htmlContent;

    // First try the output_text field directly (as seen in terminal output)
    if (response.output_text) {
      htmlContent = response.output_text;
    } else {
      // Fallback to the nested structure
      const messageOutput = response.output.find(
        (item) => item.type === "message"
      );
      const textContent = messageOutput?.content?.find(
        (content) => content.type === "output_text"
      );
      htmlContent = textContent?.text;
    }

    if (!htmlContent) {
      throw new Error("OpenAI response missing HTML content");
    }

    // If the HTML is incomplete, try to close unclosed tags
    if (response.status === "incomplete") {
      htmlContent = ensureValidHtml(htmlContent);
    }

    return {
      html: htmlContent,
      meta: {
        model: response.model || defaultModel,
        usedOpenAI: true,
        responseId: response.id,
        tokens: response.usage,
        incomplete: response.status === "incomplete",
      },
    };
  } catch (error) {
    console.error("[paintingAgent] Falling back after error:", error);
    return {
      html: fallbackHtml({
        prompt: `${effectivePrompt} (fallback rendering)`,
        palette,
        aspectRatio,
      }),
      meta: {
        model: "fallback",
        usedOpenAI: false,
        error: String(error),
      },
    };
  }
}

// Helper function to ensure HTML is valid even if truncated
function ensureValidHtml(html) {
  // Basic HTML completion for truncated responses
  if (!html.includes("</html>")) {
    // Count unclosed tags and try to close them
    const openTags = html.match(/<(?!\/)[^>]+>/g) || [];
    const closeTags = html.match(/<\/[^>]+>/g) || [];

    // Simple approach: if missing </html>, try to close common tags
    if (!html.includes("</style>") && html.includes("<style>")) {
      html += "\n</style>";
    }
    if (!html.includes("</head>") && html.includes("<head>")) {
      html += "\n</head>";
    }
    if (!html.includes("</body>") && html.includes("<body>")) {
      html += "\n</body>";
    }
    if (!html.includes("</html>")) {
      html += "\n</html>";
    }
  }

  return html;
}
