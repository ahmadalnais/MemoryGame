import { fetchWrapper } from './fetchWrapper.js';

const form = document.getElementById('email-form');
const playerId = localStorage.getItem('player_id'); // Moet worden ingesteld bij login

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    const response = await fetchWrapper(`/api/player/${playerId}/email`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

    if (response.ok) {
        alert('E-mailadres bijgewerkt!');
    } else {
        alert('Er ging iets mis.');
    }
});