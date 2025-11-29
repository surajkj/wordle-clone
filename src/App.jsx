import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GamePage from './pages/GamePage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';

function App() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* Navbar is now outside Routes, so it shows on all pages */}
            <Navbar />

            <Routes>
                <Route path="/wordle-clone/" element={<GamePage />} />
                <Route path="/wordle-clone/help" element={<HelpPage />} />
                <Route path="/wordle-clone/about" element={<AboutPage />} />
            </Routes>
        </div>
    );
}

export default App;
