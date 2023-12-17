import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn=0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
    );
    console.log("Initial Board state:", initialBoard);
    return initialBoard;
  }
  
  

  function hasWon() {
    console.log("Board state:", board);
    // Check if every cell is turned off
    return board.every(row => row.every(cell => !cell));
  }
  

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // Make sure this coord is actually on the board, then flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row]);

      // Flip the clicked cell and its neighbors
      flipCell(y, x, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);

      return newBoard;
    });
  }

  // if the game is won, just show a winning message & render nothing else
  if (hasWon()) {
    return <div>You Won!</div>;
  }

  // Make table board
  return (
    <table className="Board">
      <tbody>
      {board.map((row, rowIndex) => (
  <tr key={rowIndex}>
    {row.map((cell, colIndex) => (
      <Cell
        key={`${rowIndex}-${colIndex}`}
        flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
        isLit={cell}
      />
    ))}
  </tr>
))}

      </tbody>
    </table>
  );
}


export default Board;