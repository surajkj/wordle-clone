import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, solution, gameStatus, turn, resetGame }) {
    useEffect(() => {
        if (isOpen) {
            const handleEscape = (e) => {
                if (e.key === 'Escape') onClose();
            };
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handlePlayAgain = () => {
        resetGame();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 mx-auto transition-colors duration-300">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                        {gameStatus === 'won' ? '🎉 You Won! 🎉' : '😢 Game Over'}
                    </h2>

                    <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
                        {gameStatus === 'won'
                            ? `You found the solution in ${turn} ${turn === 1 ? 'guess' : 'guesses'}!`
                            : 'Better luck next time!'
                        }
                    </p>

                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6 transition-colors duration-300">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">The word was:</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400 uppercase">{solution}</p>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={handlePlayAgain}
                            className="flex-1 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Play Again
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
