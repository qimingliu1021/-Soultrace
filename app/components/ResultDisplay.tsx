'use client';

import { IChingHexagram } from '../lib/csvParser';

interface ResultDisplayProps {
  hexagram: IChingHexagram;
  userInput: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  };
  isLoading?: boolean;
}

export function ResultDisplay({ 
  hexagram, 
  userInput, 
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
            {hexagram.trad_chinese} - {hexagram.english}
          </h3>
          <p className="text-lg text-gray-600 mt-2">
            {hexagram.wilhelm_symbolic}
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
          &ldquo;{hexagram.wilhelm_judgment.text}&rdquo;
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-700 mb-2">Interpretation:</h5>
          <p className="text-sm text-gray-600 leading-relaxed">
            {hexagram.wilhelm_judgment.comments}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-4 text-gray-800">Image</h4>
        <p className="text-lg text-gray-700 leading-relaxed italic">
          &ldquo;{hexagram.wilhelm_image.text}&rdquo;
        </p>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-700 mb-2">Interpretation:</h5>
          <p className="text-sm text-gray-600 leading-relaxed">
            {hexagram.wilhelm_image.comments}
          </p>
        </div>
      </div>

      {/* Lines (六爻) */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold mb-6 text-gray-800 text-center">The Six Lines (六爻)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(hexagram.wilhelm_lines).map(([lineNumber, lineData], index) => (
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
                "{lineData.text}"
              </p>
              <div className="text-xs text-gray-600 leading-relaxed">
                {lineData.comments}
              </div>
            </div>
          ))}
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
