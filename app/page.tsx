'use client';

import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { calculateHexagram, generateImagePrompt, IChingHexagram } from './lib/iching';
import { generateImage } from './lib/imageGeneration';

export default function Home() {
  const [result, setResult] = useState<{
    hexagram: IChingHexagram;
    userInput: {
      city: string;
      experience: string;
      difficulty: string;
      number: number;
    };
    generatedImageUrl?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  }) => {
    setIsLoading(true);
    
    try {
      // 计算卦象
      const hexagram = calculateHexagram(data.number);
      
      // 生成图像提示词
      const imagePrompt = generateImagePrompt(
        hexagram,
        data.city,
        data.experience,
        data.difficulty
      );
      
      // 生成图像
      let generatedImageUrl: string | null = null;
      try {
        generatedImageUrl = await generateImage(imagePrompt);
      } catch (error) {
        console.error('Image generation failed:', error);
        // 如果图像生成失败，使用占位符
        generatedImageUrl = `https://picsum.photos/1024/1024?random=${data.number}`;
      }
      
      setResult({
        hexagram,
        userInput: data,
        generatedImageUrl: generatedImageUrl || undefined
      });
    } catch (error) {
      console.error('Error processing divination:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            I Ching Divination
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on the ancient wisdom of the I Ching, a digital divination based on your personal experience generates a unique hexagram image
          </p>
        </div>

        {/* 主要内容 */}
        {!result ? (
          <InputForm onSubmit={handleFormSubmit} />
        ) : (
          <ResultDisplay
            hexagram={result.hexagram}
            userInput={result.userInput}
            generatedImageUrl={result.generatedImageUrl}
            isLoading={isLoading}
          />
        )}

        {/* 底部信息 */}
        <footer className="text-center mt-16 text-gray-500">
          <p className="mb-2">
            Based on the ancient wisdom of the I Ching, combined with modern AI technology
          </p>
        </footer>
      </div>
    </div>
  );
}