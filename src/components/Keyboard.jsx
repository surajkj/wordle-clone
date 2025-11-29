export default function Keyboard({ usedKeys, onKeyPress, wordLength }) {
    const rows = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
    ];

    const getKeyColor = (key) => {
        const color = usedKeys[key];
        if (color === 'green') {
            return 'bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700';
        } else if (color === 'yellow') {
            return 'bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600 dark:hover:bg-yellow-700';
        } else if (color === 'gray') {
            return 'bg-gray-500 dark:bg-gray-500 text-white hover:bg-gray-500 dark:hover:bg-gray-700';
        } else {
            return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600';
        }
    };

    const handleClick = (key) => {
        if (key === 'Backspace') {
            onKeyPress({ key: 'Backspace' });
        } else if (key === 'Enter') {
            onKeyPress({ key: 'Enter' });
        } else {
            onKeyPress({ key: key.toLowerCase() });
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            {rows.map((row, i) => (
                <div key={i} className="flex space-x-1">
                    {row.map(key => (
                        <button
                            key={key}
                            onClick={() => handleClick(key)}
                            className={`flex items-center justify-center rounded font-bold uppercase transition-all duration-200 ${
                                key === 'Enter' || key === 'Backspace'
                                    ? 'px-3 py-4 text-sm flex-1 min-w-12'
                                    : 'w-8 h-12 text-lg min-w-8'
                            } ${getKeyColor(key)}`}
                        >
                            {key === 'Backspace' ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                key
                            )}
                        </button>
                    ))}
                </div>
            ))}

            {/* Word Length Info */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
                Current word length: {wordLength} letters
            </div>
        </div>
    );
}
