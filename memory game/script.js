const cards = [
    '🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓',
    '🍊', '🍊', '🍉', '🍉', '🍒', '🍒', '🍍', '🍍'
];

let flippedCards = [];
let matchedCards = [];
let score = 0;
let moves = 0;
let timer;
let seconds = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card-value', card);
        cardElement.setAttribute('data-index', index);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    startTimer();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.innerText = this.getAttribute('data-card-value');
        flippedCards.push(this);
        moves++;
        document.getElementById('moves').innerText = `Moves: ${moves}`;
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (firstCard.getAttribute('data-card-value') === secondCard.getAttribute('data-card-value')) {
        matchedCards.push(firstCard, secondCard);
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        flippedCards = [];
        if (matchedCards.length === cards.length) {
            clearInterval(timer);
            showCongratsMessage();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerText = '';
            secondCard.innerText = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    seconds = 0;
    document.getElementById('timer').innerText = `Time: ${seconds}s`;
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = `Time: ${seconds}s`;
    }, 1000);
}

function showCongratsMessage() {
    const congratsMessage = document.getElementById('congratsMessage');
    congratsMessage.classList.remove('hidden');
    congratsMessage.innerText = `Congratulations! You completed the game in ${seconds} seconds and ${moves} moves!`;
}

document.getElementById('resetBtn').addEventListener('click', () => {
    score = 0;
    matchedCards = [];
    flippedCards = [];
    moves = 0;
    clearInterval(timer);
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('moves').innerText = `Moves: ${moves}`;
    document.getElementById('timer').innerText = `Time: 0s`;
    document.getElementById('congratsMessage').classList.add('hidden');
    createBoard();
});

createBoard();
