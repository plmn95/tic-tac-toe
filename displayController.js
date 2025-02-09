import { gameboard, gameController } from './script.js'

export const displayController = (function() {

    const initialize = function() {

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

    }

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

    return { initialize, mark, reset, updateScore }

})()