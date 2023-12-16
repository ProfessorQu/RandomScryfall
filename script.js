const SCRYFALL_URL = 'https://api.scryfall.com/cards/random?q='

const form = document.getElementById('search');
const cards = document.getElementById('cards');

async function get_random_card(query) {
    const response = await fetch(SCRYFALL_URL + query);

    return await response.json();
}

form.addEventListener('submit', (e) => {
    const query = form.elements['query'].value;
    const amount = Number(form.elements['amount'].value || 1);

    cards.innerHTML = "";
    for (let i = 0; i < amount; i++) {
        get_random_card(query.replace(" ", "+"))
            .then(card => {
                const html = '<a href=' + card['scryfall_uri'] + ' target="_blank"><img src=' + card['image_uris']['normal'] + "/></a>";

                cards.innerHTML += html;
            })
            .catch(error => console.error('Error:', error)
        );
    }

    e.preventDefault();
});