const gameboard = (function() {

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

const player = (function() {
    const playerName = 'Player'
    const symbol = 'x'

    let score = 0

    const giveScore = () => score++
    const printScore = () => console.log(`${playerName} has ${score} score`)
    const mark = (spot) => gameboard.mark(spot, symbol)

    return { giveScore, printScore, mark, symbol }
})()

const computer = (function() {
    const playerName = "Computer"
    const symbol = "o"

    const mark = function() {
        let spot = Math.floor(Math.random() * 9)
        if(gameboard.checkEmpty(spot) == true) {
            gameboard.mark(spot, symbol)
        } else {
            mark()
        }
    }

    return { mark, playerName, symbol }

})()

const gameController = (function() {
    const checkWin = function(board, mark) {
        //checking horizontals
        if( board[0] == mark &&
            board[1] == mark &&
            board[2] == mark ||

            board[3] == mark &&
            board[4] == mark &&
            board[5] == mark ||
        
            board[6] == mark &&
            board[7] == mark &&
            board[8] == mark ||
        //checking verticals
            board[0] == mark &&
            board[3] == mark &&
            board[6] == mark ||
        
            board[1] == mark &&
            board[4] == mark &&
            board[7] == mark ||
        
            board[2] == mark &&
            board[5] == mark &&
            board[8] == mark ||
        //checking diagonals
            board[0] == mark &&
            board[4] == mark &&
            board[8] == mark ||
        
            board[2] == mark &&
            board[4] == mark &&
            board[6] == mark) {
            console.log('win')
            return true
        } else if(!gameboard.board.includes(0)) {
            console.log('game is equal')
            return true
        } else {
            console.log('not yet')
            return false
        }
    }

    const play = function(spot) {
        if(gameboard.checkEmpty(spot) == true) {
            player.mark(spot)
            if(gameController.checkWin(gameboard.board, player.symbol) == false) {
                computer.mark()
                gameController.checkWin(gameboard.board, computer.symbol)
            }
        }
    }

    return { checkWin, play }

})()