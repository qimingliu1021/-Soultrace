import OpenAI from 'openai';

// 初始化OpenAI客户端
const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function generateImage(prompt: string): Promise<string | null> {
  if (!openai) {
    console.log('OpenAI API key not provided, using placeholder image');
    return null;
  }

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data?.[0]?.url || null;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

// 备用方案：使用占位符图像
export function getPlaceholderImage(hexagramNumber: number): string {
  return `https://picsum.photos/1024/1024?random=${hexagramNumber}`;
}
