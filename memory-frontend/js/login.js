import { fetchWrapper } from './fetchWrapper.js';

const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetchWrapper('/api/login_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwt_token', data.token); // Sla JWT op
        alert('Inloggen succesvol!');
        window.location.href = 'game.html';
    } else {
        alert('Onjuiste inloggegevens.');
    }
});