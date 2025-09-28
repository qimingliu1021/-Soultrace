'use client';

import { useState } from 'react';
import { Button } from './Button';

interface InputFormProps {
  onSubmit: (data: {
    city: string;
    previousCities?: string[];
    experience: string;
    difficulty: string;
    number: number;
  }) => void;
  isLoading?: boolean;
}

export function InputForm({ onSubmit, isLoading = false }: InputFormProps) {
  const [formData, setFormData] = useState({
    city: '',
    previousCityInput: '',
    previousCities: [] as string[],
    experience: '',
    difficulty: '',
    number: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.city && formData.experience && formData.difficulty && formData.number) {
      onSubmit({
        city: formData.city,
        previousCities: formData.previousCities,
        experience: formData.experience,
        difficulty: formData.difficulty,
        number: parseInt(formData.number)
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addPreviousCity = () => {
    const v = formData.previousCityInput.trim();
    if (!v) return;
    if (formData.previousCities.includes(v)) {
      setFormData({ ...formData, previousCityInput: '' });
      return;
    }
    setFormData({
      ...formData,
      previousCities: [...formData.previousCities, v],
      previousCityInput: ''
    });
  };

  const removePreviousCity = (city: string) => {
    setFormData({
      ...formData,
      previousCities: formData.previousCities.filter(c => c !== city)
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        I Ching Divination - Enter Your Information
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
            Your City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your City, Country"
            required
          />
        </div>

        {/* Previous Cities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Previous Cities</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="previousCityInput"
              value={formData.previousCityInput}
              onChange={handleChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add any previous cities"
            />
            <Button type="button" onClick={addPreviousCity}>
              Add
            </Button>
          </div>
          {formData.previousCities.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-3">
              {formData.previousCities.map((c) => (
                <li key={c} className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  <span>{c}</span>
                  <button
                    type="button"
                    onClick={() => removePreviousCity(c)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={`Remove ${c}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
            Your Personal Experience
          </label>
          <textarea
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe Your Personal Experience, Including Important Life Events, Turning Points, etc."
            required
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
            Current Difficulties
          </label>
          <textarea
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe Your Current Difficulties or Challenges"
            required
          />
        </div>

        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
            Divination Number (100-1000)
          </label>
          <input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            min="100"
            max="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please enter a number between 100 and 1000"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            This number will be used to calculate your hexagram
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            'Start Divination'
          )}
        </Button>
      </form>
    </div>
  );
}
