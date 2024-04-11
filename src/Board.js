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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  // TODO: create array-of-arrays of true/false values
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      const row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }
  
  let playerWon = false;
  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    board.forEach(row=>{
      row.forEach(item=>{
        if(item === false){
          playerWon = true;
        }
      })
    })
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const oldBoardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, oldBoardCopy);

      flipCell(y-1, x, oldBoardCopy);
      flipCell(y+1, x, oldBoardCopy);
      flipCell(y, x-1, oldBoardCopy);
      flipCell(y, x+1, oldBoardCopy)
      hasWon();


      // TODO: return the copy
      return oldBoardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(playerWon){
    const hideBoard = () =>{
      setBoard([])
    }
    hideBoard()
    return(
      <div className="victory">
        <b className="victory-class">You Won</b>
      </div>
    )
  }

  // TODO

  // make table board
  const renderTable = () => {
      const rows = [];
      for(let i=0; i<nrows; i++){
        const cells = [];
        for(let j=0; j<ncols; j++){
          const coord = `${i}-${j}`;
          <td className="Gameboard-cell"></td>
          cells.push(<Cell
            key={coord}
            isLit={board[i][j]}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />)
        }
        rows.push(<tr key={i}>{cells}</tr>)
      }
      return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
      );

  }
  // TODO
  return renderTable()
}

export default Board;
