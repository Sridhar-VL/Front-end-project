/* =========================
   EMOJI CATEGORIES
========================= */
const emojiCategories = {
    fruits: ['🍎','🍌','🍓','🍇','🍉','🍒','🍍','🥝','🍑','🍋'],
    animals: ['🐶','🐱','🐭','🐰','🦊','🐻','🐼','🐨','🐯','🦁'],
    vegetables: ['🥕','🥦','🌽','🍆','🥔','🧄','🧅','🥬','🌶️','🍠'],
    humans: ['😀','😎','😍','🤓','😇','🥳','🤠','😴','😭','😡']
};

const difficultyLevels = {
    easy: 6,
    medium: 8,
    hard: 10
};

/* =========================
   GAME STATE
========================= */
let totalPairs = difficultyLevels.easy;
let currentCategory = "fruits";

let moves = 0;
let matches = 0;

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let timerInterval = null;
let startTime = null;

let player = "";

/* =========================
   ELEMENTS
========================= */
const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const matchesEl = document.getElementById("matches");
const timeEl = document.getElementById("time");
const bestScoreEl = document.getElementById("bestScore");
const leaderboardList = document.getElementById("leaderboardList");

/* =========================
   TIMER
========================= */
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
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

/* =========================
   GAME LOGIC
========================= */
function createDeck() {
    const emojis = emojiCategories[currentCategory].slice(0, totalPairs);
    return [...emojis, ...emojis].sort(() => Math.random() - 0.5);
}

function renderBoard() {
    board.innerHTML = "";
    board.style.gridTemplateColumns =
        `repeat(${Math.ceil(Math.sqrt(totalPairs * 2))}, auto)`;

    moves = 0;
    matches = 0;
    movesEl.textContent = "0";
    matchesEl.textContent = "0";
    timeEl.textContent = "00:00";

    stopTimer();
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    const deck = createDeck();

    deck.forEach(emoji => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${emoji}</div>
                <div class="card-back">?</div>
            </div>
        `;

        card.addEventListener("click", () => flipCard(card, emoji));
        board.appendChild(card);
    });

    updateLeaderboard();
}

function flipCard(card, emoji) {
    if (lockBoard) return;
    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    startTimer();

    if (!firstCard) {
        firstCard = { card, emoji };
        return;
    }

    secondCard = { card, emoji };
    lockBoard = true;

    moves++;
    movesEl.textContent = moves;

    if (firstCard.emoji === secondCard.emoji) {
        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");
        matches++;
        matchesEl.textContent = matches;
        resetTurn();

        if (matches === totalPairs) {
            stopTimer();
            saveScore(moves, timeEl.textContent);
        }
    } else {
        setTimeout(() => {
            firstCard.card.classList.remove("flipped");
            secondCard.card.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

/* =========================
   LEADERBOARD (BY CATEGORY)
========================= */
function saveScore(moves, time) {
    const key = `leaderboard_${currentCategory}`;
    let scores = JSON.parse(localStorage.getItem(key) || "[]");

    scores.push({
        name: player,
        moves,
        time
    });

    scores.sort((a, b) => {
        if (a.moves !== b.moves) return a.moves - b.moves;
        return a.time.localeCompare(b.time);
    });

    localStorage.setItem(key, JSON.stringify(scores));

    bestScoreEl.textContent = `${moves} moves (${time})`;
    updateLeaderboard();
}

function updateLeaderboard() {
    const key = `leaderboard_${currentCategory}`;
    const scores = JSON.parse(localStorage.getItem(key) || "[]");

    leaderboardList.innerHTML = "";

    if (scores.length === 0) {
        leaderboardList.innerHTML = "<li>No scores yet</li>";
        return;
    }

    scores.slice(0, 5).forEach(score => {
        const li = document.createElement("li");
        li.textContent =
            `${score.name} — ${score.moves} moves (${score.time})`;
        leaderboardList.appendChild(li);
    });
}

/* =========================
   EVENTS
========================= */
document.getElementById("restart").addEventListener("click", renderBoard);

document.getElementById("difficulty").addEventListener("change", e => {
    totalPairs = difficultyLevels[e.target.value];
    renderBoard();
});

document.getElementById("category").addEventListener("change", e => {
    currentCategory = e.target.value;
    renderBoard();
});

/* =========================
   INIT
========================= */
window.onload = () => {
    player = localStorage.getItem("playerName") || "Guest";
    document.getElementById("currentPlayer").textContent = player;
    renderBoard();
};
