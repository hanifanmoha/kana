import { Cell } from "./maze-initialize";

interface BoxProps {
  cell: Cell;
  isCurrentCell: boolean;
}

interface MazeProps {
  cells: Cell[][];
  currentRow: number;
  currentCol: number;
}

function Box({ cell, isCurrentCell }: BoxProps) {
  // Determine if the cell is the current position

  let bgClassName = ''
  if (cell.isVisited) {
    bgClassName = 'bg-yellow-100'
  }
  if (cell.isFirst) {
    bgClassName = 'bg-green-100'
  }
  if (cell.isLast) {
    bgClassName = 'bg-red-100'
  }

  const customClassNames = [
    cell.isTopWall ? "border-t-2 border-black" : "",
    cell.isRightWall ? "border-r-2 border-black" : "",
    cell.isBottomWall ? "border-b-2 border-black" : "",
    cell.isLeftWall ? "border-l-2 border-black" : "",
    bgClassName,
  ];

  return (
    <div className={`w-12 h-12 flex justify-center items-center ${customClassNames.join(" ")}`}>
      {isCurrentCell && <div className="w-3 h-3 bg-black rounded-full"></div>}
    </div>
  );
}

function Maze({ cells, currentCol, currentRow }: MazeProps) {

  return (
    <div className="flex flex-col items-center justify-center">
      {cells.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <Box key={colIndex} cell={cell} isCurrentCell={cell.row === currentRow && cell.col === currentCol} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Maze;
