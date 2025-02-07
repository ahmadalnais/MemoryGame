import { shuffleArray, updateColorStyles } from './utils.js';

let cards = [];
let openedCards = [];
let matchedPairs = 0;
let timer = null;
let elapsedSeconds = 0;

/**
 * Initialize het spel met gegenereerde kaarten en reset de UI.
 * @param {Array} images - Array van afbeeldings-URL's.
 * @param {number} numCards - Aantal kaarten in het spel.
 */
export function initializeGame(images, numCards) {
    resetGame(); // Reset alle variabelen en timers

    // Maak een nieuw deck kaarten met de afbeeldingen
    cards = shuffleArray([...images, ...images].slice(0, numCards));

    const memoryGrid = document.querySelector('.memory-grid');
    memoryGrid.innerHTML = ''; // Leeg het speelveld

    // Genereer kaarten
    cards.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;

        const img = document.createElement('img');
        img.src = image;
        img.alt = 'Memory card';
        img.style.display = 'none'; // Verberg afbeelding

        card.appendChild(img);
        card.addEventListener('click', handleCardClick); // Voeg klikgebeurtenis toe
        memoryGrid.appendChild(card);
    });

    startTimer(); // Start de timer
}

/**
 * Reset het spel en update de interface.
 */
function resetGame() {
    matchedPairs = 0;
    elapsedSeconds = 0;
    openedCards = [];
    updateInfo();

    if (timer) clearInterval(timer);
}

/**
 * Handelt de klik op een kaart af.
 * @param {Event} event - De klikgebeurtenis.
 */
function handleCardClick(event) {
    const card = event.currentTarget;
    const index = card.dataset.index;

    // Voorkom interactie met kaarten die al open of gevonden zijn
    if (openedCards.length === 2 || card.classList.contains('found') || card.classList.contains('open')) return;

    card.classList.add('open');
    const img = card.querySelector('img');
    if (img) img.style.display = 'block'; // Toon afbeelding

    openedCards.push(index);

    // Controleer op een match als er twee kaarten open zijn
    if (openedCards.length === 2) {
        checkMatch();
    }
}

/**
 * Controleert of de geopende kaarten een match zijn.
 */
function checkMatch() {
    const [firstIndex, secondIndex] = openedCards;
    const grid = document.querySelectorAll('.card');

    if (cards[firstIndex] === cards[secondIndex]) {
        // Match gevonden
        grid[firstIndex].classList.add('found');
        grid[secondIndex].classList.add('found');
        matchedPairs++;
        updateInfo();

        // Controleer of alle paren gevonden zijn
        if (matchedPairs === cards.length / 2) {
            clearInterval(timer);
            alert(`Gefeliciteerd! Je hebt gewonnen in ${elapsedSeconds} seconden.`);
        }
    } else {
        // Geen match, sluit kaarten na 1 seconde
        setTimeout(() => {
            grid[firstIndex].classList.remove('open');
            grid[secondIndex].classList.remove('open');

            grid[firstIndex].querySelector('img').style.display = 'none';
            grid[secondIndex].querySelector('img').style.display = 'none';
        }, 1000);
    }

    openedCards = [];
}

/**
 * Start de timer en update elke seconde de interface.
 */
function startTimer() {
    timer = setInterval(() => {
        elapsedSeconds++;
        updateInfo();
    }, 1000);
}

/**
 * Update de informatie in de interface, zoals tijd en gevonden paren.
 */
function updateInfo() {
    document.getElementById('time-elapsed').textContent = `${elapsedSeconds} seconden`;
    document.getElementById('pairs-found').textContent = matchedPairs;
}

/**
 * Handelt een nieuw spel af en genereert kaarten.
 */
export function handleNewGame() {
    const numCards = parseInt(document.getElementById('num-cards').value) * 2;
    const imageType = document.getElementById('image-selector').value;

    fetchImages(imageType, numCards / 2).then((images) => {
        initializeGame(images, numCards);
    });
}

/**
 * Fetch afbeeldingen op basis van type.
 * @param {string} type - Het type afbeelding (bijv. "kattenplaatjes").
 * @param {number} count - Het aantal unieke afbeeldingen.
 * @returns {Promise<Array>} - Een array van afbeeldings-URL's.
 */
async function fetchImages(type, count) {
    // Dummy-implementatie, vervang dit met je eigen API-aanroep als nodig
    const imageURLs = [
        'https://placekitten.com/200/200',
        'https://placekitten.com/201/200',
        'https://placekitten.com/202/200',
        'https://placekitten.com/203/200',
    ];
    return shuffleArray(imageURLs.slice(0, count));
}
