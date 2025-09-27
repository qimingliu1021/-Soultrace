'use client';

import { IChingHexagram } from '../lib/iching';
import Image from 'next/image';

interface ResultDisplayProps {
  hexagram: IChingHexagram;
  userInput: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  };
  generatedImageUrl?: string;
  isLoading?: boolean;
}

export function ResultDisplay({ 
  hexagram, 
  userInput, 
  generatedImageUrl, 
  isLoading = false 
}: ResultDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Your Divination Result
      </h2>

      {/* 卦象信息 */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {hexagram.chineseName} - {hexagram.name}
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            {hexagram.description}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">Your divination number: {userInput.number}</p>
          <p className="text-sm text-gray-500">Calculation: {userInput.number} ÷ 8 = {Math.floor(userInput.number / 8)} remainder {userInput.number % 8}</p>
        </div>
      </div>

      {/* Judgment */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Judgment</h4>
        <p className="text-lg text-gray-700 leading-relaxed italic">
          &ldquo;{hexagram.judgment}&rdquo;
        </p>
      </div>

      {/* Image Text */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Image</h4>
        <p className="text-lg text-gray-700 leading-relaxed italic">
          &ldquo;{hexagram.image}&rdquo;
        </p>
      </div>

      {/* Lines */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Lines</h4>
        <div className="space-y-3">
          {hexagram.lines.map((line, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mr-3 flex-shrink-0">
                  {index + 1}
                </span>
                <p className="text-gray-700 leading-relaxed">
                  {line}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Image */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Generated Image</h4>
        <div className="text-center">
          {isLoading ? (
            <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating your image...</p>
              </div>
            </div>
          ) : generatedImageUrl ? (
            <div className="relative">
              <Image
                src={generatedImageUrl}
                alt={`${hexagram.chineseName} Hexagram Image`}
                width={1024}
                height={1024}
                className="rounded-lg shadow-lg mx-auto"
                priority
              />
            </div>
          ) : (
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Image generation failed. Please try again later.</p>
            </div>
          )}
        </div>
      </div>

      {/* User Input Review */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Your Input</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">City</h5>
            <p className="text-gray-600">{userInput.city}</p>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">Personal Experience</h5>
            <p className="text-gray-600">{userInput.experience}</p>
          </div>
          <div className="md:col-span-2">
            <h5 className="font-medium text-gray-700 mb-2">Current Difficulty</h5>
            <p className="text-gray-600">{userInput.difficulty}</p>
          </div>
        </div>
      </div>

      {/* Redo Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Divinate Again
        </button>
      </div>
    </div>
  );
}
