import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-4xl mx-auto py-8 px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        About Wordle Clone
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

                {/* Content */}
                <div className="space-y-8">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <span className="text-white text-3xl font-bold">W</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                            Wordle Clone PWA
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            A modern Progressive Web App built with React and Tailwind CSS
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-3">🚀 Features</h3>
                                <ul className="text-blue-700 dark:text-blue-200 space-y-2">
                                    <li>• Progressive Web App (PWA)</li>
                                    <li>• Dark/Light mode toggle</li>
                                    <li>• Fully responsive design</li>
                                    <li>• Virtual & physical keyboard support</li>
                                    <li>• Word validation with 500+ words</li>
                                    <li>• Color-coded feedback system</li>
                                    <li>• Game statistics tracking</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-3">📱 PWA Benefits</h3>
                                <ul className="text-green-700 dark:text-green-200 space-y-2">
                                    <li>• Installable on any device</li>
                                    <li>• Works offline</li>
                                    <li>• Fast loading times</li>
                                    <li>• Native app experience</li>
                                    <li>• Automatic updates</li>
                                    <li>• No app store required</li>
                                </ul>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-300 mb-3">🛠️ Technology Stack</h3>
                                <ul className="text-purple-700 dark:text-purple-200 space-y-2">
                                    <li>• React 18 with Hooks</li>
                                    <li>• Vite for fast development</li>
                                    <li>• Tailwind CSS v4 for styling</li>
                                    <li>• React Router for navigation</li>
                                    <li>• PWA Plugin for offline support</li>
                                    <li>• Context API for state management</li>
                                    <li>• Custom React Hooks</li>
                                </ul>
                            </div>

                            <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl">
                                <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-300 mb-3">🎯 Game Information</h3>
                                <ul className="text-orange-700 dark:text-orange-200 space-y-2">
                                    <li>• 5-letter word guessing game</li>
                                    <li>• 6 attempts per game</li>
                                    <li>• 500+ word dictionary</li>
                                    <li>• Random word selection</li>
                                    <li>• Win/lose statistics</li>
                                    <li>• Unlimited replayability</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">📝 Project Information</h3>
                        <div className="text-gray-600 dark:text-gray-300 space-y-3">
                            <p>
                                This Wordle clone is built for educational purposes to demonstrate modern web development
                                practices including Progressive Web Apps, responsive design, and React best practices.
                            </p>
                            <p>
                                The game includes all the core mechanics of the original Wordle while adding modern
                                web features like dark mode, PWA capabilities, and a responsive design that works
                                perfectly on all devices.
                            </p>
                            <p className="text-sm italic">
                                Note: This is a fan-made clone and is not affiliated with the original Wordle game.
                            </p>
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
