import { Link } from 'react-router-dom';

export default function HelpPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        How to Play Wordle
                    </h1>
                    <Link
                        to="/wordle-clone"
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Game
                    </Link>
                </div>

                {/* Game Rules */}
                <div className="space-y-8">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
                        <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-300 mb-4">
                            🎯 Objective
                        </h2>
                        <p className="text-blue-700 dark:text-blue-200 text-lg">
                            Guess the hidden 5-letter word in 6 tries or less. Each guess must be a valid 5-letter word.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Color Guide
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold text-xl">W</span>
                                </div>
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Green</h3>
                                <p className="text-green-700 dark:text-green-200">
                                    Letter is correct and in the right position
                                </p>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold text-xl">E</span>
                                </div>
                                <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Yellow</h3>
                                <p className="text-yellow-700 dark:text-yellow-200">
                                    Letter is in the word but wrong position
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-2xl text-center">
                                <div className="w-16 h-16 bg-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <span className="text-white font-bold text-xl">R</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-2">Gray</h3>
                                <p className="text-gray-700 dark:text-gray-200">
                                    Letter is not in the word
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Tips & Strategies
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-3">Start Strong</h3>
                                <p className="text-green-700 dark:text-green-200">
                                    Use words with common vowels and consonants like "ARISE", "ROATE", or "AUDIO" to test multiple letters at once.
                                </p>
                            </div>

                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Eliminate Letters</h3>
                                <p className="text-yellow-700 dark:text-yellow-200">
                                    Use your first two guesses to test as many different letters as possible to narrow down options.
                                </p>
                            </div>

                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">Position Matters</h3>
                                <p className="text-blue-700 dark:text-blue-200">
                                    When a letter turns yellow, try it in different positions in your next guess.
                                </p>
                            </div>

                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 mb-3">Think Patterns</h3>
                                <p className="text-purple-700 dark:text-purple-200">
                                    Consider common letter patterns, word endings, and double letters.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">🎮 Controls</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Keyboard</h4>
                                <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                                    <li className="flex items-center">
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm mr-3">A-Z</kbd>
                                        Type letters to enter your guess
                                    </li>
                                    <li className="flex items-center">
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm mr-3">Enter</kbd>
                                        Submit your guess
                                    </li>
                                    <li className="flex items-center">
                                        <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm mr-3">Backspace</kbd>
                                        Delete last letter
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Virtual Keyboard</h4>
                                <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                                    <li>• Click letters to type</li>
                                    <li>• Click <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">Enter</kbd> to submit</li>
                                    <li>• Click <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs">⌫</kbd> to delete</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Game Button */}
                <div className="mt-8 text-center">
                    <Link
                        to="/wordle-clone"
                        className="inline-flex items-center bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Play Wordle
                    </Link>
                </div>
            </div>
        </div>
    );
}
