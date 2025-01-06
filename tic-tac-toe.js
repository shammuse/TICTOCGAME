const board = document.getElementById('board')
const squares = document.getElementsByClassName('square')
const players = ['X', 'O']
let currentPlayer = players[0]
let isSinglePlayer = false
const endMessage = document.createElement('h2')
endMessage.textContent = `X's turn!`
endMessage.style.marginTop = '30px'
endMessage.style.textAlign = 'center'
board.after(endMessage)

const winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Add event listeners for mode selection
document.getElementById('singlePlayerButton').addEventListener('click', () => {
    isSinglePlayer = true
    restartGame()
})

document.getElementById('multiPlayerButton').addEventListener('click', () => {
    isSinglePlayer = false
    restartGame()
})

// Game logic
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => {
        if (squares[i].textContent !== '') {
            return
        }
        squares[i].textContent = currentPlayer
        if (checkWin(currentPlayer)) {
            endMessage.textContent = `Game over! ${currentPlayer} wins!`
            return
        }
        if (checkTie()) {
            endMessage.textContent = `Game is tied!`
            return
        }
        if (isSinglePlayer && currentPlayer === players[0]) {
            currentPlayer = players[1] // AI's turn
            aiMove()
            return
        } else {
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0]
            endMessage.textContent = `${currentPlayer}'s turn!`
        }
    })
}

// AI logic for single-player mode
function aiMove() {
    let availableSquares = []
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            availableSquares.push(i)
        }
    }
    const randomIndex = Math.floor(Math.random() * availableSquares.length)
    const move = availableSquares[randomIndex]
    squares[move].textContent = currentPlayer

    if (checkWin(currentPlayer)) {
        endMessage.textContent = `Game over! ${currentPlayer} wins!`
        return
    }
    if (checkTie()) {
        endMessage.textContent = `Game is tied!`
        return
    }

    currentPlayer = players[0] // Switch back to the human player
    endMessage.textContent = `X's turn!`
}

function checkWin(currentPlayer) {
    for (let i = 0; i < winning_combinations.length; i++) {
        const [a, b, c] = winning_combinations[i]
        if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
            return true
        }
    }
    return false
}

function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].textContent === '') {
            return false
        }
    }
    return true
}

function restartGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].textContent = ""
    }
    endMessage.textContent = `X's turn!`
    currentPlayer = players[0]
}
