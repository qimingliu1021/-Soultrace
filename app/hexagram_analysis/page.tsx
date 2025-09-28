'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { IChingHexagram } from '../lib/csvParser';
import { AnalysisDisplay } from '../components/AnalysisDisplay';

function HexagramAnalysisContent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<{
    originalHexagram: IChingHexagram;
    allHexagrams: {
      original: IChingHexagram;
      changed: IChingHexagram | null;
      mutual: IChingHexagram | null;
      opposite: IChingHexagram | null;
      inverted: IChingHexagram | null;
    };
    userInput: {
      city: string;
      experience: string;
      difficulty: string;
      number: number;
    };
    analysis?: {
      summary: string;
      insights: string[];
      recommendations: string[];
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResult = async () => {
      try {
        console.log('Loading result data...');
        
        // Try to get data from sessionStorage first
        const storedData = sessionStorage.getItem('hexagramResult');
        console.log('Stored data:', storedData);
        
        if (storedData) {
          const resultData = JSON.parse(storedData);
          console.log('Parsed result data:', resultData);
          setResult(resultData);
          // Clear the stored data after using it
          sessionStorage.removeItem('hexagramResult');
        } else {
          // Fallback to URL parameters if sessionStorage is empty
          const hexagramData = searchParams.get('hexagram');
          const userInputData = searchParams.get('userInput');
          const analysisData = searchParams.get('analysis');

          if (!hexagramData || !userInputData) {
            throw new Error('Missing required data');
          }

          const originalHexagram = JSON.parse(decodeURIComponent(hexagramData));
          const userInput = JSON.parse(decodeURIComponent(userInputData));
          let analysis = null;

          if (analysisData) {
            analysis = JSON.parse(decodeURIComponent(analysisData));
          }

          // For backward compatibility, create allHexagrams with just the original
          const allHexagrams = {
            original: originalHexagram,
            changed: null,
            mutual: null,
            opposite: null,
            inverted: null
          };

          setResult({ originalHexagram, allHexagrams, userInput, analysis });
        }
      } catch (error) {
        console.error('Error loading result:', error);
        // Redirect back to home if there's an error
        window.location.href = '/';
      } finally {
        setIsLoading(false);
      }
    };

    loadResult();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your divination result...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Result Not Found</h1>
          <p className="text-gray-600 mb-6">Unable to load your divination result.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start New Divination
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Your Divination Result
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on the ancient wisdom of the I Ching
          </p>
        </div>

        {/* 本卦信息 */}
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-2">
              本卦 (Primary Hexagram): {result.originalHexagram.trad_chinese} - {result.originalHexagram.english}
            </h3>
            <p className="text-lg text-gray-600">
              {result.originalHexagram.wilhelm_symbolic}
            </p>
          </div>
          

          {/* Judgment */}
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Judgment</h4>
            <p className="text-lg text-gray-700 leading-relaxed italic mb-4">
              &ldquo;{result.originalHexagram.wilhelm_judgment.text}&rdquo;
            </p>
            <div className="p-4 bg-white rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Interpretation:</h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {result.originalHexagram.wilhelm_judgment.comments}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Image</h4>
            <p className="text-lg text-gray-700 leading-relaxed italic mb-4">
              &ldquo;{result.originalHexagram.wilhelm_image.text}&rdquo;
            </p>
            <div className="p-4 bg-white rounded-lg">
              <h5 className="font-medium text-gray-700 mb-2">Interpretation:</h5>
              <p className="text-sm text-gray-600 leading-relaxed">
                {result.originalHexagram.wilhelm_image.comments}
              </p>
            </div>
          </div>

          {/* Lines (六爻) */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-6 text-gray-800 text-center">The Six Lines (六爻)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result.originalHexagram.wilhelm_lines).map(([lineNumber, lineData], index) => {
                const line = lineData as { text: string; comments: string };
                return (
                <div key={lineNumber} className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                      {lineNumber}
                    </div>
                    <h5 className="text-sm font-medium text-amber-800">
                      Line {lineNumber} {index === 0 ? '(Bottom)' : index === 5 ? '(Top)' : ''}
                    </h5>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2 italic">
                    "{line.text}"
                  </p>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    {line.comments}
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 相关卦象 */}
        <div className="max-w-6xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Related Hexagrams (相关卦象)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 变卦 */}
            {result.allHexagrams.changed && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">变</span>
                  变卦 (Changed)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">{result.allHexagrams.changed.trad_chinese} - {result.allHexagrams.changed.english}</h5>
                  <p className="text-sm text-gray-600 mt-1">Represents development trend or result</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">&ldquo;{result.allHexagrams.changed.wilhelm_judgment.text}&rdquo;</p>
                  <p className="text-xs text-gray-600">{result.allHexagrams.changed.wilhelm_symbolic.substring(0, 100)}...</p>
                </div>
              </div>
            )}

            {/* 互卦 */}
            {result.allHexagrams.mutual && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">互</span>
                  互卦 (Mutual)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">{result.allHexagrams.mutual.trad_chinese} - {result.allHexagrams.mutual.english}</h5>
                  <p className="text-sm text-gray-600 mt-1">Represents inner mechanism or process</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">&ldquo;{result.allHexagrams.mutual.wilhelm_judgment.text}&rdquo;</p>
                  <p className="text-xs text-gray-600">{result.allHexagrams.mutual.wilhelm_symbolic.substring(0, 100)}...</p>
                </div>
              </div>
            )}

            {/* 错卦 */}
            {result.allHexagrams.opposite && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">错</span>
                  错卦 (Opposite)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">{result.allHexagrams.opposite.trad_chinese} - {result.allHexagrams.opposite.english}</h5>
                  <p className="text-sm text-gray-600 mt-1">Represents opposite perspective</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">&ldquo;{result.allHexagrams.opposite.wilhelm_judgment.text}&rdquo;</p>
                  <p className="text-xs text-gray-600">{result.allHexagrams.opposite.wilhelm_symbolic.substring(0, 100)}...</p>
                </div>
              </div>
            )}

            {/* 综卦 */}
            {result.allHexagrams.inverted && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">综</span>
                  综卦 (Inverted)
                </h4>
                <div className="mb-3">
                  <h5 className="font-medium text-gray-700">{result.allHexagrams.inverted.trad_chinese} - {result.allHexagrams.inverted.english}</h5>
                  <p className="text-sm text-gray-600 mt-1">Represents reverse perspective</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p className="italic mb-2">&ldquo;{result.allHexagrams.inverted.wilhelm_judgment.text}&rdquo;</p>
                  <p className="text-xs text-gray-600">{result.allHexagrams.inverted.wilhelm_symbolic.substring(0, 100)}...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Input Review */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Your Input</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">City</h5>
                <p className="text-gray-600">{result.userInput.city}</p>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Personal Experience</h5>
                <p className="text-gray-600">{result.userInput.experience}</p>
              </div>
              <div className="md:col-span-2">
                <h5 className="font-medium text-gray-700 mb-2">Current Difficulty</h5>
                <p className="text-gray-600">{result.userInput.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Redo Button */}
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Divinate Again
            </button>
          </div>
        </div>

        {/* AI Analysis */}
        {result.analysis && (
          <AnalysisDisplay analysis={result.analysis} />
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

export default function HexagramAnalysisPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HexagramAnalysisContent />
    </Suspense>
  );
}
