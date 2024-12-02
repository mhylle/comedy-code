function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomJokes(count = 6) {
    const shuffled = shuffleArray([...allJokes]);
    return shuffled.slice(0, count);
}

function showCopySuccess() {
    const success = document.getElementById('copySuccess');
    success.classList.add('show');
    setTimeout(() => {
        success.classList.remove('show');
    }, 2000);
}

function createJokeCard(joke) {
    const card = document.createElement('div');
    card.className = 'joke-card';
    card.innerHTML = `
        <p class="setup"><i class="fas fa-terminal"></i> ${joke.setup}</p>
        <p class="punchline">${joke.punchline}</p>
        <p class="reveal-text">Click to reveal punchline</p>
        <div class="card-actions">
            <button class="action-button copy-btn" title="Copy joke">
                <i class="fas fa-copy"></i>
            </button>
            <button class="action-button share-btn" title="Share joke">
                <i class="fas fa-share-alt"></i>
            </button>
        </div>
    `;

    // Add click to reveal functionality
    const punchline = card.querySelector('.punchline');
    const revealText = card.querySelector('.reveal-text');
    card.addEventListener('click', () => {
        if (!punchline.classList.contains('revealed')) {
            punchline.classList.add('revealed');
            revealText.style.display = 'none';
        }
    });

    // Add copy functionality
    const copyBtn = card.querySelector('.copy-btn');
    copyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jokeText = `${joke.setup}\n${joke.punchline}`;
        navigator.clipboard.writeText(jokeText).then(() => {
            showCopySuccess();
        });
    });

    // Add share functionality
    const shareBtn = card.querySelector('.share-btn');
    shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const jokeText = `${joke.setup}\n${joke.punchline}`;
        if (navigator.share) {
            navigator.share({
                title: 'Funny Programming Joke',
                text: jokeText
            });
        } else {
            navigator.clipboard.writeText(jokeText).then(() => {
                showCopySuccess();
            });
        }
    });

    return card;
}

function loadJokes() {
    const grid = document.getElementById('jokeGrid');
    grid.innerHTML = '';
    const jokes = getRandomJokes();
    jokes.forEach(joke => {
        grid.appendChild(createJokeCard(joke));
    });
}

// Initialize the app
function initApp() {
    // Initial load
    loadJokes();

    // Refresh button
    document.getElementById('refreshButton').addEventListener('click', () => {
        loadJokes();
    });

    // Add keyboard shortcut for refresh (press 'R')
    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
            loadJokes();
        }
    });
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);