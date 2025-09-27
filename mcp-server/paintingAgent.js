import 'dotenv/config';

const DEFAULT_PROMPT = `Paint a cinematic cosmic scene highlighting Soultrace's narrative artistry.`;

const systemPrompt = `You are Soultrace's HTML painting agent. You output complete standalone HTML documents that visually render imaginative scenes.
Guidelines:
- Respond with valid HTML (including <!DOCTYPE html>, <html>, <head>, <body>).
- Inline all CSS within a <style> tag in <head>.
- Use semantic HTML elements when sensible.
- Avoid external resources unless absolutely necessary; prefer gradients, SVG, or free image URLs supplied in the prompt arguments.
- Keep total HTML under ~10KB.
- Never include <script> tags.
- Celebrate vibrant gradients, subtle animation via CSS keyframes if helpful, and accessible contrast.`;

const openAiEndpoint = 'https://api.openai.com/v1/responses';
const defaultModel = process.env.OPENAI_MODEL ?? 'gpt-4.1-mini';

const fallbackHtml = ({prompt, palette = [], aspectRatio = '16:9'}) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Soultrace Painted Scene</title>
    <style>
      :root {
        color-scheme: dark;
      }
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: radial-gradient(circle at top left,#0b1a40,#111b4b 55%,#2d356d 100%);
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: rgba(255,255,255,0.82);
      }
      main {
        width: min(720px, 90vw);
        border-radius: 32px;
        padding: 48px 40px;
        background: linear-gradient(135deg, rgba(9,16,50,0.9), rgba(22,30,78,0.9));
        box-shadow: 0 36px 70px rgba(6,10,32,0.55);
        display: grid;
        gap: 24px;
      }
      h1 {
        margin: 0;
        font-size: clamp(2.4rem, 5vw, 3.1rem);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      p {
        margin: 0;
        line-height: 1.6;
        font-size: clamp(1rem, 2vw, 1.15rem);
      }
      .palette {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 12px;
      }
      .chip {
        min-width: 88px;
        padding: 12px 16px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.15);
        background: rgba(255,255,255,0.08);
        font-size: 0.75rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        text-align: center;
      }
      .frame {
        border-radius: 28px;
        overflow: hidden;
        outline: 1px solid rgba(177,209,255,0.35);
        background: linear-gradient(160deg, rgba(79,120,235,0.35), rgba(177,209,255,0.08));
        position: relative;
      }
      .frame::before {
        content: '';
        display: block;
        padding-top: ${aspectRatio === '1:1' ? '100%' : aspectRatio === '9:16' ? '177%' : '56.25%'};
        background: conic-gradient(from 45deg at 50% 50%, rgba(126,90,255,0.65), rgba(87,208,255,0.6), rgba(255,174,103,0.7), rgba(126,90,255,0.65));
        filter: blur(12px) saturate(120%);
        animation: swirl 28s linear infinite;
      }
      @keyframes swirl {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.05) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Soultrace Vision</h1>
      <p>${prompt}</p>
      <section>
        <h2 style="margin: 0; font-size: 0.92rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.7;">Palette</h2>
        <div class="palette">
          ${(palette.length ? palette : ['#7E5AFF', '#57D0FF', '#FFA040']).map((chip) => `<span class="chip">${chip}</span>`).join('\n          ')}
        </div>
      </section>
      <div class="frame" aria-hidden="true"></div>
    </main>
  </body>
</html>`;

export async function generateHtmlPainting({prompt = DEFAULT_PROMPT, palette, aspectRatio}) {
  const effectivePrompt = prompt?.trim().length ? prompt : DEFAULT_PROMPT;
  if (!process.env.OPENAI_API_KEY) {
    return {
      html: fallbackHtml({prompt: effectivePrompt, palette, aspectRatio}),
      meta: {
        model: 'fallback',
        usedOpenAI: false,
      },
    };
  }

  try {
    const response = await fetch(openAiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: defaultModel,
        input: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Prompt: ${effectivePrompt}\nSuggested palette: ${(palette ?? []).join(', ') || 'N/A'}\nDesired aspect ratio: ${aspectRatio ?? '16:9'}\nReturn HTML now.`,
          },
        ],
        max_output_tokens: 3600,
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorPayload = await response.text();
      throw new Error(`OpenAI request failed: ${response.status} ${errorPayload}`);
    }

    const data = await response.json();
    const htmlContent = data?.output?.[0]?.content?.[0]?.text ?? data?.output_text ?? null;
    if (!htmlContent) {
      throw new Error('OpenAI response missing HTML content');
    }

    return {
      html: htmlContent,
      meta: {
        model: data?.model ?? defaultModel,
        usedOpenAI: true,
        tokens: data?.usage,
      },
    };
  } catch (error) {
    console.error('[paintingAgent] Falling back after error:', error);
    return {
      html: fallbackHtml({prompt: `${effectivePrompt} (fallback rendering)`, palette, aspectRatio}),
      meta: {
        model: 'fallback',
        usedOpenAI: false,
        error: String(error),
      },
    };
  }
}
