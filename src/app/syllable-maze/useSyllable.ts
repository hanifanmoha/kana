import { useEffect, useState } from "react";

const letters = 'bcdfghjklmnpqrstvwxyz';
const vocal = 'aiueo';

export default function useSyllable() {

  const [currentSyllable, setCurrentSyllable] = useState('ba');
  const [options, setOptions] = useState<string[]>([]);

  function reset() {
    const randomIndex = Math.floor(Math.random() * letters.length);
    const randomLetter = letters[randomIndex];

    const randomVocalIndex = Math.floor(Math.random() * vocal.length);
    const randomVocal = vocal[randomVocalIndex];

    const newSyllable = `${randomLetter}${randomVocal}`;

    if (newSyllable === currentSyllable) {
      return reset();
    }
    setCurrentSyllable(newSyllable);
  }

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    const vocal = 'aiueo';
    const currentLetter = currentSyllable.charAt(0);
    const newOptions = vocal.split('').map(vowel => `${currentLetter}${vowel}`).sort(() => Math.random() - 0.5);
    setOptions(newOptions);
  }, [currentSyllable]);

  return {
    currentSyllable,
    reset,
    options,
  };
}