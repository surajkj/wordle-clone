import { useSettings } from '../contexts/SettingsContext';

export default function SettingsModal({ isOpen, onClose }) {
    const { wordLength, setWordLength } = useSettings();

    if (!isOpen) return null;

    const handleLengthChange = (length) => {
        setWordLength(length);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full transition-colors duration-300">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Game Settings
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Close settings"
                        >
                            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Word Length Selection */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Word Length
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            Choose how many letters the hidden word should have
                        </p>

                        <div className="grid grid-cols-3 gap-3">
                            {[2, 3, 4, 5, 6].map((length) => (
                                <button
                                    key={length}
                                    onClick={() => handleLengthChange(length)}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                        wordLength === length
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                            : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-400'
                                    }`}
                                >
                                    <div className="text-center">
                                        <div className="text-xl font-bold">{length}</div>
                                        <div className="text-xs mt-1">Letters</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Difficulty Info */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                                Difficulty Guide
                            </h4>
                            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                <p>• <strong>2 letters:</strong> Very Easy - Great for beginners</p>
                                <p>• <strong>3-4 letters:</strong> Easy - Common short words</p>
                                <p>• <strong>5 letters:</strong> Medium - Classic Wordle difficulty</p>
                                <p>• <strong>6 letters:</strong> Hard - Longer, less common words</p>
                            </div>
                        </div>
                    </div>

                    {/* Current Settings */}
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                            Current Settings
                        </h4>
                        <p className="text-blue-700 dark:text-blue-200">
                            Word Length: <strong>{wordLength} letters</strong>
                        </p>
                        <p className="text-blue-700 dark:text-blue-200 text-sm mt-1">
                            Changes will start a new game automatically
                        </p>
                    </div>

                    {/* Close Button */}
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
