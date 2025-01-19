const grid = document.getElementById("memory-grid");
const startButton = document.getElementById("start-game");
const elapsedTimeDisplay = document.getElementById("elapsed-time");
const foundPairsDisplay = document.getElementById("found-pairs");
const newGameButton = document.getElementById("new-game");
const boardSizeSelect = document.getElementById("board-size");
const charCountInput = document.getElementById("char-count");

let cards = [];
let firstCard = null;
let secondCard = null;
let matches = 0;
let timer = null;
let elapsedTime = 0;

// Genereer willekeurige letters
function generateCards(gridSize = 4) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const charCount = parseInt(charCountInput.value);
    const selectedLetters = letters.slice(0, charCount);
    return [...selectedLetters, ...selectedLetters].sort(() => Math.random() - 0.5);
}

// Maak de kaarten
function createGrid(cardValues) {
    grid.innerHTML = "";
    const size = parseInt(boardSizeSelect.value);
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    cardValues.forEach((value) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = value;
        card.addEventListener("click", () => flipCard(card));
        grid.appendChild(card);
    });
}

// Start de timer
function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        elapsedTime++;
        elapsedTimeDisplay.textContent = elapsedTime;
    }, 1000);
}

// Kaart omdraaien
function flipCard(card) {
    if (card.classList.contains("open") || card.classList.contains("found")) return;

    card.classList.add("open");
    card.textContent = card.dataset.value;

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        checkMatch();
    }
}

// Controleer of twee kaarten overeenkomen
function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("found");
        secondCard.classList.add("found");
        matches++;
        foundPairsDisplay.textContent = matches;

        firstCard = null;
        secondCard = null;

        if (matches === cards.length / 2) endGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("open");
            secondCard.classList.remove("open");
            firstCard.textContent = "";
            secondCard.textContent = "";

            firstCard = null;
            secondCard = null;
        }, 1000);
    }
}

// Eindig het spel
function endGame() {
    clearInterval(timer);
    alert(`Gefeliciteerd! Je hebt het spel voltooid in ${elapsedTime} seconden.`);
}

// Start het spel
function startGame() {
    matches = 0;
    elapsedTime = 0;
    elapsedTimeDisplay.textContent = "0";
    foundPairsDisplay.textContent = "0";
    cards = generateCards();
    createGrid(cards);
    startTimer();
}

// Nieuw spel starten
newGameButton.addEventListener("click", startGame);
startButton.addEventListener("click", startGame);
