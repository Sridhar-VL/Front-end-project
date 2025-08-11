const emojis = ['🍎','🍌','🍓','🍇','🍉','🍒','🍍','🥝','🥑','🍑','🍋','🍐','🍊','🥥','🍈','🍅','🫐','🥭','🍆','🥕'];
const difficultyLevels = { easy: 6, medium: 8, hard: 10 };

let moves = 0, matches = 0, firstCard = null, secondCard = null, lockBoard = false;
let timerInterval = null, startTime = null;
let totalPairs = difficultyLevels.easy;
let player = "", bestScoreData = null;

const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const matchesEl = document.getElementById('matches');
const timeEl = document.getElementById('time');
const bestScoreEl = document.getElementById('bestScore');

function formatTime(ms) {
    let totalSec = Math.floor(ms / 1000);
    let m = String(Math.floor(totalSec / 60)).padStart(2, '0');
    let s = String(totalSec % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function startTimer() {
    if (timerInterval) return;
    startTime = Date.now();
    timerInterval = setInterval(() => {
        timeEl.textContent = formatTime(Date.now() - startTime);
    }, 500);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function createDeck() {
    const chosen = emojis.slice(0, totalPairs);
    return [...chosen, ...chosen].sort(() => Math.random() - 0.5);
}

function renderBoard() {
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(totalPairs * 2))}, auto)`;
    const deck = createDeck();
    deck.forEach(emoji => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${emoji}</div>
                <div class="card-back">?</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, emoji));
        board.appendChild(card);
    });
    moves = 0; matches = 0;
    movesEl.textContent = moves;
    matchesEl.textContent = matches;
    timeEl.textContent = '00:00';
    stopTimer();
}

function flipCard(card, emoji) {
    if (lockBoard || card.classList.contains('flipped')) return;
    card.classList.add('flipped');
    if (!timerInterval) startTimer();

    if (!firstCard) {
        firstCard = { card, emoji };
        return;
    }
    secondCard = { card, emoji };
    lockBoard = true;
    moves++;
    movesEl.textContent = moves;

    if (firstCard.emoji === secondCard.emoji) {
        matches++;
        matchesEl.textContent = matches;
        resetTurn();
        if (matches === totalPairs) {
            stopTimer();
            let timeTaken = timeEl.textContent;
            setTimeout(() => alert(`You won in ${moves} moves and ${timeTaken}`), 300);
            saveBestScore(moves, timeTaken);
        }
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove('flipped');
            secondCard.card.classList.remove('flipped');
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function saveBestScore(m, t) {
    let storedBest = JSON.parse(localStorage.getItem("bestScoreData") || "{}");
    if (!storedBest[player] || m < storedBest[player].moves) {
        storedBest[player] = { moves: m, time: t };
        localStorage.setItem("bestScoreData", JSON.stringify(storedBest));
        bestScoreEl.textContent = `${m} moves in ${t}`;
    }
}

document.getElementById('restart').addEventListener('click', renderBoard);
document.getElementById('difficulty').addEventListener('change', e => {
    totalPairs = difficultyLevels[e.target.value];
    renderBoard();
});

window.onload = () => {
    player = localStorage.getItem("playerName") || "Guest";
    document.getElementById('currentPlayer').textContent = player;

    let storedBest = JSON.parse(localStorage.getItem("bestScoreData") || "{}");
    if (storedBest[player]) {
        bestScoreEl.textContent = `${storedBest[player].moves} moves in ${storedBest[player].time}`;
    }
    renderBoard();
};
