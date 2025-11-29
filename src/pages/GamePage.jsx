import { useEffect, useState } from 'react';
import { useWordle } from '../hooks/useWordle';
import GameBoard from '../components/GameBoard';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import SettingsModal from '../components/SettingsModal';

export default function GamePage() {
    const {
        solution,
        turn,
        currentGuess,
        guesses,
        usedKeys,
        gameStatus,
        handleKeyup,
        resetGame,
        wordLength
    } = useWordle();

    const [showModal, setShowModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [gameStats, setGameStats] = useState(() => {
        // Load from localStorage on initial render
        const savedStats = localStorage.getItem('gameStats');
        return savedStats ? JSON.parse(savedStats) : { won: 0, lost: 0 };
    });


    useEffect(() => {
        if (gameStatus === 'won' || gameStatus === 'lost') {
            const newStats = {
                ...gameStats,
                [gameStatus]: gameStats[gameStatus] + 1
            };

            setGameStats(newStats);
            localStorage.setItem('gameStats', JSON.stringify(newStats));

            setTimeout(() => setShowModal(true), 100);
        }
    }, [gameStatus]);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);
        return () => window.removeEventListener('keyup', handleKeyup);
    }, [handleKeyup]);

    return (
        <>
            {/* Main Game Content */}
          <div className="flex flex-col items-center py-8 px-4">
            {/* Game Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Wordle Clone
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Guess the {wordLength}-letter word in 6 tries
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setShowSettings(true)}
                  className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Change Word Length ({wordLength})
                </button>
              </div>
            </header>

            {/* Game Stats */}
              <div className="flex space-x-6 mb-6 text-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm transition-colors duration-300">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Round</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{turn}/6</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm transition-colors duration-300">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Status</p>
                      <p className={`text-xl font-bold ${gameStatus === 'lost' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'} capitalize`}>
                          {gameStatus}
                      </p></div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm transition-colors duration-300">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Win</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{gameStats.won}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm transition-colors duration-300">
                      <p className="text-sm text-gray-600 dark:text-gray-300">Lost</p>
                      <p className="text-xl font-bold text-red-600 dark:text-red-400">{gameStats.lost}</p>
                  </div>
                  {/*<div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm transition-colors duration-300">*/}
                  {/*    <p className="text-sm text-gray-600 dark:text-gray-300">Length</p>*/}
                  {/*    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{wordLength}</p>*/}
                  {/*</div>*/}
              </div>

              {/* Game Board */}
              <GameBoard
                  guesses={guesses}
                  currentGuess={currentGuess}
                  turn={turn}
                  wordLength={wordLength}
              />

              {/* Keyboard */}
              <div className="mt-8">
                  <Keyboard usedKeys={usedKeys} onKeyPress={handleKeyup} wordLength={wordLength}/>
            </div>


            <button
              onClick={() => resetGame()}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              New Game
            </button>

            {/* Instructions */}
            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300 max-w-md">
              <p>💚 Green = Correct letter in correct position</p>
              <p>💛 Yellow = Correct letter in wrong position</p>
              <p>🩶 Gray = Letter not in the word</p>
            </div>
          </div>

          {/* Game Over Modal */}
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            solution={solution}
            gameStatus={gameStatus}
            turn={turn}
            resetGame={resetGame}
          />

          {/* Settings Modal */}
          <SettingsModal
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            setGameStats={setGameStats}
          />
        </>
    );
}
