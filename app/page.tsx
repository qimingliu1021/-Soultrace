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
      const originalHexagram = await calculateHexagram(data.number);
      
      // 计算所有相关卦象
      const allHexagrams = await calculateAllRelatedHexagrams(originalHexagram, data.number);
      
      // Removed image generation
      
      // 使用AI Agent进行分析
      let agentResult: any;
      try {
        console.log('🤖 启动AI Agent分析...');
        const agentResponse = await fetch('/api/hexagrams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userInput: data
          })
        });
        agentResult = await agentResponse.json();
        console.log('✅ Agent分析完成:', agentResult);
      } catch (error) {
        console.error('❌ Agent分析失败:', error);
        agentResult = {
          success: false,
          analysis: {
            summary: 'Agent分析暂时不可用',
            insights: ['请稍后重试'],
            recommendations: ['检查网络连接']
          }
        };
      }
      
      // Store data in sessionStorage and redirect
      const resultData = {
        originalHexagram: agentResult.success ? agentResult.hexagrams?.original : originalHexagram,
        allHexagrams: agentResult.success ? agentResult.hexagrams : allHexagrams,
        userInput: data,
        analysis: agentResult.analysis,
        agentContext: agentResult.agentContext,
        personalizedInsights: agentResult.personalizedInsights,
        session: agentResult.session,
        agentSuccess: agentResult.success
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