'use client';

import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { calculateHexagram, calculateAllRelatedHexagrams } from './lib/csvParser';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (data: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  }) => {
    setIsLoading(true);
    
    try {
      // 计算本卦
      const originalHexagram = calculateHexagram(data.number);
      
      // 计算所有相关卦象
      const allHexagrams = calculateAllRelatedHexagrams(originalHexagram, data.number);
      
      // Removed image generation
      
      // 生成AI分析
      let analysis: {
        summary: string;
        insights: string[];
        recommendations: string[];
      } | undefined;
      try {
        const analysisResponse = await fetch('/api/hexagrams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hexagram: originalHexagram,
            userInput: data,
            allHexagrams: allHexagrams
          })
        });
        const analysisData = await analysisResponse.json();
        analysis = analysisData.analysis;
      } catch (error) {
        console.error('AI analysis failed:', error);
      }
      
      // Store data in sessionStorage and redirect
      const resultData = {
        originalHexagram,
        allHexagrams,
        userInput: data,
        analysis: analysis || undefined
      };

      console.log('Storing result data:', resultData);
      
      // Store the data in sessionStorage
      sessionStorage.setItem('hexagramResult', JSON.stringify(resultData));
      
      console.log('Redirecting to hexagram_analysis page');
      
      // Redirect to result page
      window.location.href = '/hexagram_analysis';
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
        <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />

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