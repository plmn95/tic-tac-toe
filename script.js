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
    const printScore = () => console.log(`${playerName} has ${score} score`)
    const mark = function(spot) {
        gameboard.mark(spot, symbol)
        displayController.mark(spot, symbol)
    }

    return { printScore, mark, symbol, win }
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
            console.log('win')
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
            console.log('game is equal')
            return true
        } else {
            console.log('not yet')
            return false
        }
    }

    const play = function(div) {
        let spot = div.slice(6)
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
        gameboard.reset()
        displayController.reset()
    }

    return { checkWin, play, newGame }

})()

const displayController = (function() {

    const initialize = (function() {

        const container = document.querySelector('.container')

        const divTop = document.createElement('div')
        divTop.classList.add('divTop')
        container.appendChild(divTop)
        const btnNew = document.createElement('button')
        btnNew.classList.add('btnNew')
        btnNew.innerText = "NEW GAME"
        btnNew.addEventListener('click', () => {
            gameController.newGame()
        })
        divTop.appendChild(btnNew)
    
        const player1Div = document.createElement('div')
        player1Div.classList.add('player1Div')
        container.appendChild(player1Div)
        const player1Title = document.createElement('h2')
        player1Title.classList.add('player1Title')
        player1Title.innerText = "PLAYER 1"
        player1Div.appendChild(player1Title)
        const score1Text = document.createElement('p')
        score1Text.innerText = 'SCORE'
        score1Text.classList.add('score1Text')
        player1Div.appendChild(score1Text)
        const pScore1Div = document.createElement('div')
        pScore1Div.classList.add('pScore1Div')
        container.appendChild(pScore1Div)
        const pScore1 = document.createElement('p')
        pScore1.classList.add('pScore1')
        pScore1.innerText = '0'
        pScore1Div.appendChild(pScore1)
    
        const player2Div = document.createElement('div')
        player2Div.classList.add('player2Div')
        container.appendChild(player2Div)
        const player2Title = document.createElement('h2')
        player2Title.classList.add('player2Title')
        player2Title.innerText = 'PLAYER 2'
        player2Div.appendChild(player2Title)
        const score2Text = document.createElement('p')
        score2Text.innerText = 'SCORE'
        score2Text.classList.add('score2Text')
        player2Div.appendChild(score2Text)
        const pScore2Div = document.createElement('div')
        pScore2Div.classList.add('pScore2Div')
        container.appendChild(pScore2Div)
        const pScore2 = document.createElement('p')
        pScore2.classList.add('pScore2')
        pScore2.innerText = '0'
        pScore2Div.appendChild(pScore2)
    
        const divGameboard = document.createElement('div')
        divGameboard.classList.add('divGameboard')
        container.appendChild(divGameboard)
        const gameboardDiv = document.createElement('div')
        gameboardDiv.classList.add('gameboardDiv')
        divGameboard.appendChild(gameboardDiv)
        gameboard.board.forEach((e, i) => {
            let div = document.createElement('div')
            div.classList.add('boardSpace')
            div.id = `square${i}`
            gameboardDiv.appendChild(div)
            div.addEventListener('click', () => {
                gameController.play(div.id)
            })
        })

        return { score1Text, score2Text }

    })()

    const updateScore = function(who, score) {
        let paragraph
        switch (who) {
            case 'player':
                paragraph = document.querySelector('.pScore1')
                paragraph.innerText = `${score}`
                break;
            case 'computer':
                paragraph = document.querySelector('.pScore2')
                paragraph.innerText = `${score}`
                break;
        }
    }

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
        const div = document.getElementById(`square${spot}`)
        const img = document.createElement('img')
        img.classList.add('symbol')
        img.setAttribute('src', imgUrl)
        div.appendChild(img)
    }

    const reset = function() {
        const divs = document.querySelectorAll('.boardSpace')
        divs.forEach((div) => {
            if(div.hasChildNodes() == true) {
                div.removeChild(div.firstChild)
            }
        })
    }

    return { mark, reset, updateScore }

})()