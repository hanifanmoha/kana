'use client';

import Maze from "./Maze";
import useMaze from "./useMaze";

function SyllableMazePage() {

  const { cells, currentPos, isFinished, next } = useMaze();

  console.log('cells', cells);
  console.log('currentPos', currentPos);

  return (
    <div className="min-h-screen">
      <div className="max-w-sm mx-auto px-8 py-12 h-screen flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Syllable Maze Lv 1</h1>
        <Maze cells={cells} currentRow={currentPos.r} currentCol={currentPos.c} />
        <button
          disabled={isFinished}
          onClick={next}
          className="mt-4 border cursor-pointer rounded-md bg-white hover:bg-gray-100 disabled:opacity-50 text-black py-2 px-4"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SyllableMazePage;
