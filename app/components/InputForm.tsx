'use client';

import { useState } from 'react';
import { Button } from './Button';

interface InputFormProps {
  onSubmit: (data: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  }) => void;
}

export function InputForm({ onSubmit }: InputFormProps) {
  const [formData, setFormData] = useState({
    city: '',
    experience: '',
    difficulty: '',
    number: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.city && formData.experience && formData.difficulty && formData.number) {
      onSubmit({
        city: formData.city,
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
            placeholder="Enter Your City"
            required
          />
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
            Divination Number (1-1000)
          </label>
          <input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            min="1"
            max="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please enter a number between 1 and 1000"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            This number will be used to calculate your hexagram (number modulo 8)
          </p>
        </div>

        <Button type="submit" className="w-full">
          Start Divination
        </Button>
      </form>
    </div>
  );
}
