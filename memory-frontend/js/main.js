   import { fetchWrapper } from './fetchWrapper.js';
   import {  initializeGame } from './game.js';
   import {  fetchImages } from './api.js';

   if (!localStorage.getItem('jwt_token')) {
       window.location.href = 'login.html';
   }

   document.getElementById('start-game').addEventListener('click', async () => {
       const numCards = parseInt(document.getElementById('num-cards').value) * 2;
       const imageType = document.getElementById('image-selector').value;

       // Ophalen van afbeeldingen
       const images = await fetchImages(imageType, numCards / 2);

       // Controleer of de afbeeldingenarray geldig is:
       if (!Array.isArray(images) || images.length === 0) {
           alert('Kan geen afbeeldingen laden. Controleer je selectie.');
           return;
       }

       // Start het spel
       initializeGame(images, numCards);
   });

   async function loadLeaderboard() {
       const response = await fetchWrapper('/scores');
       const data = await response.json();
       const leaderboard = document.getElementById('leaderboard');
       leaderboard.innerHTML = '';

       data.forEach(({ username, score }) => {
           const li = document.createElement('li');
           li.textContent = `${username}: ${score}`;
           leaderboard.appendChild(li);
       });
   }
   loadLeaderboard();