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
    const mark = function(spot) {
        gameboard.mark(spot, symbol)
        displayController.mark(spot, symbol)
    }

    return { giveScore, printScore, mark, symbol }
})()

const computer = (function() {
    const playerName = "Computer"
    const symbol = "o"

    const mark = function() {
        let spot = Math.floor(Math.random() * 9)
        if(gameboard.checkEmpty(spot) == true) {
            gameboard.mark(spot, symbol)
            displayController.mark(spot, symbol)
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
        console.log(spot)
        if(gameboard.checkEmpty(spot) == true) {
            player.mark(spot)
            if(gameController.checkWin(gameboard.board, player.symbol) == false) {
                computer.mark()
                gameController.checkWin(gameboard.board, computer.symbol)
            }
        }
    }

    const newGame = function() {
        const btn = document.querySelector('btnNew')
        btn.addEventListener('click', () => {

        })
    }

    return { checkWin, play }

})()

const displayController = (function() {

    const initialize = (function() {
        const container = document.querySelector('.container')

        const btnNew = document.createElement('button')
        btnNew.classList.add('btnNew')
        btnNew.innerText = "NEW GAME"
        container.appendChild(btnNew)
    
        const player1Div = document.createElement('div')
        player1Div.classList.add('player1Div')
        container.appendChild(player1Div)
        const player1Title = document.createElement('h2')
        player1Title.classList.add('player1Title')
        player1Title.innerText = "PLAYER 1"
        player1Div.appendChild(player1Title)
        const score1Text = document.createElement('p')
        score1Text.innerText = 'SCORE'
        player1Div.appendChild(score1Text)
    
        const player2Div = document.createElement('div')
        player2Div.classList.add('player2Div')
        container.appendChild(player2Div)
        const player2Title = document.createElement('h2')
        player2Title.classList.add('player2Title')
        player2Title.innerText = "PLAYER 2"
        player2Div.appendChild(player2Title)
        const score2Text = document.createElement('p')
        score2Text.innerText = 'SCORE'
        player2Div.appendChild(score2Text)
    
        const gameboardDiv = document.createElement('div')
        gameboardDiv.classList.add('gameboardDiv')
        container.appendChild(gameboardDiv)
        gameboard.board.forEach((e, i) => {
            let div = document.createElement('div')
            div.classList.add('boardSpace')
            div.id = `${i}`
            gameboardDiv.appendChild(div)
            div.addEventListener('click', () => {
                gameController.play(div.id)
            })
        })

    })()

    const mark = function(spot, symbol) {
        let imgUrl
        switch (symbol) {
            case 'x':
                imgUrl = 'images/x.png'
                break;
            case 'o':
                imgUrl = 'images/o.png'
                break;
        }
        const div = document.getElementById(spot)
        const img = document.createElement('img')
        img.classList.add('symbol')
        img.setAttribute('src', imgUrl)
        div.appendChild(img)
    }

    const reset = function() {
        const divs = document.querySelectorAll('.boardSpace')
        divs.forEach(div => {
            const img = document.querySelector('.symbol')
            div.removeChild(img)
        })
    }

    return { mark, reset }

})()