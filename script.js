const emojiListDiv = document.getElementById("emoji-list");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

let emojis = [];

// Fetch emoji data from an API
async function fetchEmojis() {
    try {
        const response = await fetch('https://emoji-api.com/emojis?access_key=d45df1d7eb1ddffc430849eaf95fad2a9bcd3cb6'); // Replace with your API key
        emojis = await response.json();
        populateCategories();
    } catch (error) {
        console.error('Error fetching emojis:', error);
    }
}

function populateCategories() {
    const categories = [...new Set(emojis.map(emoji => emoji.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categorySelect.appendChild(option);
    });
}

function filterEmojis() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filteredEmojis = emojis.filter(emoji => {
        const matchesName = emoji.unicodeName.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory ? emoji.category === selectedCategory : true;
        return matchesName && matchesCategory;
    });

    renderEmojis(filteredEmojis);
}

function renderEmojis(filteredEmojis) {
    emojiListDiv.innerHTML = ''; // Clear previous emoji list
    filteredEmojis.forEach(emoji => {
        const emojiItem = document.createElement('div');
        emojiItem.className = 'emoji-item';
        emojiItem.innerHTML = `${emoji.character} ${emoji.unicodeName}`;
        emojiItem.onclick = () => copyToClipboard(emoji.character);
        emojiListDiv.appendChild(emojiItem);
    });
}

function copyToClipboard(emoji) {
    navigator.clipboard.writeText(emoji).then(() => {
        alert(`Copied: ${emoji}`);
    });
}

// Fetch emojis when the page loads
fetchEmojis();
