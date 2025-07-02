'use client';

import Maze from "./Maze";
import Syllable from "./Syllable";
import useMaze from "./useMaze";
import useSyllable from "./useSyllable";

function SyllableMazePage() {

  const { cells, currentPos, isFinished, next, reset: resetMaze } = useMaze();
  const { currentSyllable, options, reset: resetSyllable } = useSyllable();

  function handleClick(selectedSyllable: string) {
    if (selectedSyllable === currentSyllable) {
      next();
      resetSyllable();
    }
  }

  function reset() {
    resetMaze();
    resetSyllable();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-sm mx-auto px-8 py-12 h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Syllable Maze Lv 1</h1>
        <Maze cells={cells} currentRow={currentPos.r} currentCol={currentPos.c} />
        {!isFinished && <Syllable syllable={currentSyllable} options={options} onClick={handleClick} />}
        {isFinished && <div className="text-center mt-8">
          <button
            className="mx-2 mb-4 border cursor-pointer rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 text-black py-2 px-4"
            onClick={reset}
          >
            RESET
          </button>
        </div>}
      </div>
    </div>
  );
}

export default SyllableMazePage;
