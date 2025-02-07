const BASE_URL = 'http://localhost:8000';

export async function fetchWrapper(endpoint, options = {}) {
    const token = localStorage.getItem('jwt_token');
    if (!options.headers) {
        options.headers = {};
    }
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (response.status === 401) {
        alert('Uw sessie is verlopen. Log opnieuw in.');
        localStorage.removeItem('jwt_token');
        window.location.href = 'login.html';
    }
    return response;
}