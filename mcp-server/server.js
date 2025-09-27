import express from 'express';
import 'dotenv/config';
import {generateHtmlPainting} from './paintingAgent.js';

const app = express();
const port = process.env.MCP_PORT ?? 8787;

app.use(express.json({limit: '2mb'}));

app.get('/health', (_req, res) => {
  res.json({status: 'ok'});
});

app.post('/mcp', async (req, res) => {
  const body = req.body ?? {};
  const {type, tool_name: toolName} = body;
  const args = body.arguments ?? {};

  if (type !== 'call_tool' || !toolName) {
    return res.status(400).json({
      type: 'tool_error',
      error: 'Unsupported request. Expecting {type:"call_tool", tool_name:"generate_html_painting"}',
    });
  }

  if (toolName !== 'generate_html_painting') {
    return res.status(404).json({
      type: 'tool_error',
      error: `Unknown tool: ${toolName}`,
    });
  }

  try {
    const result = await generateHtmlPainting({
      prompt: args.prompt,
      palette: args.palette,
      aspectRatio: args.aspectRatio,
    });

    return res.json({
      type: 'tool_response',
      tool_name: toolName,
      content: result,
    });
  } catch (error) {
    console.error('[mcp-server] unhandled error:', error);
    return res.status(500).json({
      type: 'tool_error',
      error: String(error),
    });
  }
});

app.listen(port, () => {
  console.log(`Soultrace MCP server listening on port ${port}`);
});
