export default function GameBoard({ guesses, currentGuess, turn, wordLength }) {
    return (
        <div className="flex flex-col items-center space-y-2 mb-8">
            {guesses.map((guess, i) => {
                if (turn === i) {
                    return (
                        <div key={i} className="flex space-x-2">
                            {[...Array(wordLength)].map((_, j) => (
                                <div
                                    key={j}
                                    className="w-14 h-14 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-2xl font-bold uppercase bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded transition-colors duration-300"
                                >
                                    {currentGuess[j] || ''}
                                </div>
                            ))}
                        </div>
                    );
                }

                return (
                    <div key={i} className="flex space-x-2">
                        {[...Array(wordLength)].map((_, j) => {
                            const letter = guess?.[j];
                            return (
                                <div
                                    key={j}
                                    className={`w-14 h-14 flex items-center justify-center text-2xl font-bold uppercase text-white rounded transition-all duration-300 ${
                                        letter?.color === 'green'
                                            ? 'bg-green-500 dark:bg-green-600'
                                            : letter?.color === 'yellow'
                                                ? 'bg-yellow-500 dark:bg-yellow-600'
                                                : letter?.color === 'gray'
                                                    ? 'bg-gray-500 dark:bg-gray-500'
                                                    : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
                                    }`}
                                >
                                    {letter?.key || ''}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
