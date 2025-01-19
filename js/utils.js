export function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

export function updateColorStyles() {
    const closedColor = document.getElementById('closed-color').value;
    const openColor = document.getElementById('open-color').value;
    const foundColor = document.getElementById('found-color').value;

    const root = document.documentElement;
    root.style.setProperty('--closed-color', closedColor);
    root.style.setProperty('--open-color', openColor);
    root.style.setProperty('--found-color', foundColor);
}
// Functie om de kaartkleuren bij te werken
function updateCardColors() {
    const closedColor = document.getElementById('closed-color').value;
    const openColor = document.getElementById('open-color').value;
    const foundColor = document.getElementById('found-color').value;

    // Pas de kleuren dynamisch toe via CSS-variabelen
    document.documentElement.style.setProperty('--closed-color', closedColor);
    document.documentElement.style.setProperty('--open-color', openColor);
    document.documentElement.style.setProperty('--found-color', foundColor);
}

// Eventlisteners toevoegen aan de kleurvelden
document.getElementById('closed-color').addEventListener('input', updateCardColors);
document.getElementById('open-color').addEventListener('input', updateCardColors);
document.getElementById('found-color').addEventListener('input', updateCardColors);

// Zorg ervoor dat de kleuren worden toegepast bij het starten van een nieuw spel
document.getElementById('new-game-btn').addEventListener('click', updateCardColors);