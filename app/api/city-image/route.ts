import { NextRequest, NextResponse } from 'next/server';

// Helper to build a cinematic image prompt based on a city using GPT
async function buildCityImagePrompt(city: string): Promise<string> {
  const system = 'You are a visual prompt designer who writes evocative, production-ready prompts for image generation models. Keep prompts concise yet richly descriptive, avoid copyrighted names, and focus on mood, composition, lighting, palette, and textures.';
  const user = `Create a single, self-contained image prompt for an artwork inspired by the city: ${city}.

Follow this structure with short, vivid bullet sections. Do not include markdown or section headings in the final output, just a cohesive paragraph suitable for an image model. Prioritize a widescreen 16:9 cinematic composition.

Reference example style (for Chongqing): Masterpiece, illustration of "Poetic Modernism". A nostalgic, dreamlike memory of a folded mountain city. Vertical composition is transformed into a widescreen 16:9 panorama. Foreground hands releasing a warm amber lantern (key light). Mid-ground stone-step path between moss-covered stilt houses; glowing windows; ginger cat on sill; blurred chessboard. Background confluence of two rivers as ribbons of sapphire and amber; semi-transparent glowing bridges; deep blue night with ethereal clouds. Low saturation, high contrast; dominant indigo/navy with high-sat amber. Visible hand-painted strokes; paper grain; floating light particles. Optional video feel: slow upward drift of lantern and particles.

Now adapt this level of detail for ${city}, with:
- Foreground element(s) with a clear key light.
- Mid-ground showing characteristic local architecture or streets.
- Background featuring iconic geography/landmarks or skyline.
- Cohesive color palette and textures.
- Optional subtle motion cues suitable for a video background.

Output only the final prompt paragraph, no headings, no JSON, no extra text.`;

  const model = process.env.OPENAI_MODEL || 'gpt-5';
  const basePayload = {
    model,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user }
    ],
    // omit temperature to satisfy strict models (defaults to 1)
  } as any;

  // First attempt with Chat Completions (max_completion_tokens)
  let res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...basePayload, max_completion_tokens: 500 })
  });

  if (!res.ok) {
    const txt = await res.text();
    // If token param unsupported, retry with the other variant
    if (/Unsupported parameter: 'max_completion_tokens'|Unsupported parameter: 'max_tokens'|unsupported parameter/i.test(txt)) {
      const altKey = txt.includes('max_completion_tokens') ? 'max_tokens' : 'max_completion_tokens';
      const res2 = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...basePayload, [altKey]: 500 })
      });
      if (res2.ok) {
        const data2 = await res2.json();
        const content2: string | undefined = data2.choices?.[0]?.message?.content;
        if (content2) return content2.trim();
      }
      // fall through to Responses API
    }

    // Fallback path A: try Responses API directly with structured single string
    try {
      const r = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model, input: `${system}\n\n${user}` })
      });
      if (r.ok) {
        const j = await r.json();
        let c: string | undefined;
        if (typeof j.output_text === 'string') c = j.output_text;
        else if (Array.isArray(j.output_text)) c = j.output_text.join(' ').trim();
        else if (Array.isArray(j.output)) {
          let buf = '';
          for (const item of j.output) {
            if (Array.isArray(item?.content)) {
              for (const seg of item.content) {
                if (typeof seg?.text === 'string') buf += seg.text;
                else if (typeof seg?.content === 'string') buf += seg.content;
              }
            }
          }
          c = buf.trim() || undefined;
        }
        if (c) return c.trim();
      }
    } catch {}

    // Fallback path B: try a permissive chat model
    try {
      const altModel = process.env.OPENAI_FALLBACK_MODEL || 'gpt-4o-mini';
      const r2 = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: altModel,
          messages: [
            { role: 'system', content: system },
            { role: 'user', content: user }
          ],
          max_tokens: 500
        })
      });
      if (r2.ok) {
        const j2 = await r2.json();
        const c2: string | undefined = j2.choices?.[0]?.message?.content;
        if (c2) return c2.trim();
      }
    } catch {}

    throw new Error(`Failed to build image prompt: ${res.status} ${txt}`);
  }
  const data = await res.json();
  let content: string | undefined = data.choices?.[0]?.message?.content;
  if (!content) {
    // Fallback: try the Responses API (non-streaming)
    const res2 = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: `${system}\n\n${user}`,
      })
    });

    if (!res2.ok) {
      const txt2 = await res2.text();
      throw new Error(`Failed to build image prompt (responses): ${res2.status} ${txt2}`);
    }
    const data2 = await res2.json();
    // Try multiple known shapes
    if (typeof data2.output_text === 'string') {
      content = data2.output_text;
    } else if (Array.isArray(data2.output_text)) {
      content = data2.output_text.join(' ').trim();
    } else if (Array.isArray(data2.output)) {
      // Newer shape: output: [{ content: [{ type: 'output_text', text: '...' }] }]
      let buf = '';
      for (const item of data2.output) {
        if (Array.isArray(item?.content)) {
          for (const seg of item.content) {
            if (typeof seg?.text === 'string') buf += seg.text;
            else if (typeof seg?.content === 'string') buf += seg.content;
          }
        }
      }
      content = buf.trim() || undefined;
    } else if (Array.isArray(data2.content)) {
      let buf = '';
      for (const c of data2.content) {
        if (typeof c?.text === 'string') buf += c.text;
        else if (c?.type && typeof c?.content === 'string') buf += c.content;
      }
      content = buf.trim() || undefined;
    }
  }

  // Final fallback: try a more permissive chat model if still no content
  if (!content) {
    const altModel = process.env.OPENAI_FALLBACK_MODEL || 'gpt-4o-mini';
    const res3 = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: altModel,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user }
        ],
        max_tokens: 500
      })
    });
    if (res3.ok) {
      const data3 = await res3.json();
      content = data3.choices?.[0]?.message?.content;
    }
  }

  if (!content) throw new Error('No content returned for image prompt');
  return String(content).trim();
}

// Generate image via OpenAI Images API (returns URL)
async function generateCityImage(prompt: string): Promise<{ url?: string; b64?: string; }> {
  // Prefer URL to avoid large payloads
  const imgRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_IMAGE_MODEL || 'dall-e-3',
      prompt,
      size: '1792x1024',
      n: 1,
      quality: 'hd'
    })
  });

  if (!imgRes.ok) {
    const txt = await imgRes.text();
    throw new Error(`Image generation failed: ${imgRes.status} ${txt}`);
  }
  const payload = await imgRes.json();
  const first = payload.data?.[0];
  const url: string | undefined = first?.url;
  const b64_json: string | undefined = first?.b64_json;
  return { url, b64: b64_json };
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const city = String(body?.city || '').trim();
    const force = Boolean(body?.force);

    if (!city) {
      return NextResponse.json({ error: 'Missing city' }, { status: 400 });
    }

    // Build the image prompt using GPT
    const prompt = await buildCityImagePrompt(city);

    // Generate the image
    const img = await generateCityImage(prompt);

    return NextResponse.json({
      success: true,
      city,
      prompt,
      imageUrl: img.url || null,
      imageB64: img.b64 || null,
    });
  } catch (e: any) {
    console.error('city-image API error:', e);
    return NextResponse.json({ success: false, error: String(e?.message || e) }, { status: 500 });
  }
}
