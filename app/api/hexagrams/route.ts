import { NextResponse } from 'next/server';
import { getAllHexagrams } from '../../lib/csvParser';
import { executeIChingAnalysis } from '../../lib/agent/orchestrator';

export async function GET() {
  try {
    const hexagrams = getAllHexagrams();
    return NextResponse.json(hexagrams);
  } catch (error) {
    console.error('Error loading hexagrams:', error);
    return NextResponse.json({ error: 'Failed to load hexagrams' }, { status: 500 });
  }
}

// AI Agent 分析 API
export async function POST(request: Request) {
  try {
    const { userInput } = await request.json();
    
    console.log('🤖 启动 IChing Agent...');
    console.log('用户输入:', userInput);
    
    // 使用新的Agent系统
    const agentResult = await executeIChingAnalysis(userInput);
    
    if (agentResult.success) {
      console.log('✅ Agent 执行成功');
      
      return NextResponse.json({ 
        success: true,
        analysis: agentResult.data.generateComprehensiveAnalysis,
        hexagrams: agentResult.data.deriveRelatedHexagrams,
        userSituation: agentResult.data.analyzeUserSituation,
        session: agentResult.session,
        personalizedInsights: agentResult.personalizedInsights,
        agentContext: agentResult.data.context || '这是您的第一次占卜体验'
      });
    } else {
      throw new Error('Agent execution failed');
    }
    
  } catch (error) {
    console.error('❌ Agent 执行失败:', error);
    
    // 回退到简单的分析
    try {
      const { userInput } = await request.json();
      const simpleAnalysis = await analyzeHexagramWithGPT(null, userInput, null);
      
      return NextResponse.json({ 
        success: false,
        error: 'Agent failed, using fallback analysis',
        analysis: simpleAnalysis
      });
    } catch (fallbackError) {
      return NextResponse.json({ 
        success: false,
        error: 'Both Agent and fallback failed',
        analysis: {
          summary: '分析服务暂时不可用，请稍后重试',
          insights: ['请尝试重新提交您的信息'],
          recommendations: ['检查网络连接', '稍后重试']
        }
      }, { status: 500 });
    }
  }
}

async function analyzeHexagramWithGPT(hexagram: any, userInput: any, allHexagrams: any) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }
  
  const prompt = createAnalysisPrompt(hexagram, userInput, allHexagrams);
  
  console.log('Sending streaming request to OpenAI...');
  console.log('Prompt length:', prompt.length);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5',
      messages: [
        {
          role: 'system',
          content: 'You are a wise I Ching consultant with deep knowledge of Chinese philosophy and divination. Provide thoughtful, practical guidance based on the hexagram and user situation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
      stream: true,
    }),
  });

  console.log('OpenAI response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error(`OpenAI API request failed: ${response.status} ${errorText}`);
  }

  // Process streaming response
  let fullText = '';
  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error('No response body reader available');
  }

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            break;
          }
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
            }
          } catch (e) {
            // Skip invalid JSON lines
            continue;
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  console.log('Full analysis text received:', fullText);

  if (!fullText) {
    throw new Error('No analysis text received from OpenAI');
  }

  return parseAnalysisResponse(fullText);
}

function createAnalysisPrompt(hexagram: any, userInput: any, allHexagrams: any): string {
  return `Based on the I Ching hexagram analysis with 5 related hexagrams, provide a comprehensive analysis of the following situation:

PRIMARY HEXAGRAM (本卦):
- Name: ${hexagram.trad_chinese} (${hexagram.english})
- Judgment: ${hexagram.wilhelm_judgment.text}
- Image: ${hexagram.wilhelm_image.text}
- Symbolic Meaning: ${hexagram.wilhelm_symbolic}

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
- Personal Experience: ${userInput.experience}
- Current Difficulty: ${userInput.difficulty}
- Divination Number: ${userInput.number}

Please provide a comprehensive analysis considering all five hexagrams:

User's Location: ${userInput.city}
Personal Experience: ${userInput.experience}
Current Difficulty: ${userInput.difficulty}

Hexagram Information:
- Judgment: ${hexagram.wilhelm_judgment.text}
- Image: ${hexagram.wilhelm_image.text}
- Symbolic Meaning: ${hexagram.wilhelm_symbolic}

Please provide a comprehensive analysis in the following format:

SUMMARY: [A paragraph of overview of what each hexagrams mean for the user's situation]

INSIGHTS: 
- [Insight 1 about the situation specifically to the user's personal experience]
- [Insight 2 about the situation specifically to the user's current difficulty]
- [Insight 3 about the situation specifically to the user's current difficulty]

RECOMMENDATIONS:
- [Practical recommendation 1 specifically to the user's personal experience and all the hexagrams]
- [Practical recommendation 2 specifically to the user's difficulty and all the hexagrams]
- [Practical recommendation 3 specifically to the user's difficulty and all the hexagrams]

Focus on practical guidance that connects the ancient wisdom to the user's modern situation. Be encouraging but realistic.`;
}

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