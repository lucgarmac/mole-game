import { Injectable } from '@angular/core';
import { BOARD_LENGTH, CONFIG_LEVELS } from '../config/game.config';



@Injectable({
  providedIn: 'root',
})
export class GameService {

  private _currentConfigLevel = CONFIG_LEVELS.low;
  private _board: Array<string[]>;
  private _interval;

  /**
   * Add moles in the board random position
   */
  private _addMoles = () => {
    for(let i=0;i<this._currentConfigLevel.moles;i++) {
      const {row,col} = this._generateMolePosition();
      this._updateBoardPosition(row,col,true);
    }
  }

  /**
   * Add/Remove a mole in the board cell
   * @param row
   * @param col
   * @param addMole
   */
  private _updateBoardPosition = (row:number, col:number, addMole = false) => {
    this._board[row][col] = addMole ? 'M' : null;
  }

  /**
   * Generate random position in the board. If the position contains a mole
   * generates a new position.
   * @returns
   */
  private _generateMolePosition = () => {
    let row = Math.floor(Math.random() *BOARD_LENGTH);
    let col = Math.floor(Math.random() *BOARD_LENGTH);

    while(this._board[row][col] === 'M') {
      row = Math.floor(Math.random() *BOARD_LENGTH);
      col = Math.floor(Math.random() *BOARD_LENGTH);
    }
    return {row,col};
  }

  get board(): Array<string[]> {
    return this._board;
  }

  get currentConfigLevel() {
    return this._currentConfigLevel;
  }

  /**
   * Generate board
   * @returns
   */
  getLevelBoard = () => {
    this._board = [];
    for(let i=0;i<BOARD_LENGTH;i++) {
      const row = [];
      for(let j=0;j<BOARD_LENGTH;j++) {
        row.push(null);
      }
      this._board.push(row);
    }
  }

  /**
   * Verify in board position if there is a mole and
   * returns level points if its truthy
   * @param row
   * @param col
   * @returns
   */
  checkCell = (row: number, col: number) => {
    if(this._board[row][col] === 'M') {
      return {
        row,
        col,
        points: this._currentConfigLevel.points
      };
    }
    return 0;
  }

  /**
   * Update config level
   * @param level
   */
  updateLevel = (level: string) => this._currentConfigLevel = CONFIG_LEVELS[level];

  /**
   * Update moles number to show in the game
   * @param numMoles
   * @returns
   */
  updateMoles = (numMoles: number) => this._currentConfigLevel.moles = numMoles;

  /**
   * Init game. Generate matrix with moles every
   * X ms using an interval function
   */
  start = () => {
    this._interval  = setInterval(() => {
      this.getLevelBoard();
      this._addMoles();
    }, this._currentConfigLevel.timeShowMoleinMillis);
  }

  /**
   * Stop the game. Clear moles and current interval
   */
  stop = () => {
    clearInterval(this._interval);
    this.getLevelBoard();
  }
}
