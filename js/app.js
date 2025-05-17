document.addEventListener('DOMContentLoaded', () => {

  document.body.style.minHeight = '0';

  // Game configuration
  const MAX_ATTEMPTS = 6;
  let COMMON_WORDS = [];
  let DICTIONARY = [];

  // Dark mode functionality
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const htmlElement = document.documentElement;

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
    messageEl.textContent = '';

    // Clear and rebuild the board
    board.innerHTML = '';

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const row = document.createElement('div');
      row.className = 'row';

      for (let j = 0; j < wordLength; j++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        row.appendChild(tile);
      }
      board.appendChild(row);
    }

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
      showMessage('Not in word list');
      return;
    }

    attempts.push(currentAttempt);

    if (currentAttempt === targetWord) {
      showMessage('You win!');
      gameOver = true;
    } else if (attempts.length === MAX_ATTEMPTS) {
      showMessage(`Game over! The word was ${targetWord}`);
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

  resetBtn.addEventListener('click', initGame);

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



