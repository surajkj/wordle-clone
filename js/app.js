document.addEventListener('DOMContentLoaded', () => {

  document.body.style.minHeight = '0';

  // Game configuration
  const MAX_ATTEMPTS = 6;
  let COMMON_WORDS = [];
  let DICTIONARY = [];

  // Dark mode functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const htmlElement = document.documentElement;

  const DEFAULT_STATS = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0},
    lastGame: null // {date: timestamp, won: boolean, guesses: number}
  };

// Game state
  let targetWord = '';
  let currentAttempt = '';
  let attempts = [];
  let gameOver = false;
  let wordLength = 5; // Default length

// DOM elements
  const board = document.getElementById('board');
  const messageEl = document.getElementById('message');
  const resetBtn = document.getElementById('reset-btn');
  const keys = document.querySelectorAll('.key');
  const wordLengthSlider = document.getElementById('word-length-slider');
  const wordLengthValue = document.getElementById('word-length-value');

  async function loadWords(length = wordLength) {
    try {
      // Load only the needed word length
      const response = await fetch(`./js/wordlists/${length}-letters.json`);

      if (!response.ok) {
        throw new Error(`Failed to load ${length}-letter words`);
      }

      const data = await response.json();
      DICTIONARY = data.DICTIONARY || [];
      COMMON_WORDS = data.COMMON_WORDS || [];

      // Validate we got words
      if (DICTIONARY.length === 0 || COMMON_WORDS.length === 0) {
        throw new Error(`No words loaded for ${length}-letter words`);
      }
      return true;
    } catch (error) {
      console.error('Error loading words:', error);
      // Fallback to default length if current length fails
      if (length !== 5) {
        return loadWords(5);
      }
      return false;
    }
  }

  // Initialize the game
  function initGame() {
    // Filter words by current length
    const eligibleWords = COMMON_WORDS.filter(word => word.length === wordLength);

    // if (eligibleWords.length === 0) {
    //   showMessage(`No ${wordLength}-letter words in dictionary`);
    //   return;
    // }

    // Select a random word
    targetWord = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
    currentAttempt = '';
    attempts = [];
    gameOver = false;

    if (messageEl !== undefined && messageEl !== null) {
      messageEl.textContent = '';
    }


    if(board !== undefined && board !== null) {
      // Clear and rebuild the board
      board.innerHTML = '';
    }

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const row = document.createElement('div');
      row.className = 'row';

      for (let j = 0; j < wordLength; j++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        row.appendChild(tile);
      }
      if(board !== undefined && board !== null) {
        board.appendChild(row);
      }
    }

    updateAnalytics();

    // Reset keyboard
    keys.forEach(key => {
      key.classList.remove('correct', 'present', 'absent');
    });
  }

  // Update the board display
  function updateBoard() {
    const rows = board.querySelectorAll('.row');

    // Fill all previous attempts
    for (let i = 0; i < attempts.length; i++) {
      const row = rows[i];
      const letters = attempts[i].split('');

      for (let j = 0; j < letters.length; j++) {
        const tile = row.querySelectorAll('.tile')[j];
        tile.textContent = letters[j];
        tile.classList.add('filled');

        // Determine tile status
        if (letters[j] === targetWord[j]) {
          tile.classList.add('correct');
        } else if (targetWord.includes(letters[j])) {
          tile.classList.add('present');
        } else {
          tile.classList.add('absent');
        }
      }
    }

    // Fill current attempt
    if (attempts.length < MAX_ATTEMPTS) {
      const currentRow = rows[attempts.length];
      const tiles = currentRow.querySelectorAll('.tile');

      for (let i = 0; i < wordLength; i++) {
        const tile = tiles[i];

        if (i < currentAttempt.length) {
          tile.textContent = currentAttempt[i];
          tile.classList.add('filled');
        } else {
          tile.textContent = '';
          tile.classList.remove('filled');
        }
      }
    }

    // Update keyboard colors
    updateKeyboard();
  }

  // Update keyboard key colors based on attempts
  function updateKeyboard() {
    keys.forEach(key => {
      const letter = key.getAttribute('data-key');

      if (letter === 'Enter' || letter === 'Backspace') return;

      // Check if this letter is in any attempt
      for (const attempt of attempts) {
        if (attempt.includes(letter)) {
          if (targetWord.includes(letter)) {
            const correctPositions = [];
            for (let i = 0; i < targetWord.length; i++) {
              if (targetWord[i] === letter) {
                correctPositions.push(i);
              }
            }

            // Check if it's in the correct position in any attempt
            let isCorrect = false;
            for (const pos of correctPositions) {
              for (const att of attempts) {
                if (att[pos] === letter) {
                  isCorrect = true;
                  break;
                }
              }
              if (isCorrect) break;
            }

            if (isCorrect) {
              key.classList.add('correct');
              key.classList.remove('present', 'absent');
            } else {
              // Only add present if not already correct
              if (!key.classList.contains('correct')) {
                key.classList.add('present');
                key.classList.remove('absent');
              }
            }
          } else {
            key.classList.add('absent');
            key.classList.remove('present', 'correct');
          }
          break;
        }
      }
    });
  }

  // Handle keyboard input
  function handleInput(key) {
    if (gameOver) return;

    if (key === 'Enter') {
      submitAttempt();
    } else if (key === 'Backspace') {
      showMessage('');
      if (currentAttempt.length > 0) {
        currentAttempt = currentAttempt.slice(0, -1);
        updateBoard();
      }
    } else if (/^[A-Z]$/.test(key)) {
      if (currentAttempt.length < wordLength) {
        currentAttempt += key;
        updateBoard();
      }
    }
  }

  // Submit the current attempt
  function submitAttempt() {
    if (currentAttempt.length !== wordLength) {
      showMessage('Not enough letters');
      return;
    }

    if (!DICTIONARY.includes(currentAttempt)) {
      showMessage('Not a valid word');
      return;
    }

    attempts.push(currentAttempt);

    if (currentAttempt.toUpperCase() === targetWord.toUpperCase()) {
      showGameOverMessage(true);
      gameOver = true;
    } else if (attempts.length === MAX_ATTEMPTS) {
      showGameOverMessage(false);
      gameOver = true;
    }

    currentAttempt = '';
    updateBoard();
  }

  // Show a message
  function showMessage(msg) {
    messageEl.textContent = msg;
  }

  // Event listeners
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleInput('Enter');
    } else if (e.key === 'Backspace') {
      handleInput('Backspace');
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      handleInput(e.key.toUpperCase());
    }
  });

  keys.forEach(key => {
    key.addEventListener('click', () => {
      const keyValue = key.getAttribute('data-key');
      handleInput(keyValue);
    });
  });

  if(resetBtn !== undefined && resetBtn !== null) {
    resetBtn.addEventListener('click', initGame);
  }

  document.getElementById('word-length-slider').addEventListener('input', function() {
    wordLength = parseInt(this.value);
    document.getElementById('word-length-value').textContent = wordLength;
    initGame(); // Reinitialize the game with new word length
  });
// Set up slider event listeners
  wordLengthSlider.addEventListener('input', function() {
    wordLength = parseInt(this.value);
    wordLengthValue.textContent = wordLength; // Live update
  });

  wordLengthSlider.addEventListener('change', async function() {
      // Load new words based on the selected length
      wordLength = parseInt(this.value);
      const loaded = await loadWords(wordLength);
      if (loaded) {
        initGame();
      } else {
        showMessage('Error loading words. Using default length.');
      }
  });

  // Check for saved user preference or use system preference
  function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedMode === 'dark' || (!savedMode && systemPrefersDark)) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  }

  function enableDarkMode() {
    htmlElement.setAttribute('data-theme', 'dark');
    darkModeToggle.checked = true;
    localStorage.setItem('darkMode', 'dark');
  }

  function enableLightMode() {
    htmlElement.setAttribute('data-theme', 'light');
    darkModeToggle.checked = false;
    localStorage.setItem('darkMode', 'light');
  }

  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      enableDarkMode();
    } else {
      enableLightMode();
    }
  });

  function getStats() {
    const stats = localStorage.getItem('wordleStats');
    return stats ? JSON.parse(stats) : {...DEFAULT_STATS};
  }

  function saveStats(stats) {
    localStorage.setItem('wordleStats', JSON.stringify(stats));
  }

  function updateStats(gameWon, guessCount) {
    const stats = getStats();
    const today = new Date().toDateString();

    // Update basic stats
    stats.gamesPlayed++;
    if (gameWon) {
      stats.gamesWon++;
      stats.guessDistribution[guessCount]++;
    }

    // Update streaks
    if (stats.lastGame && stats.lastGame.date === today) {
      // Already played today
      return;
    }

    if (gameWon) {
      if (stats.lastGame && stats.lastGame.won) {
        stats.currentStreak++;
      } else {
        stats.currentStreak = 1;
      }
      stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
    } else {
      stats.currentStreak = 0;
    }

    // Update last game
    stats.lastGame = {
      date: today,
      won: gameWon,
      guesses: guessCount
    };

    saveStats(stats);
  }

  function showGameOverMessage(won) {
    if (won) {
      const guesses = attempts.length;
      showMessage(`You won in ${guesses} ${guesses === 1 ? 'try' : 'tries'}!`);
      updateStats(true, guesses);
    } else {
      showMessage(`Game over! The word was ${targetWord}`);
      updateStats(false, 0);
    }
  }

  function showStats() {
    const stats = getStats();
    const winPercentage = stats.gamesPlayed > 0
      ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
      : 0;
  }

  async function updateAnalytics() {
    // Check if Google Analytics is loaded
    if (typeof ga !== 'undefined') {
      // Send event to Google Analytics
      ga('send', {
        hitType: 'event',
        eventCategory: 'Button',
        eventAction: 'click',
        eventLabel: 'New game'
      });
    } else if (typeof gtag !== 'undefined') {
      // For Google Analytics 4 (gtag.js)
      gtag('event', 'click', {
        'event_category': 'Button',
        'event_label': 'New game'
      });
    }
  }

// document.getElementById('stats-btn').addEventListener('click', showStats);

// Toggle mobile menu
  const hamburger = document.querySelector('.hamburger');
  const headerRight = document.querySelector('.header-right');

  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    headerRight.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

// Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.game-header') && headerRight.classList.contains('active')) {
      headerRight.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

// Close menu when clicking a link
  document.querySelectorAll('.header-links a').forEach(link => {
    link.addEventListener('click', () => {
      headerRight.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

// Watch for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('darkMode')) {
      if (e.matches) {
        enableDarkMode();
      } else {
        enableLightMode();
      }
    }
  });

// Initialize game (called when page loads)
  async function initializeGame() {
    const loaded = await loadWords();
    if (loaded) {
      initGame();
    } else {
      showMessage('Failed to load word lists');
    }
  }

  // Initialize dark mode when page loads
  window.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initializeGame();
  });
});



