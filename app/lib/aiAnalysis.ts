import OpenAI from 'openai';
import { IChingHexagram } from './csvParser';

// 初始化OpenAI客户端
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export interface AnalysisResult {
  overallMeaning: string;
  personalGuidance: string;
  currentSituation: string;
  recommendations: string[];
  warningSigns: string[];
  opportunities: string[];
}

export async function analyzeHexagram(
  hexagram: IChingHexagram,
  userInput: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  }
): Promise<AnalysisResult | null> {
  if (!openai) {
    console.log('OpenAI API key not provided, using mock analysis');
    return getMockAnalysis(hexagram, userInput);
  }

  try {
    const judgmentText = hexagram.wilhelm_judgment.text;
    const symbolicText = hexagram.wilhelm_symbolic;
    
    const prompt = `You are an expert in I Ching (Book of Changes) divination. Analyze the following hexagram and provide guidance based on the user's situation.

HEXAGRAM INFORMATION:
- Number: ${hexagram.hex}
- Chinese Name: ${hexagram.trad_chinese}
- English Name: ${hexagram.english}
- Symbolic Meaning: ${symbolicText}
- Judgment: ${judgmentText}
- Binary: ${hexagram.binary}
- Above Trigram: ${JSON.stringify(hexagram.wilhelm_above)}
- Below Trigram: ${JSON.stringify(hexagram.wilhelm_below)}

USER'S SITUATION:
- City: ${userInput.city}
- Personal Experience: ${userInput.experience}
- Current Difficulty: ${userInput.difficulty}
- Divination Number: ${userInput.number}

Please provide a comprehensive analysis in the following format (respond in JSON format only):

{
  "overallMeaning": "Brief explanation of what this hexagram means in general",
  "personalGuidance": "Specific guidance for this person based on their situation",
  "currentSituation": "Analysis of their current life situation",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "warningSigns": ["Warning 1", "Warning 2"],
  "opportunities": ["Opportunity 1", "Opportunity 2"]
}

Make the analysis practical, wise, and directly applicable to their life. Focus on actionable advice.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a wise I Ching divination expert. Provide practical, actionable guidance based on ancient wisdom applied to modern life. Always respond in valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const analysisText = response.choices[0]?.message?.content || '';
    return JSON.parse(analysisText);
  } catch (error) {
    console.error('Error generating analysis:', error);
    return getMockAnalysis(hexagram, userInput);
  }
}

function getMockAnalysis(
  hexagram: IChingHexagram,
  userInput: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  }
): AnalysisResult {
  const judgmentText = hexagram.wilhelm_judgment.text;
  
  return {
    overallMeaning: `The ${hexagram.english} hexagram (${hexagram.trad_chinese}) represents ${hexagram.wilhelm_symbolic}. This is a time of ${judgmentText.includes('success') ? 'great potential' : 'careful consideration'}.`,
    personalGuidance: `Based on your experience in ${userInput.city} and your current challenges, this hexagram suggests focusing on ${userInput.difficulty.includes('work') ? 'career development' : 'personal growth'}.`,
    currentSituation: `You are at a pivotal moment where your past experiences are preparing you for new opportunities. The difficulty you're facing is part of a larger transformation.`,
    recommendations: [
      "Take time to reflect on your experiences and learn from them",
      "Be patient and persistent in your current endeavors",
      "Seek guidance from wise mentors or trusted friends"
    ],
    warningSigns: [
      "Avoid making hasty decisions",
      "Don't ignore your inner wisdom"
    ],
    opportunities: [
      "New beginnings are possible",
      "Your experiences have prepared you for growth"
    ]
  };
}
