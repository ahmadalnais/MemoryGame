import { fetchWrapper } from './fetchWrapper.js';

const form = document.getElementById('register-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetchWrapper('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert('Registratie succesvol! Log in om verder te gaan.');
        window.location.href = 'login.html';
    } else {
        alert('Fout: controleer je invoer.');
    }
});