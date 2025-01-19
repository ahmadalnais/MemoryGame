import { initializeGame, handleNewGame } from './game.js';
import { fetchImages } from './api.js';

document.getElementById('start-game').addEventListener('click', async () => {
    const numCards = parseInt(document.getElementById('num-cards').value) * 2;
    const imageType = document.getElementById('image-selector').value;
    const images = await fetchImages(imageType, numCards / 2);
    initializeGame(images, numCards);
});

document.querySelector('.new-game').addEventListener('click', handleNewGame);

