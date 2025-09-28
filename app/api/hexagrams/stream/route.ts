import { NextRequest } from 'next/server';
import { calculateHexagram, calculateAllRelatedHexagrams, IChingHexagram } from '../../../lib/csvParser';

function sseHeaders() {
  return new Headers({
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
    'Transfer-Encoding': 'chunked',
    'Content-Type': 'text/event-stream; charset=utf-8',
  });
}

function toEvent(id: string, event: string, data: any) {
  const payload = typeof data === 'string' ? data : JSON.stringify(data);
  return `id: ${id}\nevent: ${event}\ndata: ${payload}\n\n`;
}

async function streamOpenAIAnalysis(prompt: string, preferredModel: string | undefined, controller: ReadableStreamDefaultController<Uint8Array>) {
  if (!process.env.OPENAI_API_KEY) {
    controller.enqueue(new TextEncoder().encode(toEvent('err', 'error', { message: 'OpenAI API key not configured' })));
    return;
  }

  const modelCandidates = [
    preferredModel,
    process.env.OPENAI_MODEL,
    'gpt-4o',
  ].filter(Boolean) as string[];

  // System instruction used by both Responses and Chat Completions APIs
  const system = 'You are a thoughtful I Ching consultant. Think step by step and explain your reasoning clearly, then provide concise, actionable guidance.';

  const urlCandidates = [
    { url: 'https://api.openai.com/v1/responses', kind: 'responses' as const },
    { url: 'https://api.openai.com/v1/chat/completions', kind: 'chat' as const },
  ];

  for (const model of modelCandidates) {
    for (const candidate of urlCandidates) {
      try {
        const body = candidate.kind === 'responses'
          ? JSON.stringify({
              model,
              input: [{ role: 'system', content: system }, { role: 'user', content: prompt }],
              stream: true,
            })
          : JSON.stringify({
              model,
              messages: [
                { role: 'system', content: system },
                { role: 'user', content: prompt },
              ],
              stream: true,
            });

        const res = await fetch(candidate.url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body,
        });

        if (!res.ok || !res.body) {
          const errText = await res.text();
          controller.enqueue(new TextEncoder().encode(toEvent('warn', 'analysis_info', { provider: candidate.kind, status: res.status, body: errText })));
          continue; // try next candidate
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        controller.enqueue(new TextEncoder().encode(toEvent('analysis', 'analysis_start', { provider: candidate.kind, model })));

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;
              const dataStr = trimmed.slice(5).trim();
              if (dataStr === '[DONE]') {
                controller.enqueue(new TextEncoder().encode(toEvent('analysis', 'analysis_done', {})));
                return; // finished
              }
              try {
                const json = JSON.parse(dataStr);
                // Responses API deltas often under event types; try to extract text delta heuristically
                let delta = '';
                if (candidate.kind === 'responses') {
                  // openai responses stream: look for output_text delta or top-level "delta"
                  if (json.type && typeof json.type === 'string' && json.delta) {
                    delta = String(json.delta);
                  } else if (json.output_text !== undefined) {
                    // sometimes accumulated text
                    delta = String(json.output_text);
                  } else if (json.content && Array.isArray(json.content)) {
                    for (const c of json.content) {
                      if (c.type === 'output_text.delta' && c.delta) {
                        delta += String(c.delta);
                      }
                    }
                  }
                } else {
                  // chat completions stream
                  delta = json.choices?.[0]?.delta?.content ?? '';
                }

                if (delta) {
                  controller.enqueue(new TextEncoder().encode(toEvent('analysis', 'analysis_delta', { text: delta })));
                }
              } catch {
                // forward raw line for debugging if needed
                controller.enqueue(new TextEncoder().encode(toEvent('analysis', 'analysis_delta', { text: dataStr })));
              }
            }
          }
        } finally {
          try { reader.releaseLock(); } catch {}
        }

        controller.enqueue(new TextEncoder().encode(toEvent('analysis', 'analysis_done', {})));
        return; // success with this model/provider combo
      } catch (err) {
        controller.enqueue(new TextEncoder().encode(toEvent('warn', 'analysis_info', { provider: candidate.kind, model, error: String((err as any)?.message || err) })));
        // continue to next candidate
      }
    }
  }

  controller.enqueue(new TextEncoder().encode(toEvent('err', 'error', { message: 'All model/provider attempts failed' })));
}

function createStreamingPrompt(allHexagrams: any, userInput: any): string {
  return `Think step by step about the user's situation and the five related hexagrams. Explain the reasoning process in clear English as if you are thinking out loud, then provide a concise summary, insights, and recommendations.

PRIMARY HEXAGRAM (本卦):
- Name: ${allHexagrams.original?.trad_chinese} (${allHexagrams.original?.english})
- Judgment: ${allHexagrams.original?.wilhelm_judgment?.text}
- Image: ${allHexagrams.original?.wilhelm_image?.text}
- Symbolic Meaning: ${allHexagrams.original?.wilhelm_symbolic}

RELATED HEXAGRAMS:
1) CHANGED (变卦): ${allHexagrams.changed ? `${allHexagrams.changed.trad_chinese} (${allHexagrams.changed.english})` : 'N/A'}
2) MUTUAL (互卦): ${allHexagrams.mutual ? `${allHexagrams.mutual.trad_chinese} (${allHexagrams.mutual.english})` : 'N/A'}
3) OPPOSITE (错卦): ${allHexagrams.opposite ? `${allHexagrams.opposite.trad_chinese} (${allHexagrams.opposite.english})` : 'N/A'}
4) INVERTED (综卦): ${allHexagrams.inverted ? `${allHexagrams.inverted.trad_chinese} (${allHexagrams.inverted.english})` : 'N/A'}

USER'S SITUATION:
- Location: ${userInput.city}
- Personal Experience: ${userInput.experience}
- Current Difficulty: ${userInput.difficulty}
- Divination Number: ${userInput.number}

Format your streamed thoughts in English, then end with a final section labeled FINAL SUMMARY/INSIGHTS/RECOMMENDATIONS.`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') || '';
  const experience = searchParams.get('experience') || '';
  const difficulty = searchParams.get('difficulty') || '';
  const numberStr = searchParams.get('number') || '0';
  const preferredModel = searchParams.get('model') || undefined; // user may pass gpt-5; we will try then fallback

  const userInput = {
    city,
    experience,
    difficulty,
    number: Number(numberStr) || 0,
  };

  const stream = new ReadableStream<Uint8Array>({
    start: async (controller) => {
      const enc = new TextEncoder();
      try {
        controller.enqueue(enc.encode(toEvent('connected', 'connected', { ok: true })));

        controller.enqueue(enc.encode(toEvent('step', 'step', { message: 'Calculating primary hexagram...' })));
        const originalHexagram = await calculateHexagram(userInput.number);
        controller.enqueue(enc.encode(toEvent('step', 'step', { message: `Primary hexagram: ${originalHexagram.trad_chinese} (${originalHexagram.english})` })));

        controller.enqueue(enc.encode(toEvent('step', 'step', { message: 'Deriving related hexagrams...' })));
        const allHexagrams = await calculateAllRelatedHexagrams(originalHexagram as IChingHexagram, userInput.number);
        controller.enqueue(enc.encode(toEvent('hexagrams', 'hexagrams', allHexagrams)));

        controller.enqueue(enc.encode(toEvent('step', 'step', { message: 'Analyzing user situation...' })));
        const userSituation = {
          locationContext: userInput.city,
          experienceSummary: userInput.experience,
          challengeAnalysis: userInput.difficulty,
          timestamp: new Date().toISOString(),
        };
        controller.enqueue(enc.encode(toEvent('user_situation', 'user_situation', userSituation)));

        // Build prompt and stream analysis via OpenAI
        const prompt = createStreamingPrompt(allHexagrams, userInput);
        await streamOpenAIAnalysis(prompt, preferredModel, controller);

        controller.close();
      } catch (e: any) {
        controller.enqueue(enc.encode(toEvent('err', 'error', { message: String(e?.message || e) })));
        try { controller.close(); } catch {}
      }
    },
  });

  return new Response(stream, { headers: sseHeaders() });
}
