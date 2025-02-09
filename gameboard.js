export const gameboard = (function() {

    const board = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]

    const print = () => console.log(board)

    const mark = function(spot, mark) {
        board[spot] = mark
    } 

    const checkEmpty = function(spot) {
        if(board[spot] == 0) {
            return true
        } else {
            return false
        }
    }

    const reset = function() {
        board.fill(0)
    }

    return { print, mark, checkEmpty, reset, board }
})()