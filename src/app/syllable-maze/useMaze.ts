import { useEffect, useState } from "react";
import { generateMaze, initializeCells } from "./maze-initialize";

const SIZE = 4

export default function useMaze() {

  const [cells, setCells] = useState(initializeCells(SIZE, SIZE));
  const [currentPos, setCurrentPos] = useState({ r: 0, c: 0 });

  useEffect(() => {
    const newCells = initializeCells(SIZE, SIZE);
    generateMaze(newCells);
    setCells(newCells);
  }, []);

  function reset() {
    const newCells = initializeCells(SIZE, SIZE);
    generateMaze(newCells);
    setCells(newCells);
    setCurrentPos({ r: 0, c: 0 });
  }

  function next() {
    const currentCell = cells[currentPos.r][currentPos.c];
    if (currentCell.nextCell) {
      const nextCell = currentCell.nextCell;
      setCurrentPos({ r: nextCell.row, c: nextCell.col });
      setCells(prevCells => {
        return prevCells.map(row => {
          return row.map(cell => {
            const isVisited = cell.isVisited || (cell.row === nextCell.row && cell.col === nextCell.col);
            return {
              ...cell,
              isVisited,
            }
          })
        })
      })
    }
  }

  return {
    cells,
    currentPos,
    isFinished: currentPos.r === SIZE - 1 && currentPos.c === SIZE - 1,
    next,
    reset,
  }

}