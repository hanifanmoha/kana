'use client';

import { useState } from 'react';

const words: Array<[string, string]> = [
  ['ku', 'da'],
  ['sa', 'pi'],
  ['so', 'to'],
  ['ni', 'la'],
  ['ba', 'tu'],
  ['ja', 'mu'],
  ['ti', 'ga'],
];

const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

const generateSyllables = (targetSyllable: string) => {
  const firstLetter = targetSyllable.charAt(0);
  return 'aiueo'.split('').map(vowel => `${firstLetter}${vowel}`);
}

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
        alert('Congratulations! You completed the maze!');
        setStep(0); // Reset to initial state
        setCurrentWord(getRandomWord()); // Get a new random word
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile-optimized container */}
      <div className="max-w-md mx-auto px-6 py-8 h-screen flex flex-col">

        <div className="text-center mb-12">
          <h1 className="text-6xl font-normal text-black mb-8">
            {firstSyllable} {secondSyllable}
          </h1>
        </div>

        <div className="space-y-4">
          {generateSyllables(currentSyllables).map((syllable, index) => (
            <button
              key={`left-${index}`}
              onClick={() => handleClick(syllable)}
              className="w-full h-16 bg-white border-2 border-black rounded-xl text-2xl font-normal text-black hover:bg-gray-50 transition-colors"
            >
              {syllable}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}