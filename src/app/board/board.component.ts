import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board: any;
  public gameEnd = false;
  public readonly markSymbol = "X";

  constructor() {
    this.board = Array.from(Array(5), () => new Array(5).fill(null));
  }

  ngOnInit(): void {
    this.generateBoard();
  }

  /**
   * generateBoard
   */
  public generateBoard = (): void => {
    for (let index = 0; index < this.board.length; index++) {

      let min = 1;
      let max = 16;

      for (let idx = 0; idx < this.board.length; idx++) {
        this.board[index][idx] = this.getRandomInt(min, max);

        min += 15;
        max = min + 15;
      }
    }

    this.sortBoard();
    this.board[2][2] = this.markSymbol;
    this.gameEnd = false;
  }

  /**
   * sortBoard
   */
  public sortBoard = () => {
    for (let index = 0; index < this.board.length; index++) {
      for (let idx = 0; idx < this.board.length - 1; idx++) {

        if (this.board[idx][index] > this.board[idx + 1][index]) {
          const temp = this.board[idx][index];
          this.board[idx][index] = this.board[idx + 1][index];
          this.board[idx + 1][index] = temp;

          this.sortBoard();
        }
      }
    }
  }

  /**
   * getRandomInt
   * @param min min value
   * @param max max value
   */
  public getRandomInt = (min: number, max: number): any => {
    const number = Math.floor(Math.random() * (max - min)) + min;

    if (!this.isDuplicate(number)) {
      return number;
    }

    return this.getRandomInt(min, max);
  }

  /**
   * isDuplicate
   * @param value value to check
   */
  public isDuplicate = (value: number): boolean => {
    for (let index = 0; index < this.board.length; index++) {
      if (this.board[index].includes(value)) {
        return true;
      }
    }

    return false;
  }

  /**
   * markNumber
   * @param rowIndex row index
   * @param columnIndex column index
   */
  public markNumber = (rowIndex: number, columnIndex: number): void => {
    if (!this.gameEnd) {
      this.board[rowIndex][columnIndex] = this.markSymbol;
    }

    this.checkWin();
  }

  /**
   * checkWin
   */
  private checkWin() {
    // Horizontal
    for (let index = 0; index < this.board.length; index++) {
      const element = this.board[index];

      if (element.every((item: any) => item === this.markSymbol)) {
        this.gameEnd = true;
      }
    }

    // Vertical
    for (let index = 0; index < this.board.length; index++) {
      if (this.board[0][index] === this.markSymbol && this.board[1][index] === this.markSymbol && this.board[2][index] === this.markSymbol && this.board[3][index] === this.markSymbol && this.board[4][index] === this.markSymbol) {
        this.gameEnd = true;
      }
    }

    // Diagonal
    if (this.board[0][0] === this.markSymbol && this.board[1][1] === this.markSymbol && this.board[2][2] === this.markSymbol && this.board[3][3] === this.markSymbol && this.board[4][4] === this.markSymbol) {
      this.gameEnd = true;
    }

    // Reverse Diagonal
    if (this.board[0][4] === this.markSymbol && this.board[1][3] === this.markSymbol && this.board[2][2] === this.markSymbol && this.board[3][1] === this.markSymbol && this.board[4][0] === this.markSymbol) {
      this.gameEnd = true;
    }

  }

}
