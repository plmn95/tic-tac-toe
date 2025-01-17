const gameboard = (function() {

    const board = [
        [1, 0, 0],
        [0, 2, 0],
        [0, 0, 3]
    ]

    const print = () => console.log(board)

    const mark = function(row, column) {
        board[row - 1][column - 1] = player.playerMark
        gameController.checkWin(board, player.playerMark)
    } 

    return { print, mark, board }
})()

const player = (function() {
    const playerName = 'Player'
    const playerMark = 'x'

    let score = 0

    const giveScore = () => score++
    const printScore = () => console.log(`${playerName} has ${score} score`)
    const mark = (row, column) => gameboard.mark(row, column)

    return { giveScore, printScore, mark, playerMark }
})()

const gameController = (function() {
    const checkWin = function(board, mark) {
        if(board[0].every(e => e == mark) ||
            board[1].every(e => e == mark) ||
            board[2].every(e => e == mark)) {
            console.log('win')
        } else {
            console.log('not yet')
        }
    }

    return { checkWin }

})()