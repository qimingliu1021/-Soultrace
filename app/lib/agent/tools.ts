import { IChingHexagram, calculateHexagram, calculateAllRelatedHexagrams, getAllHexagrams } from '../csvParser';

// Agent工具接口
export interface AgentTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  execute: (params: any) => Promise<any>;
}

// 工具1: 根据数字生成本卦
export const getHexagramFromNumber: AgentTool = {
  name: 'getHexagramFromNumber',
  description: '根据用户输入的数字计算本卦',
  parameters: {
    type: 'object',
    properties: {
      number: { type: 'number', description: '用户输入的数字' }
    },
    required: ['number']
  },
  execute: async (params: { number: number }) => {
    const hexagram = await calculateHexagram(params.number);
    return {
      success: true,
      data: {
        originalHexagram: hexagram,
        number: params.number
      }
    };
  }
};

// 兼容不同提供方的 tokens 参数：优先尝试 max_tokens；如果返回不支持则改用 max_completion_tokens，反之亦然
async function callOpenAIWithParamCompatibility(payloadBase: any): Promise<any> {
  const url = 'https://api.openai.com/v1/chat/completions';

  // 尝试顺序：根据常见的OpenAI参数命名先试 max_tokens
  const attempts = [
    { key: 'max_tokens', value: 1000 },
    { key: 'max_completion_tokens', value: 1000 }
  ];

  let lastError: any = null;

  for (const attempt of attempts) {
    const body = JSON.stringify({ ...payloadBase, [attempt.key]: attempt.value });
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body
    });

    if (response.ok) {
      return await response.json();
    }

    const errorText = await response.text();
    if (process.env.NODE_ENV === 'development') {
      console.error('OpenAI API response not OK:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
    }

    // 若是参数不支持错误，决定是否切换到另一个参数重试
    const unsupportedParam = /Unsupported parameter: '([^']+)' is not supported/i.exec(errorText);
    if (unsupportedParam) {
      const badKey = unsupportedParam[1];
      // 如果是 max_tokens 不被支持，下一轮会尝试 max_completion_tokens；反之亦然
      lastError = new Error(`OpenAI API request failed with unsupported parameter ${badKey}`);
      continue;
    }

    // 其他错误直接抛出
    throw new Error(`OpenAI API request failed: ${response.status} ${response.statusText}`);
  }

  // 若两次都失败，抛出最后一个错误
  throw lastError || new Error('OpenAI API request failed for both token parameter variants');
}

// 工具2: 推导相关卦象
export const deriveRelatedHexagrams: AgentTool = {
  name: 'deriveRelatedHexagrams',
  description: '根据本卦推导出变卦、互卦、错卦、综卦',
  parameters: {
    type: 'object',
    properties: {
      originalHexagram: { type: 'object', description: '本卦对象' },
      number: { type: 'number', description: '用户输入的数字' }
    },
    required: ['originalHexagram', 'number']
  },
  execute: async (params: { originalHexagram: IChingHexagram, number: number }) => {
    const allHexagrams = await calculateAllRelatedHexagrams(params.originalHexagram, params.number);
    return {
      success: true,
      data: allHexagrams
    };
  }
};

// 工具3: 查询卦象详细信息
export const lookupHexagramInfo: AgentTool = {
  name: 'lookupHexagramInfo',
  description: '从数据库查询卦象的详细信息（卦辞、注释、象征意义等）',
  parameters: {
    type: 'object',
    properties: {
      hexagram: { type: 'object', description: '要查询的卦象对象' }
    },
    required: ['hexagram']
  },
  execute: async (params: { hexagram: IChingHexagram }) => {
    return {
      success: true,
      data: {
        judgment: params.hexagram.wilhelm_judgment,
        image: params.hexagram.wilhelm_image,
        symbolic: params.hexagram.wilhelm_symbolic,
        lines: params.hexagram.wilhelm_lines,
        above: params.hexagram.wilhelm_above,
        below: params.hexagram.wilhelm_below
      }
    };
  }
};

// 工具4: 分析用户情况
export const analyzeUserSituation: AgentTool = {
  name: 'analyzeUserSituation',
  description: '分析用户的个人情况、经历和困难',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: '用户所在城市' },
      experience: { type: 'string', description: '用户个人经历' },
      difficulty: { type: 'string', description: '用户当前困难' }
    },
    required: ['city', 'experience', 'difficulty']
  },
  execute: async (params: { city: string, experience: string, difficulty: string }) => {
    // 这里可以添加更复杂的分析逻辑
    return {
      success: true,
      data: {
        locationContext: params.city,
        experienceSummary: params.experience,
        challengeAnalysis: params.difficulty,
        timestamp: new Date().toISOString()
      }
    };
  }
};

// 工具5: 生成综合分析
export const generateComprehensiveAnalysis: AgentTool = {
  name: 'generateComprehensiveAnalysis',
  description: '基于所有卦象和用户情况生成综合分析',
  parameters: {
    type: 'object',
    properties: {
      allHexagrams: { type: 'object', description: '所有相关卦象' },
      userSituation: { type: 'object', description: '用户情况分析' },
      userInput: { type: 'object', description: '用户原始输入' }
    },
    required: ['allHexagrams', 'userSituation', 'userInput']
  },
  execute: async (params: { allHexagrams: any, userSituation: any, userInput: any }) => {
    // 调用GPT进行综合分析
    const analysisPrompt = createAnalysisPrompt(params.allHexagrams, params.userSituation, params.userInput);
    try {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OpenAI API key not configured');
      }

      const model = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';
      if (process.env.NODE_ENV === 'development') {
        console.log('[OpenAI] Using model:', model);
      }
      const payloadBase = {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a wise I Ching consultant with deep knowledge of Chinese philosophy and divination. Provide thoughtful, practical guidance based on the hexagram and user situation.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.7 as number
      };

      const data = await callOpenAIWithParamCompatibility(payloadBase);
      const analysisText: string | undefined = data.choices?.[0]?.message?.content;

      if (!analysisText) {
        throw new Error('No analysis text received from OpenAI');
      }

      // 优先尝试解析为JSON（更可靠）
      const jsonParsed = extractJSONFromText(analysisText);
      if (jsonParsed && jsonParsed.summary && Array.isArray(jsonParsed.insights) && Array.isArray(jsonParsed.recommendations)) {
        return {
          success: true,
          data: jsonParsed
        };
      }

      // 回退到基于章节标题的解析
      const parsedAnalysis = parseAnalysisResponse(analysisText);
      return {
        success: true,
        data: parsedAnalysis
      };

    } catch (error) {
      console.error('GPT analysis failed:', error);
      // 返回默认分析
      return {
        success: true,
        data: {
          summary: '基于五个卦象的综合分析：本卦代表当前情况，变卦预示发展趋势，互卦揭示内在机制，错卦展现对立面，综卦提供反向视角。',
          insights: [
            '当前情况需要谨慎处理',
            '发展趋势显示积极变化',
            '内在机制需要深入理解'
          ],
          recommendations: [
            '保持耐心和坚持',
            '寻求内在平衡',
            '考虑多角度思考'
          ]
        }
      };
    }
  }
};

// 所有可用工具
export const availableTools: AgentTool[] = [
  getHexagramFromNumber,
  deriveRelatedHexagrams,
  lookupHexagramInfo,
  analyzeUserSituation,
  generateComprehensiveAnalysis
];

// 工具查找函数
export function findTool(name: string): AgentTool | undefined {
  return availableTools.find(tool => tool.name === name);
}

// 创建分析提示词
function createAnalysisPrompt(allHexagrams: any, userSituation: any, userInput: any): string {
  return `Based on the I Ching hexagram analysis with 5 related hexagrams, provide a comprehensive analysis of the following situation.

PRIMARY HEXAGRAM (本卦):
- Name: ${allHexagrams.original?.trad_chinese} (${allHexagrams.original?.english})
- Judgment: ${allHexagrams.original?.wilhelm_judgment?.text}
- Image: ${allHexagrams.original?.wilhelm_image?.text}
- Symbolic Meaning: ${allHexagrams.original?.wilhelm_symbolic}

RELATED HEXAGRAMS:
1. CHANGED HEXAGRAM (变卦) - ${allHexagrams.changed ? `${allHexagrams.changed.trad_chinese} (${allHexagrams.changed.english})` : 'Not available'}
   Represents the development trend or result.

2. MUTUAL HEXAGRAM (互卦) - ${allHexagrams.mutual ? `${allHexagrams.mutual.trad_chinese} (${allHexagrams.mutual.english})` : 'Not available'}
   Represents the inner mechanism or intermediate process.

3. OPPOSITE HEXAGRAM (错卦) - ${allHexagrams.opposite ? `${allHexagrams.opposite.trad_chinese} (${allHexagrams.opposite.english})` : 'Not available'}
   Represents the opposite side or contrasting perspective.

4. INVERTED HEXAGRAM (综卦) - ${allHexagrams.inverted ? `${allHexagrams.inverted.trad_chinese} (${allHexagrams.inverted.english})` : 'Not available'}
   Represents the reverse perspective or the other party's viewpoint.

USER'S SITUATION:
- Location: ${userInput.city}
- Previous Cities: ${Array.isArray(userInput.previousCities) && userInput.previousCities.length > 0 ? userInput.previousCities.join(', ') : 'N/A'}
- Personal Experience: ${userInput.experience}
- Current Difficulty: ${userInput.difficulty}
- Divination Number: ${userInput.number}

Please provide a comprehensive analysis considering all five hexagrams.

Additionally, incorporate how the user's prior living experience in the listed previous cities may influence their mindset, resources, social networks, and adaptability regarding the current challenge. If relevant, point out contrasts and synergies between the current city and previous cities.

Return ONLY valid JSON (no commentary, no markdown fences). The JSON must strictly match this schema:
{
  "summary": string,
  "insights": string[],
  "recommendations": string[]
}

Requirements:
- Make the summary a concise paragraph tailored to the user's situation.
- Provide 3-5 specific, actionable insights.
- Provide 3-5 practical recommendations tied to the hexagrams and user's context.
- Do not include any fields other than the three specified above.`;
}

// 解析分析响应
function parseAnalysisResponse(response: string) {
  console.log('Parsing analysis response:', response);

  const lines = response.split('\n');
  let summary = '';
  const insights: string[] = [];
  const recommendations: string[] = [];

  let currentSection = '';

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith('SUMMARY:')) {
      currentSection = 'summary';
      summary = trimmed.replace('SUMMARY:', '').trim();
    } else if (trimmed.startsWith('INSIGHTS:')) {
      currentSection = 'insights';
    } else if (trimmed.startsWith('RECOMMENDATIONS:')) {
      currentSection = 'recommendations';
    } else if (trimmed.startsWith('- ')) {
      const item = trimmed.replace('- ', '').trim();
      if (currentSection === 'insights') {
        insights.push(item);
      } else if (currentSection === 'recommendations') {
        recommendations.push(item);
      }
    }
  }

  console.log('Parsed analysis:', { summary, insights, recommendations });

  return {
    summary: summary || 'The hexagram offers wisdom for your current situation.',
    insights: insights.length > 0 ? insights : ['The hexagram suggests seeking inner guidance'],
    recommendations: recommendations.length > 0 ? recommendations : ['Reflect on the hexagram meanings', 'Consider the guidance provided']
  };
}

// 从LLM文本中提取JSON（支持```json```代码块或裸JSON）
function extractJSONFromText(text: string): { summary: string; insights: string[]; recommendations: string[] } | null {
  try {
    if (!text) return null;
    let candidate = text.trim();
    // 去除Markdown代码块围栏
    const fenceMatch = candidate.match(/```json\s*([\s\S]*?)\s*```/i) || candidate.match(/```\s*([\s\S]*?)\s*```/i);
    if (fenceMatch && fenceMatch[1]) {
      candidate = fenceMatch[1].trim();
    }
    // 如果不是以{开头，尝试截取第一个JSON对象
    const firstBrace = candidate.indexOf('{');
    const lastBrace = candidate.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      candidate = candidate.slice(firstBrace, lastBrace + 1);
    }
    const parsed = JSON.parse(candidate);
    if (
      parsed && typeof parsed.summary === 'string' &&
      Array.isArray(parsed.insights) && Array.isArray(parsed.recommendations)
    ) {
      return parsed;
    }
    return null;
  } catch (e) {
    console.warn('Failed to parse JSON from LLM response:', e);
    return null;
  }
}
