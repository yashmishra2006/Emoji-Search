const emojiListEl = document.getElementById('emoji-list');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('#categories button');

let emojis = [];

// Fetch emojis from the API (you might need to adjust the URL depending on the API you use)
async function fetchEmojis() {
    const response = await fetch('https://api.emojipedia.org/v1/emojis');
    const data = await response.json();
    emojis = data; // Assuming data is an array of emoji objects
    displayEmojis(emojis);
}

// Display emojis in the list
function displayEmojis(emojiArray) {
    emojiListEl.innerHTML = '';
    emojiArray.forEach(emoji => {
        const emojiEl = document.createElement('div');
        emojiEl.className = 'emoji';
        emojiEl.innerText = emoji.char;
        emojiEl.title = emoji.name; // Add tooltip with emoji name
        emojiEl.onclick = () => copyToClipboard(emoji.char);
        emojiListEl.appendChild(emojiEl);
    });
}

// Copy emoji to clipboard
function copyToClipboard(emoji) {
    navigator.clipboard.writeText(emoji).then(() => {
        alert('Copied to clipboard: ' + emoji);
    });
}

// Filter emojis by search
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filteredEmojis = emojis.filter(emoji => 
        emoji.name.toLowerCase().includes(query) || 
        emoji.description.toLowerCase().includes(query)
    );
    displayEmojis(filteredEmojis);
});

// Filter by category
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        const filteredEmojis = emojis.filter(emoji => emoji.category === category);
        displayEmojis(filteredEmojis);
    });
});

// Initial fetch
fetchEmojis();