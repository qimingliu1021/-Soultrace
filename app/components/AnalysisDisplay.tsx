'use client';

interface AnalysisDisplayProps {
  analysis: {
    summary: string;
    insights: string[];
    recommendations: string[];
  };
}

export function AnalysisDisplay({ analysis }: AnalysisDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        AI Wisdom Analysis
      </h2>

      {/* Summary */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Summary</h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          {analysis.summary}
        </p>
      </div>

      {/* Insights */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Insights</h3>
        <ul className="space-y-3">
          {analysis.insights.map((insight, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-800 text-sm font-medium rounded-full mr-3 flex-shrink-0 mt-0.5">
                💡
              </span>
              <p className="text-gray-700 leading-relaxed">
                {insight}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendations */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Recommendations</h3>
        <ul className="space-y-3">
          {analysis.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mr-3 flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">
                {recommendation}
              </p>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
