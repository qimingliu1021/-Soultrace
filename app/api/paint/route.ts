import {NextRequest, NextResponse} from 'next/server';

const MCP_ENDPOINT = process.env.MCP_SERVER_URL ?? 'http://localhost:8787/mcp';

interface PaintRequestBody {
  prompt?: string;
  palette?: string[];
  aspectRatio?: string;
}

export async function POST(request: NextRequest) {
  let body: PaintRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({error: 'Invalid JSON body'}, {status: 400});
  }

  try {
    const response = await fetch(MCP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'call_tool',
        tool_name: 'generate_html_painting',
        arguments: {
          prompt: body.prompt,
          palette: body.palette,
          aspectRatio: body.aspectRatio,
        },
      }),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      return NextResponse.json(
        {
          error: 'Painting agent failed',
          details: errorPayload ?? (await response.text()),
        },
        {status: 502}
      );
    }

    const data = await response.json();

    if (data?.type !== 'tool_response' || data?.tool_name !== 'generate_html_painting') {
      return NextResponse.json({error: 'Unexpected response from MCP server'}, {status: 502});
    }

    return NextResponse.json(data.content, {status: 200});
  } catch (error) {
    return NextResponse.json({error: 'Unable to reach MCP server', details: String(error)}, {status: 504});
  }
}
