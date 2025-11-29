import { useState, useEffect, useCallback } from 'react';
import { getRandomWord, isValidWord } from '../utils/wordList';
import { useSettings } from '../contexts/SettingsContext';

export const useWordle = () => {
    const { wordLength } = useSettings();
    const [solution, setSolution] = useState('');
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]);
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
    const [gameStatus, setGameStatus] = useState('playing');

    // Initialize game
    useEffect(() => {
        setSolution(getRandomWord(wordLength));
    }, [wordLength]);

    // Reset game when word length changes
    useEffect(() => {
        resetGame();
    }, [wordLength]);

    // Format a guess into array of letter objects
    const formatGuess = useCallback(() => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l, i) => {
            return { key: l, color: 'gray' };
        });

        // Find green letters (correct position)
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key.toUpperCase()) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null;
            }
        });

        // Find yellow letters (wrong position)
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key.toUpperCase()) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key.toUpperCase())] = null;
            }
        });

        return formattedGuess;
    }, [currentGuess, solution]);

    const addNewGuess = useCallback((formattedGuess) => {
        if (currentGuess.toUpperCase() === solution) {
            setIsCorrect(true);
            setGameStatus('won');
        }

        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });

        setHistory(prev => [...prev, currentGuess]);
        setTurn(prev => prev + 1);

        // FIXED: Update used keys with proper priority
        setUsedKeys(prevUsedKeys => {
            const newUsedKeys = { ...prevUsedKeys };

            formattedGuess.forEach(l => {
                const currentColor = newUsedKeys[l.key];

                // Green has highest priority
                if (l.color === 'green') {
                    newUsedKeys[l.key] = 'green';
                }
                // Yellow has medium priority (only if not already green)
                else if (l.color === 'yellow' && currentColor !== 'green') {
                    newUsedKeys[l.key] = 'yellow';
                }
                // Gray has lowest priority (only if not already green or yellow)
                else if (l.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
                    newUsedKeys[l.key] = 'gray';
                }
            });

            return newUsedKeys;
        });

        setCurrentGuess('');
    }, [currentGuess, solution, turn]);

    // Handle keyup event
    const handleKeyup = useCallback(({ key }) => {
        if (gameStatus !== 'playing') return;

        if (key === 'Enter') {
            if (turn > 5) return;
            if (currentGuess.length !== wordLength) {
                alert(`Word must be ${wordLength} letters long!`);
                return;
            }
            if (!isValidWord(currentGuess, wordLength)) {
                alert('Not a valid word!');
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
            return;
        }

        if (/^[A-Za-z]$/.test(key) && currentGuess.length < wordLength) {
            setCurrentGuess(prev => prev + key.toUpperCase());
        }
    }, [currentGuess, turn, formatGuess, addNewGuess, gameStatus, wordLength]);

    // Reset game
    const resetGame = useCallback(() => {
        setSolution(getRandomWord(wordLength));
        setTurn(0);
        setCurrentGuess('');
        setGuesses([...Array(6)]);
        setHistory([]);
        setIsCorrect(false);
        setUsedKeys({});
        setGameStatus('playing');
    }, [wordLength]);

    // Check game status
    useEffect(() => {
        if (turn === 6 && !isCorrect) {
            setGameStatus('lost');
        }
    }, [turn, isCorrect]);

    return {
        solution,
        turn,
        currentGuess,
        guesses,
        isCorrect,
        usedKeys,
        gameStatus,
        handleKeyup,
        resetGame,
        wordLength
    };
};
