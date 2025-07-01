'use client';

import { useState } from 'react';
import { getRandomWord, generateSyllables } from './utils';

export default function SpeechMazePage() {
  const [step, setStep] = useState(0);
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [firstSyllable, secondSyllable] = currentWord;
  const currentSyllables = currentWord[step]

  const handleClick = (syllable: string) => {
    if (syllable === currentSyllables) {
      if (step === 0) {
        setStep(1);
      } else if (step === 1) {
        alert('Selamat!');
        setStep(0); // Reset to initial state
        setCurrentWord(getRandomWord()); // Get a new random word
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile-optimized container */}
      <div className="max-w-sm mx-auto px-8 py-12 h-screen flex flex-col">

        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 0 ? 'bg-blue-500 shadow-lg shadow-blue-200' : 'bg-gray-200'
              }`} />
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-500 shadow-lg shadow-blue-200' : 'bg-gray-200'
              }`} />
          </div>
        </div>

        {/* Target word display */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-light tracking-wider mb-4">
            <span className={`transition-all duration-300 ${step === 0
              ? 'text-blue-600 bg-blue-100 px-3 py-1 rounded-xl shadow-lg shadow-blue-200'
              : 'text-gray-400'
              }`}>
              {firstSyllable}
            </span>
            <span className="text-gray-300 mx-2">•</span>
            <span className={`transition-all duration-300 ${step === 1
              ? 'text-blue-600 bg-blue-100 px-3 py-1 rounded-xl shadow-lg shadow-blue-200'
              : 'text-gray-400'
              }`}>
              {secondSyllable}
            </span>
          </h1>
        </div>

        {/* Buttons container */}
        <div className="flex-1 flex items-center">
          <div className="w-full space-y-5">
            {generateSyllables(currentSyllables).map((syllable, index) => (
              <button
                key={`syllable-${index}`}
                onClick={() => handleClick(syllable)}
                className="group w-full h-16 bg-white border border-gray-200 rounded-2xl text-xl font-medium text-gray-800 
                         hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-100
                         active:scale-[0.98] active:bg-blue-100
                         transition-all duration-200 ease-out
                         focus:outline-none focus:ring-4 focus:ring-blue-100
                         shadow-sm"
              >
                <span className="group-hover:scale-110 transition-transform duration-200 inline-block">
                  {syllable}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Subtle bottom spacing */}
        <div className="h-8" />
      </div>
    </div>
  );
}