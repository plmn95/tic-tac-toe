import { displayController } from "./displayController.js"
export { gameboard, gameController }

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

    const win = function() {
        score++
        displayController.updateScore('player', score)
    }
    const mark = function(spot) {
        gameboard.mark(spot, symbol)
        displayController.mark(spot, symbol)
    }

    return { mark, symbol, win }
})()

const computer = (function() {
    const playerName = "Computer"
    const symbol = "o"
    let score = 0

    const mark = function() {
        let spot = Math.floor(Math.random() * 9)
        if(gameboard.checkEmpty(spot) == true) {
            gameboard.mark(spot, symbol)
            displayController.mark(spot, symbol)
        } else {
            mark()
        }
    }

    const win = function() {
        score++
        displayController.updateScore('computer', score)
    }

    return { mark, win, playerName, symbol }

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
            switch (mark) {
                case 'x':
                    player.win()
                    break;
                case 'o':
                    computer.win()
                    break;
            }
            return true
        } else if(!gameboard.board.includes(0)) {
            return true
        } else {
            return false
        }
    }

    const play = function(div) {
        let spot = div.slice(6)
        if(gameboard.checkEmpty(spot) == true) {
            player.mark(spot)
            if(gameController.checkWin(gameboard.board, player.symbol) == false) {
                computer.mark()
                gameController.checkWin(gameboard.board, computer.symbol)
            }
        }
    }

    const newGame = function() {
        gameboard.reset()
        displayController.reset()
    }

    return { checkWin, play, newGame }

})()

displayController.initialize()