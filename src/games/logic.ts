import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { Board, Symbol, Row } from './entities'

@ValidatorConstraint()
export class IsBoard implements ValidatorConstraintInterface {

  validate(board: Board) {
    const symbols = [ 'x', 'o', null ]
    return board.length === 10 &&
      board.every(row =>
        row.length === 10 &&
        row.every(symbol => symbols.includes(symbol))
      )
  }
}

export const isValidTransition = (playerSymbol: Symbol, from: Board, to: Board) => {
  const changes = from
    .map(
      (row, rowIndex) => row.map((symbol, columnIndex) => ({
        from: symbol, 
        to: to[rowIndex][columnIndex]
      }))
    )
    .reduce((a,b) => a.concat(b))
    .filter(change => change.from !== change.to)

  return changes.length === 1 && 
    changes[0].to === playerSymbol && 
    changes[0].from === null
}

export const calculateScore = (board: Board) => {
  const scorep = ["y"]
  if (board[2][2] === "o" ) {
    scorep.push("o", "o") }
  if (board[2][2] === "x" ) {
    scorep.push("x", "x") }
  if (board[5][7] === "o" ) {
    scorep.push("o", "o") }
  if (board[5][7] === "x" ) {
      scorep.push("x", "x") }
  if (board[8][0] === "o" ) {
    scorep.push("o", "o") }
  if  (board[8][0] === "x" ) {
    scorep.push("x", "x") }
  if (board[1][8] === "o" ) {
    scorep.push("o", "o") }
  if  (board[1][8] === "x" ) {
    scorep.push("x", "x") }
  if (board[5][3] === "o" ) {
    scorep.push("o") }
  if  (board[5][3] === "x" ) {
    scorep.push("x") }
  if (board[3][9] === "o" ) {
    scorep.push("o") }
  if (board[3][9] === "x" ) {
    scorep.push("x") }
  if (board[7][5] === "o" ) {
    scorep.push("o") }
  if  (board[7][5] === "x" ) {
    scorep.push("x") }
  if (board[8][8] === "o" ) {
    scorep.push("o") }
  if  (board[8][8] === "x" ) {
    scorep.push("x") }
  if (board[9][2] === "o" ) {
    scorep.push("o") }
  if (board[9][2] === "x" ) {
    scorep.push("x") }
  if (board[3][5] === "o" ) {
    scorep.push("o","o","o","o") }
  if (board[3][5] === "x" ) {
    scorep.push("x","x","x","x") }
  if (board[9][9] === "x" ) {
    const index = scorep.indexOf('x')
    if (index > -1) {
      scorep.splice(index, 1)
    }
  }
  if (board[9][9] === "o" ) {
    const index = scorep.indexOf('o')
    if (index > -1) {
      scorep.splice(index, 1)
    }
  }
  if (board[9][0] === "x" ) {
    const index = scorep.indexOf('x')
    if (index > -1) {
      scorep.splice(index, 1)
    }
  }
  if (board[9][0] === "o" ) {
    const index = scorep.indexOf('o')
    if (index > -1) {
      scorep.splice(index, 1)
    }
  }
  return scorep}

  


export const calculateWinner = (board: Board) => {
  // console.log(board[1][1])
  const result = calculateScore(board)
  const xWinner = result.filter( item => item === "x" )
  const oWinner = result.filter( item => item === "o" )
if (xWinner.length >= 7) { return "x"}
if (oWinner.length >= 7) { return "o"}

}

export const finished = (board: Board): boolean =>
  board
    .reduce((a,b) => a.concat(b) as Row)
    .every(symbol => symbol !== null)


    // export const calculateWinner = (board: Board) => {
    //   console.log(board[1][1])
    // // if (board[1][1] !== null ) 
    // const arrayTreasure = [board[1][1],board[1][2]]
    // if (arrayTreasure.forEach !== null)
       
    //  return arrayTreasure.filter((v) => (v === "o")).length
    // }