import { NextResponse } from 'next/server';
import { getAllHexagrams } from '../../lib/csvParser';

export async function GET() {
  try {
    const hexagrams = getAllHexagrams();
    return NextResponse.json(hexagrams);
  } catch (error) {
    console.error('Error loading hexagrams:', error);
    return NextResponse.json({ error: 'Failed to load hexagrams' }, { status: 500 });
  }
}

// AI 分析 API
export async function POST(request: Request) {
  try {
    const { hexagram, userInput, allHexagrams } = await request.json();
    
    console.log('OpenAI API Key exists:', !!process.env.OPENAI_API_KEY);
    console.log('OpenAI API Key length:', process.env.OPENAI_API_KEY?.length || 0);
    
    // Always try to get AI analysis, even if API key might not be configured
    let analysis;
    try {
      analysis = await analyzeHexagramWithGPT(hexagram, userInput, allHexagrams);
    } catch (error) {
      console.error('AI analysis failed:', error);
      // Return default analysis if AI fails
      analysis = {
        summary: 'AI analysis is not available. Please configure OpenAI API key.',
        insights: ['The hexagram suggests seeking guidance from traditional sources'],
        recommendations: ['Consult with a knowledgeable practitioner', 'Reflect deeply on the hexagram meanings']
      };
    }
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error in AI analysis:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze hexagram',
      analysis: {
        summary: 'Analysis failed. Please try again.',
        insights: ['The hexagram offers wisdom for your situation'],
        recommendations: ['Reflect on the hexagram meanings', 'Consider the guidance provided']
      }
    }, { status: 500 });
  }
}

async function analyzeHexagramWithGPT(hexagram: any, userInput: any, allHexagrams: any) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }
  
  const prompt = createAnalysisPrompt(hexagram, userInput, allHexagrams);
  
  console.log('Sending request to OpenAI...');
  console.log('Prompt length:', prompt.length);
  
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
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
    }),
  });

  console.log('OpenAI response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error(`OpenAI API request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  console.log('OpenAI response data:', data);
  
  const analysisText = data.choices[0]?.message?.content;
  console.log('Analysis text:', analysisText);
  
  if (!analysisText) {
    throw new Error('No analysis text received from OpenAI');
  }
  
  return parseAnalysisResponse(analysisText);
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