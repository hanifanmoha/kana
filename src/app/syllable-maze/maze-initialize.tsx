
export class Cell {

  col: number;
  row: number;

  isTopWall: boolean;
  isRightWall: boolean;
  isBottomWall: boolean;
  isLeftWall: boolean;

  isInPath: boolean;
  isVisited: boolean;

  isFirst: boolean = false;
  isLast: boolean = false;

  nextCells: Cell[];
  nextCell: Cell | null;

  constructor(col: number, row: number) {
    this.col = col;
    this.row = row;

    this.isTopWall = true;
    this.isRightWall = true;
    this.isBottomWall = true;
    this.isLeftWall = true;

    this.isVisited = false;
    this.isInPath = false;

    this.nextCells = [];
    this.nextCell = null;
  }
}

function runMaze(cells: Cell[][], r: number, c: number, dir: 'up' | 'down' | 'left' | 'right' | ''): { isReachFinish: boolean, isNeighbor: boolean } {

  function removeCurrentWall(currentCell: Cell) {
    // remove wall from next cell
    switch (dir) {
      case 'up':
        currentCell.isBottomWall = false;
        break;
      case 'down':
        currentCell.isTopWall = false;
        break;
      case 'left':
        currentCell.isRightWall = false;
        break;
      case 'right':
        currentCell.isLeftWall = false;
        break;
    }
  }

  if (r < 0 || r >= cells.length || c < 0 || c >= cells[0].length) {
    return { isReachFinish: false, isNeighbor: false };
  }

  const currentCell = cells[r][c];

  if (currentCell.isVisited) {
    return { isReachFinish: false, isNeighbor: false };
  }

  if (r == cells.length - 1 && c == cells[0].length - 1) {
    removeCurrentWall(currentCell);
    currentCell.isVisited = true;
    return { isReachFinish: true, isNeighbor: true };
  }

  currentCell.isVisited = true;

  let isReachFinish = false

  // init array then randomize
  const dirs: { r: number, c: number, direction: 'up' | 'down' | 'left' | 'right', wall: 'isTopWall' | 'isBottomWall' | 'isLeftWall' | 'isRightWall', flag: boolean }[] = [
    { r: r - 1, c: c, direction: 'up', wall: 'isTopWall', flag: false },
    { r: r + 1, c: c, direction: 'down', wall: 'isBottomWall', flag: false },
    { r: r, c: c - 1, direction: 'left', wall: 'isLeftWall', flag: false },
    { r: r, c: c + 1, direction: 'right', wall: 'isRightWall', flag: false },
  ]

  // remove walls to next cells
  for (let i = 0; i < dirs.length; i++) {
    const filteredDirs = dirs.filter(dir => !dir.flag)
    const randomIndex = Math.floor(Math.random() * filteredDirs.length);
    const nextDir = filteredDirs[randomIndex];
    const { r: newR, c: newC, direction, wall } = nextDir;
    const result = runMaze(cells, newR, newC, direction);
    if (result.isNeighbor) {
      currentCell.nextCells.push(cells[newR][newC]);
      currentCell[wall] = false;
    }
    if (result.isReachFinish) {
      currentCell.nextCell = cells[newR][newC];
      isReachFinish = true;
    }
    nextDir.flag = true
  }

  removeCurrentWall(currentCell);

  return { isReachFinish: isReachFinish, isNeighbor: true };
}

function markPath(cell: Cell) {
  cell.isInPath = true;
  if (cell.nextCell) {
    markPath(cell.nextCell)
  }
}

export function generateMaze(cells: Cell[][]) {
  runMaze(cells, 0, 0, '');
  markPath(cells[0][0]);
  cells[0][0].isFirst = true; // Mark the first cell
  cells[cells.length - 1][cells[0].length - 1].isLast = true; // Mark the last cell
  // reset isVisited to false
  for (let row of cells) {
    for (let cell of row) {
      cell.isVisited = false;
    }
  }
}

export function initializeCells(rows: number, cols: number) {
  const cells: Cell[][] = [];
  for (let row = 0; row < rows; row++) {
    const currentRow: Cell[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(new Cell(col, row));
    }
    cells.push(currentRow);
  }
  return cells;
}